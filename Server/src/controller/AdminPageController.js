// AdminPageController.js
import AdminService from "../services/AdminService.js";

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
      console.error("Error in getDashboardStats:", error);
      res.status(500).json({ error: "Failed to fetch dashboard statistics" });
    }
  };

  // Monthly sales performance for chart
  getSalesPerformance = async (req, res) => {
    try {
      const timeframe = req.query.timeframe || "last7days";
      const data = await this.adminService.getSalesPerformance(timeframe);
      res.json(data);
    } catch (error) {
      console.error("Error in getSalesPerformance:", error);
      res.status(500).json({ error: "Failed to fetch sales performance data" });
    }
  };

  getDeviceUsage = async (req, res) => {
    try {
      const analysisType = req.query.type || "all";
      const data = await this.adminService.getDeviceUsage(analysisType);
      res.json(data);
    } catch (error) {
      console.error("Error in getDeviceUsage:", error.message, error.stack);
      res.status(500).json({
        error: "Failed to fetch device usage data",
        details: error.message,
      });
    }
  };

  getCategorySales = async (req, res) => {
    try {
      const data = await this.adminService.getCategorySales();
      res.json(data);
    } catch (error) {
      console.error("Error in getCategorySales:", error);
      res.status(500).json({ error: "Failed to fetch category sales data" });
    }
  };

  getRecentOrders = async (req, res) => {
    try {
      const data = await this.adminService.getRecentOrders();
      res.json(data);
    } catch (error) {
      console.error("Error in getRecentOrders:", error);
      res.status(500).json({ error: "Failed to fetch recent orders data" });
    }
  };

  // Product management methods
  getAllProducts = async (req, res) => {
    try {
      const products = await this.adminService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error in getAllProducts:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  };
  // Product management methods
  getAllLaptop = async (req, res) => {
    try {
      const laptops = await this.adminService.getAllLaptop();
      res.json(laptops);
    } catch (error) {
      console.error("Error in getAllLaptop:", error);
      res.status(500).json({ error: "Failed to fetch laptop" });
    }
  };

  getAllMouse = async (req, res) => {
    try {
      const laptops = await this.adminService.getAllMouse();
      res.json(laptops);
    } catch (error) {
      console.error("Error in getAllMouse:", error);
      res.status(500).json({ error: "Failed to fetch getAllMouse" });
    }
  };
  getAllPhone = async (req, res) => {
    try {
      const laptops = await this.adminService.getAllPhone();
      res.json(laptops);
    } catch (error) {
      console.error("Error in getAllPhone:", error);
      res.status(500).json({ error: "Failed to fetch getAllPhone" });
    }
  };
  getAllKeyboard = async (req, res) => {
    try {
      const laptops = await this.adminService.getAllKeyboard();
      res.json(laptops);
    } catch (error) {
      console.error("Error in getAllKeyboard:", error);
      res.status(500).json({ error: "Failed to fetch getAllKeyboard" });
    }
  };

  getAllComputers = async (req, res) => {
    try {
      const computers = await this.adminService.getAllComputers();
      res.json(computers);
    } catch (error) {
      console.error("Error in getAllComputers:", error);
      res.status(500).json({ error: "Failed to fetch computers" });
    }
  };
  getAllTablet = async (req, res) => {
    try {
      const computers = await this.adminService.getAllTablet();
      res.json(computers);
    } catch (error) {
      console.error("Error in getAllComputers:", error);
      res.status(500).json({ error: "Failed to fetch computers" });
    }
  };
  getAllGamingGear = async (req, res) => {
    try {
      const computers = await this.adminService.getAllGamingGear();
      res.json(computers);
    } catch (error) {
      console.error("Error in getAllComputers:", error);
      res.status(500).json({ error: "Failed to fetch computers" });
    }
  };
  getAllProcessors = async (req, res) => {
    try {
      const processors = await this.adminService.getAllProcessors();
      res.json(processors);
    } catch (error) {
      console.error("Error in getAllProcessors:", error);
      res.status(500).json({ error: "Failed to fetch processors" });
    }
  };

  getAllRAM = async (req, res) => {
    try {
      const ram = await this.adminService.getAllRAM();
      res.json(ram);
    } catch (error) {
      console.error("Error in getAllRAM:", error);
      res.status(500).json({ error: "Failed to fetch RAM" });
    }
  };

  getAllStorage = async (req, res) => {
    try {
      const storage = await this.adminService.getAllStorage();
      res.json(storage);
    } catch (error) {
      console.error("Error in getAllStorage:", error);
      res.status(500).json({ error: "Failed to fetch storage" });
    }
  };

  getAllCase = async (req, res) => {
    try {
      const cases = await this.adminService.getAllCase();
      res.json(cases);
    } catch (error) {
      console.error("Error in getAllCase:", error);
      res.status(500).json({ error: "Failed to fetch cases" });
    }
  };

  getAllMainboard = async (req, res) => {
    try {
      const mainboards = await this.adminService.getAllMainboard();
      res.json(mainboards);
    } catch (error) {
      console.error("Error in getAllMainboard:", error);
      res.status(500).json({ error: "Failed to fetch mainboards" });
    }
  };

  getAllPsu = async (req, res) => {
    try {
      const psus = await this.adminService.getAllPsu();
      res.json(psus);
    } catch (error) {
      console.error("Error in getAllPsu:", error);
      res.status(500).json({ error: "Failed to fetch PSUs" });
    }
  };

  getAllPC = async (req, res) => {
    try {
      const pcs = await this.adminService.getAllPC();
      res.json(pcs);
    } catch (error) {
      console.error("Error in getAllPC:", error);
      res.status(500).json({ error: "Failed to fetch PCs" });
    }
  };

  getAllHeadphone = async (req, res) => {
    try {
      const headphones = await this.adminService.getAllHeadphone();
      res.json(headphones);
    } catch (error) {
      console.error("Error in getAllHeadphone:", error);
      res.status(500).json({ error: "Failed to fetch headphones" });
    }
  };

  getAllMousepad = async (req, res) => {
    try {
      const mousepads = await this.adminService.getAllMousepad();
      res.json(mousepads);
    } catch (error) {
      console.error("Error in getAllMousepad:", error);
      res.status(500).json({ error: "Failed to fetch mousepads" });
    }
  };

  getProductById = async (req, res) => {
    try {
      const product = await this.adminService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error in getProductById:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  };

  createProduct = async (req, res) => {
    try {
      const product = await this.adminService.createProduct(req.body);

      const sanitizedProduct = JSON.parse(
        JSON.stringify(product, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );

      res.status(201).json(sanitizedProduct);
    } catch (error) {
      console.error("Error in createProduct:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const success = await this.adminService.updateProduct(
        req.params.id,
        req.body
      );

      res.json({ productId: req.params.id, ...req.body });
    } catch (error) {
      console.error("Error in updateProduct:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      console.log("Delete request for product ID:", req.params.id);
      console.log("Type of ID:", typeof req.params.id);

      // Convert to appropriate type if needed
      const productId = Number(req.params.id) || req.params.id;

      const success = await this.adminService.deleteProduct(productId);
      console.log("Delete operation result:", success);

      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Detailed error in deleteProduct:", error);
      res.status(500).json({
        error: "Failed to delete product",
        details: error.message,
      });
    }
  };

  // Order management methods
  getAllOrders = async (req, res) => {
    try {
      const orders = await this.adminService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error in getAllOrders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  };

  getOrderById = async (req, res) => {
    try {
      const orderDetails = await this.adminService.getOrderById(req.params.id);
      if (!orderDetails) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(orderDetails);
    } catch (error) {
      console.error("Error in getOrderById:", error);
      res.status(500).json({ error: "Failed to fetch order details" });
    }
  };

  updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }

      const success = await this.adminService.updateOrderStatus(
        req.params.id,
        status
      );
      if (!success) {
        return res
          .status(404)
          .json({ error: "Order not found or no changes made" });
      }

      res.json({
        message: "Order status updated successfully",
        orderId: req.params.id,
        status,
      });
    } catch (error) {
      console.error("Error in updateOrderStatus:", error);
      res.status(500).json({ error: "Failed to update order status" });
    }
  };

  // Customer management methods
  getAllCustomers = async (req, res) => {
    try {
      const customers = await this.adminService.getAllCustomers();
      res.json(customers);
    } catch (error) {
      console.error("Error in getAllCustomers:", error);
      res.status(500).json({ error: "Failed to fetch customers" });
    }
  };

  getCustomerById = async (req, res) => {
    try {
      const customerDetails = await this.adminService.getCustomerById(
        req.params.id
      );
      if (!customerDetails) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.json(customerDetails);
    } catch (error) {
      console.error("Error in getCustomerById:", error);
      res.status(500).json({ error: "Failed to fetch customer details" });
    }
  };

  // Inventory management methods
  getLowStockItems = async (req, res) => {
    try {
      const lowStockItems = await this.adminService.getLowStockItems();
      res.json(lowStockItems);
    } catch (error) {
      console.error("Error in getLowStockItems:", error);
      res.status(500).json({ error: "Failed to fetch low stock items" });
    }
  };
  getTopCustomers = async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const topCustomers = await this.adminService.getTopCustomers(limit);
      res.json(topCustomers);
    } catch (error) {
      console.error("Error in getTopCustomers:", error);
      res
        .status(500)
        .json({ error: "Failed to fetch top customer statistics" });
    }
  };
}
