import { ProductModel } from "../model/BaseModel.js";
import db from "../config/db.js"; // Đảm bảo bạn đã import db từ file config/db.js

// Get all products
const getAllProducts = async () => {
  try {
    const products = await ProductModel.getAll();
    return {
      EC: 1,
      EM: "Lấy danh sách sản phẩm thành công.",
      DT: products,
    };
  } catch (err) {
    console.error("Error in productService: ", err);
    return {
      EC: -1,
      EM: "Lỗi khi lấy danh sách sản phẩm.",
      DT: [],
    };
  }
};

const getAllProductsWithDetails = async () => {
  try {
    const [rows] = await db.query(`
      select *, p2.categoryName, p2.brandName  from products p 
join productcategories p2 on p.categoryID = p2.categoryID  
    `);

    return {
      EM: "Lấy sản phẩm với tên loại thành công",
      EC: 1,
      DT: rows,
    };
  } catch (err) {
    console.error("Error in productService: ", err);
    return {
      EC: -1,
      EM: "Lỗi khi lấy danh sách sản phẩm.",
      DT: [],
    };
  }
};

// Get product by ID
const getProductByIdWithDetails = async (productID) => {
  try {
    const [rows] = await db.query(
      `SELECT 
  p.*, 
  p2.categoryName, 
  p2.brandName, 
  p2.seriesName,
  GROUP_CONCAT(p3.attributeName SEPARATOR ' | ') AS attributeList
FROM products p
JOIN productcategories p2 ON p.categoryID = p2.categoryID
JOIN productattributes p3 ON p2.categoryID = p3.categoryID
WHERE p.productID = ?
GROUP BY p.productID
    `,
      [productID]
    );

    if (rows.length === 0) {
      return {
        EM: "Không tìm thấy sản phẩm.",
        EC: 0,
        DT: [],
      };
    }

    return {
      EM: "Lấy sản phẩm với tên loại thành công",
      EC: 1,
      DT: rows,
    };
  } catch (err) {
    console.error("Error in productService: ", err);
    return {
      EC: -1,
      EM: "Lỗi khi tìm kiếm sản phẩm.",
      DT: [],
    };
  }
};

// Get product detail by ID
const getProductDetailById = async (productID) => {
  try {
    const [rows] = await db.query(
      `SELECT 
  p.*, 
  p2.categoryName, 
  p2.brandName, 
  p2.seriesName,
  GROUP_CONCAT(p3.attributeName SEPARATOR ' | ') AS attributeList
FROM products p
JOIN productcategories p2 ON p.categoryID = p2.categoryID
JOIN productattributes p3 ON p2.categoryID = p3.categoryID
WHERE p.productID = ?
GROUP BY p.productID`,
      [productID]
    );

    if (rows.length === 0) {
      return {
        EM: "Không tìm thấy sản phẩm.",
        EC: 0,
        DT: [],
      };
    }
    return {
      EM: "Lấy sản phẩm với tên loại thành công",
      EC: 1,
      DT: rows,
    };
  } catch (err) {
    console.error("Error in productService: ", err);
    return {
      EC: -1,
      EM: "Lỗi khi tìm kiếm sản phẩm.",
      DT: [],
    };
  }
};

export {
  getAllProducts,
  getAllProductsWithDetails,
  getProductByIdWithDetails,
  getProductDetailById,
};
