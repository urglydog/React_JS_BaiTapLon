const express = require("express");
const pool = require("./db.js");
const { getEmbedding, cosineSimilarity } = require("./vector.js");

const router = express.Router();

// Bộ lưu trữ ngữ cảnh theo sessionId với timestamp
const contextStore = new Map();

// Thời gian timeout (10 giây)
const CONTEXT_TIMEOUT = 10 * 1000; // 10 giây tính bằng mili giây

// Biến ngữ cảnh mặc định cho mỗi phiên
const defaultContext = {
    category: null,
    brand: null,
    history: [],
    priceRange: { min: null, max: null },
    purpose: null,
    model: null,
    lastProductSuggestions: [],
    modifyComponent: null,
    selectedProduct: null,
    state: "initial",
    lastActivity: Date.now(),
};

// Hàm chuẩn hóa văn bản
function normalizeText(text) {
    const accents = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'ă': 'a', 'â': 'a', 'đ': 'd', 'ê': 'e', 'ô': 'o', 'ơ': 'o', 'ư': 'u',
        'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
        'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
        'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
        'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
        'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
        'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
        'Ă': 'A', 'Â': 'A', 'Đ': 'D', 'Ê': 'E', 'Ô': 'O', 'Ơ': 'O', 'Ư': 'U'
    };
    return text
        .toLowerCase()
        .replace(/[àáảãạèéẻẽẹìíỉĩịòóỏõọùúủũụỳýỷỹỵăâđêôơưÀÁẢÃẠÈÉẺẼẸÌÍỈĨỊÒÓỎÕỌÙÚỦŨỤỲÝỶỸỴĂÂĐÊÔƠƯ]/g, char => accents[char] || char);
}

// Hàm lấy tên danh mục
async function getCategoryName(categoryID) {
    try {
        const [rows] = await pool.query(
            "SELECT categoryName FROM productcategories WHERE categoryID = ?",
            [categoryID]
        );
        return rows.length > 0 ? rows[0].categoryName : "Không xác định";
    } catch (error) {
        console.error("Lỗi khi lấy tên danh mục:", error);
        return "Không xác định";
    }
}

// Từ điển từ đồng nghĩa
const synonyms = {
    laptop: ["laptop", "máy tính xách tay", "máy xách tay", "notebook"],
    phone: ["điện thoại", "smartphone", "điện thoại di động", "điện thoại thông minh", "mobile", "phone"],
    iphone: ["iphone", "i phone", "ip"],
    samsung: ["samsung", "sam sung", "ss"],
    xiaomi: ["xiaomi", "redmi", "mi"],
    pc: ["pc", "máy tính bàn", "desktop", "máy tính để bàn", "máy bàn"],
    gaming: ["game", "gaming", "chơi game", "trò chơi", "gamming"],
    budget: ["giá rẻ", "rẻ", "kinh tế", "tiết kiệm", "bình dân", "giá tốt"],
    highend: ["cao cấp", "hiệu năng cao", "mạnh", "chất lượng cao", "sang", "xịn"],
    latest: ["mới nhất", "mới", "đời mới", "mới ra", "latest", "new"],
    build: ["build", "xây dựng", "lắp ráp", "tạo pc", "dựng pc", "tư vấn bộ pc", "tư vấn pc", "bộ pc"],
};

// Hàm kiểm tra từ đồng nghĩa
function matchSynonyms(message, synonymList) {
    const normalizedMessage = normalizeText(message);
    return synonymList.some(synonym => normalizedMessage.includes(normalizeText(synonym)));
}

