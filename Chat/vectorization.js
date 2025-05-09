const { getProducts, getCustomers } = require('./database');

// Khởi tạo vector database trong bộ nhớ
let vectorDB = [];

// Tạo vector embedding đơn giản dựa trên nội dung văn bản
function createSimpleEmbedding(text) {
  try {
    // Tạo vector ngẫu nhiên với độ dài 512 (để mô phỏng embedding)
    // Lưu ý: Đây là cách đơn giản, bạn có thể thay bằng thư viện như sentence-transformers
    const vectorLength = 512;
    const embedding = Array(vectorLength).fill(0).map(() => Math.random() * 2 - 1);
    
    // Chuẩn hóa vector
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    return embedding.map(val => val / magnitude);
  } catch (error) {
    console.error('Lỗi khi tạo embedding:', error);
    return Array(512).fill(0).map(() => Math.random() * 2 - 1);
  }
}

// Tính độ tương đồng cosine giữa hai vector
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB)) || 0;
}

// Khởi tạo vector database từ dữ liệu products và customers
async function initVectorDB() {
  try {
    // Lấy dữ liệu từ MariaDB
    const products = await getProducts();
    const customers = await getCustomers();
    
    // Thêm thông tin sản phẩm vào vector database
    for (const product of products) {
      const content = `Sản phẩm: ${product.productName}\nMô tả: ${product.description}\nGiá: ${product.price}\nSố lượng: ${product.stockQuantity}`;
      
      const embedding = createSimpleEmbedding(content);
      
      // Lưu vào vector database
      vectorDB.push({
        id: product.productID,
        type: 'product',
        name: product.productName,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity,
        embedding: embedding
      });
    }
    
    // Thêm thông tin khách hàng vào vector database (nếu cần)
    for (const customer of customers) {
      const content = `Khách hàng: ${customer.fullName}\nEmail: ${customer.email}\nSố điện thoại: ${customer.phoneNumber}\nĐịa chỉ: ${customer.address}`;
      
      const embedding = createSimpleEmbedding(content);
      
      // Lưu vào vector database
      vectorDB.push({
        id: customer.customerID,
        type: 'customer',
        name: customer.fullName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
        embedding: embedding
      });
    }
    
    console.log(`Đã khởi tạo vector database với ${vectorDB.length} mục (${products.length} sản phẩm, ${customers.length} khách hàng)`);
  } catch (error) {
    console.error('Lỗi khi khởi tạo vector database:', error);
    throw error;
  }
}

// Tìm kiếm thông tin dựa trên vector similarity
async function findSimilarResponse(query, threshold = 0.65, limit = 5) {
  try {
    console.log(`Đang tìm kiếm với query: "${query}" (threshold: ${threshold})`);
    
    // Kiểm tra nếu vectorDB trống
    if (vectorDB.length === 0) {
      console.warn('Vector database trống, đang thử khởi tạo lại...');
      await initVectorDB();
      
      if (vectorDB.length === 0) {
        console.error('Không thể khởi tạo vector database!');
        return {
          success: false,
          message: "Xin lỗi, hệ thống đang gặp sự cố khi truy xuất dữ liệu."
        };
      }
    }
    
    // Tạo vector embedding cho câu hỏi
    const queryEmbedding = createSimpleEmbedding(query);
    
    // Tìm kiếm nhiều document có độ tương đồng cao
    let matches = [];
    
    for (const item of vectorDB) {
      const similarity = cosineSimilarity(queryEmbedding, item.embedding);
      
      console.log(`Item: ${item.name}, Similarity: ${similarity.toFixed(4)}`);
      
      // Nếu độ tương đồng vượt ngưỡng, thêm vào danh sách kết quả
      if (similarity >= threshold) {
        matches.push({
          ...item,
          similarity: similarity
        });
      }
    }
    
    // Sắp xếp kết quả theo độ tương đồng giảm dần
    matches.sort((a, b) => b.similarity - a.similarity);
    
    // Giới hạn số lượng kết quả trả về
    matches = matches.slice(0, limit);
    
    console.log(`Tìm thấy ${matches.length} kết quả với threshold ${threshold}`);
    
    // Trả về kết quả nếu có ít nhất một kết quả
    if (matches.length > 0) {
      const answerList = matches.map(match => {
        if (match.type === 'product') {
          return `${match.name}: ${match.description}. Giá: ${match.price}đ. Số lượng: ${match.stockQuantity} sản phẩm.`;
        } else if (match.type === 'customer') {
          return `Thông tin khách hàng ${match.name}. Email: ${match.email}. Số điện thoại: ${match.phoneNumber}.`;
        }
      }).join('\n\n');
      
      return {
        success: true,
        answer: `Đây là ${matches.length} kết quả phù hợp nhất:\n\n${answerList}`,
        data: matches,
        similarity: matches[0].similarity
      };
    } else {
      // Nếu không tìm thấy kết quả, thử tìm lại với ngưỡng thấp hơn
      if (threshold > 0.5) {
        console.log(`Không tìm thấy kết quả với threshold ${threshold}, thử lại với threshold 0.5`);
        return findSimilarResponse(query, 0.5, limit);
      }
      
      return {
        success: false,
        message: "Xin lỗi, tôi không tìm thấy thông tin phù hợp với yêu cầu của bạn."
      };
    }
  } catch (error) {
    console.error('Lỗi khi tìm kiếm câu trả lời:', error);
    return {
      success: false,
      message: "Đã xảy ra lỗi khi xử lý yêu cầu của bạn."
    };
  }
}

module.exports = { initVectorDB, findSimilarResponse };