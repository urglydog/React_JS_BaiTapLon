// AdminService.js
import { pool } from "../config/connectDB.js";
import db from "../config/db.js";
import {
  ProductModel,
  OrderModel,
  CustomerModel,
  OrderDetailModel,
} from "../model/BaseModel.js";

class AdminService {
  // Dashboard services
  // 1. Sửa hàm getDashboardStats
  // getDashboardStats = async () => {
  //   const conn = await pool.getConnection();
  //   try {
  //     // Using April 2025 as current month and March 2025 as previous month
  //     const revenueQuery = `
  //       SELECT
  //         COALESCE(SUM(od.subtotal), 0) as totalRevenue,
  //         COALESCE((SELECT SUM(od2.subtotal)
  //                 FROM orderdetails od2
  //                 JOIN orders o2 ON od2.orderID = o2.orderID
  //                 WHERE MONTH(o2.orderDate) = 3
  //                 AND YEAR(o2.orderDate) = 2025), 0) as lastMonthRevenue
  //       FROM orderdetails od
  //       JOIN orders o ON od.orderID = o.orderID
  //       WHERE MONTH(o.orderDate) = 4
  //       AND YEAR(o.orderDate) = 2025
  //     `;

  //     const ordersQuery = `
  //       SELECT
  //         COUNT(*) as totalOrders,
  //         (SELECT COUNT(*) FROM orders
  //          WHERE MONTH(orderDate) = 3
  //          AND YEAR(orderDate) = 2025) as lastMonthOrders
  //       FROM orders
  //       WHERE MONTH(orderDate) = 4
  //       AND YEAR(orderDate) = 2025
  //     `;

  //     const customersQuery = `
  //       SELECT
  //         COUNT(*) as newCustomers,
  //         (SELECT COUNT(*) FROM customers
  //          WHERE MONTH(registrationDate) = 3
  //          AND YEAR(registrationDate) = 2025) as lastMonthCustomers
  //       FROM customers
  //       WHERE MONTH(registrationDate) = 4
  //       AND YEAR(registrationDate) = 2025
  //     `;

  //     // Fixed the low stock query that had a logic error
  //     const lowStockQuery = `
  //       SELECT
  //         COUNT(*) as lowStockItems,
  //         (SELECT COUNT(*) FROM products
  //          WHERE stockQuantity < 10) as lastMonthLowStock
  //       FROM products
  //       WHERE stockQuantity < 10
  //     `;

  //     const [revenueResults] = await conn.query(revenueQuery);
  //     const [orderResults] = await conn.query(ordersQuery);
  //     const [customerResults] = await conn.query(customersQuery);
  //     const [lowStockResults] = await conn.query(lowStockQuery);

  //     // Calculate percentage changes with protection against division by zero
  //     let revenueChange = 0;
  //     if (
  //       revenueResults[0]?.lastMonthRevenue &&
  //       revenueResults[0].lastMonthRevenue > 0
  //     ) {
  //       const revenueDiff =
  //         revenueResults[0].totalRevenue - revenueResults[0].lastMonthRevenue;
  //       revenueChange =
  //         (revenueDiff / revenueResults[0].lastMonthRevenue) * 100;
  //     }

  //     let ordersChange = 0;
  //     if (
  //       orderResults[0]?.lastMonthOrders &&
  //       orderResults[0].lastMonthOrders > 0
  //     ) {
  //       const ordersDiff =
  //         orderResults[0].totalOrders - orderResults[0].lastMonthOrders;
  //       ordersChange = (ordersDiff / orderResults[0].lastMonthOrders) * 100;
  //     }

  //     let customersChange = 0;
  //     if (
  //       customerResults[0]?.lastMonthCustomers &&
  //       customerResults[0].lastMonthCustomers > 0
  //     ) {
  //       const customersDiff =
  //         customerResults[0].newCustomers -
  //         customerResults[0].lastMonthCustomers;
  //       customersChange =
  //         (customersDiff / customerResults[0].lastMonthCustomers) * 100;
  //     }

  //     let lowStockChange = 0;
  //     if (
  //       lowStockResults[0]?.lastMonthLowStock &&
  //       lowStockResults[0].lastMonthLowStock > 0
  //     ) {
  //       const lowStockDiff =
  //         lowStockResults[0].lowStockItems -
  //         lowStockResults[0].lastMonthLowStock;
  //       lowStockChange =
  //         (lowStockDiff / lowStockResults[0].lastMonthLowStock) * 100;
  //     }

