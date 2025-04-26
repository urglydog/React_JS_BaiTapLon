// Mỗi model đại diện cho một bảng trong CSDL của bạn
// Đảm bảo đã cấu hình pool trong connectDB.js
import { pool } from "../config/connectDB.js";

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

    const conn = await pool.getConnection();
    try {
      const result = await conn.query(sql, values);
      return result.insertId;
    } finally {
      conn.release();
    }
  }

  async getAll() {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(`SELECT * FROM ${this.table}`);
      return result;
    } finally {
      conn.release();
    }
  }

  async getById(idField, id) {
    const conn = await pool.getConnection();
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
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const sql = `UPDATE ${this.table} SET ${setClause} WHERE ${idField} = ?`;

    const conn = await pool.getConnection();
    try {
      const result = await conn.query(sql, [...values, id]);
      return result.affectedRows > 0;
    } finally {
      conn.release();
    }
  }

  async delete(idField, id) {
    const conn = await pool.getConnection();
    try {
      const result = await conn.query(
        `DELETE FROM ${this.table} WHERE ${idField} = ?`,
        [id]
      );
      return result.affectedRows > 0;
    } finally {
      conn.release();
    }
  }
}

// Tạo model riêng cho từng bảng
export const CustomerModel = new BaseModel("Customers");
export const EmployeeModel = new BaseModel("Employees");
export const SupplierModel = new BaseModel("Suppliers");
export const CategoryModel = new BaseModel("ProductCategories");
export const ProductModel = new BaseModel("Products");
export const AttributeModel = new BaseModel("ProductAttributes");

export const VoucherModel = new BaseModel("Vouchers");
export const OrderModel = new BaseModel("Orders");
export const OrderDetailModel = new BaseModel("OrderDetails");
export const PaymentMethodModel = new BaseModel("PaymentMethods");
export const PaymentModel = new BaseModel("Payments");
export const ReviewModel = new BaseModel("Reviews");
