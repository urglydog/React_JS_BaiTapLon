// Mỗi model đại diện cho một bảng trong CSDL của bạn
// Đảm bảo đã cấu hình pool trong connectDB.js
import { pool } from "../config/connectDB.js";
import db from "../config/db.js";
class BaseModel {
  constructor(tableName) {
    this.table = tableName;
  }

  async create(fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const placeholders = keys.map(() => "?").join(", ");
    const sql = `INSERT INTO ${this.table} (${keys.join(
      ", "
    )}) VALUES (${placeholders})`;

    const conn = await db.getConnection();
    try {
      const result = await conn.query(sql, values);
      return result.insertId;
    } finally {
      conn.release();
    }
  }

  async getAll() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(`SELECT * FROM ${this.table}`);
      return result;
    } finally {
      conn.release();
    }
  }
  async getAllLaptop() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (45, 46, 47, 48, 49, 50, 51)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllMouse() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (6, 7, 8, 9, 10)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllKeyboard() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (1, 2, 3, 4, 5)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllPhone() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (52, 53, 54)`
      );
      return result;
    } finally {
      conn.release();
    }
  }
  async getAllComputers() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (36, 37, 38, 39)`
      );
      return result;
    } finally {
      conn.release();
    }
  }
  async getAllTablet() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID = 44`
      );
      return result;
    } finally {
      conn.release();
    }
  }
  async getAllGamingGear() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (14, 15, 16)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllProcessors() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (18, 19)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllRAM() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (30, 31, 32)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllStorage() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (27, 28, 29)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllCase() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID = 17`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllMainboard() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (20, 21, 22)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllPsu() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (23, 24, 25, 26)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllPC() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (40, 41)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllHeadphone() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (42, 43)`
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getAllMousepad() {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM products WHERE categoryID IN (11, 12, 13)`
      );
      return result;
    } finally {
      conn.release();
    }
  }
  async getById(idField, id) {
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `SELECT * FROM ${this.table} WHERE ${idField} = ?`,
        [id]
      );
      return result[0] || null;
    } finally {
      conn.release();
    }
  }

  async update(idField, id, fields) {
    console.log(
      "Model cập nhật bảng:",
      this.table,
      "ID:",
      id,
      "Fields:",
      fields
    );
    const keys = Object.keys(fields);
    if (keys.length === 0) {
      throw new Error("Không có trường nào được cung cấp để cập nhật");
    }
    const values = Object.values(fields);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const sql = `UPDATE ${this.table} SET ${setClause} WHERE ${idField} = ?`;
    console.log("SQL tạo ra:", sql, "Giá trị:", [...values, id]);
    const conn = await db.getConnection();
    try {
      const result = await conn.query(sql, [...values, id]);
      return result.affectedRows > 0;
    } finally {
      conn.release();
    }
  }

  async delete(idField, id) {
    if (!idField || idField === undefined) {
      throw new Error("Tên cột (idField) không hợp lệ");
    }
    const conn = await db.getConnection();
    try {
      const result = await conn.query(
        `DELETE FROM ${this.table} WHERE ${idField} = ?`,
        [id]
      );
      console.log("Query result:", result); // In: OkPacket { affectedRows: 1, ... }
      if (result.affectedRows === undefined) {
        throw new Error("Lỗi khi thực thi câu lệnh SQL: Kết quả không hợp lệ");
      }
      if (result.affectedRows === 0) {
        throw new Error("Product not found");
      }
      return result.affectedRows > 0; // Trả về true nếu xóa thành công
    } catch (error) {
      console.error("Error in ProductModel.delete:", error);
      throw error;
    } finally {
      conn.release();
    }
  }
}

// Tạo model riêng cho từng bảng
export const CustomerModel = new BaseModel("customers");
export const EmployeeModel = new BaseModel("employees");
export const SupplierModel = new BaseModel("suppliers");
export const CategoryModel = new BaseModel("productcategories");
export const ProductModel = new BaseModel("products");
export const AttributeModel = new BaseModel("productattributes");

export const VoucherModel = new BaseModel("vouchers");
export const OrderModel = new BaseModel("orders");
export const OrderDetailModel = new BaseModel("orderdetails");
export const PaymentMethodModel = new BaseModel("paymentmethods");
export const PaymentModel = new BaseModel("payments");
export const ReviewModel = new BaseModel("reviews");
