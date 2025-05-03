import mariadb from 'mariadb';
import "dotenv/config"; // Đảm bảo bạn đã cài đặt dotenv để quản lý biến môi trường

// Tạo pool kết nối với MariaDB
const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost', // Địa chỉ máy chủ cơ sở dữ liệu
  user: process.env.DB_USER || 'root', // Tên người dùng cơ sở dữ liệu
<<<<<<< Updated upstream
  password: process.env.DB_PASSWORD || 'tung', // Mật khẩu cơ sở dữ liệu
  database: process.env.DB_NAME || 'phattriengiaodien', // Tên cơ sở dữ liệu
  connectionLimit: 5, // Số kết nối tối đa
//   acquireTimeout: 30000, // Thời gian chờ kết nối (30 giây)
  port: 3388, // Cổng kết nối
=======
  password: process.env.DB_PASSWORD || 'root', // Mật khẩu cơ sở dữ liệu
  database: process.env.DB_NAME || 'phattriengiaodien', 
  // Tên cơ sở dữ liệu
  connectionLimit: 20, // Số kết nối tối đa
//   acquireTimeout: 30000, // Thời gian chờ kết nối (30 giây)
  port: 3306, // Cổng kết nối
>>>>>>> Stashed changes
});

// Hàm kết nối và kiểm tra kết nối
export const connection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log('Đã kết nối thành công với cơ sở dữ liệu MariaDB');
    conn.release(); // Giải phóng kết nối sau khi sử dụng
  } catch (err) {
    console.error('Lỗi kết nối MariaDB: ', err);
    // Tạm dừng ứng dụng nếu không kết nối được (có thể tùy chọn tùy vào yêu cầu)
    process.exit(1); 
  }
};

export { pool }; // Export pool để sử dụng trong các module khác
