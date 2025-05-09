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

// phương thức thêm một appointment, đồng thời thêm cả apointment part
const addAppointment = async (appointmentData) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Ensure estimatedArrivalTime is calculated if not provided
    let estimatedArrival = appointmentData.estimatedArrivalTime;
    if (!estimatedArrival) {
      const appointmentDate = new Date(appointmentData.appointmentDateTime);
      estimatedArrival = new Date(appointmentDate.getTime() + 
        appointmentData.duration * 60000).toISOString();
    }

    // Insert appointment with the guaranteed estimatedArrivalTime
    const [appointmentResult] = await connection.query(
      `INSERT INTO appointments SET ?`,
      {
        customerID: appointmentData.customerType === 'registered' ? parseInt(appointmentData.customerID) : null,
        guestName: appointmentData.customerType === 'guest' ? appointmentData.guestName : null,
        guestEmail: appointmentData.customerType === 'guest' ? appointmentData.guestEmail : null,
        guestPhone: appointmentData.customerType === 'guest' ? appointmentData.guestPhone : null,
        appointmentDateTime: appointmentData.appointmentDateTime,
        estimatedArrivalTime: estimatedArrival, // Now guaranteed to have a value
        duration: parseInt(appointmentData.duration),
        status: 'pending',
        serviceType: appointmentData.serviceType,
        serviceLocation: appointmentData.serviceLocation,
        deviceCategory: appointmentData.deviceCategory,
        isWarrantyService: appointmentData.isWarrantyService ? 1 : 0,
        warrantyPeriod: appointmentData.isWarrantyService ? appointmentData.warrantyPeriod : null,
        address: appointmentData.serviceLocation !== 'store' ? appointmentData.address : null,
        notes: appointmentData.notes,
        estimatedCost: parseFloat(appointmentData.estimatedCost) || null,
      }
    );

    const appointmentID = appointmentResult.insertId;

    // Insert parts if provided
    if (appointmentData.parts && appointmentData.parts.length > 0) {
      const partValues = appointmentData.parts.map(part => [
        appointmentID,
        part.quantity,
        part.unitPrice,
        part.isReplacement ? 1 : 0,
        part.status
      ]);

      await connection.query(
        `INSERT INTO appointment_parts (appointmentID, quantity, unitPrice, isReplacement, status) VALUES ?`,
        [partValues]
      );
    }

    await connection.commit();

    return {
      EM: "Tạo lịch hẹn thành công",
      EC: 1,
      DT: {
        appointmentID,
        message: "Lịch hẹn và linh kiện đã được thêm thành công"
      }
    };
  } catch (error) {
    await connection.rollback();
    console.error("Lỗi khi thêm lịch hẹn:", error);

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return {
        EM: "Không tìm thấy khách hàng với ID đã cung cấp",
        EC: -2,
        DT: []
      };
    }

    return {
      EM: "Lỗi khi thêm lịch hẹn",
      EC: -1,
      DT: []
    };
  } finally {
    connection.release();
  }
};

export { getAllAppointments,addAppointment };