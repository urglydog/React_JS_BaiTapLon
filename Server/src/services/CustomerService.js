// services/customer.js
import db from "../config/db.js";

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

const getUserByEmailAndPassword = async (email, password) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT customerID, fullName, email, phoneNumber, address, registrationDate
      FROM customers
      WHERE email = ? AND password = ?
    `,
      [email, password]
    );

    if (rows.length > 0) {
      return {
        EM: "Đăng nhập thành công",
        EC: 1,
        DT: rows[0],
      };
    } else {
      return {
        EM: "Email hoặc mật khẩu không đúng",
        EC: 0,
        DT: null,
      };
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

export {
  updateCustomerInfo,
  getCustomerById,
  getUserByEmailAndPassword // 👈 Đừng quên export!
};
