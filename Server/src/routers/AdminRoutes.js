import express from 'express';
import { AdminPageController } from '../controller/AdminPageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
const adminController = new AdminPageController();

// Dashboard routes
router.get('/dashboard/stats', authMiddleware, adminController.getDashboardStats);
router.get('/dashboard/sales-performance', authMiddleware, adminController.getSalesPerformance);
router.get('/dashboard/device-usage', authMiddleware, adminController.getDeviceUsage);
router.get('/dashboard/category-sales', authMiddleware, adminController.getCategorySales);
router.get('/dashboard/trending-products', authMiddleware, adminController.getTrendingProducts);
router.get('/dashboard/recent-orders', authMiddleware, adminController.getRecentOrders);

// Product management routes
router.get('/products', authMiddleware, adminController.getAllProducts);
router.post('/products', authMiddleware, adminController.createProduct);
router.get('/products/:id', authMiddleware, adminController.getProductById);
router.put('/products/:id', authMiddleware, adminController.updateProduct);
router.delete('/products/:id', authMiddleware, adminController.deleteProduct);

// Order management routes
router.get('/orders', authMiddleware, adminController.getAllOrders);
router.get('/orders/:id', authMiddleware, adminController.getOrderById);
router.put('/orders/:id/status', authMiddleware, adminController.updateOrderStatus);

// Customer management routes
router.get('/customers', authMiddleware, adminController.getAllCustomers);
router.get('/customers/:id', authMiddleware, adminController.getCustomerById);

// Inventory management routes
router.get('/inventory/low-stock', authMiddleware, adminController.getLowStockItems);

export default router;