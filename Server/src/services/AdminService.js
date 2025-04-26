// AdminService.js
import { pool } from '../config/connectDB.js';
import { ProductModel, OrderModel, CustomerModel, OrderDetailModel } from '../model/BaseModel.js';

class AdminService {
  // Dashboard services
  async getDashboardStats() {
    const conn = await pool.getConnection();
    try {
      // Get total revenue
      const revenueQuery = `
        SELECT 
          SUM(od.unitPrice * od.quantity) as totalRevenue,
          (SELECT SUM(od2.unitPrice * od2.quantity) 
           FROM OrderDetails od2 
           JOIN Orders o2 ON od2.orderId = o2.orderId 
           WHERE MONTH(o2.orderDate) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)) as lastMonthRevenue
        FROM OrderDetails od
        JOIN Orders o ON od.orderId = o.orderId
        WHERE MONTH(o.orderDate) = MONTH(CURRENT_DATE)
      `;
      
      // Get order counts
      const ordersQuery = `
        SELECT 
          COUNT(*) as totalOrders,
          (SELECT COUNT(*) FROM Orders 
           WHERE MONTH(orderDate) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)) as lastMonthOrders
        FROM Orders
        WHERE MONTH(orderDate) = MONTH(CURRENT_DATE)
      `;
      
      // Get new customers
      const customersQuery = `
        SELECT 
          COUNT(*) as newCustomers,
          (SELECT COUNT(*) FROM Customers 
           WHERE MONTH(registrationDate) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)) as lastMonthCustomers
        FROM Customers
        WHERE MONTH(registrationDate) = MONTH(CURRENT_DATE)
      `;
      
      // Get low stock items
      const lowStockQuery = `
        SELECT 
          COUNT(*) as lowStockItems,
          (SELECT COUNT(*) FROM Products 
           WHERE stockQuantity < 10 
           AND MONTH(updatedAt) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)) as lastMonthLowStock
        FROM Products
        WHERE stockQuantity < 10
      `;
      
      const [revenueResults] = await conn.query(revenueQuery);
      const [orderResults] = await conn.query(ordersQuery);
      const [customerResults] = await conn.query(customersQuery);
      const [lowStockResults] = await conn.query(lowStockQuery);
      
      // Calculate percentage changes
      const revenueDiff = revenueResults[0].totalRevenue - revenueResults[0].lastMonthRevenue;
      const revenueChange = (revenueDiff / revenueResults[0].lastMonthRevenue) * 100;
      
      const ordersDiff = orderResults[0].totalOrders - orderResults[0].lastMonthOrders;
      const ordersChange = (ordersDiff / orderResults[0].lastMonthOrders) * 100;
      
      const customersDiff = customerResults[0].newCustomers - customerResults[0].lastMonthCustomers;
      const customersChange = (customersDiff / customerResults[0].lastMonthCustomers) * 100;
      
      const lowStockDiff = lowStockResults[0].lowStockItems - lowStockResults[0].lastMonthLowStock;
      const lowStockChange = (lowStockDiff / lowStockResults[0].lastMonthLowStock) * 100;
      
      return {
        totalRevenue: {
          value: revenueResults[0].totalRevenue || 0,
          previousValue: revenueResults[0].lastMonthRevenue || 0,
          percentChange: revenueChange || 0
        },
        totalOrders: {
          value: orderResults[0].totalOrders || 0,
          previousValue: orderResults[0].lastMonthOrders || 0,
          percentChange: ordersChange || 0
        },
        newCustomers: {
          value: customerResults[0].newCustomers || 0,
          previousValue: customerResults[0].lastMonthCustomers || 0,
          percentChange: customersChange || 0
        },
        lowStock: {
          value: lowStockResults[0].lowStockItems || 0,
          previousValue: lowStockResults[0].lastMonthLowStock || 0,
          percentChange: lowStockChange || 0
        }
      };
    } catch (error) {
      console.error('Error in AdminService.getDashboardStats:', error);
      throw error;
    } finally {
      conn.release();
    }
  }
  
  async getSalesPerformance(timeframe = 'last7days') {
    const conn = await pool.getConnection();
    try {
      let query;
      if (timeframe === 'last7days') {
        query = `
          SELECT 
            DATE(o.orderDate) as date,
            SUM(od.unitPrice * od.quantity) as revenue
          FROM Orders o
          JOIN OrderDetails od ON o.orderId = od.orderId
          WHERE o.orderDate >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY)
          GROUP BY DATE(o.orderDate)
          ORDER BY date
        `;
      } else if (timeframe === 'last30days') {
        query = `
          SELECT 
            DATE(o.orderDate) as date,
            SUM(od.unitPrice * od.quantity) as revenue
          FROM Orders o
          JOIN OrderDetails od ON o.orderId = od.orderId
          WHERE o.orderDate >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
          GROUP BY DATE(o.orderDate)
          ORDER BY date
        `;
      } else if (timeframe === 'lastQuarter') {
        query = `
          SELECT 
            MONTH(o.orderDate) as month,
            SUM(od.unitPrice * od.quantity) as revenue
          FROM Orders o
          JOIN OrderDetails od ON o.orderId = od.orderId
          WHERE o.orderDate >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)
          GROUP BY MONTH(o.orderDate)
          ORDER BY month
        `;
      } else if (timeframe === 'lastYear') {
        query = `
          SELECT 
            MONTH(o.orderDate) as month,
            SUM(od.unitPrice * od.quantity) as revenue
          FROM Orders o
          JOIN OrderDetails od ON o.orderId = od.orderId
          WHERE o.orderDate >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
          GROUP BY MONTH(o.orderDate)
          ORDER BY month
        `;
      }
      
      const [results] = await conn.query(query);
      return results;
    } catch (error) {
      console.error('Error in AdminService.getSalesPerformance:', error);
      throw error;
    } finally {
      conn.release();
    }
  }
  
