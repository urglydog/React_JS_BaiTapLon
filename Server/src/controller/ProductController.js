// controller/productController.js
import {
  getAllProducts,
  getAllProductsWithDetails,
  getProductByIdWithDetails,
  getProductDetailById,
} from "../services/ProductService.js";

const handleGetAllProducts = async (req, res) => {
  try {
    const data = await getAllProducts();

    return res.status(data.EC === 1 ? 200 : 404).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error at handleGetAllProducts in productController: ", error);
    return res.status(500).json({
      EM: "Error at server",
      EC: -1,
      DT: [],
    });
  }
};

const handleGetAllProductsWithDetails = async (req, res) => {
  try {
    const data = await getAllProductsWithDetails();

    return res.status(data.EC === 1 ? 200 : 404).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "Error at handleGetAllProductsWithDetails in productController: ",
      error
    );
    return res.status(500).json({
      EM: "Error at server",
      EC: -1,
      DT: [],
    });
  }
};

// Get product by ID
const handleGetProductByIdWithDetails = async (req, res) => {
  try {
    const productID = req.params.id;
    const data = await getProductByIdWithDetails(productID);

    return res.status(data.EC === 1 ? 200 : 404).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "Error at handleGetProductByIdWithDetails in productController: ",
      error
    );
    return res.status(500).json({
      EM: "Error at server",
      EC: -1,
      DT: [],
    });
  }
};

// Get detail product by ID
const handleGetDetailProductById = async (req, res) => {
  try {
    const productID = req.params.id;
    const data = await getProductDetailById(productID);

    return res.status(data.EC === 1 ? 200 : 404).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(
      "Error at handleGetDetailProductById in productController: ",
      error
    );
    return res.status(500).json({
      EM: "Error at server",
      EC: -1,
      DT: [],
    });
  }
};

export {
  handleGetAllProducts,
  handleGetAllProductsWithDetails,
  handleGetProductByIdWithDetails,
  handleGetDetailProductById,
};
