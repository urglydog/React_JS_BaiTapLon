import db from "../config/db.js"; 

const getAllAppointments = async () => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.appointmentID,
        a.appointmentDateTime,
        a.duration,
        a.status,
        a.serviceType,
        a.serviceLocation,
        a.deviceCategory,
        a.notes,
        a.estimatedCost,
        COALESCE(a.guestName, c.fullName) AS customerName,
        COALESCE(a.guestPhone, c.phoneNumber) AS customerPhone,
        e.fullName AS employeeName
      FROM appointments a
      LEFT JOIN customers c ON a.customerID = c.customerID
      LEFT JOIN employees e ON a.employeeID = e.employeeID
    `);

    return {
      EM: "Lấy lịch hẹn thành công",
      EC: 1,
      DT: rows,
    };
  } catch (err) {
    console.error("Lỗi getAllAppointments: ", err);
    return {
      EM: "Lỗi truy vấn lịch hẹn",
      EC: -1,
      DT: [],
    };
  }
};

export { getAllAppointments };