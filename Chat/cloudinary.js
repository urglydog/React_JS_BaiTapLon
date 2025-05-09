const express = require('express');
const router = express.Router();
const mariadb = require('mariadb');
const cloudinary = require('cloudinary').v2;

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '22102004',
  database: 'reactproject',
  port: 3309 
});
cloudinary.config({
  cloud_name: 'ddd20pmdb',
  api_key: '926271559999168',
  api_secret: 'V91cJkiGeUG9c2FcgOE1RoL1uX8',
});


async function getImagesFromFolder(folderPath) {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folderPath}`)
      .with_field("tags")
      .max_results(500)
      .execute();
    
    return result.resources.map(img => {
      return {
        url: img.secure_url || `https://res.cloudinary.com/ddd20pmdb/image/upload/${img.public_id}.${img.format}`,
        publicId: img.public_id,
        format: img.format,
        tags: img.tags || [],
        filename: img.public_id.split('/').pop()
      };
    });
  } catch (error) {
    console.error(`Error fetching images from ${folderPath}:`, error);
    return [];
  }
}

// Function to get all image folders and subfolders
async function getAllImageFolders() {
  // Main folders
  const categories = {
    keyboard: await getImagesFromFolder('ReactNew/anh/Computer/BanPhim'),
    mouse: await getImagesFromFolder('ReactNew/anh/Computer/Chuot'),
    gaming_gear: await getImagesFromFolder('ReactNew/anh/Computer/GamingGear'),
    components: await getImagesFromFolder('ReactNew/anh/Computer/LinhKien'),
    monitor: await getImagesFromFolder('ReactNew/anh/Computer/Manhinh'),
    mousepad: await getImagesFromFolder('ReactNew/anh/Computer/PadChuot'),
    pc: await getImagesFromFolder('ReactNew/anh/Computer/PC'),
    headphone: await getImagesFromFolder('ReactNew/anh/Computer/Tainghe'),
    
    // Component subfolders
    case: await getImagesFromFolder('ReactNew/anh/Computer/LinhKien/Case'),
    cpu: await getImagesFromFolder('ReactNew/anh/Computer/LinhKien/CPU'),
    motherboard: await getImagesFromFolder('ReactNew/anh/Computer/LinhKien/Main'),
    power_supply: await getImagesFromFolder('ReactNew/anh/Computer/LinhKien/Nguon'),
    storage: await getImagesFromFolder('ReactNew/anh/Computer/LinhKien/OCung'),
    ram: await getImagesFromFolder('ReactNew/anh/Computer/LinhKien/Ram'),
    gpu: await getImagesFromFolder('ReactNew/anh/Computer/LinhKien/VGA'),
    
    // Laptops
    laptop: await getImagesFromFolder('ReactNew/anh/Laptop'),
    laptop_acer: await getImagesFromFolder('ReactNew/anh/Laptop/Acer'),
    laptop_asus: await getImagesFromFolder('ReactNew/anh/Laptop/Asus'),
    laptop_dell: await getImagesFromFolder('ReactNew/anh/Laptop/Dell'),
    laptop_gigabyte: await getImagesFromFolder('ReactNew/anh/Laptop/Gigabyte'),
    laptop_lenovo: await getImagesFromFolder('ReactNew/anh/Laptop/Lenovo'),
    laptop_mac: await getImagesFromFolder('ReactNew/anh/Laptop/Mac'),
    laptop_msi: await getImagesFromFolder('ReactNew/anh/Laptop/MSI'),
    
    // Other main categories
    ipad: await getImagesFromFolder('ReactNew/anh/Ipad'),
    phone: await getImagesFromFolder('ReactNew/anh/Phone'),
    phone_iphone: await getImagesFromFolder('ReactNew/anh/Phone/Iphone'),
    phone_samsung: await getImagesFromFolder('ReactNew/anh/Phone/Samsung'),
    phone_xiaomi: await getImagesFromFolder('ReactNew/anh/Phone/Xiaomi')
  };
  
  return categories;
}

