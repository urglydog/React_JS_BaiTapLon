import express from 'express';
import { AdminPageController } from '../controller/AdminPageController.js';
import {verifyToken} from "../middleware/authMiddleware.js"
const router = express.Router();
const adminController = new AdminPageController();


router.get('/test', (req, res) => {
  res.json({ message: 'Admin routes working!' });
});

// Dashboard routes
router.get('/dashboard/stats', (req, res) => adminController.getDashboardStats(req, res));
router.get('/dashboard/sales-performance', (req, res) => adminController.getSalesPerformance(req, res));
router.get('/dashboard/device-usage', (req, res) => adminController.getDeviceUsage(req, res));
// có 
router.get('/dashboard/category-sales', (req, res) => adminController.getCategorySales(req, res));


router.get('/dashboard/recent-orders', (req, res) => adminController.getRecentOrders(req, res));

// Product management routes
router.get('/products', (req, res) => adminController.getAllProducts(req, res));
router.get('/products/laptop', (req, res) => adminController.getAllLaptop(req, res));
router.post('/products', (req, res) => adminController.createProduct(req, res));
router.get('/products/:id', (req, res) => adminController.getProductById(req, res));
router.put('/products/:id', (req, res) => adminController.updateProduct(req, res));
router.delete('/products/:id', (req, res) => adminController.deleteProduct(req, res));

// Order management routes
router.get('/orders', (req, res) => adminController.getAllOrders(req, res));
router.get('/orders/:id', (req, res) => adminController.getOrderById(req, res));
router.put('/orders/:id/status', (req, res) => adminController.updateOrderStatus(req, res));

// Customer management routes
router.get('/customers', (req, res) => adminController.getAllCustomers(req, res));
router.get('/customers/:id', (req, res) => adminController.getCustomerById(req, res));
router.get('/customers/statistics/top-spenders', (req, res) => adminController.getTopCustomers(req, res));
// Inventory management routes
router.get('/inventory/low-stock', (req, res) => adminController.getLowStockItems(req, res));

export default router;