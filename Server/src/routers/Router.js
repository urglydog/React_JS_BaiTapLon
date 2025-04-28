import express from "express";
import {
  handleGetAllProducts,
  handleGetAllProductsWithDetails,
  handleGetProductByIdWithDetails,
} from "../controller/ProductController.js";
import { handleGetOrdersWithDetails } from "../controller/orderController.js";

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

  // orderController
  router.get("/order/getOrdersWithDetails", handleGetOrdersWithDetails);

  return app.use("/api/", router);
};

export default initApiRoutes;