// Hàm phân tích ngữ cảnh
function analyzeContext(message, context) {
    const normalizedMessage = normalizeText(message);
    let newCategory = null;

    // Phân tích danh mục sản phẩm
    const categories = {
        phone: matchSynonyms(normalizedMessage, synonyms.phone) || matchSynonyms(normalizedMessage, synonyms.iphone) || matchSynonyms(normalizedMessage, synonyms.samsung) || matchSynonyms(normalizedMessage, synonyms.xiaomi),
        laptop: matchSynonyms(normalizedMessage, synonyms.laptop),
        build: matchSynonyms(normalizedMessage, synonyms.build) || normalizedMessage.includes(normalizeText("lắp ráp")) || normalizedMessage.includes(normalizeText("xây dựng")) || (normalizedMessage.includes(normalizeText("tư vấn")) && (normalizedMessage.includes(normalizeText("bộ pc")) || normalizedMessage.includes(normalizeText("pc")))),
        pc: matchSynonyms(normalizedMessage, synonyms.pc) && !matchSynonyms(normalizedMessage, synonyms.build) && !(normalizedMessage.includes(normalizeText("tư vấn")) && (normalizedMessage.includes(normalizeText("bộ pc")) || normalizedMessage.includes(normalizeText("pc")))),
        case: normalizedMessage.includes(normalizeText("case")) || normalizedMessage.includes(normalizeText("vỏ máy tính")),
        monitor: normalizedMessage.includes(normalizeText("màn hình")) || normalizedMessage.includes(normalizeText("monitor")),
        keyboard: normalizedMessage.includes(normalizeText("bàn phím")) || normalizedMessage.includes(normalizeText("keyboard")),
        mouse: normalizedMessage.includes(normalizeText("chuột")) || normalizedMessage.includes(normalizeText("mouse")),
        ssd: normalizedMessage.includes(normalizeText("ssd")),
        ram: normalizedMessage.includes(normalizeText("ram")),
        mainboard: normalizedMessage.includes(normalizeText("mainboard")) || normalizedMessage.includes(normalizeText("bo mạch chủ")),
        cpu: normalizedMessage.includes(normalizeText("cpu")),
        psu: normalizedMessage.includes(normalizeText("psu")) || normalizedMessage.includes(normalizeText("nguồn")),
        mousepad: normalizedMessage.includes(normalizeText("mousepad")) || normalizedMessage.includes(normalizeText("lót chuột")),
        headphone: normalizedMessage.includes(normalizeText("headphone")) || normalizedMessage.includes(normalizeText("tai nghe")),
        gaming_gear: normalizedMessage.includes(normalizeText("gaming gear")) || normalizedMessage.includes(normalizeText("tay cầm")),
    };

    for (const [category, matched] of Object.entries(categories)) {
        if (matched) {
            newCategory = category;
            break;
        }
    }

    // Đặc biệt xử lý thương hiệu cho điện thoại và laptop
    if (matchSynonyms(normalizedMessage, synonyms.iphone)) {
        context.brand = "apple";
        newCategory = "phone";
        context.state = "consulting_phone";
    } else if (matchSynonyms(normalizedMessage, synonyms.samsung)) {
        context.brand = "samsung";
        newCategory = "phone";
        context.state = "consulting_phone";
    } else if (matchSynonyms(normalizedMessage, synonyms.xiaomi)) {
        context.brand = "xiaomi";
        newCategory = "phone";
        context.state = "consulting_phone";
    } else if (newCategory === "laptop") {
        const laptopBrands = ["asus", "dell", "lenovo", "acer", "gigabyte", "msi", "apple"];
        for (const brand of laptopBrands) {
            if (normalizedMessage.includes(normalizeText(brand))) {
                context.brand = brand;
                context.state = "consulting_laptop";
                break;
            }
        }
    }

    // Reset ngữ cảnh nếu danh mục mới không liên quan
    if (newCategory && newCategory !== context.category) {
        context.category = newCategory;
        context.state = newCategory === "build" ? "building_pc" : `consulting_${newCategory}`;
        context.lastProductSuggestions = [];
        context.modifyComponent = null;
        context.selectedProduct = null;
        context.purpose = null;
        context.priceRange = { min: null, max: null };
        if (!matchSynonyms(normalizedMessage, synonyms.iphone) && 
            !matchSynonyms(normalizedMessage, synonyms.samsung) && 
            !matchSynonyms(normalizedMessage, synonyms.xiaomi) && 
            !(newCategory === "laptop" && context.brand)) {
            context.brand = null; // Chỉ reset brand nếu không phải thương hiệu điện thoại/laptop cụ thể
        }
    }

    // Phân tích yêu cầu thay đổi linh kiện
    if (normalizedMessage.includes(normalizeText("thay")) || normalizedMessage.includes(normalizeText("nâng cấp")) || normalizedMessage.includes(normalizeText("sửa")) || normalizedMessage.includes(normalizeText("khác"))) {
        context.category = "build";
        context.state = "modifying_component";
        context.modifyComponent = normalizedMessage.match(/(cpu|ram|ssd|mainboard|psu|case|monitor|keyboard|mouse|mousepad|headphone)/i)?.[0];
    }

    // Phân tích mục đích
    if (matchSynonyms(normalizedMessage, synonyms.gaming)) {
        context.purpose = "gaming";
    } else if (normalizedMessage.includes(normalizeText("học")) || normalizedMessage.includes(normalizeText("code")) || normalizedMessage.includes(normalizeText("lập trình"))) {
        context.purpose = "coding";
    } else if (normalizedMessage.includes(normalizeText("làm việc")) || normalizedMessage.includes(normalizeText("văn phòng"))) {
        context.purpose = "work";
    } else if (!context.purpose && newCategory) {
        context.purpose = "basic";
    }

    // Phân tích mức giá
    if (matchSynonyms(normalizedMessage, synonyms.budget)) {
        context.priceRange = { min: 0, max: 10000000 };
    } else if (normalizedMessage.includes(normalizeText("tầm trung"))) {
        context.priceRange = { min: 10000000, max: 25000000 };
    } else if (matchSynonyms(normalizedMessage, synonyms.highend)) {
        context.priceRange = { min: 25000000, max: null };
    }

    // Phân tích thương hiệu (nếu chưa gán)
    const brands = [
        "msi", "asus", "acer", "dell", "gigabyte", "lenovo", "apple", "lg", "daeru",
        "aula", "rapoo", "logitech", "razer", "kingston", "wd", "lexar", "corsair",
        "g.skill", "seagate", "toshiba", "hitachi", "asrock", "intel", "cooler master",
        "noctua", "nzxt", "deepcool", "pny", "xigmatek", "cougar", "thermaltake", "amd",
        "samsung", "xiaomi"
    ];
    if (!context.brand) {
        for (const brand of brands) {
            if (normalizedMessage.includes(normalizeText(brand))) {
                context.brand = brand;
                break;
            }
        }
    }

    // Kiểm tra xem người dùng có chọn sản phẩm từ danh sách gợi ý không
    if (context.lastProductSuggestions.length > 0) {
        const selected = context.lastProductSuggestions.find(product => 
            normalizedMessage.includes(normalizeText(product.name))
        );
        if (selected) {
            context.selectedProduct = selected;
            context.state = "selected_product";
        } else if (context.category === "phone" && context.brand) {
            // Kiểm tra model cụ thể (iPhone, Samsung, Xiaomi, v.v.)
            const modelMatch = normalizedMessage.match(/(iphone \d+[a-z]*|galaxy [a-z0-9]+|redmi [a-z0-9]+)/i);
            if (modelMatch) {
                context.model = modelMatch[0]; // Lưu model, ví dụ: "iPhone 15", "Galaxy S23", "Redmi Note 12"
            }
        } else if (context.category === "laptop" && context.brand) {
            // Kiểm tra model laptop cụ thể (ví dụ: "MacBook Air", "ROG Strix")
            const modelMatch = normalizedMessage.match(/(macbook [a-z0-9]+|rog [a-z0-9]+|thinkpad [a-z0-9]+|xps [0-9]+|nitro [0-9]+)/i);
            if (modelMatch) {
                context.model = modelMatch[0]; // Lưu model, ví dụ: "MacBook Air", "ROG Strix"
            }
        }
    }

    // Ưu tiên ngữ cảnh từ lịch sử nếu không có danh mục mới
    if (!context.category && context.history.length > 0) {
        const lastMessage = context.history[context.history.length - 1];
        if (matchSynonyms(lastMessage, synonyms.build)) {
            context.category = "build";
            context.state = "building_pc";
        } else if (matchSynonyms(lastMessage, synonyms.phone) || 
                   matchSynonyms(lastMessage, synonyms.iphone) || 
                   matchSynonyms(lastMessage, synonyms.samsung) || 
                   matchSynonyms(lastMessage, synonyms.xiaomi)) {
            context.category = "phone";
            context.state = "consulting_phone";
        } else if (matchSynonyms(lastMessage, synonyms.laptop)) {
            context.category = "laptop";
            context.state = "consulting_laptop";
        }
    }

    if (!context.category) {
        context.state = "initial";
    }

    // Cập nhật thời gian hoạt động
    context.lastActivity = Date.now();
}

// Hàm kiểm tra và xóa ngữ cảnh hết hạn
function clearExpiredContexts() {
    const now = Date.now();
    for (const [sessionId, context] of contextStore) {
        if (now - context.lastActivity > CONTEXT_TIMEOUT) {
            contextStore.delete(sessionId);
            console.log(`Đã xóa ngữ cảnh cho sessionId: ${sessionId}`);
        }
    }
}

