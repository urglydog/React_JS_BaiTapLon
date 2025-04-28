// AdminPageController.js
import AdminService from '../services/AdminService.js';

export class AdminPageController {
  constructor() {
    this.adminService = new AdminService();
  }
  
  // Dashboard statistics
  getDashboardStats = async (req, res) => {
    try {
      const stats = await this.adminService.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error('Error in getDashboardStats:', error);
      res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
    }
  }
  
  // Monthly sales performance for chart
  getSalesPerformance = async (req, res) => {
    try {
      const timeframe = req.query.timeframe || 'last7days';
      const data = await this.adminService.getSalesPerformance(timeframe);
      res.json(data);
    } catch (error) {
      console.error('Error in getSalesPerformance:', error);
      res.status(500).json({ error: 'Failed to fetch sales performance data' });
    }
  }
  
  getDeviceUsage = async (req, res) => {
    try {
      const analysisType = req.query.type || 'all';
      const data = await this.adminService.getDeviceUsage(analysisType);
      res.json(data);
    } catch (error) {
      console.error('Error in getDeviceUsage:', error.message, error.stack);
      res.status(500).json({ error: 'Failed to fetch device usage data', details: error.message });
    }
  }
  
  getCategorySales = async (req, res) => {
    try {
      const data = await this.adminService.getCategorySales();
      res.json(data);
    } catch (error) {
      console.error('Error in getCategorySales:', error);
      res.status(500).json({ error: 'Failed to fetch category sales data' });
    }
  }
  
  getTrendingProducts = async (req, res) => {
    try {
      const data = await this.adminService.getTrendingProducts();
      res.json(data);
    } catch (error) {
      console.error('Error in getTrendingProducts:', error);
      res.status(500).json({ error: 'Failed to fetch trending products data' });
    }
  }
  
  getRecentOrders = async (req, res) => {
    try {
      const data = await this.adminService.getRecentOrders();
      res.json(data);
    } catch (error) {
      console.error('Error in getRecentOrders:', error);
      res.status(500).json({ error: 'Failed to fetch recent orders data' });
    }
  }
  
  // Product management methods
  getAllProducts = async (req, res) => {
    try {
      const products = await this.adminService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }
   // Product management methods
   getAllLaptop = async (req, res) => {
    try {
      const laptops = await this.adminService.getAllLaptop();
      res.json(laptops);
    } catch (error) {
      console.error('Error in getAllLaptop:', error);
      res.status(500).json({ error: 'Failed to fetch laptop' });
    }
  }
  getProductById = async (req, res) => {
    try {
      const product = await this.adminService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error in getProductById:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }
  
  createProduct = async (req, res) => {
    try {
      const product = await this.adminService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.error('Error in createProduct:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }
  
  updateProduct = async (req, res) => {
    try {
      const success = await this.adminService.updateProduct(req.params.id, req.body);
      if (!success) {
        return res.status(404).json({ error: 'Product not found or no changes made' });
      }
      res.json({ productId: req.params.id, ...req.body });
    } catch (error) {
      console.error('Error in updateProduct:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }
  
  deleteProduct = async (req, res) => {
    try {
      const success = await this.adminService.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
  
  // Order management methods
  getAllOrders = async (req, res) => {
    try {
      const orders = await this.adminService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error('Error in getAllOrders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }
  
  getOrderById = async (req, res) => {
    try {
      const orderDetails = await this.adminService.getOrderById(req.params.id);
      if (!orderDetails) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(orderDetails);
    } catch (error) {
      console.error('Error in getOrderById:', error);
      res.status(500).json({ error: 'Failed to fetch order details' });
    }
  }
  
  updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }
      
      const success = await this.adminService.updateOrderStatus(req.params.id, status);
      if (!success) {
        return res.status(404).json({ error: 'Order not found or no changes made' });
      }
      
      res.json({ message: 'Order status updated successfully', orderId: req.params.id, status });
    } catch (error) {
      console.error('Error in updateOrderStatus:', error);
      res.status(500).json({ error: 'Failed to update order status' });
    }
  }
  
  // Customer management methods
  getAllCustomers = async (req, res) => {
    try {
      const customers = await this.adminService.getAllCustomers();
      res.json(customers);
    } catch (error) {
      console.error('Error in getAllCustomers:', error);
      res.status(500).json({ error: 'Failed to fetch customers' });
    }
  }
  
  getCustomerById = async (req, res) => {
    try {
      const customerDetails = await this.adminService.getCustomerById(req.params.id);
      if (!customerDetails) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json(customerDetails);
    } catch (error) {
      console.error('Error in getCustomerById:', error);
      res.status(500).json({ error: 'Failed to fetch customer details' });
    }
  }
  
  // Inventory management methods
  getLowStockItems = async (req, res) => {
    try {
      const lowStockItems = await this.adminService.getLowStockItems();
      res.json(lowStockItems);
    } catch (error) {
      console.error('Error in getLowStockItems:', error);
      res.status(500).json({ error: 'Failed to fetch low stock items' });
    }
  }
}