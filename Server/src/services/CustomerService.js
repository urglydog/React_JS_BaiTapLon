import db from "../config/db.js";
// import bcrypt from 'bcryptjs';  // Thêm bcryptjs để mã hóa và so sánh mật khẩu

// Cập nhật thông tin khách hàng
const updateCustomerInfo = async (customerId, fullName, email, phoneNumber, address) => {
  try {
    const [result] = await db.execute(
      `
      UPDATE customers
      SET
        fullName = ?,
        email = ?,
        phoneNumber = ?,
        address = ?
      WHERE customerID = ?
    `,
      [fullName, email, phoneNumber, address, customerId]
    );

    if (result.affectedRows > 0) {
      return {
        EM: "Thông tin khách hàng đã được cập nhật thành công",
        EC: 1,
        DT: null,
      };
    } else {
      return {
        EM: "Không tìm thấy khách hàng hoặc không có thay đổi nào được thực hiện",
        EC: 0,
        DT: null,
      };
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin khách hàng: ", error);
    return {
      EM: "Lỗi cơ sở dữ liệu khi cập nhật thông tin khách hàng",
      EC: -1,
      DT: null,
    };
  }
};

// Lấy thông tin khách hàng theo ID
const getCustomerById = async (customerId) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT customerID, fullName, email, phoneNumber, address, registrationDate
      FROM customers
      WHERE customerID = ?
    `,
      [customerId]
    );

    if (rows.length > 0) {
      return {
        EM: "Lấy thông tin khách hàng thành công",
        EC: 1,
        DT: rows[0],
      };
    } else {
      return {
        EM: "Không tìm thấy khách hàng",
        EC: 0,
        DT: null,
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy thông tin khách hàng theo ID: ", error);
    return {
      EM: "Lỗi cơ sở dữ liệu khi lấy thông tin khách hàng",
      EC: -1,
      DT: [],
    };
  }
};

// Đăng nhập khách hàng (kiểm tra mật khẩu đã mã hóa)
const getUserByEmailAndPassword = async (email, password) => {
  console.log("Query email:", email);
  console.log("Query password (plain):", password);
  try {
    const query = `
            SELECT customerID, fullName, email, phoneNumber, address, registrationDate
      FROM customers
      WHERE email = ? AND PASSWORD = SHA2(?,256)
    `;
    console.log("Câu truy vấn:", query);
    const [rows] = await db.execute(query, [email, password]);
    console.log("Số lượng hàng trả về:", rows.length);

    if (rows.length > 0) {
      return { EM: "Đăng nhập thành công", EC: 1, DT: rows[0] };
    } else {
      return { EM: "Không tìm thấy khách hàng", EC: 0, DT: null };
    }
  } catch (error) {
    console.error("Lỗi khi đăng nhập khách hàng: ", error);
    return {
      EM: "Lỗi cơ sở dữ liệu khi đăng nhập",
      EC: -1,
      DT: null,
    };
  }
};


// // Hàm mã hóa mật khẩu khi đăng ký
// const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10); // Tạo salt
//   const hashedPassword = await bcrypt.hash(password, salt); // Mã hóa mật khẩu
//   return hashedPassword;
// };

export {
  updateCustomerInfo,
  getCustomerById,
  getUserByEmailAndPassword,
  hashPassword, // Cung cấp hàm hashPassword để sử dụng trong đăng ký
};