  //     return {
  //       totalRevenue: {
  //         value: revenueResults[0]?.totalRevenue || 0,
  //         previousValue: revenueResults[0]?.lastMonthRevenue || 0,
  //         percentChange: parseFloat(revenueChange.toFixed(2)) || 0,
  //       },
  //       totalOrders: {
  //         value: orderResults[0]?.totalOrders || 0,
  //         previousValue: orderResults[0]?.lastMonthOrders || 0,
  //         percentChange: parseFloat(ordersChange.toFixed(2)) || 0,
  //       },
  //       newCustomers: {
  //         value: customerResults[0]?.newCustomers || 0,
  //         previousValue: customerResults[0]?.lastMonthCustomers || 0,
  //         percentChange: parseFloat(customersChange.toFixed(2)) || 0,
  //       },
  //       lowStock: {
  //         value: lowStockResults[0]?.lowStockItems || 0,
  //         previousValue: lowStockResults[0]?.lastMonthLowStock || 0,
  //         percentChange: parseFloat(lowStockChange.toFixed(2)) || 0,
  //       },
  //     };
  //   } catch (error) {
  //     console.error("Error in AdminService.getDashboardStats:", error);
  //     throw error;
  //   } finally {
  //     conn.release();
  //   }
  // };

  getDashboardStats = async () => {
    const conn = await db.getConnection();
    try {
      // Using April 2025 as current month and March 2025 as previous month
      const revenueQuery = `  
        SELECT 
          COALESCE(SUM(od.subtotal), 0) as totalRevenue
        FROM orderdetails od
        JOIN orders o ON od.orderID = o.orderID
        WHERE MONTH(o.orderDate) = MONTH(CURRENT_DATE)
          AND YEAR(o.orderDate) = YEAR(CURRENT_DATE);
      `;

      const ordersQuery = `
        SELECT 
          COUNT(*) as totalOrders,
          (SELECT COUNT(*) FROM orders 
           WHERE MONTH(orderDate) = 3
           AND YEAR(orderDate) = 2025) as lastMonthOrders
        FROM orders
        WHERE MONTH(orderDate) = 4
        AND YEAR(orderDate) = 2025
      `;

      const customersQuery = `
        SELECT 
          COUNT(*) as newCustomers,
          (SELECT COUNT(*) FROM customers 
           WHERE MONTH(registrationDate) = 3
           AND YEAR(registrationDate) = 2025) as lastMonthCustomers
        FROM customers
        WHERE MONTH(registrationDate) = 4
        AND YEAR(registrationDate) = 2025
      `;

      // Fixed the low stock query that had a logic error
      const lowStockQuery = `
        SELECT 
          COUNT(*) as lowStockItems,
          (SELECT COUNT(*) FROM products 
           WHERE stockQuantity < 10) as lastMonthLowStock
        FROM products
        WHERE stockQuantity < 10
      `;

      const [revenueResults] = await conn.query(revenueQuery);
      console.log("Revenue Results:", revenueResults);
      const [orderResults] = await conn.query(ordersQuery);
      console.log("Order Results:", orderResults);
      const [customerResults] = await conn.query(customersQuery);
      console.log("Customer Results:", customerResults);
      const [lowStockResults] = await conn.query(lowStockQuery);
      console.log("Low Stock Results:", lowStockResults);

      // Calculate percentage changes with protection against division by zero
      let revenueChange = 0;
      if (
        revenueResults[0]?.lastMonthRevenue &&
        revenueResults[0].lastMonthRevenue > 0
      ) {
        const revenueDiff =
          revenueResults[0].totalRevenue - revenueResults[0].lastMonthRevenue;
        revenueChange =
          (revenueDiff / revenueResults[0].lastMonthRevenue) * 100;
      }

      let ordersChange = 0;
      if (
        orderResults[0]?.lastMonthOrders &&
        orderResults[0].lastMonthOrders > 0
      ) {
        const ordersDiff =
          orderResults[0].totalOrders - orderResults[0].lastMonthOrders;
        ordersChange = (ordersDiff / orderResults[0].lastMonthOrders) * 100;
      }

      let customersChange = 0;
      if (
        customerResults[0]?.lastMonthCustomers &&
        customerResults[0].lastMonthCustomers > 0
      ) {
        const customersDiff =
          customerResults[0].newCustomers -
          customerResults[0].lastMonthCustomers;
        customersChange =
          (customersDiff / customerResults[0].lastMonthCustomers) * 100;
      }

      let lowStockChange = 0;
      if (
        lowStockResults[0]?.lastMonthLowStock &&
        lowStockResults[0].lastMonthLowStock > 0
      ) {
        const lowStockDiff =
          lowStockResults[0].lowStockItems -
          lowStockResults[0].lastMonthLowStock;
        lowStockChange =
          (lowStockDiff / lowStockResults[0].lastMonthLowStock) * 100;
      }

      return {
        totalRevenue: {
          value: Number(revenueResults[0].totalRevenue) || 0,
          previousValue: Number(revenueResults[0].lastMonthRevenue) || 0,
          percentChange: parseFloat(revenueChange.toFixed(2)) || 0,
        },
        totalOrders: {
          value: Number(orderResults[0].totalOrders) || 0,
          previousValue: Number(orderResults[0].lastMonthOrders) || 0,
          percentChange: parseFloat(ordersChange.toFixed(2)) || 0,
        },
        newCustomers: {
          value: Number(customerResults[0].newCustomers) || 0,
          previousValue: Number(customerResults[0].lastMonthCustomers) || 0,
          percentChange: parseFloat(customersChange.toFixed(2)) || 0,
        },
        lowStock: {
          value: Number(lowStockResults[0].lowStockItems) || 0,
          previousValue: Number(lowStockResults[0].lastMonthLowStock) || 0,
          percentChange: parseFloat(lowStockChange.toFixed(2)) || 0,
        },
      };
    } catch (error) {
      console.error("Error in AdminService.getDashboardStats:", error);
      throw error;
    } finally {
      conn.release();
    }
  };

