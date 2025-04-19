import express from "express";
import { handleGetAllProducts, handleGetAllProductsWithDetails } from "../controller/ProductController.js";
import { handleGetOrdersWithDetails } from "../controller/orderController.js";

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

  return app.use("/api/", router);
};

export default initApiRoutes;
