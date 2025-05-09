const mysql = require("mysql2/promise");
// Cấu hình kết nối MySQL và sử dụng promise
const db = mysql.createPool({
  host: "mysql.50webs.com",  // Máy chủ cơ sở dữ liệu
  user: "tespha_beptgd",       // Tên người dùng
  // port: 3309,         // Cổng kết nối
  password: "1i17bMdCY&",   // Mật khẩu
  database: "tespha_beptgd",  // Tên cơ sở dữ liệu
});  // Sử dụng .promise() để truy vấn trả về Promise

// Export đối tượng db để có thể sử dụng ở các file khác
module.exports = db;