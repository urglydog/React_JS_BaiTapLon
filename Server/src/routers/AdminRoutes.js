import express from "express";
import { AdminPageController } from "../controller/AdminPageController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import cloudinaryModule from "../config/cloudinary.js";

const router = express.Router();
const adminController = new AdminPageController();

const {
  addProductWithImage,
  updateProductImages,
  getImagesFromFolder,
  getAllImageFolders,
} = cloudinaryModule;
router.get("/test", (req, res) => {
  res.json({ message: "Admin routes working!" });
});

// Dashboard routes
router.get("/dashboard/stats", (req, res) =>
  adminController.getDashboardStats(req, res)
);
router.get("/dashboard/sales-performance", (req, res) =>
  adminController.getSalesPerformance(req, res)
);
router.get("/dashboard/device-usage", (req, res) =>
  adminController.getDeviceUsage(req, res)
);
// có
router.get("/dashboard/category-sales", (req, res) =>
  adminController.getCategorySales(req, res)
);

router.get("/dashboard/recent-orders", (req, res) =>
  adminController.getRecentOrders(req, res)
);

// Product management routes
router.get("/products", (req, res) => adminController.getAllProducts(req, res));
router.get("/products/laptop", (req, res) =>
  adminController.getAllLaptop(req, res)
);
router.get("/products/phone", (req, res) =>
  adminController.getAllPhone(req, res)
);
router.get("/products/mouse", (req, res) =>
  adminController.getAllMouse(req, res)
);
router.get("/products/keyboard", (req, res) =>
  adminController.getAllKeyboard(req, res)
);
router.get("/products/computers", (req, res) =>
  adminController.getAllComputers(req, res)
);
router.get("/products/processors", (req, res) =>
  adminController.getAllProcessors(req, res)
);
router.get("/products/tablet", (req, res) =>
  adminController.getAllTablet(req, res)
);
router.get("/products/gamingear", (req, res) =>
  adminController.getAllGamingGear(req, res)
);
router.get("/products/ram", (req, res) => adminController.getAllRAM(req, res));
router.get("/products/storage", (req, res) =>
  adminController.getAllStorage(req, res)
);
router.get("/products/cases", (req, res) =>
  adminController.getAllCase(req, res)
);
router.get("/products/mainboards", (req, res) =>
  adminController.getAllMainboard(req, res)
);
router.get("/products/psus", (req, res) => adminController.getAllPsu(req, res));
router.get("/products/pcs", (req, res) => adminController.getAllPC(req, res));
router.get("/products/headphones", (req, res) =>
  adminController.getAllHeadphone(req, res)
);
router.get("/products/mousepads", (req, res) =>
  adminController.getAllMousepad(req, res)
);
router.post("/products", (req, res) => adminController.createProduct(req, res));
router.get("/products/:id", (req, res) =>
  adminController.getProductById(req, res)
);
router.put("/products/:id", (req, res) =>
  adminController.updateProduct(req, res)
);
router.delete("/products/:id", (req, res) =>
  adminController.deleteProduct(req, res)
);
router.post("/productsa", async (req, res) => {
  try {
    const productData = req.body;
    const result = await addProductWithImage(productData);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
});

// Route để cập nhật hình ảnh sản phẩm
router.post("/products/update-images", async (req, res) => {
  try {
    const result = await updateProductImages();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product images",
      error: error.message,
    });
  }
});
router.get("/images/all", async (req, res) => {
  try {
    const allImages = await getAllImageFolders();
    res.json(allImages);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể lấy tất cả hình ảnh",
      error: error.message,
    });
  }
});

// Route /images/:category
router.get("/images/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const folderPath = folderMap[category];
    if (!folderPath) {
      return res.status(400).json({ message: "Danh mục không hợp lệ" });
    }

    const images = await getImagesFromFolder(folderPath);
    res.json(images);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Không thể lấy hình ảnh",
      error: error.message,
    });
  }
});

// Route để lấy tất cả hình ảnh từ các thư mục

// Order management routes
router.get("/orders", (req, res) => adminController.getAllOrders(req, res));
router.get("/orders/:id", (req, res) => adminController.getOrderById(req, res));
router.put("/orders/:id/status", (req, res) =>
  adminController.updateOrderStatus(req, res)
);

// Customer management routes
router.get("/customers", (req, res) =>
  adminController.getAllCustomers(req, res)
);
router.get("/customers/:id", (req, res) =>
  adminController.getCustomerById(req, res)
);
router.get("/customers/statistics/top-spenders", (req, res) =>
  adminController.getTopCustomers(req, res)
);
// Inventory management routes
router.get("/inventory/low-stock", (req, res) =>
  adminController.getLowStockItems(req, res)
);

export default router;
