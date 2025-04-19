// Get order with detail
import { getOrdersWithDetails } from "../services/OrderService.js";

const handleGetOrdersWithDetails = async (req, res) => {
  try {
    const data = await getOrdersWithDetails();

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

export { handleGetOrdersWithDetails };