  async getDeviceUsage() {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          userAgent,
          COUNT(*) as count,
          ROUND((COUNT(*) / (SELECT COUNT(*) FROM Orders)) * 100, 1) as percentage
        FROM Orders
        GROUP BY userAgent
      `;
      
      const [results] = await conn.query(query);
      
      // Map user agent strings to simplified categories
      const deviceMap = {
        'Windows': 'Windows',
        'Macintosh': 'Mac',
        'iPhone': 'iOS',
        'iPad': 'iOS',
        'Android': 'Android',
        'Linux': 'Linux'
      };
      
      const processedResults = [];
      let othersCount = 0;
      
      results.forEach(item => {
        let found = false;
        for (const [key, value] of Object.entries(deviceMap)) {
          if (item.userAgent && item.userAgent.includes(key)) {
            const existingIndex = processedResults.findIndex(x => x.platform === value);
            if (existingIndex >= 0) {
              processedResults[existingIndex].percentage += parseFloat(item.percentage);
              processedResults[existingIndex].count += parseInt(item.count);
            } else {
              processedResults.push({
                platform: value,
                percentage: parseFloat(item.percentage),
                count: parseInt(item.count)
              });
            }
            found = true;
            break;
          }
        }
        
        if (!found) {
          othersCount += parseInt(item.count || 0);
        }
      });
      
      if (othersCount > 0) {
        const otherPercentage = (othersCount / (results.reduce((sum, item) => sum + parseInt(item.count || 0), 0))) * 100;
        processedResults.push({
          platform: 'Other',
          percentage: parseFloat(otherPercentage.toFixed(1)),
          count: othersCount
        });
      }
      
      return processedResults;
    } catch (error) {
      console.error('Error in AdminService.getDeviceUsage:', error);
      throw error;
    } finally {
      conn.release();
    }
  }
  
  async getCategorySales() {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          pc.categoryName,
          SUM(od.unitPrice * od.quantity) as revenue,
          ROUND((SUM(od.unitPrice * od.quantity) / 
            (SELECT SUM(od2.unitPrice * od2.quantity) FROM OrderDetails od2)) * 100, 1) as percentage
        FROM OrderDetails od
        JOIN Products p ON od.productId = p.productId
        JOIN ProductCategories pc ON p.categoryId = pc.categoryId
        GROUP BY pc.categoryId, pc.categoryName
        ORDER BY revenue DESC
      `;
      
      const [results] = await conn.query(query);
      return results;
    } catch (error) {
      console.error('Error in AdminService.getCategorySales:', error);
      throw error;
    } finally {
      conn.release();
    }
  }
  
  async getTrendingProducts() {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          p.productId,
          p.productName,
          pc.categoryName,
          SUM(od.quantity) as totalSold,
          ROUND((SUM(od.quantity) - 
            COALESCE((SELECT SUM(od2.quantity) 
                     FROM OrderDetails od2 
                     JOIN Orders o2 ON od2.orderId = o2.orderId 
                     WHERE od2.productId = p.productId 
                     AND MONTH(o2.orderDate) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)), 0)) / 
            NULLIF(COALESCE((SELECT SUM(od2.quantity) 
                          FROM OrderDetails od2 
                          JOIN Orders o2 ON od2.orderId = o2.orderId 
                          WHERE od2.productId = p.productId 
                          AND MONTH(o2.orderDate) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH)), 0), 0) * 100, 1) as percentChange
        FROM OrderDetails od
        JOIN Products p ON od.productId = p.productId
        JOIN Orders o ON od.orderId = o.orderId
        JOIN ProductCategories pc ON p.categoryId = pc.categoryId
        WHERE MONTH(o.orderDate) = MONTH(CURRENT_DATE)
        GROUP BY p.productId, p.productName, pc.categoryName
        ORDER BY totalSold DESC
        LIMIT 3
      `;
      
      const [results] = await conn.query(query);
      return results;
    } catch (error) {
      console.error('Error in AdminService.getTrendingProducts:', error);
      throw error;
    } finally {
      conn.release();
    }
  }
  
  async getRecentOrders() {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          o.orderId,
          c.fullName as customerName,
          (SELECT productName FROM Products p 
           JOIN OrderDetails od ON p.productId = od.productId 
           WHERE od.orderId = o.orderId LIMIT 1) as mainProduct,
          DATE_FORMAT(o.orderDate, '%b %d, %Y') as orderDate,
          (SELECT SUM(unitPrice * quantity) FROM OrderDetails WHERE orderId = o.orderId) as totalAmount,
          o.status
        FROM Orders o
        JOIN Customers c ON o.customerId = c.customerId
        ORDER BY o.orderDate DESC
        LIMIT 5
      `;
      
      const [results] = await conn.query(query);
      return results;
    } catch (error) {
      console.error('Error in AdminService.getRecentOrders:', error);
      throw error;
    } finally {
      conn.release();
    }
  }
  
  // Product management services
  async getAllProducts() {
    try {
      return await ProductModel.getAll();
    } catch (error) {
      console.error('Error in AdminService.getAllProducts:', error);
      throw error;
    }
  }
  
  async getProductById(id) {
    try {
      return await ProductModel.getById('productId', id);
    } catch (error) {
      console.error('Error in AdminService.getProductById:', error);
      throw error;
    }
  }
  
  async createProduct(productData) {
    try {
      const productId = await ProductModel.create(productData);
      return { productId, ...productData };
    } catch (error) {
      console.error('Error in AdminService.createProduct:', error);
      throw error;
    }
  }
  
  async updateProduct(id, productData) {
    try {
      return await ProductModel.update('productId', id, productData);
    } catch (error) {
      console.error('Error in AdminService.updateProduct:', error);
      throw error;
    }
  }
  
  async deleteProduct(id) {
    try {
      return await ProductModel.delete('productId', id);
    } catch (error) {
      console.error('Error in AdminService.deleteProduct:', error);
      throw error;
    }
  }
  
  // Order management services
  async getAllOrders() {
    try {
      return await OrderModel.getAll();
    } catch (error) {
      console.error('Error in AdminService.getAllOrders:', error);
      throw error;
    }
  }
  
  async getOrderById(id) {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          o.*,
          c.fullName as customerName,
          c.email as customerEmail,
          c.phoneNumber as customerPhone,
          c.address as customerAddress
        FROM Orders o
        JOIN Customers c ON o.customerId = c.customerId
        WHERE o.orderId = ?
      `;
      
      const [orderResult] = await conn.query(query, [id]);
      
      if (!orderResult || orderResult.length === 0) {
        return null;
      }
      
      const orderDetailsQuery = `
        SELECT 
          od.*,
          p.productName,
          p.productId,
          p.image
        FROM OrderDetails od
        JOIN Products p ON od.productId = p.productId
        WHERE od.orderId = ?
      `;
      
      const [orderDetailsResult] = await conn.query(orderDetailsQuery, [id]);
      
      return {
        order: orderResult[0],
        orderDetails: orderDetailsResult
      };
    } catch (error) {
      console.error('Error in AdminService.getOrderById:', error);
      throw error;
    } finally {
      conn.release();
    }
  }
  
  async updateOrderStatus(id, status) {
    try {
      return await OrderModel.update('orderId', id, { status });
    } catch (error) {
      console.error('Error in AdminService.updateOrderStatus:', error);
      throw error;
    }
  }
  
  // Customer management services
  async getAllCustomers() {
    try {
      return await CustomerModel.getAll();
    } catch (error) {
      console.error('Error in AdminService.getAllCustomers:', error);
      throw error;
    }
  }
  
  async getCustomerById(id) {
    const conn = await pool.getConnection();
    try {
      const customerQuery = `
        SELECT * FROM Customers WHERE customerId = ?
      `;
      
      const [customerResult] = await conn.query(customerQuery, [id]);
      
      if (!customerResult || customerResult.length === 0) {
        return null;
      }
      
      const orderQuery = `
        SELECT 
          o.orderId,
          DATE_FORMAT(o.orderDate, '%b %d, %Y') as orderDate,
          o.status,
          (SELECT SUM(unitPrice * quantity) FROM OrderDetails WHERE orderId = o.orderId) as totalAmount
        FROM Orders o
        WHERE o.customerId = ?
        ORDER BY o.orderDate DESC
      `;
      
      const [orderResult] = await conn.query(orderQuery, [id]);
      
      return {
        customer: customerResult[0],
        orders: orderResult
      };
    } catch (error) {
      console.error('Error in AdminService.getCustomerById:', error);
      throw error;
    } finally {
      conn.release();
    }
  }
  
  // Inventory management services
  async getLowStockItems() {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          p.productId,
          p.productName,
          p.stockQuantity,
          p.price,
          pc.categoryName
        FROM Products p
        JOIN ProductCategories pc ON p.categoryId = pc.categoryId
        WHERE p.stockQuantity < 10
        ORDER BY p.stockQuantity ASC
      `;
      
      const [results] = await conn.query(query);
      return results;
    } catch (error) {
      console.error('Error in AdminService.getLowStockItems:', error);
      throw error;
    } finally {
      conn.release();
    }
  }
}

export default AdminService;