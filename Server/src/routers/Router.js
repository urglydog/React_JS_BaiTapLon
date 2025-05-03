import express from "express";
import {
  handleGetAllProducts,
  handleGetAllProductsWithDetails,
  handleGetDetailProductById,
  handleGetProductByIdWithDetails,
} from "../controller/ProductController.js";
import { handleGetOrdersWithDetails } from "../controller/orderController.js";
import { handleUpdateCustomerInfo, handleGetCustomerById, handleLoginCustomer, getUserByIDAndPassword, handleChangePassword } from '../controller/CustomerController.js' // Import các hàm controller của customer

const router = express.Router();

const initApiRoutes = (app) => {
  // apiController
  router.get("/", (req, res) => {
    res.send("API is working properly");
  });

  // productController
  router.get("/product/getAllProducts", handleGetAllProducts);
  router.get(
    "/product/getAllProductsWithDetails",
    handleGetAllProductsWithDetails
  );
  // Lấy sản phẩm theo ID
  router.get(
    "/product/getProductByIdWithDetails/:id",
    handleGetProductByIdWithDetails
  );
  // Lấy chi tiết sản phẩm theo ID
  router.get("/product/getProductDetailById/:id", handleGetDetailProductById);

  // orderController
  router.get("/order/getOrdersWithDetails", handleGetOrdersWithDetails);

  // customerController
  router.put("/customer", handleUpdateCustomerInfo); // Route để cập nhật thông tin khách hàng (sử dụng PUT)
  router.get("/customer/:id", handleGetCustomerById); // Route để lấy thông tin khách hàng theo ID (sử dụng GET với tham số ID)
  router.post("/customer/login", handleLoginCustomer);
  router.get("/customer/loginWithId/:customerID/:password", getUserByIDAndPassword);
  router.post("/customer/change-password", handleChangePassword);
  return app.use("/api/", router);
};

export default initApiRoutes;