// Hàm xử lý câu hỏi tiếp theo
function handleFollowUpQuestions(message, context) {
    const normalizedMessage = normalizeText(message);
    const confirmations = ["đúng rồi", "đúng vậy", "đúng", "ok", "vâng"];

    if (confirmations.some(conf => normalizedMessage.includes(normalizeText(conf)))) {
        if (context.state === "building_pc" && context.lastProductSuggestions.length > 0) {
            const irrelevantCategories = ["laptop", "phone", "gaming_gear"];
            const lastSuggestionCategories = context.lastProductSuggestions.map(p => p.category);
            if (lastSuggestionCategories.some(cat => irrelevantCategories.includes(cat))) {
                return {
                    success: true,
                    answer: "Xin lỗi, gợi ý trước có sản phẩm không phù hợp. Tôi sẽ xây dựng lại cấu hình PC...\nVui lòng vào phần sản phẩm để xem chi tiết",
                    source: "follow-up",
                    retryBuild: true
                };
            }
            return {
                success: true,
                answer: "Cảm ơn bạn đã xác nhận! Bạn muốn tiếp tục chỉnh sửa cấu hình PC này hay thêm linh kiện nào khác?\nVui lòng vào phần sản phẩm để xem chi tiết",
                source: "follow-up"
            };
        } else if (context.state.startsWith("consulting_")) {
            const categoryDisplay = context.category === "phone" ? "điện thoại" :
                                   context.category === "laptop" ? "laptop" :
                                   context.category === "pc" ? "PC" :
                                   context.category === "monitor" ? "màn hình" :
                                   context.category === "keyboard" ? "bàn phím" :
                                   context.category === "mouse" ? "chuột" :
                                   context.category === "ssd" ? "SSD" :
                                   context.category === "ram" ? "RAM" :
                                   context.category === "mainboard" ? "bo mạch chủ" :
                                   context.category === "cpu" ? "CPU" :
                                   context.category === "psu" ? "nguồn" :
                                   context.category === "mousepad" ? "lót chuột" :
                                   context.category === "headphone" ? "tai nghe" :
                                   context.category === "gaming_gear" ? "gaming gear" : "sản phẩm";
            return {
                success: true,
                answer: `OK, bạn muốn tiếp tục tư vấn về ${categoryDisplay}${context.brand ? ` của ${context.brand}` : ''}? Hãy cho tôi biết thêm chi tiết (ví dụ: giá, model, mục đích sử dụng)!\nVui lòng vào phần sản phẩm để xem chi tiết`,
                source: "follow-up"
            };
        } else if (context.state === "modifying_component") {
            return {
                success: true,
                answer: `Bạn đang thay linh kiện ${context.modifyComponent?.toUpperCase()}. Bạn muốn tiếp tục với các gợi ý trước hay tìm linh kiện khác?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                source: "follow-up"
            };
        } else if (context.state === "selected_product") {
            return {
                success: true,
                answer: `Bạn đã chọn "${context.selectedProduct.name}". Bạn muốn thêm sản phẩm này vào giỏ hàng hay tìm sản phẩm khác?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                source: "follow-up"
            };
        }
    }

    if (normalizedMessage.includes(normalizeText("tư vấn thêm")) || normalizedMessage.includes(normalizeText("tiếp tục"))) {
        if (context.state === "building_pc" && context.lastProductSuggestions.length > 0) {
            let summary = "Lần trước bạn đang xây dựng một bộ PC với các linh kiện sau:\n";
            context.lastProductSuggestions.forEach(p => {
                summary += `- ${p.name} (${p.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })})\n`;
            });
            summary += "Bạn muốn tiếp tục chỉnh sửa cấu hình này hay thêm linh kiện nào khác?";
            return {
                success: true,
                answer: summary + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                source: "follow-up"
            };
        } else if (context.state.startsWith("consulting_") && context.category) {
            const categoryDisplay = context.category === "phone" ? "điện thoại" :
                                   context.category === "laptop" ? "laptop" :
                                   context.category === "pc" ? "PC" :
                                   context.category === "monitor" ? "màn hình" :
                                   context.category === "keyboard" ? "bàn phím" :
                                   context.category === "mouse" ? "chuột" :
                                   context.category === "ssd" ? "SSD" :
                                   context.category === "ram" ? "RAM" :
                                   context.category === "mainboard" ? "bo mạch chủ" :
                                   context.category === "cpu" ? "CPU" :
                                   context.category === "psu" ? "nguồn" :
                                   context.category === "mousepad" ? "lót chuột" :
                                   context.category === "headphone" ? "tai nghe" :
                                   context.category === "gaming_gear" ? "gaming gear" : "sản phẩm";
            return {
                success: true,
                answer: `Lần trước bạn hỏi về ${categoryDisplay}${context.brand ? ` của ${context.brand}` : ''}. Bạn muốn tìm thêm sản phẩm với tiêu chí nào (ví dụ: giá rẻ, model, tính năng cụ thể)?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                source: "follow-up"
            };
        } else if (context.state === "modifying_component") {
            return {
                success: true,
                answer: `Bạn đang thay linh kiện ${context.modifyComponent?.toUpperCase()}. Bạn muốn tiếp tục với các gợi ý trước hay tìm linh kiện khác?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                source: "follow-up"
            };
        } else if (context.state === "selected_product") {
            return {
                success: true,
                answer: `Bạn đã chọn "${context.selectedProduct.name}". Bạn muốn thêm sản phẩm này vào giỏ hàng hay tìm sản phẩm khác?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                source: "follow-up"
            };
        } else {
            return {
                success: true,
                answer: "Bạn muốn tôi tư vấn thêm về gì? Hãy cho tôi biết cụ thể (ví dụ: điện thoại Samsung, laptop Asus, hay xây dựng PC) để tôi hỗ trợ nhé!\nVui lòng vào phần sản phẩm để xem chi tiết",
                source: "follow-up"
            };
        }
    }

    return null;
}

// Hàm truy vấn database
async function queryDatabase(message, context) {
    let conn;
    try {
        conn = await pool.getConnection();
        const normalizedMessage = normalizeText(message);
        let query = "";

        // Định nghĩa danh mục sản phẩm
        const productTypes = {
            laptop: { keywords: synonyms.laptop.map(normalizeText), categoryIDs: [45, 46, 47, 48, 49, 50, 51], brands: { acer: 45, asus: 46, dell: 47, gigabyte: 48, lenovo: 49, apple: 50, msi: 51 } },
            pc: { keywords: synonyms.pc.map(normalizeText), categoryIDs: [40, 41], brands: { msi: 40, asus: 41, intel: 40 } },
            case: { keywords: ["case", "vo may tinh"].map(normalizeText), categoryIDs: [17], brands: { xigmatek: 17 } },
            phone: { keywords: [...synonyms.phone.map(normalizeText), ...synonyms.iphone.map(normalizeText), ...synonyms.samsung.map(normalizeText), ...synonyms.xiaomi.map(normalizeText)], categoryIDs: [52, 53, 54], brands: { apple: 52, samsung: 53, xiaomi: 54 } },
            monitor: { keywords: ["man hinh", "monitor"].map(normalizeText), categoryIDs: [36, 37, 38, 39], brands: { asus: 36, acer: 37, lg: 38, msi: 39 } },
            keyboard: { keywords: ["ban phim", "keyboard"].map(normalizeText), categoryIDs: [1, 2, 3, 4, 5], brands: { daeru: 1, aula: 2, rapoo: 3, asus: 4, logitech: 5 } },
            mouse: { keywords: ["chuot", "mouse"].map(normalizeText), categoryIDs: [6, 7, 8, 9, 10], brands: { daeru: 6, msi: 7, logitech: 8, rapoo: 9, razer: 10 } },
            ssd: { keywords: ["ssd"].map(normalizeText), categoryIDs: [27, 28, 29], brands: { kingston: 27, samsung: 28, wd: 29 } },
            ram: { keywords: ["ram", "memory"].map(normalizeText), categoryIDs: [30, 31, 32], brands: { kingston: 30, corsair: 31, pny: 32 } },
            mainboard: { keywords: ["mainboard", "bo mach chu"].map(normalizeText), categoryIDs: [20, 21, 22], brands: { asus: 20, gigabyte: 21, msi: 22 } },
            cpu: { keywords: ["cpu", "processor"].map(normalizeText), categoryIDs: [18, 19], brands: { amd: 18, intel: 19 } },
            psu: { keywords: ["psu", "nguon"].map(normalizeText), categoryIDs: [23, 24, 25, 26], brands: { asus: 23, corsair: 24, deepcool: 25, msi: 26 } },
            mousepad: { keywords: ["mousepad", "lot chuot"].map(normalizeText), categoryIDs: [11, 12, 13], brands: { daeru: 11, asus: 12, razer: 13 } },
            headphone: { keywords: ["headphone", "tai nghe"].map(normalizeText), categoryIDs: [42, 43], brands: { asus: 42, razer: 43 } },
            gaming_gear: { keywords: ["gaming gear", "tay cam"].map(normalizeText), categoryIDs: [14, 15, 16], brands: { sony: 14, lenovo: 15, daeru: 16 } },
        };

        // Xử lý khi người dùng chọn một sản phẩm cụ thể từ danh sách gợi ý
        if (context.category === "build" && context.modifyComponent && context.selectedProduct && context.lastProductSuggestions.length > 0) {
            const componentToReplace = context.modifyComponent.toLowerCase();
            const currentBuild = context.lastProductSuggestions;
            const componentType = productTypes[componentToReplace];

            if (!componentType) {
                return {
                    success: true,
                    answer: `Xin lỗi, tôi không nhận diện được linh kiện "${componentToReplace}". Bạn có thể chỉ rõ linh kiện cần thay (ví dụ: RAM, CPU, SSD)?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                    source: "default",
                };
            }

            const newComponent = context.selectedProduct;
            const categoryName = await getCategoryName(newComponent.categoryID);

            // Cập nhật cấu hình
            const updatedBuild = currentBuild.filter(item => item.category !== componentToReplace);
            updatedBuild.push({
                id: newComponent.id,
                name: newComponent.name,
                description: newComponent.description,
                price: parseFloat(newComponent.price),
                stockQuantity: newComponent.stockQuantity,
                image: newComponent.image,
                category: componentToReplace,
                categoryID: newComponent.categoryID,
            });

            // Tính tổng giá mới
            let totalPrice = updatedBuild.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

            // Tạo phản hồi với cấu hình cập nhật
            let answer = `<h2 style="color: red;">Cấu hình PC đã cập nhật (${context.purpose === "gaming" ? "tối ưu cho chơi game" : context.purpose === "coding" ? "phù hợp cho học code" : context.purpose === "work" ? "cho làm việc" : "cơ bản"})</h2>\n\n`;
            answer += `Vâng, bạn đã chọn thay ${componentToReplace.toUpperCase()} bằng sản phẩm sau:\n`;
            answer += `- <strong>Tên sản phẩm</strong>: ${newComponent.name}\n- <strong>Mô tả</strong>: ${newComponent.description}\n- <strong>Giá</strong>: ${newComponent.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}\n- <strong>Số lượng</strong>: ${newComponent.stockQuantity} sản phẩm\n- <strong>Danh mục</strong>: ${categoryName}\n\n`;

            // Hiển thị toàn bộ cấu hình
            const buildComponents = [
                { type: "case", display: "Vỏ máy tính" },
                { type: "psu", display: "Nguồn máy tính" },
                { type: "mainboard", display: "Bo mạch chủ" },
                { type: "cpu", display: "CPU" },
                { type: "ram", display: "RAM" },
                { type: "ssd", display: "Ổ SSD" },
                { type: "monitor", display: "Màn hình" },
                { type: "keyboard", display: "Bàn phím" },
                { type: "mouse", display: "Chuột" },
                { type: "mousepad", display: "Lót chuột" },
                { type: "headphone", display: "Tai nghe" },
            ];

            for (const component of buildComponents) {
                const product = updatedBuild.find(item => item.category === component.type);
                if (product) {
                    const categoryName = await getCategoryName(product.categoryID || componentType.categoryIDs[0]);
                    answer += `<h3 style="color: red;">${component.display}</h3>\n- <strong>Tên sản phẩm</strong>: ${product.name}\n- <strong>Mô tả</strong>: ${product.description}\n- <strong>Giá</strong>: ${product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}\n- <strong>Số lượng</strong>: ${product.stockQuantity} sản phẩm\n- <strong>Danh mục</strong>: ${categoryName}\n\n`;
                }
            }

            // Kiểm tra tương thích
            const updatedMainboard = updatedBuild.find(item => item.category === "mainboard");
            const updatedRam = updatedBuild.find(item => item.category === "ram");
            const updatedCpu = updatedBuild.find(item => item.category === "cpu");
            if (updatedMainboard && updatedRam) {
                if (updatedMainboard.description.includes("DDR4") && !updatedRam.description.includes("DDR4")) {
                    answer += `<strong style="color: red;">Cảnh báo</strong>: RAM không tương thích với bo mạch chủ (yêu cầu DDR4). Bạn có muốn tôi tìm RAM khác?`;
                    return {
                        success: true,
                        answer: answer.trim() + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                        source: "database",
                        data: updatedBuild,
                    };
                } else if (updatedMainboard.description.includes("DDR5") && !updatedRam.description.includes("DDR5")) {
                    answer += `<strong style="color: red;">Cảnh báo</strong>: RAM không tương thích với bo mạch chủ (yêu cầu DDR5). Bạn có muốn tôi tìm RAM khác?`;
                    return {
                        success: true,
                        answer: answer.trim() + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                        source: "database",
                        data: updatedBuild,
                    };
                }
            }
            if (updatedMainboard && updatedCpu) {
                if (updatedCpu.description.toLowerCase().includes("amd") && updatedMainboard.description.toLowerCase().includes("intel")) {
                    answer += `<strong style="color: red;">Cảnh báo</strong>: Bo mạch chủ không tương thích với CPU (CPU AMD yêu cầu chipset AMD). Bạn có muốn tôi tìm bo mạch chủ khác?`;
                    return {
                        success: true,
                        answer: answer.trim() + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                        source: "database",
                        data: updatedBuild,
                    };
                } else if (updatedCpu.description.toLowerCase().includes("intel") && updatedMainboard.description.toLowerCase().includes("amd")) {
                    answer += `<strong style="color: red;">Cảnh báo</strong>: Bo mạch chủ không tương thích với CPU (CPU Intel yêu cầu chipset Intel). Bạn có muốn tôi tìm bo mạch chủ khác?`;
                    return {
                        success: true,
                        answer: answer.trim() + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                        source: "database",
                        data: updatedBuild,
                    };
                }
            }

            answer += `<h2 style="color: red;">Tổng giá ước tính: ${totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h2>\n\n`;
            answer += `<strong>Lưu ý</strong>: Đây là cấu hình ${
                context.purpose === "gaming" ? "tối ưu cho chơi game" : context.purpose === "coding" ? "phù hợp cho học code" : context.purpose === "work" ? "cho làm việc" : "cơ bản"
            }. Nếu bạn cần điều chỉnh, vui lòng cho tôi biết!`;

            context.lastProductSuggestions = updatedBuild;
            context.selectedProduct = null; // Reset sau khi xử lý
            context.state = "building_pc"; // Quay lại trạng thái xây dựng PC

            return {
                success: true,
                answer: answer.trim() + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                source: "database",
                data: updatedBuild,
            };
        }

        // Xử lý yêu cầu thay đổi linh kiện (đề xuất danh sách)
        if (context.category === "build" && context.modifyComponent && context.lastProductSuggestions.length > 0) {
            const componentToReplace = context.modifyComponent.toLowerCase();
            const currentBuild = context.lastProductSuggestions;
            const componentType = productTypes[componentToReplace];

            if (!componentType) {
                return {
                    success: true,
                    answer: `Xin lỗi, tôi không nhận diện được linh kiện "${componentToReplace}". Bạn có thể chỉ rõ linh kiện cần thay (ví dụ: RAM, CPU, SSD)?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                    source: "default",
                };
            }

            // Lấy thông tin bo mạch chủ và CPU để kiểm tra tương thích
            const mainboard = currentBuild.find(item => item.category === "mainboard");
            const cpu = currentBuild.find(item => item.category === "cpu");
            let cpuBrand = cpu?.description.toLowerCase().includes("intel") ? "intel" : cpu?.description.toLowerCase().includes("amd") ? "amd" : null;

            // Truy vấn danh sách linh kiện thay thế
            query = `SELECT * FROM Products WHERE categoryID IN (${componentType.categoryIDs.join(",")}) AND stockQuantity > 0`;

            // Kiểm tra tương thích
            if (componentToReplace === "ram" && mainboard) {
                if (mainboard.description.includes("DDR4")) {
                    query += " AND description LIKE '%DDR4%'";
                } else if (mainboard.description.includes("DDR5")) {
                    query += " AND description LIKE '%DDR5%'";
                } else {
                    return {
                        success: true,
                        answer: `Không thể thay RAM vì thông tin bo mạch chủ không rõ loại RAM hỗ trợ (DDR4 hay DDR5). Bạn có muốn tôi kiểm tra lại cấu hình?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                        source: "database",
                    };
                }
            } else if (componentToReplace === "cpu" && mainboard) {
                query += mainboard.description.toLowerCase().includes("intel") ? " AND categoryID = 19" : mainboard.description.toLowerCase().includes("amd") ? " AND categoryID = 18" : "";
            } else if (componentToReplace === "mainboard" && cpuBrand) {
                query += cpuBrand === "intel" ? " AND description LIKE '%Intel%'" : " AND description LIKE '%AMD%'";
            } else if (componentToReplace === "ssd") {
                query += mainboard && mainboard.description.includes("NVMe") ? " AND description LIKE '%NVMe%'" : " AND description LIKE '%SATA%'";
            }

            // Lọc theo thương hiệu nếu có
            if (context.brand && componentType.brands[context.brand]) {
                query += ` AND categoryID = ${componentType.brands[context.brand]}`;
            }

            // Lọc theo giá
            if (context.priceRange.min !== null) {
                query += ` AND price >= ${context.priceRange.min}`;
            }
            if (context.priceRange.max !== null) {
                query += ` AND price <= ${context.priceRange.max}`;
            }

            // Tránh chọn lại linh kiện cũ
            const oldComponent = currentBuild.find(item => item.category === componentToReplace);
            if (oldComponent) {
                query += ` AND productID != ${oldComponent.id}`;
            }

            // Sắp xếp theo giá
            query += context.purpose === "gaming" ? " ORDER BY price DESC" : " ORDER BY price ASC";
            query += " LIMIT 3";

            console.log(`Query for replacing ${componentToReplace}: ${query}`);
            const [products] = await conn.query(query);
            console.log(`Result for ${componentToReplace}: ${JSON.stringify(products)}`);

            if (!products || products.length === 0) {
                return {
                    success: true,
                    answer: `Xin lỗi, không tìm thấy ${componentToReplace} phù hợp để thay thế. Bạn có muốn tôi tìm kiếm với tiêu chí khác (ví dụ: thương hiệu hoặc giá)?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                    source: "database",
                };
            }

            let answer = `<h3 style="color: red;">Đề xuất sản phẩm thay thế cho ${componentToReplace.toUpperCase()}</h3>\n`;
            const data = [];

            for (const product of products) {
                const categoryName = await getCategoryName(product.categoryID);
                answer += `- <strong>Tên sản phẩm</strong>: ${product.productName}\n- <strong>Mô tả</strong>: ${product.description}\n- <strong>Giá</strong>: ${product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}\n- <strong>Số lượng</strong>: ${product.stockQuantity} sản phẩm\n- <strong>Danh mục</strong>: ${categoryName}\n\n`;
                data.push({
                    id: product.productID,
                    name: product.productName,
                    description: product.description,
                    price: parseFloat(product.price),
                    stockQuantity: product.stockQuantity,
                    image: product.image,
                    category: componentToReplace,
                    categoryID: product.categoryID,
                });
            }

            answer += `Vui lòng chọn một sản phẩm từ danh sách trên (ví dụ: "Tôi muốn Kingston Fury Beast") hoặc yêu cầu tôi tìm thêm sản phẩm khác.`;

            context.lastProductSuggestions = data;
            context.state = "awaiting_component_selection";

            return {
                success: true,
                answer: answer.trim() + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                source: "database",
                data,
            };
        }

        // Xử lý yêu cầu build PC
        if (context.category === "build" && context.state === "building_pc") {
            const buildComponents = [
                { type: "case", categoryIDs: [17], display: "Vỏ máy tính", required: true },
                { type: "psu", categoryIDs: [23, 24, 25, 26], display: "Nguồn máy tính", required: true },
                { type: "mainboard", categoryIDs: [20, 21, 22], display: "Bo mạch chủ", required: true },
                { type: "cpu", categoryIDs: [18, 19], display: "CPU", required: true },
                { type: "ram", categoryIDs: [30, 31, 32], display: "RAM", required: true },
                { type: "ssd", categoryIDs: [27, 28, 29], display: "Ổ SSD", required: true },
                { type: "monitor", categoryIDs: [36, 37, 38, 39], display: "Màn hình", required: false },
                { type: "keyboard", categoryIDs: [1, 2, 3, 4, 5], display: "Bàn phím", required: false },
                { type: "mouse", categoryIDs: [6, 7, 8, 9, 10], display: "Chuột", required: false },
                { type: "mousepad", categoryIDs: [11, 12, 13], display: "Lót chuột", required: false },
                { type: "headphone", categoryIDs: [42, 43], display: "Tai nghe", required: false },
            ];

            let answer = `<h2 style="color: red;">${
                context.purpose === "gaming"
                    ? "Cấu hình PC tối ưu cho chơi game"
                    : context.purpose === "coding"
                    ? "Cấu hình PC phù hợp cho học code"
                    : context.purpose === "work"
                    ? "Cấu hình PC cho làm việc"
                    : "Cấu hình PC cơ bản"
            }</h2>\n\n`;
            let data = [];
            let missingComponents = [];
            let totalPrice = 0;
            let cpuBrand = null;
            let mainboard = null;

            for (const component of buildComponents) {
                query = `SELECT * FROM Products WHERE categoryID IN (${component.categoryIDs.join(",")}) AND stockQuantity > 0`;

                // Lọc theo mục đích
                if (context.purpose === "gaming") {
                    if (component.type === "cpu") {
                        query += " AND (description LIKE '%Core i7%' OR description LIKE '%Ryzen 7%')";
                    } else if (component.type === "ram") {
                        query += " AND description LIKE '%hiệu suất cao%'";
                    } else if (component.type === "monitor") {
                        query += " AND (description LIKE '%144Hz%' OR description LIKE '%165Hz%')";
                    }
                } else if (context.purpose === "coding") {
                    if (component.type === "cpu") {
                        query += " AND (description LIKE '%Core i9-14900K%' OR description LIKE '%Ryzen 9%')";
                    } else if (component.type === "ram") {
                        query += " AND description LIKE '%hiệu suất cao%' OR description LIKE '%đèn LED RGB%')";
                    } else if (component.type === "monitor") {
                        query += " AND (description LIKE '%75Hz%' OR description LIKE '%60Hz%')";
                    }
                } else if (context.purpose === "work") {
                    if (component.type === "cpu") {
                        query += " AND (description LIKE '%Core i5%' OR description LIKE '%Ryzen 5%')";
                    } else if (component.type === "ram") {
                        query += " AND description LIKE '%Performance DDR4%'";
                    } else if (component.type === "monitor") {
                        query += " AND (description LIKE '%60Hz%' OR description LIKE '%75Hz%')";
                    }
                } else {
                    if (component.type === "cpu") {
                        query += " AND (description LIKE '%Core i5%' OR description LIKE '%Ryzen 5%')";
                    } else if (component.type === "ram") {
                        query += " AND description LIKE '%Performance%'";
                    } else if (component.type === "monitor") {
                        query += " AND description LIKE '%60Hz%'";
                    }
                }

                // Kiểm tra tương thích CPU và mainboard
                if (component.type === "cpu") {
                    if (context.brand === "intel" || normalizedMessage.includes(normalizeText("intel"))) {
                        query += " AND categoryID = 19";
                        cpuBrand = "intel";
                    } else {
                        query += " AND categoryID = 18";
                        cpuBrand = "amd";
                    }
                } else if (component.type === "mainboard" && cpuBrand) {
                    query += cpuBrand === "intel" ? " AND description LIKE '%Intel%'" : " AND description LIKE '%AMD%'";
                }

                // Lọc theo thương hiệu
                if (context.brand && productTypes[component.type]?.brands[context.brand]) {
                    const brandCategoryID = productTypes[component.type].brands[context.brand];
                    query += ` AND categoryID = ${brandCategoryID}`;
                }

                // Lọc theo giá
                if (context.priceRange.min !== null) {
                    query += ` AND price >= ${context.priceRange.min}`;
                }
                if (context.priceRange.max !== null) {
                    query += ` AND price <= ${context.priceRange.max}`;
                }

                // Sắp xếp ưu tiên
                query += context.purpose === "gaming" ? " ORDER BY price DESC" : " ORDER BY price ASC";
                query += " LIMIT 1";

                console.log(`Query for ${component.type}: ${query}`);
                const [products] = await conn.query(query);
                console.log(`Result for ${component.type}: ${JSON.stringify(products)}`);

                if (products && products.length > 0) {
                    const product = products[0];
                    if (!component.categoryIDs.includes(product.categoryID)) {
                        console.warn(`Sản phẩm ${product.productName} không thuộc danh mục ${component.type}`);
                        if (component.required) {
                            missingComponents.push(component.display);
                        }
                        continue;
                    }
                    const categoryName = await getCategoryName(product.categoryID);
                    answer += `<h3 style="color: red;">${component.display}</h3>\n- <strong>Tên sản phẩm</strong>: ${product.productName}\n- <strong>Mô tả</strong>: ${product.description}\n- <strong>Giá</strong>: ${product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}\n- <strong>Số lượng</strong>: ${product.stockQuantity} sản phẩm\n- <strong>Danh mục</strong>: ${categoryName}\n\n`;
                    data.push({
                        id: product.productID,
                        name: product.productName,
                        description: product.description,
                        price: parseFloat(product.price),
                        stockQuantity: product.stockQuantity,
                        image: product.image,
                        category: component.type,
                        categoryID: product.categoryID,
                    });
                    totalPrice += parseFloat(product.price) || 0;

                    if (component.type === "mainboard") {
                        mainboard = product;
                    } else if (component.type === "cpu") {
                        cpuBrand = product.description.includes("Intel") ? "intel" : product.description.includes("AMD") ? "amd" : cpuBrand;
                    }
                } else if (component.required) {
                    missingComponents.push(component.display);
                    console.warn(`Không tìm thấy sản phẩm cho ${component.display}`);
                }
            }

            if (missingComponents.length > 0) {
                answer += `<h3 style="color: red;">Thông báo</h3>\nXin lỗi, tôi không thể xây dựng bộ PC hoàn chỉnh do thiếu các linh kiện sau: ${missingComponents.join(", ")}. Bạn có muốn tôi đề xuất cấu hình thay thế không?\n`;
                return {
                    success: true,
                    answer: answer.trim() + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                    source: "database",
                    data,
                };
            }

            answer += `<h2 style="color: red;">Tổng giá ước tính: ${totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h2>\n\n`;
            answer += `<strong>Lưu ý</strong>: Đây là cấu hình ${
                context.purpose === "gaming" ? "tối ưu cho chơi game" : context.purpose === "coding" ? "phù hợp cho học code" : context.purpose === "work" ? "cho làm việc" : "cơ bản"
            }. Nếu bạn cần điều chỉnh, vui lòng cho tôi biết!`;

            context.lastProductSuggestions = data;

            return {
                success: true,
                answer: answer.trim() + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                source: "database",
                data,
            };
        }

        // Xử lý truy vấn thông thường
        let productType = null;
        let categoryIDs = [];
        for (const [type, info] of Object.entries(productTypes)) {
            if (info.keywords.some(keyword => normalizedMessage.includes(keyword)) || context.category === type) {
                productType = type;
                categoryIDs = info.categoryIDs;
                break;
            }
        }

        if (productType) {
            // Xử lý model cụ thể cho điện thoại hoặc laptop
            if ((productType === "phone" || productType === "laptop") && context.model && context.brand) {
                query = `SELECT * FROM Products WHERE categoryID = ${productTypes[productType].brands[context.brand]} AND stockQuantity > 0 AND productName LIKE '%${context.model}%'`;

                // Lọc theo giá
                if (context.priceRange.min !== null) {
                    query += ` AND price >= ${context.priceRange.min}`;
                }
                if (context.priceRange.max !== null) {
                    query += ` AND price <= ${context.priceRange.max}`;
                }

                query += " ORDER BY price ASC LIMIT 1";

                console.log(`Query for ${productType} model ${context.model}: ${query}`);
                const [products] = await conn.query(query);
                console.log(`Result for ${context.model}: ${JSON.stringify(products)}`);

                if (products && products.length > 0) {
                    let answer = `<h3 style="color: red;">Sản phẩm bạn chọn</h3>\n`;
                    const data = [];

                    const product = products[0];
                    const categoryName = await getCategoryName(product.categoryID);
                    answer += `- <strong>Tên sản phẩm</strong>: ${product.productName}\n- <strong>Mô tả</strong>: ${product.description}\n- <strong>Giá</strong>: ${product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}\n- <strong>Số lượng</strong>: ${product.stockQuantity} sản phẩm\n- <strong>Danh mục</strong>: ${categoryName}\n\n`;
                    data.push({
                        id: product.productID,
                        name: product.productName,
                        description: product.description,
                        price: parseFloat(product.price),
                        stockQuantity: product.stockQuantity,
                        image: product.image,
                        category: productType,
                        categoryID: product.categoryID,
                    });

                    context.lastProductSuggestions = data;
                    context.selectedProduct = data[0];
                    context.state = "selected_product";

                    return {
                        success: true,
                        answer: answer.trim() + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                        source: "database",
                        data,
                    };
                } else {
                    return {
                        success: true,
                        answer: `Xin lỗi, hiện tại không có ${context.model} của ${context.brand} trong kho. Bạn muốn tôi tìm model ${productType === "phone" ? "điện thoại" : "laptop"} khác của ${context.brand} hay các thương hiệu khác không?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                        source: "database",
                    };
                }
            }

            query = `SELECT * FROM Products WHERE categoryID IN (${categoryIDs.join(",")}) AND stockQuantity > 0`;

            // Lọc theo thương hiệu nếu có
            if (context.brand && productTypes[productType]?.brands[context.brand]) {
                query = `SELECT * FROM Products WHERE categoryID = ${productTypes[productType].brands[context.brand]} AND stockQuantity > 0`;
            }

            // Lọc theo giá
            if (context.priceRange.min !== null) {
                query += ` AND price >= ${context.priceRange.min}`;
            }
            if (context.priceRange.max !== null) {
                query += ` AND price <= ${context.priceRange.max}`;
            }

            query += normalizedMessage.includes(normalizeText("giá rẻ")) ? " ORDER BY price ASC" : " ORDER BY price ASC";
            query += " LIMIT 3";

            console.log(`Query for ${productType}: ${query}`);
            const [products] = await conn.query(query);
            console.log(`Result for ${productType}: ${JSON.stringify(products)}`);

            if (products && products.length > 0) {
                let answer = `<h3 style="color: red;">Đề xuất ${productType === "phone" ? "điện thoại" : "laptop"}${context.brand ? ` của ${context.brand}` : ''}</h3>\n`;
                const data = [];

                for (const product of products) {
                    const categoryName = await getCategoryName(product.categoryID);
                    answer += `- <strong>Tên sản phẩm</strong>: ${product.productName}\n- <strong>Mô tả</strong>: ${product.description}\n- <strong>Giá</strong>: ${product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}\n- <strong>Số lượng</strong>: ${product.stockQuantity} sản phẩm\n- <strong>Danh mục</strong>: ${categoryName}\n\n`;
                    data.push({
                        id: product.productID,
                        name: product.productName,
                        description: product.description,
                        price: parseFloat(product.price),
                        stockQuantity: product.stockQuantity,
                        image: product.image,
                        category: productType,
                        categoryID: product.categoryID,
                    });
                }

                if (products.length < 3) {
                    answer += `<strong>Lưu ý</strong>: Chỉ tìm thấy ${products.length} sản phẩm phù hợp. Bạn có muốn tôi mở rộng tiêu chí tìm kiếm không?\n`;
                }

                context.lastProductSuggestions = data;

                return {
                    success: true,
                    answer: answer.trim() + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                    source: "database",
                    data,
                };
            } else if (context.brand && productTypes[productType]?.brands[context.brand]) {
                return {
                    success: true,
                    answer: `Xin lỗi, hiện tại cửa hàng không có ${productType === "phone" ? "điện thoại" : "laptop"} của ${context.brand} trong kho. Bạn có muốn tôi đề xuất các ${productType === "phone" ? "điện thoại" : "laptop"} của thương hiệu khác không?\nVui lòng vào phần sản phẩm để xem chi tiết`,
                    source: "database",
                };
            }
        }

        return null;
    } catch (error) {
        console.error("Lỗi truy vấn database:", error);
        return null;
    } finally {
        if (conn) conn.release();
    }
}

