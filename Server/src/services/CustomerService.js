import db from "../config/db.js";
// import bcrypt from 'bcryptjs';  // Thêm bcryptjs để mã hóa và so sánh mật khẩu

// Cập nhật thông tin khách hàng
const updateCustomerInfo = async (customerID, fullName, email, phoneNumber, address) => {
  try {
    const result = await db.query(
      `
      UPDATE customers
      SET
        fullName = ?,
        email = ?,
        phoneNumber = ?,
        address = ?
      WHERE customerID = ?
      `,
      [fullName, email, phoneNumber, address, customerID]
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
const getCustomerById = async (customerID) => {
  try {
    console.log("customerID:", customerID);             // In ra giá trị id
    const rows = await db.query(
      `
      SELECT customerID, fullName, email, phoneNumber, address, registrationDate
      FROM customers
      WHERE customerID = ?
      `,
      [customerID]
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
    const rows = await db.query(query, [email, password]);

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

const getUserByCustomerIdAndPassword = async (customerID, hashedPassword) => {
  try {
    const query = `
      SELECT customerID, fullName, email, phoneNumber, address, registrationDate
      FROM customers
      WHERE customerID = ? AND PASSWORD = ?
    `;
    const rows = await db.query(query, [customerID, hashedPassword]);

    if (rows.length > 0) {
      return { EM: "Đăng nhập thành công", EC: 1, DT: rows[0] };
    } else {
      return { EM: "Sai Customer ID hoặc mật khẩu", EC: 0, DT: null };
    }
  } catch (error) {
    console.error("Service - Lỗi:", error);
    return { EM: "Lỗi cơ sở dữ liệu", EC: -1, DT: null };
  }
};




const verifyCurrentPassword = async (customerID, currentPassword) => {
  try {
      const query = `
          SELECT password
          FROM customers
          WHERE customerID = ?
      `;
      const [rows] = await db.execute(query, [customerID]);

      if (rows.length > 0) {
          const hashedPasswordFromDB = rows[0].password;
          const hashedCurrentPassword = createHash('sha256').update(currentPassword).digest('hex');
          return hashedPasswordFromDB === hashedCurrentPassword;
      }
      return false;
  } catch (error) {
      console.error("Service - Lỗi khi xác thực mật khẩu hiện tại:", error);
      return false; // Trả về false trong trường hợp có lỗi
  }
};

const updatePassword = async (customerID, newHashedPassword) => {
  try {
      const query = `
          UPDATE customers
          SET password = ?
          WHERE customerID = ?
      `;
      const [result] = await db.execute(query, [newHashedPassword, customerID]);
      return result.affectedRows > 0;
  } catch (error) {
      console.error("Service - Lỗi khi cập nhật mật khẩu:", error);
      return false; // Trả về false trong trường hợp có lỗi
  }
};

export {
  updateCustomerInfo,
  getCustomerById,
  getUserByEmailAndPassword,
  getUserByCustomerIdAndPassword,
  verifyCurrentPassword, // Thêm hàm này
  updatePassword      // Thêm hàm này
};