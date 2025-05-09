// Get order with detail
import { getOrdersWithDetails,getAllOrders,addOrder } from "../services/OrderService.js";
import { getAllAppointments } from "../services/AppointmentService.js";
const handleGetOrdersWithDetails = async (req, res) => {
  try {
    const customerID = req.params.customerID; // Correctly extracts customerID from URL
    const data = await getOrdersWithDetails(customerID);

    return res.status(data.EC === 1 ? 200 : 404).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "Error at handleGetOrdersWithDetails in orderController: ",
      error
    );
    return res.status(500).json({
      EM: "Error at server",
      EC: -1,
      DT: [],
    });
  }
};
// Get all appointments
const handleGetAllAppointments = async (req, res) => {
  try {
    const data = await getAllAppointments();

    return res.status(data.EC === 1 ? 200 : 404).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "Error at handleGetAllAppointments in orderController: ",
      error
    );
    return res.status(500).json({
      EM: "Error at server",
      EC: -1,
      DT: [],
    });
  }
};
// Get all orders
const handleGetAllOrders = async (req, res) => {
  try {
    const data = await getAllOrders();

    return res.status(data.EC === 1 ? 200 : 404).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error at handleGetAllOrders in orderController: ", error);
    return res.status(500).json({
      EM: "Error at server",
      EC: -1,
      DT: [],
    });
  }
};
const handleAddOrder = async (req, res) => {
  try {
    const {
      customerID,
      employeeID,
      voucherID,
      totalAmount,
      status,
      cartItems,
    } = req.body;

    // Thực hiện validation dữ liệu đầu vào
    if (!customerID || !totalAmount || !cartItems || cartItems.length === 0) {
      return res.status(400).json({
        EM: "Vui lòng cung cấp customerID, totalAmount và cartItems",
        EC: -1,
        DT: null,
      });
    }

    const data = await addOrder(
      customerID,
      employeeID,
      voucherID,
      totalAmount,
      status,
      cartItems
    );

    return res.status(data.EC === 1 ? 201 : 400).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.error("Lỗi tại handleAddOrder trong orderController: ", error);
    return res.status(500).json({
      EM: "Lỗi server khi thêm đơn hàng",
      EC: -1,
      DT: null,
    });
  }
};

export {
  handleGetOrdersWithDetails,
  handleGetAllAppointments,
  handleGetAllOrders,
  handleAddOrder,
};