  getSalesPerformance = async (timeframe = "last7days") => {
    const conn = await pool.getConnection();
    try {
      const validTimeframes = [
        "last7days",
        "last30days",
        "lastQuarter",
        "lastYear",
      ];
      if (!validTimeframes.includes(timeframe)) {
        throw new Error("Invalid timeframe parameter");
      }

      // Check if we have any orders
      const [orderCheck] = await conn.query(
        "SELECT COUNT(*) AS orderCount FROM orders"
      );
      const orderCount =
        orderCheck && orderCheck[0] && orderCheck[0].orderCount
          ? Number(orderCheck[0].orderCount)
          : 0;
      console.log("Total orders in database:", orderCount);

      if (orderCount === 0) {
        console.log("No orders in the database");
        return [];
      }

      // Check if we have any order details
      const [detailCheck] = await conn.query(
        "SELECT COUNT(*) AS detailCount FROM orderdetails"
      );
      const detailCount =
        detailCheck && detailCheck[0] && detailCheck[0].detailCount
          ? Number(detailCheck[0].detailCount)
          : 0;
      console.log("Total order details in database:", detailCount);

      if (detailCount === 0) {
        console.log("No order details in the database");
        return [];
      }

      // Get the latest order date
      const [dateResult] = await conn.query(
        "SELECT MAX(orderDate) AS latestDate FROM orders"
      );
      let referenceDate =
        dateResult && dateResult[0] && dateResult[0].latestDate
          ? dateResult[0].latestDate
          : null;

      if (!referenceDate) {
        console.log("No valid latest order date found");
        return [];
      }
      console.log("Reference Date:", referenceDate);

      // Check if we have any orders in the timeframe
      let timeframeSQL = "";
      if (timeframe === "last7days") {
        timeframeSQL = "DATE_SUB(?, INTERVAL 7 DAY)";
      } else if (timeframe === "last30days") {
        timeframeSQL = "DATE_SUB(?, INTERVAL 30 DAY)";
      } else if (timeframe === "lastQuarter") {
        timeframeSQL = "DATE_SUB(?, INTERVAL 3 MONTH)";
      } else if (timeframe === "lastYear") {
        timeframeSQL = "DATE_SUB(?, INTERVAL 1 YEAR)";
      }

      const timeframeQuery = `
            SELECT COUNT(*) AS orderCount 
            FROM orders 
            WHERE orderDate >= ${timeframeSQL}
        `;

      try {
        const [timeframeResults] = await conn.query(timeframeQuery, [
          referenceDate,
        ]);
        const timeframeCount =
          timeframeResults &&
          timeframeResults[0] &&
          timeframeResults[0].orderCount
            ? Number(timeframeResults[0].orderCount)
            : 0;
        console.log(`Orders in ${timeframe} timeframe:`, timeframeCount);

        if (timeframeCount === 0) {
          console.log(`No orders found in the ${timeframe} timeframe`);
          return [];
        }
      } catch (queryError) {
        console.error("Error executing timeframe query:", queryError);
        return [];
      }

      // Main query to get sales performance data
      let query;
      if (timeframe === "last7days") {
        query = `
                SELECT 
                    DATE(o.orderDate) AS date,
                    COALESCE(SUM(IFNULL(od.subtotal, 0)), 0) AS revenue,
                    COUNT(DISTINCT o.orderID) AS orderCount
                FROM orders o
                LEFT JOIN orderdetails od ON o.orderID = od.orderID
                WHERE o.orderDate >= DATE_SUB(?, INTERVAL 7 DAY)
                GROUP BY DATE(o.orderDate)
                ORDER BY date
            `;
      } else if (timeframe === "last30days") {
        query = `
                SELECT 
                    DATE(o.orderDate) AS date,
                    COALESCE(SUM(IFNULL(od.subtotal, 0)), 0) AS revenue,
                    COUNT(DISTINCT o.orderID) AS orderCount
                FROM orders o
                LEFT JOIN orderdetails od ON o.orderID = od.orderID
                WHERE o.orderDate >= DATE_SUB(?, INTERVAL 30 DAY)
                GROUP BY DATE(o.orderDate)
                ORDER BY date
            `;
      } else if (timeframe === "lastQuarter") {
        query = `
                SELECT 
                    CONCAT(YEAR(o.orderDate), '-', LPAD(MONTH(o.orderDate), 2, '0')) AS yearMonth,
                    MONTH(o.orderDate) AS month,
                    MONTHNAME(o.orderDate) AS monthName,
                    COALESCE(SUM(IFNULL(od.subtotal, 0)), 0) AS revenue,
                    COUNT(DISTINCT o.orderID) AS orderCount
                FROM orders o
                LEFT JOIN orderdetails od ON o.orderID = od.orderID
                WHERE o.orderDate >= DATE_SUB(?, INTERVAL 3 MONTH)
                GROUP BY YEAR(o.orderDate), MONTH(o.orderDate), MONTHNAME(o.orderDate)
                ORDER BY yearMonth
            `;
      } else if (timeframe === "lastYear") {
        query = `
                SELECT 
                    CONCAT(YEAR(o.orderDate), '-', LPAD(MONTH(o.orderDate), 2, '0')) AS yearMonth,
                    MONTH(o.orderDate) AS month,
                    MONTHNAME(o.orderDate) AS monthName,
                    COALESCE(SUM(IFNULL(od.subtotal, 0)), 0) AS revenue,
                    COUNT(DISTINCT o.orderID) AS orderCount
                FROM orders o
                LEFT JOIN orderdetails od ON o.orderID = od.orderID
                WHERE o.orderDate >= DATE_SUB(?, INTERVAL 1 YEAR)
                GROUP BY YEAR(o.orderDate), MONTH(o.orderDate), MONTHNAME(o.orderDate)
                ORDER BY yearMonth
            `;
      }

      console.log("Executing query with reference date:", referenceDate);

      try {
        const [results] = await conn.query(query, [referenceDate]);
        console.log("Raw Results:", results);

        let resultArray = Array.isArray(results)
          ? results
          : results
          ? [results]
          : [];
        console.log("Results after array conversion:", resultArray);

        if (resultArray.length === 0) {
          console.log("Empty results array");
          return [];
        }

        const formattedResults = resultArray.map((item) => ({
          ...item,
          revenue: parseFloat(item.revenue) || 0,
          orderCount: parseInt(item.orderCount) || 0,
        }));

        console.log("Formatted results:", formattedResults);
        return formattedResults;
      } catch (finalQueryError) {
        console.error("Error executing final query:", finalQueryError);
        return [];
      }
    } catch (error) {
      console.error("Error in AdminService.getSalesPerformance:", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  };

  getCategorySales = async () => {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          pc.categoryName,
          SUM(od.unitPrice * od.quantity) as revenue,
          ROUND((SUM(od.unitPrice * od.quantity) / 
            (SELECT SUM(od2.unitPrice * od2.quantity) FROM orderdetails od2)) * 100, 1) as percentage
        FROM orderdetails od
        JOIN products p ON od.productId = p.productId
        JOIN productcategories pc ON p.categoryId = pc.categoryId
        GROUP BY pc.categoryId, pc.categoryName
        ORDER BY revenue DESC
      `;

      const [results] = await conn.query(query);
      return results;
    } catch (error) {
      console.error("Error in AdminService.getCategorySales:", error);
      throw error;
    } finally {
      conn.release();
    }
  };
  getPaymentMethodDistribution = async () => {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          pm.methodName,
          COUNT(p.paymentID) as count,
          ROUND((COUNT(p.paymentID) / (SELECT COUNT(*) FROM payments)) * 100, 1) as percentage
        FROM payments p
        JOIN paymentmethods pm ON p.paymentMethodID = pm.paymentID
        GROUP BY pm.methodName
        ORDER BY count DESC
      `;

      const [results] = await conn.query(query);

      return results || [];
    } catch (error) {
      console.error(
        "Error in AdminService.getPaymentMethodDistribution:",
        error
      );
      throw error;
    } finally {
      conn.release();
    }
  };

  getProductCategoryDistribution = async () => {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          pc.categoryName,
          COUNT(p.productID) as productCount,
          ROUND((COUNT(p.productID) / (SELECT COUNT(*) FROM products)) * 100, 1) as percentage
        FROM products p
        JOIN productcategories pc ON p.categoryID = pc.categoryID
        GROUP BY pc.categoryName
        ORDER BY productCount DESC
      `;

      const [results] = await conn.query(query);

      return results || [];
    } catch (error) {
      console.error(
        "Error in AdminService.getProductCategoryDistribution:",
        error
      );
      throw error;
    } finally {
      conn.release();
    }
  };
  getDeviceUsage = async (analysisType = "all") => {
    const conn = await pool.getConnection();
    try {
      let results = {};

      // Category analytics
      if (analysisType === "all" || analysisType === "category") {
        // Đảm bảo nhận kết quả là mảng bằng cách thêm GROUP BY
        const categoryQuery = `
          SELECT pc.categoryName, 
            COUNT(od.orderDetailID) as orderCount,
            SUM(od.quantity) as totalQuantitySold,
            ROUND(SUM(od.subtotal), 2) as totalRevenue,
            ROUND((COUNT(od.orderDetailID) / (SELECT COUNT(*) FROM orderdetails)) * 100, 1) as percentage
          FROM orderdetails od
          JOIN products p ON od.productID = p.productID
          JOIN productcategories pc ON p.categoryID = pc.categoryID
          JOIN orders o ON od.orderID = o.orderID
          WHERE o.status = 'Completed'
          GROUP BY pc.categoryName
          ORDER BY totalRevenue DESC`;

        console.log("Executing category query...");
        const [categoryResults] = await conn.query(categoryQuery);
        console.log(
          "Category query result type:",
          Array.isArray(categoryResults) ? "array" : typeof categoryResults
        );

        // Chuyển đổi đối tượng đơn lẻ thành mảng nếu cần
        const categoryArray = Array.isArray(categoryResults)
          ? categoryResults
          : [categoryResults];

        // Lọc bỏ giá trị undefined hoặc null
        results.categories = categoryArray
          .filter((item) => item && item.categoryName) // Đảm bảo item tồn tại và có categoryName
          .map((item) => ({
            category: item.categoryName,
            orderCount: parseInt(item.orderCount || 0),
            quantitySold: parseInt(item.totalQuantitySold || 0),
            revenue: parseFloat(item.totalRevenue || 0),
            percentage: parseFloat(item.percentage || 0),
          }));
      }

      // Brand analytics
      if (analysisType === "all" || analysisType === "brand") {
        const brandQuery = `
          SELECT pc.brandName, 
            COUNT(od.orderDetailID) as orderCount,
            SUM(od.quantity) as totalQuantitySold,
            ROUND(SUM(od.subtotal), 2) as totalRevenue,
            ROUND((COUNT(od.orderDetailID) / (SELECT COUNT(*) FROM orderdetails)) * 100, 1) as percentage
          FROM orderdetails od
          JOIN products p ON od.productID = p.productID
          JOIN productcategories pc ON p.categoryID = pc.categoryID
          JOIN orders o ON od.orderID = o.orderID
          WHERE o.status = 'Completed'
          GROUP BY pc.brandName
          ORDER BY totalRevenue DESC`;

        console.log("Executing brand query...");
        const [brandResults] = await conn.query(brandQuery);
        console.log(
          "Brand query result type:",
          Array.isArray(brandResults) ? "array" : typeof brandResults
        );

        const brandArray = Array.isArray(brandResults)
          ? brandResults
          : [brandResults];

        results.brands = brandArray
          .filter((item) => item && item.brandName)
          .map((item) => ({
            brand: item.brandName,
            orderCount: parseInt(item.orderCount || 0),
            quantitySold: parseInt(item.totalQuantitySold || 0),
            revenue: parseFloat(item.totalRevenue || 0),
            percentage: parseFloat(item.percentage || 0),
          }));
      }

      if (analysisType === "all" || analysisType === "distribution") {
        const distributionQuery = `
          SELECT categoryName, 
            COUNT(*) as productCount,
            ROUND((COUNT(*) / (SELECT COUNT(*) FROM productcategories)) * 100, 1) as percentage
          FROM productcategories
          GROUP BY categoryName
          ORDER BY productCount DESC`;

        console.log("Executing distribution query...");
        const [distributionResults] = await conn.query(distributionQuery);
        console.log(
          "Distribution query result type:",
          Array.isArray(distributionResults)
            ? "array"
            : typeof distributionResults
        );

        // Chuyển đổi đối tượng đơn lẻ thành mảng nếu cần
        const distributionArray = Array.isArray(distributionResults)
          ? distributionResults
          : [distributionResults];

        results.distribution = distributionArray
          .filter((item) => item && item.categoryName)
          .map((item) => ({
            category: item.categoryName,
            count: parseInt(item.productCount || 0),
            percentage: parseFloat(item.percentage || 0),
          }));
      }

      return results;
    } catch (error) {
      console.error("Error in AdminService.getDeviceUsage:", error);
      throw error;
    } finally {
      conn.release();
    }
  };

  // 3. Improved getTrendingProducts function with better error handling

  getRecentOrders = async () => {
    const conn = await pool.getConnection();
    try {
      const query = `
       SELECT 
  o.orderId,
  c.fullName AS customerName,
  GROUP_CONCAT(p.productName SEPARATOR ', ') AS productNames,
  DATE_FORMAT(o.orderDate, '%b %d, %Y') AS orderDate,
  o.status,
  (SELECT SUM(unitPrice * quantity) 
   FROM orderdetails 
   WHERE orderId = o.orderId) AS totalAmount
FROM (
  SELECT * FROM orders 
  ORDER BY orderDate DESC 
  LIMIT 5
) o
JOIN customers c ON o.customerId = c.customerId
JOIN orderdetails od ON o.orderId = od.orderId
JOIN products p ON od.productId = p.productId
GROUP BY o.orderId, c.fullName, o.orderDate, o.status
ORDER BY o.orderDate DESC;
      `;

      const [results] = await conn.query(query);
      return results;
    } catch (error) {
      console.error("Error in AdminService.getRecentOrders:", error);
      throw error;
    } finally {
      conn.release();
    }
  };

  // Product management services
  getAllProducts = async () => {
    try {
      return await ProductModel.getAll();
    } catch (error) {
      console.error("Error in AdminService.getAllProducts:", error);
      throw error;
    }
  };
  getAllLaptop = async () => {
    try {
      return await ProductModel.getAllLaptop();
    } catch (error) {
      console.error("Error in AdminService.getAllLaptop:", error);
      throw error;
    }
  };

  getAllPhone = async () => {
    try {
      return await ProductModel.getAllPhone();
    } catch (error) {
      console.error("Error in AdminService.getAllLaptop:", error);
      throw error;
    }
  };
  getAllMouse = async () => {
    try {
      return await ProductModel.getAllMouse();
    } catch (error) {
      console.error("Error in AdminService.getAllLaptop:", error);
      throw error;
    }
  };
  getAllKeyboard = async () => {
    try {
      return await ProductModel.getAllKeyboard();
    } catch (error) {
      console.error("Error in AdminService.getAllLaptop:", error);
      throw error;
    }
  };
  getAllComputers = async () => {
    try {
      return await ProductModel.getAllComputers();
    } catch (error) {
      console.error("Error in AdminService.getAllComputers:", error);
      throw error;
    }
  };
  getAllTablet = async () => {
    try {
      return await ProductModel.getAllTablet();
    } catch (error) {
      console.error("Error in AdminService.getAllTablet:", error);
      throw error;
    }
  };
  getAllGamingGear = async () => {
    try {
      return await ProductModel.getAllGamingGear();
    } catch (error) {
      console.error("Error in AdminService.getAllGamingGear:", error);
      throw error;
    }
  };
  getAllProcessors = async () => {
    try {
      return await ProductModel.getAllProcessors();
    } catch (error) {
      console.error("Error in AdminService.getAllProcessors:", error);
      throw error;
    }
  };

  getAllRAM = async () => {
    try {
      return await ProductModel.getAllRAM();
    } catch (error) {
      console.error("Error in AdminService.getAllRAM:", error);
      throw error;
    }
  };

  getAllStorage = async () => {
    try {
      return await ProductModel.getAllStorage();
    } catch (error) {
      console.error("Error in AdminService.getAllStorage:", error);
      throw error;
    }
  };

  getAllCase = async () => {
    try {
      return await ProductModel.getAllCase();
    } catch (error) {
      console.error("Error in AdminService.getAllCase:", error);
      throw error;
    }
  };

  getAllMainboard = async () => {
    try {
      return await ProductModel.getAllMainboard();
    } catch (error) {
      console.error("Error in AdminService.getAllMainboard:", error);
      throw error;
    }
  };

  getAllPsu = async () => {
    try {
      return await ProductModel.getAllPsu();
    } catch (error) {
      console.error("Error in AdminService.getAllPsu:", error);
      throw error;
    }
  };

  getAllPC = async () => {
    try {
      return await ProductModel.getAllPC();
    } catch (error) {
      console.error("Error in AdminService.getAllPC:", error);
      throw error;
    }
  };

  getAllHeadphone = async () => {
    try {
      return await ProductModel.getAllHeadphone();
    } catch (error) {
      console.error("Error in AdminService.getAllHeadphone:", error);
      throw error;
    }
  };

  getAllMousepad = async () => {
    try {
      return await ProductModel.getAllMousepad();
    } catch (error) {
      console.error("Error in AdminService.getAllMousepad:", error);
      throw error;
    }
  };
  getProductById = async (id) => {
    try {
      return await ProductModel.getById("productId", id);
    } catch (error) {
      console.error("Error in AdminService.getProductById:", error);
      throw error;
    }
  };

  createProduct = async (productData) => {
    try {
      const productId = await ProductModel.create(productData);
      console.log("Created product with ID:", productId);

      const createdProduct = { id: productId, ...productData };
      console.log("Returning product data:", createdProduct);
      return createdProduct;
    } catch (error) {
      console.error("Error in AdminService.createProduct:", error);
      throw error;
    }
  };
  updateProduct = async (id, productData) => {
    console.log("Service cập nhật sản phẩm ID:", id, "Dữ liệu:", productData);
    try {
      if (Object.keys(productData).length === 0) {
        throw new Error("Không có trường nào được cung cấp để cập nhật");
      }
      return await ProductModel.update("productId", id, productData);
    } catch (error) {
      console.error("Error in AdminService.updateProduct:", error);
      throw error;
    }
  };
  deleteProduct = async (productId) => {
    try {
      console.log("ProductID received in deleteProduct:", productId);
      console.log("Type of productId:", typeof productId);
      if (
        !productId ||
        productId === undefined ||
        productId === null ||
        (typeof productId === "string" && productId.trim() === "")
      ) {
        throw new Error("ID sản phẩm không hợp lệ");
      }
      const id =
        typeof productId === "string" && !isNaN(productId)
          ? Number(productId)
          : productId;
      console.log("Converted ID:", id);
      console.log("Type of converted ID:", typeof id);
      const result = await ProductModel.delete("productID", id);
      console.log("Delete operation result:", result); // In: true
      return result && result.success; // Vấn đề: result.success không tồn tại
    } catch (error) {
      console.error("Detailed error in deleteProduct:", error);
      throw new Error(`Không thể xóa sản phẩm: ${error.message}`);
    }
  };
  // Order management services
  getAllOrders = async () => {
    try {
      return await OrderModel.getAll();
    } catch (error) {
      console.error("Error in AdminService.getAllOrders:", error);
      throw error;
    }
  };

  getOrderById = async (id) => {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          o.*,
          c.fullName as customerName,
          c.email as customerEmail,
          c.phoneNumber as customerPhone,
          c.address as customerAddress
        FROM orders o
        JOIN customers c ON o.customerId = c.customerId
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
        FROM orderdetails od
        JOIN products p ON od.productId = p.productId
        WHERE od.orderId = ?
      `;

      const [orderDetailsResult] = await conn.query(orderDetailsQuery, [id]);

      return {
        order: orderResult[0],
        orderDetails: orderDetailsResult,
      };
    } catch (error) {
      console.error("Error in AdminService.getOrderById:", error);
      throw error;
    } finally {
      conn.release();
    }
  };

