// controller/VoucherController.js
import { getAllVouchers,getVoucherByCode } from "../services/VoucherService.js"

const handleGetAllVouchers = async (req, res) => {
  try {
    const data = await getAllVouchers();

    return res.status(data.EC === 1 ? 200 : 404).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error at handleGetAllVouchers in VoucherController: ", error);
    return res.status(500).json({
      EM: "Error at server",
      EC: -1,
      DT: [],
    });
  }
};
const handleCheckVoucher = async (req, res) => {
    const { code } = req.body;
  
    if (!code) {
      return res.status(400).json({ EM: "Vui lòng nhập mã voucher.", EC: -1, DT: null });
    }
  
    try {
      const data = await getVoucherByCode(code);
  
      if (data.EC === 1 && data.DT) {
        // Kiểm tra thêm điều kiện hết hạn ở controller
        if (new Date(data.DT.expirationDate) >= new Date()) {
          return res.status(200).json({ EM: "Mã voucher hợp lệ.", EC: 1, DT: data.DT });
        } else {
          return res.status(200).json({ EM: "Mã voucher đã hết hạn.", EC: 0, DT: null });
        }
      } else {
        return res.status(200).json(data); // Trả về kết quả từ service (thông báo không tìm thấy)
      }
    } catch (error) {
      console.log("Error at handleCheckVoucher in VoucherController: ", error);
      return res.status(500).json({ EM: "Lỗi server.", EC: -1, DT: null });
    }
  };
  
  export { handleGetAllVouchers, handleCheckVoucher };
