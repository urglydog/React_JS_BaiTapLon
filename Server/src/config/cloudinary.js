import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { pool } from './connectDB.js'; // Import pool từ connectDB.js
import db from "../config/db.js"
const router = express.Router();

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

async function getAllImageFolders() {
  const folderMap = {
    keyboard: 'ReactNew/anh/Computer/BanPhim',
    mouse: 'ReactNew/anh/Computer/Chuot',
    gaming_gear: 'ReactNew/anh/Computer/GamingGear',
    components: 'ReactNew/anh/Computer/LinhKien',
    monitor: 'ReactNew/anh/Computer/Manhinh',
    mousepad: 'ReactNew/anh/Computer/PadChuot',
    pc: 'ReactNew/anh/Computer/PC',
    headphone: 'ReactNew/anh/Computer/Tainghe',
    case: 'ReactNew/anh/Computer/LinhKien/Case',
    cpu: 'ReactNew/anh/Computer/LinhKien/CPU',
    motherboard: 'ReactNew/anh/Computer/LinhKien/Main',
    power_supply: 'ReactNew/anh/Computer/LinhKien/Nguon',
    storage: 'ReactNew/anh/Computer/LinhKien/OCung',
    ram: 'ReactNew/anh/Computer/LinhKien/Ram',
    gpu: 'ReactNew/anh/Computer/LinhKien/VGA',
    laptop: 'ReactNew/anh/Laptop',
    laptop_acer: 'ReactNew/anh/Laptop/Acer',
    laptop_asus: 'ReactNew/anh/Laptop/Asus',
    laptop_dell: 'ReactNew/anh/Laptop/Dell',
    laptop_gigabyte: 'ReactNew/anh/Laptop/Gigabyte',
    laptop_lenovo: 'ReactNew/anh/Laptop/Lenovo',
    laptop_mac: 'ReactNew/anh/Laptop/Mac',
    laptop_msi: 'ReactNew/anh/Laptop/MSI',
    ipad: 'ReactNew/anh/Ipad',
    phone: 'ReactNew/anh/Phone',
    phone_iphone: 'ReactNew/anh/Phone/Iphone',
    phone_samsung: 'ReactNew/anh/Phone/Samsum',
    phone_xiaomi: 'ReactNew/anh/Phone/Xiaomi',
  };

  // Tạo mảng các promise để gọi song song
  const promises = Object.entries(folderMap).map(async ([category, folderPath]) => {
    const images = await getImagesFromFolder(folderPath);
    return [category, images];
  });

  // Chờ tất cả promise hoàn thành và chuyển thành object
  const results = await Promise.all(promises);
  return Object.fromEntries(results);
}

function findMatchingImages(productName, categoryImages) {
  if (!categoryImages || !Array.isArray(categoryImages)) {
    return [];
  }
  
  const cleanProductName = productName
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
    
  const exactMatches = categoryImages.filter(img => {
    const filename = img.filename.toLowerCase();
    return filename === cleanProductName || 
           filename.includes(cleanProductName);
  });
  
  if (exactMatches.length > 0) {
    return exactMatches;
  }
  
  const words = cleanProductName.split(' ');
  const significantWords = words.filter(word => word.length > 3);
  
  return categoryImages.filter(img => {
    const filename = img.filename.toLowerCase();
    return significantWords.some(word => filename.includes(word));
  });
}

function getCategoryFolder(categoryID) {
  const categoryMap = {
    1: 'keyboard', 2: 'keyboard', 3: 'keyboard', 4: 'keyboard', 5: 'keyboard',
    6: 'mouse', 7: 'mouse', 8: 'mouse', 9: 'mouse', 10: 'mouse',
    11: 'mousepad', 12: 'mousepad', 13: 'mousepad',
    14: 'gaming_gear', 15: 'gaming_gear', 16: 'gaming_gear',
    17: 'case',
    18: 'cpu', 19: 'cpu',
    20: 'motherboard', 21: 'motherboard', 22: 'motherboard',
    23: 'power_supply', 24: 'power_supply', 25: 'power_supply', 26: 'power_supply',
    27: 'storage', 28: 'storage', 29: 'storage',
    30: 'ram', 31: 'ram', 32: 'ram',
    33: 'gpu', 34: 'gpu', 35: 'gpu',
    36: 'monitor', 37: 'monitor', 38: 'monitor', 39: 'monitor',
    40: 'pc', 41: 'pc',
    42: 'headphone', 43: 'headphone',
    44: 'ipad',
    45: 'laptop_acer', 46: 'laptop_asus', 47: 'laptop_dell',
    48: 'laptop_gigabyte', 49: 'laptop_lenovo', 50: 'laptop_mac', 51: 'laptop_msi',
    52: 'phone_iphone', 53: 'phone_samsung', 54: 'phone_xiaomi'
  };
  
  return categoryMap[categoryID] || null;
}

async function updateProductImages() {
  let conn;
  try {
    conn = await db.getConnection();
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
    conn = await db.getConnection();
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
        folderPath = `ReactNew/anh/${folderKey}`;
      }
      
      const imageFolder = await getImagesFromFolder(folderPath);
      const matchingImages = findMatchingImages(productData.productName, imageFolder);
      
      if (matchingImages.length > 0) {
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

export default {
  router,
  updateProductImages,
  addProductWithImage,
  getImagesFromFolder,
  getAllImageFolders,
};