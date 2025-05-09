import mysql from "mysql2/promise";
import "dotenv/config";

// Tạo pool kết nối với MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 40,
  queueLimit: 0,
  // port: 3388 // Nếu không phải mặc định thì bật dòng này
});

// Hàm kiểm tra kết nối
export const connection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Đã kết nối thành công với cơ sở dữ liệu MySQL");
    conn.release();
  } catch (err) {
    console.error("Lỗi kết nối MySQL: ", err);
    process.exit(1);
  }
};

export { pool };
