// services/VoucherService.js
import db from "../config/db.js";

const getAllVouchers = async () => {
  try {
    const [rows] = await db.query(`
      SELECT voucherID, code, discount, expirationDate
      FROM vouchers
      WHERE expirationDate >= CURDATE()
      ORDER BY discount desc
    `);

    return {
      EM: "Lấy danh sách voucher thành công",
      EC: 1,
      DT: rows,
    };
  } catch (err) {
    console.error("Lỗi getAllVouchers: ", err);
    return {
      EM: "Lỗi truy vấn voucher",
      EC: -1,
      DT: [],
    };
  }
};
const getVoucherByCode = async (code) => {
    try {
      const [rows] = await db.query(`
        SELECT voucherID, code, discount, expirationDate
        FROM vouchers
        WHERE code = ?
      `, [code]);
  
      if (rows.length > 0) {
        return {
          EM: "Tìm thấy voucher",
          EC: 1,
          DT: rows[0],
        };
      } else {
        return {
          EM: "Không tìm thấy voucher với mã này",
          EC: 0,
          DT: null,
        };
      }
    } catch (err) {
      console.error("Lỗi getVoucherByCode: ", err);
      return {
        EM: "Lỗi truy vấn voucher",
        EC: -1,
        DT: null,
      };
    }
  };
export { getAllVouchers, getVoucherByCode };