// Function to find matching images based on product name and category
function findMatchingImages(productName, categoryImages) {
  if (!categoryImages || !Array.isArray(categoryImages)) {
    return [];
  }
  
  // Clean product name for better matching
  const cleanProductName = productName
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
    
  // Try different matching strategies
  const exactMatches = categoryImages.filter(img => {
    const filename = img.filename.toLowerCase();
    return filename === cleanProductName || 
           filename.includes(cleanProductName);
  });
  
  if (exactMatches.length > 0) {
    return exactMatches;
  }
  
  // Try partial matching if no exact matches
  const words = cleanProductName.split(' ');
  const significantWords = words.filter(word => word.length > 3); // Only use words longer than 3 chars
  
  return categoryImages.filter(img => {
    const filename = img.filename.toLowerCase();
    return significantWords.some(word => filename.includes(word));
  });
}

// Function to map category IDs to folder names
function getCategoryFolder(categoryID) {
  const categoryMap = {
    // Bàn phím
    1: 'keyboard', 2: 'keyboard', 3: 'keyboard', 4: 'keyboard', 5: 'keyboard',
    // Chuột
    6: 'mouse', 7: 'mouse', 8: 'mouse', 9: 'mouse', 10: 'mouse',
    // Pad chuột
    11: 'mousepad', 12: 'mousepad', 13: 'mousepad',
    // Gaming Gear
    14: 'gaming_gear', 15: 'gaming_gear', 16: 'gaming_gear',
    // Case
    17: 'case',
    // CPU
    18: 'cpu', 19: 'cpu',
    // Mainboard
    20: 'motherboard', 21: 'motherboard', 22: 'motherboard',
    // Nguồn
    23: 'power_supply', 24: 'power_supply', 25: 'power_supply', 26: 'power_supply',
    // Ổ cứng
    27: 'storage', 28: 'storage', 29: 'storage',
    // RAM
    30: 'ram', 31: 'ram', 32: 'ram',
    // VGA
    33: 'gpu', 34: 'gpu', 35: 'gpu',
    // Màn hình
    36: 'monitor', 37: 'monitor', 38: 'monitor', 39: 'monitor',
    // PC
    40: 'pc', 41: 'pc',
    // Tai nghe
    42: 'headphone', 43: 'headphone',
    // iPad
    44: 'ipad',
    // Laptop
    45: 'laptop_acer', 46: 'laptop_asus', 47: 'laptop_dell',
    48: 'laptop_gigabyte', 49: 'laptop_lenovo', 50: 'laptop_mac', 51: 'laptop_msi',
    // Điện thoại
    52: 'phone_iphone', 53: 'phone_samsung', 54: 'phone_xiaomi'
  };
  
  return categoryMap[categoryID] || null;
}


async function updateProductImages() {
  let conn;
  try {
    conn = await pool.getConnection();
    
  
    const products = await conn.query("SELECT productID, productName, categoryID FROM products");
    

    const allImageFolders = await getAllImageFolders();
    
    console.log(`Found ${products.length} products to process`);
    let updatedCount = 0;
    
 
    for (const product of products) {
    
      const folderKey = getCategoryFolder(product.categoryID);
      
      if (!folderKey || !allImageFolders[folderKey]) {
        console.log(`No matching folder found for product ${product.productID} (${product.productName}) with category ${product.categoryID}`);
        continue;
      }
      

      const matchingImages = findMatchingImages(product.productName, allImageFolders[folderKey]);
      
      if (matchingImages.length > 0) {
    
        await conn.query(
          "UPDATE products SET image = ? WHERE productID = ?",
          [matchingImages[0].url, product.productID]
        );
        updatedCount++;
        console.log(`Updated product ${product.productID} (${product.productName}) with image: ${matchingImages[0].url}`);
      } else {
        console.log(`No matching images found for product ${product.productID} (${product.productName})`);
      }
    }
    
    console.log(`Updated ${updatedCount} out of ${products.length} products with images`);
    return {
      success: true,
      totalProducts: products.length,
      updatedProducts: updatedCount
    };
  } catch (error) {
    console.error("Error updating product images:", error);
    return {
      success: false,
      message: error.message
    };
  } finally {
    if (conn) conn.release();
  }
}