// Route chính
router.post("/", async (req, res) => {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== "string" || !sessionId) {
        return res.status(400).json({
            success: false,
            message: "Vui lòng cung cấp câu hỏi và sessionId hợp lệ.",
        });
    }

    try {
        // Xóa các ngữ cảnh hết hạn
        clearExpiredContexts();

        // Lấy hoặc tạo ngữ cảnh cho sessionId
        let conversationContext = contextStore.get(sessionId);
        if (!conversationContext) {
            conversationContext = JSON.parse(JSON.stringify(defaultContext));
            contextStore.set(sessionId, conversationContext);
        }

        // Chuẩn hóa tin nhắn
        const normalizedMessage = normalizeText(message);
        conversationContext.history.push(normalizedMessage);
        if (conversationContext.history.length > 5) {
            conversationContext.history.shift();
        }

        analyzeContext(normalizedMessage, conversationContext);

        // Xử lý câu hỏi tiếp theo
        const followUpResponse = handleFollowUpQuestions(normalizedMessage, conversationContext);
        if (followUpResponse && followUpResponse.retryBuild) {
            const dbResponse = await queryDatabase(normalizedMessage, conversationContext);
            if (dbResponse) {
                conversationContext.lastProductSuggestions = dbResponse.data || [];
                contextStore.set(sessionId, conversationContext);
                return res.json(dbResponse);
            }
        } else if (followUpResponse) {
            contextStore.set(sessionId, conversationContext);
            return res.json(followUpResponse);
        }

        // Kiểm tra câu trả lời fallback
        const fallbackAnswers = {
            chao: "Xin chào! Tôi là trợ lý ảo của cửa hàng. Tôi có thể giúp gì cho bạn?",
            build: "Bạn muốn xây dựng một bộ PC? Hãy cho tôi biết thêm yêu cầu cụ thể (ví dụ: chơi game, học code, làm việc) để tôi tư vấn chi tiết!",
        };
        for (const [keyword, answer] of Object.entries(fallbackAnswers)) {
            if (normalizedMessage.includes(normalizeText(keyword))) {
                contextStore.set(sessionId, conversationContext);
                return res.json({
                    success: true,
                    answer: answer + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                    source: "fallback",
                });
            }
        }

        // Truy vấn database
        const dbResponse = await queryDatabase(normalizedMessage, conversationContext);
        if (dbResponse) {
            contextStore.set(sessionId, conversationContext);
            return res.json(dbResponse);
        }

        // Vector hóa
        const [products] = await pool.query(
            "SELECT productID, productName, description, price, image, stockQuantity, categoryID FROM Products WHERE stockQuantity > 0"
        );
        const questionEmbedding = await getEmbedding(normalizedMessage);
        let bestMatches = [];
        const threshold = 0.5; // Giảm ngưỡng để tăng khả năng khớp

        for (const product of products) {
            const productText = normalizeText(`${product.productName} ${product.description}`);
            const productEmbedding = await getEmbedding(productText);
            let score = cosineSimilarity(questionEmbedding, productEmbedding);
            
            // Tăng điểm nếu sản phẩm thuộc thương hiệu được yêu cầu
            if (context.brand && productTypes[context.category]?.brands[context.brand] === product.categoryID) {
                score += 0.2; // Ưu tiên sản phẩm của thương hiệu
            }
            
            if (score > threshold) {
                bestMatches.push({ product, score });
            }
        }

        bestMatches.sort((a, b) => b.score - a.score);
        bestMatches = bestMatches.slice(0, 3);

        if (bestMatches.length > 0) {
            const bestMatch = bestMatches[0].product;
            conversationContext.lastProductSuggestions = bestMatches.map(match => ({
                id: match.product.productID,
                name: match.product.productName,
                description: match.product.description,
                price: parseFloat(match.product.price),
                stockQuantity: match.product.stockQuantity,
                image: match.product.image,
                category: match.product.category,
                categoryID: match.product.categoryID,
            }));
            const categoryName = await getCategoryName(bestMatch.categoryID);
            let answer = `<h3 style="color: red;">Đề xuất sản phẩm</h3>\n- <strong>Tên sản phẩm</strong>: ${bestMatch.productName}\n- <strong>Mô tả</strong>: ${bestMatch.description}\n- <strong>Giá</strong>: ${bestMatch.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}\n- <strong>Số lượng</strong>: ${bestMatch.stockQuantity} sản phẩm`;
            if (bestMatches.length > 1) {
                answer += `\n\n<h4 style="color: red;">Sản phẩm tương tự</h4>\n` + bestMatches.slice(1).map(m => `- ${m.product.productName} (${m.product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })})`).join("\n");
            }
            contextStore.set(sessionId, conversationContext);
            return res.json({
                success: true,
                answer: answer + "\nVui lòng vào phần sản phẩm để xem chi tiết",
                source: "vector",
                data: bestMatches.map(match => ({
                    id: match.product.productID,
                    name: match.product.productName,
                    description: match.product.description,
                    price: parseFloat(match.product.price),
                    stockQuantity: match.product.stockQuantity,
                    image: match.product.image,
                    category: categoryName,
                    categoryID: match.product.categoryID,
                })),
            });
        }

        contextStore.set(sessionId, conversationContext);
        return res.json({
            success: true,
            answer: "Xin lỗi, tôi không tìm thấy sản phẩm phù hợp. Vui lòng cung cấp thêm chi tiết hoặc liên hệ hotline 1900-xxxx.\nVui lòng vào phần sản phẩm để xem chi tiết",
            source: "default",
        });
    } catch (error) {
        console.error("Lỗi khi xử lý yêu cầu chat:", error);
        res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.",
        });
    }
});

module.exports = router;