  updateOrderStatus = async (id, status) => {
    try {
      return await OrderModel.update("orderId", id, { status });
    } catch (error) {
      console.error("Error in AdminService.updateOrderStatus:", error);
      throw error;
    }
  };

  // Customer management services
  getAllCustomers = async () => {
    try {
      return await CustomerModel.getAll();
    } catch (error) {
      console.error("Error in AdminService.getAllCustomers:", error);
      throw error;
    }
  };

  getCustomerById = async (id) => {
    const conn = await pool.getConnection();
    try {
      const customerQuery = `
        SELECT * FROM customers WHERE customerId = ?
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
          (SELECT SUM(unitPrice * quantity) FROM orderdetails WHERE orderId = o.orderId) as totalAmount
        FROM orders o
        WHERE o.customerId = ?
        ORDER BY o.orderDate DESC
      `;

      const [orderResult] = await conn.query(orderQuery, [id]);

      return {
        customer: customerResult[0],
        orders: orderResult,
      };
    } catch (error) {
      console.error("Error in AdminService.getCustomerById:", error);
      throw error;
    } finally {
      conn.release();
    }
  };

  // Inventory management services
  getLowStockItems = async () => {
    const conn = await pool.getConnection();
    try {
      const query = `
        SELECT 
          p.productId,
          p.productName,
          p.stockQuantity,
          p.price,
          pc.categoryName
        FROM products p
        JOIN productcategories pc ON p.categoryId = pc.categoryId
        WHERE p.stockQuantity < 10
        ORDER BY p.stockQuantity ASC
      `;

      const [results] = await conn.query(query);
      return results;
    } catch (error) {
      console.error("Error in AdminService.getLowStockItems:", error);
      throw error;
    } finally {
      conn.release();
    }
  };
  getTopCustomers = async () => {
    const conn = await pool.getConnection();
    try {
      const query = `
            SELECT 
                c.customerId,
                c.fullName,
                c.email,
                COUNT(o.orderId) as orderCount,
                COALESCE(SUM(o.totalAmount), 0) as totalSpent,
                MAX(o.orderDate) as lastOrderDate
            FROM customers c
            JOIN orders o ON c.customerId = o.customerId
            WHERE o.status = 'Completed'
            GROUP BY c.customerId, c.fullName, c.email
        `;

      console.log("Executing query to get customers with completed orders");

      // Thực thi query
      const result = await conn.query(query);
      console.log("Raw query result:", result);

      // Xử lý các định dạng kết quả khác nhau
      let customers = [];

      // Định dạng 1: [rows, fields]
      if (
        Array.isArray(result) &&
        result.length > 0 &&
        Array.isArray(result[0])
      ) {
        console.log("Format detected: [rows, fields]");
        customers = result[0]; // result[0] phải là mảng
      }
      // Định dạng 2: {rows: [...], fields: [...]}
      else if (result && result.rows) {
        console.log("Format detected: {rows, fields}");
        customers = result.rows;
      }
      // Định dạng 3: Kết quả trực tiếp là mảng
      else if (Array.isArray(result)) {
        console.log("Format detected: direct array");
        customers = result;
      }
      // Định dạng 4: Kết quả trực tiếp là object
      else if (result && typeof result === "object") {
        console.log("Format detected: direct object");
        customers = [result];
      }

      console.log(
        "Processed customers data type:",
        typeof customers,
        Array.isArray(customers)
      );

      // Đảm bảo customers là một mảng
      if (!Array.isArray(customers)) {
        console.log("Converting to array:", customers);
        customers = customers ? [customers] : [];
      }

      if (customers.length === 0) {
        console.log("No customer results found");
        return [];
      }

      console.log("Processing", customers.length, "customer records");

      // Format dữ liệu để hiển thị
      const formattedResults = customers.map((customer) => {
        console.log("Processing customer:", customer);
        return {
          customerId: customer.customerId,
          fullName: customer.fullName,
          email: customer.email,
          orderCount: Number(customer.orderCount), // Chuyển BigInt thành Number
          totalSpent: parseFloat(customer.totalSpent || 0).toFixed(2),
          lastOrderDate: customer.lastOrderDate
            ? new Date(customer.lastOrderDate).toLocaleDateString()
            : null,
        };
      });

      console.log("Final formatted results:", formattedResults);
      return formattedResults;
    } catch (error) {
      console.error("Error in AdminService.getTopCustomers:", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  };
}

export default AdminService;