async function addProductWithImage(productData) {
  let conn;
  try {
    conn = await pool.getConnection();
    

    const result = await conn.query(
      "INSERT INTO products (productName, categoryID, supplierID, description, price, stockQuantity) VALUES (?, ?, ?, ?, ?, ?)",
      [productData.productName, productData.categoryID, productData.supplierID, 
       productData.description, productData.price, productData.stockQuantity]
    );
    
    const productID = result.insertId;

    const folderKey = getCategoryFolder(productData.categoryID);
    if (folderKey) {
      let folderPath;
      if (['laptop_acer', 'laptop_asus', 'laptop_dell', 'laptop_gigabyte', 'laptop_lenovo', 'laptop_mac', 'laptop_msi'].includes(folderKey)) {
     
        const brand = folderKey.split('_')[1];
        folderPath = `ReactNew/anh/Laptop/${brand.charAt(0).toUpperCase() + brand.slice(1)}`;
      } else if (['phone_iphone', 'phone_samsung', 'phone_xiaomi'].includes(folderKey)) {
     
        const brand = folderKey.split('_')[1];
        folderPath = `ReactNew/anh/Phone/${brand.charAt(0).toUpperCase() + brand.slice(1)}`;
      } else if (['keyboard', 'mouse', 'gaming_gear', 'monitor', 'mousepad', 'pc', 'headphone'].includes(folderKey)) {
      
        const folderNames = {
          'keyboard': 'BanPhim',
          'mouse': 'Chuot',
          'gaming_gear': 'GamingGear',
          'monitor': 'Manhinh',
          'mousepad': 'PadChuot',
          'pc': 'PC',
          'headphone': 'Tainghe'
        };
        folderPath = `ReactNew/anh/Computer/${folderNames[folderKey]}`;
      } else if (['case', 'cpu', 'motherboard', 'power_supply', 'storage', 'ram', 'gpu'].includes(folderKey)) {
        // Nếu là linh kiện máy tính
        const folderNames = {
          'case': 'Case',
          'cpu': 'CPU',
          'motherboard': 'Main',
          'power_supply': 'Nguon',
          'storage': 'OCung',
          'ram': 'Ram',
          'gpu': 'VGA'
        };
        folderPath = `ReactNew/anh/Computer/LinhKien/${folderNames[folderKey]}`;
      } else {
        // Các danh mục khác
        folderPath = `ReactNew/anh/${folderKey}`;
      }
      
      const imageFolder = await getImagesFromFolder(folderPath);
      const matchingImages = findMatchingImages(productData.productName, imageFolder);
      
      if (matchingImages.length > 0) {
        // Update the product with the image URL
        await conn.query(
          "UPDATE products SET image = ? WHERE productID = ?",
          [matchingImages[0].url, productID]
        );
        console.log(`Added image to new product ${productID}: ${matchingImages[0].url}`);
      }
    }
    
    return {
      success: true,
      productID: productID,
      message: "Product added successfully"
    };
  } catch (error) {
    console.error("Error adding product with image:", error);
    return {
      success: false,
      message: error.message
    };
  } finally {
    if (conn) conn.release();
  }
}


router.post('/update-product-images', async (req, res) => {
  try {
    const result = await updateProductImages();
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update product images',
      error: error.message
    });
  }
});

// Endpoint to add a new product with image matching
router.post('/add-product', async (req, res) => {
  try {
    const result = await addProductWithImage(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add product',
      error: error.message
    });
  }
});

// Export router and functions
module.exports = { 
  router, 
  updateProductImages, 
  addProductWithImage, 
  getImagesFromFolder,
  getAllImageFolders
};