import db from "../config/db.js"; // Đảm bảo bạn đã import db từ file config/db.js

const getOrdersWithDetails = async (customerID) => {
  try {
    const [rows] = await db.query(
      `
SELECT
    o.orderID,
    o.orderDate,
    o.totalAmount,
    od.quantity AS ProductQuantity,
    p.productName,
    p.price,
    p.productID,
    p.description,
    p.image
FROM
    orders o
LEFT JOIN
    orderdetails od ON o.orderID = od.orderID
LEFT JOIN
    products p ON od.productID = p.productID
JOIN
    customers c ON o.customerID = c.customerID
WHERE
    o.customerID = ?
ORDER BY
    o.orderID;
    `,
      [customerID]
    );

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

const getAllOrders = async () => {
  try {
    const [rows] = await db.query(`
      SELECT 
        orderID,
        customerID,
        employeeID,
        voucherID,
        orderDate,
        totalAmount,
        status
      FROM orders
    `);

    return {
      EM: "Lấy danh sách đơn hàng thành công",
      EC: 1,
      DT: rows,
    };
  } catch (err) {
    console.error("Lỗi getAllOrders: ", err);
    return {
      EM: "Lỗi truy vấn danh sách đơn hàng",
      EC: -1,
      DT: [],
    };
  }
};

const addOrder = async (
  customerID,
  employeeID,
  voucherID,
  totalAmount,
  status,
  cartItems
) => {
  const connection = await db.getConnection(); // Lấy kết nối từ pool
  try {
    await connection.beginTransaction(); // Bắt đầu transaction

    // Thêm đơn hàng vào bảng Orders
    const [orderResult] = await connection.query(
      `
      INSERT INTO orders (customerID, employeeID, voucherID, totalAmount, status)
      VALUES (?, ?, ?, ?, ?)
    `,
      [customerID, employeeID, voucherID, totalAmount, status]
    );

    const orderID = orderResult.insertId; // Lấy ID của đơn hàng vừa thêm

    // Thêm các chi tiết đơn hàng vào bảng OrderDetails
    for (const item of cartItems) {
      const { productID, quantity, price } = item;
      const subtotal = quantity * price;

      await connection.query(
        `
        INSERT INTO orderdetails (orderID, productID, quantity, unitPrice, subtotal)
        VALUES (?, ?, ?, ?, ?)
      `,
        [orderID, productID, quantity, price, subtotal]
      );
    }

    await connection.commit(); // Xác nhận transaction

    return {
      EM: "Thêm đơn hàng và chi tiết đơn hàng thành công",
      EC: 1,
      DT: { orderID },
    };
  } catch (err) {
    await connection.rollback(); // Rollback nếu có lỗi
    console.error("Lỗi addOrder: ", err);
    return {
      EM: "Lỗi khi thêm đơn hàng và chi tiết đơn hàng",
      EC: -1,
      DT: null,
    };
  } finally {
    connection.release(); // Giải phóng kết nối
  }
};
export { getOrdersWithDetails, getAllOrders, addOrder };
