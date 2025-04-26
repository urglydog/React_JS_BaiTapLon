// controllers/CustomerController.js
import { log } from "console";
import { updateCustomerInfo, getCustomerById , getUserByEmailAndPassword} from "../services/CustomerService.js";
import { createHash } from 'crypto'; // Import module crypto để sử dụng SHA256
const handleUpdateCustomerInfo = async (req, res) => {
  const { customerId, fullName, email, phoneNumber, address } = req.body;

  if (!customerId || !fullName || !email || !phoneNumber || !address) {
    return res.status(400).json({
      EM: "Vui lòng điền đầy đủ thông tin",
      EC: 0,
      DT: "",
    });
  }

  try {
    const data = await updateCustomerInfo(customerId, fullName, email, phoneNumber, address);
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
  const customerId = req.params.id;

  if (!customerId) {
    return res.status(400).json({
      EM: "Thiếu ID khách hàng",
      EC: 0,
      DT: "",
    });
  }

  try {
    const data = await getCustomerById(customerId);
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



export { handleUpdateCustomerInfo, handleGetCustomerById,handleLoginCustomer };