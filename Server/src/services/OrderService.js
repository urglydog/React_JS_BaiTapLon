import db from "../config/db.js"; // Đảm bảo bạn đã import db từ file config/db.js

const getOrdersWithDetails = async () => {
  try {
    const [rows] = await db.query(`
      SELECT 
          o.orderID,
          o.orderDate,
          o.totalAmount,
          c.fullName AS customerName,
          e.fullName AS employeeName
      FROM Orders o
      JOIN Customers c ON o.customerID = c.customerID
      JOIN Employees e ON o.employeeID = e.employeeID
    `);

    return {
      EM: "Lấy đơn hàng thành công",
      EC: 1,
      DT: rows,
    };
  } catch (err) {
    console.error("Lỗi getOrdersWithDetails: ", err);
    return {
      EM: "Lỗi truy vấn đơn hàng",
      EC: -1,
      DT: [],
    };
  }
};

export { getOrdersWithDetails };
