// src/config/db.js

import mysql from "mysql2";

// Cấu hình kết nối MySQL và sử dụng promise
const db = mysql.createPool({
  host: "localhost",  // Máy chủ cơ sở dữ liệu
  user: "root",       // Tên người dùng
  port: 3388,         // Cổng kết nối
  password: "tung",   // Mật khẩu
  database: "phattriengiaodien",  // Tên cơ sở dữ liệu
}).promise();  // Sử dụng .promise() để truy vấn trả về Promise

// Export đối tượng db để có thể sử dụng ở các file khác
export default db;