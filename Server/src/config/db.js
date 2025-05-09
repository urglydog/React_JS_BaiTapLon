import mysql from "mysql2";

// Cấu hình kết nối MySQL và sử dụng promise
const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 40, // Giảm xuống 10 để an toàn
    waitForConnections: true, // Chờ kết nối nếu pool đầy
    queueLimit: 50, 
    // acquireTimeout: 10000, 
  })
  .promise(); // Sử dụng .promise() để truy vấn trả về Promise

// Export đối tượng db để có thể sử dụng ở các file khác
export default db;
