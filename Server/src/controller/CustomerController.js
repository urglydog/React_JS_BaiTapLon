// controllers/CustomerController.js
import { log } from "console";
import {
  updateCustomerInfo, getCustomerById, getUserByCustomerIdAndPassword, verifyCurrentPassword, // Import hàm này
  updatePassword
} from "../services/CustomerService.js";
import { createHash } from 'crypto'; // Import module crypto để sử dụng SHA256
const handleUpdateCustomerInfo = async (req, res) => {
  const { customerID, fullName, email, phoneNumber, address } = req.body;

  if (!customerID || !fullName || !email || !phoneNumber || !address) {
    return res.status(400).json({
      EM: "Vui lòng điền đầy đủ thông tin",
      EC: 0,
      DT: "",
    });
  }

  try {
    const data = await updateCustomerInfo(customerID, fullName, email, phoneNumber, address);
    return res.status(data.EC === 1 ? 200 : 400).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Lỗi tại handleUpdateCustomerInfo trong CustomerController: ", error);
    return res.status(500).json({
      EM: "Lỗi server khi cập nhật thông tin khách hàng",
      EC: -1,
      DT: "",
    });
  }
};

const handleGetCustomerById = async (req, res) => {
  const customerID = req.params.id;

  if (!customerID) {
    return res.status(400).json({
      EM: "Thiếu ID khách hàng",
      EC: 0,
      DT: "",
    });
  }

  try {
    const data = await getCustomerById(customerID);
    return res.status(data.EC === 1 ? 200 : 404).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Lỗi tại handleGetCustomerById trong CustomerController: ", error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy thông tin khách hàng",
      EC: -1,
      DT: "",
    });
  }
};

const handleLoginCustomer = async (req, res) => {
  const { email, password } = req.body;
  console.log("Backend nhận email:", email);
  console.log("Backend nhận mật khẩu:", password);

  if (!email || !password) {
    return res.status(400).json({ EM: "Vui lòng nhập email và mật khẩu", EC: 0, DT: "" });
  }

  try {
    // Mã hóa mật khẩu nhận được từ frontend bằng SHA256 (tương tự như trong database)
    const hashedPassword = createHash('sha256').update(password).digest('hex');
    console.log("Backend mật khẩu đã mã hóa:", hashedPassword);

    const data = await getUserByEmailAndPassword(email, password);
    console.log(data);

    return res.status(data.EC === 1 ? 200 : 401).json(data);
  } catch (error) {
    console.error("Lỗi tại handleLoginCustomer: ", error);
    return res.status(500).json({
      EM: "Lỗi server khi đăng nhập khách hàng",
      EC: -1,
      DT: "",
    });
  }
};

// Hàm kiểm tra đăng nhập khách hàng bằng customerID và mật khẩu đã mã hóa
// Sử dụng customerID và mật khẩu đã mã hóa (SHA256) để kiểm tra thông tin
// Sử dụng customerID và mật khẩu đã mã hóa (SHA256) để kiểm tra thông tin
const getUserByIDAndPassword = async (req, res) => {
  const { customerID, password } = req.params;
  console.log("Controller - Nhận customerID từ params:", customerID, "và password từ params:", password);

  if (!customerID || !password) {
    return res.status(400).json({ EM: "Vui lòng nhập Customer ID và mật khẩu", EC: 0, DT: "" });
  }

  try {
    const hashedPassword = createHash('sha256').update(password).digest('hex');
    console.log("Controller - Mật khẩu đã mã hóa:", hashedPassword);
    const data = await getUserByCustomerIdAndPassword(parseInt(customerID), hashedPassword); // **ÉP KIỂU SANG SỐ NGUYÊN**
    console.log("Controller - Kết quả từ service:", data);

    return res.status(data.EC === 1 ? 200 : 401).json(data);
  } catch (error) {
    console.error("Controller - Lỗi:", error);
    return res.status(500).json({
      EM: "Lỗi server khi đăng nhập",
      EC: -1,
      DT: "",
    });
  }
};
const handleChangePassword = async (req, res) => {
  const { customerID, currentPassword, newPassword } = req.body;

  if (!customerID || !currentPassword || !newPassword) {
      return res.status(400).json({ EM: "Vui lòng nhập đầy đủ thông tin.", EC: 0, DT: "" });
  }

  if (newPassword.length < 6) {
      return res.status(400).json({ EM: "Mật khẩu mới phải có ít nhất 6 ký tự.", EC: 0, DT: "" });
  }

  try {
      const isCurrentPasswordValid = await verifyCurrentPassword(customerID, currentPassword);

      if (isCurrentPasswordValid) {
          const newHashedPassword = createHash('sha256').update(newPassword).digest('hex');
          const isPasswordUpdated = await updatePassword(customerID, newHashedPassword);

          if (isPasswordUpdated) {
              return res.status(200).json({ EM: "Đổi mật khẩu thành công.", EC: 1, DT: "" });
          } else {
              return res.status(500).json({ EM: "Lỗi khi cập nhật mật khẩu.", EC: -1, DT: "" });
          }
      } else {
          return res.status(401).json({ EM: "Mật khẩu hiện tại không đúng.", EC: 0, DT: "" });
      }
  } catch (error) {
      console.error("Controller - Lỗi khi đổi mật khẩu:", error);
      return res.status(500).json({ EM: "Lỗi server khi đổi mật khẩu.", EC: -1, DT: "" });
  }
};

export {
  handleUpdateCustomerInfo,
  handleGetCustomerById,
  handleLoginCustomer,
  getUserByIDAndPassword,
  handleChangePassword // Thêm hàm này
};