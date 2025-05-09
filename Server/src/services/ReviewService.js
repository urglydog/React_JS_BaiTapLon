import db from "../config/db.js";

const getCustomerNameById = async (customerID) => {
  try {
    const [rows] = await db.query(`
      SELECT fullName
      FROM customers
      WHERE customerID = ?
    `, [customerID]);

    if (rows.length === 0) {
      return {
        EM: "Không tìm thấy khách hàng",
        EC: 0,
        DT: null,
      };
    }

    return {
      EM: "Lấy tên khách hàng thành công",
      EC: 1,
      DT: rows[0].fullName,
    };
  } catch (err) {
    console.error("Lỗi getCustomerNameById: ", err);
    return {
      EM: "Lỗi truy vấn tên khách hàng",
      EC: -1,
      DT: null,
    };
  }
};

const getAllReviews = async () => {
  try {
    const [rows] = await db.query(`
      SELECT 
          r.reviewID,
          r.productID,
          r.customerID,
          r.rating,
          r.comment,
          r.reviewDate,
          p.productName
      FROM reviews r
      JOIN products p ON r.productID = p.productID
    `);

    // Lấy tên khách hàng cho từng review bằng cách gọi getCustomerNameById
    const reviewsWithCustomerNames = await Promise.all(
      rows.map(async (review) => {
        const customerNameResult = await getCustomerNameById(review.customerID);
        return {
          ...review,
          customerName: customerNameResult.EC === 1 ? customerNameResult.DT : "Khách hàng không xác định",
        };
      })
    );

    return {
      EM: "Lấy danh sách đánh giá thành công",
      EC: 1,
      DT: reviewsWithCustomerNames,
    };
  } catch (err) {
    console.error("Lỗi getAllReviews: ", err);
    return {
      EM: "Lỗi truy vấn đánh giá",
      EC: -1,
      DT: [],
    };
  }
};

export { getAllReviews, getCustomerNameById };