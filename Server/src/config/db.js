import mariadb from 'mariadb';
import "dotenv/config";

// Tạo pool kết nối với MariaDB
const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '22102004',
  database: process.env.DB_NAME || 'reactproject',
  port: 3309,
  connectionLimit: 20,
  acquireTimeout: 50000,
  waitForConnections: true,
});

// Hàm kết nối và kiểm tra kết nối
const testConnection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log('Đã kết nối thành công với cơ sở dữ liệu MariaDB');
    conn.release(); // Giải phóng kết nối sau khi sử dụng
  } catch (err) {
    console.error('Lỗi kết nối MariaDB: ', err);
    // Ghi log lỗi nhưng không dừng ứng dụng
    console.error('Chi tiết lỗi:', err.message);
  }
};

// Thực thi kiểm tra kết nối khi module được import
testConnection();

// Tạo đối tượng db với phương thức query wrapper
const db = {
  query: async (sql, params) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(sql, params);
      return result;
    } catch (err) {
      console.error('Lỗi truy vấn:', err);
      throw err;
    } finally {
      if (conn) conn.release(); // Đảm bảo luôn giải phóng kết nối
    }
  }
};

export default db;