import express from "express";
import { handleGetAllProducts, handleGetAllProductsWithDetails } from "../controller/ProductController.js";
import { handleGetOrdersWithDetails } from "../controller/orderController.js";
import { handleUpdateCustomerInfo, handleGetCustomerById , handleLoginCustomer} from '../controller/CustomerController.js' // Import các hàm controller của customer

const router = express.Router();

const initApiRoutes = (app) => {
  // apiController
  router.get("/", (req, res) => {
    res.send("API is working properly");
  });

  // productController
  router.get("/product/getAllProducts", handleGetAllProducts);
  router.get("/product/getAllProductsWithDetails", handleGetAllProductsWithDetails);

  // orderController
  router.get("/order/getOrdersWithDetails", handleGetOrdersWithDetails);

  // customerController
  router.put("/customer", handleUpdateCustomerInfo); // Route để cập nhật thông tin khách hàng (sử dụng PUT)
  router.get("/customer/:id", handleGetCustomerById); // Route để lấy thông tin khách hàng theo ID (sử dụng GET với tham số ID)
  router.post("/customer/login", handleLoginCustomer);


  return app.use("/api/", router);
};

export default initApiRoutes;