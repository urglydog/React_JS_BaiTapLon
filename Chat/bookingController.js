// bookingController.js
const db = require('./database'); // Giả sử bạn đã kết nối database ở đây

// Hàm xử lý đặt lịch hẹn
const bookAppointment = async (req, res) => {
  const {
    appointmentDateTime,
    estimatedArrivalTime,
    duration,
    serviceType,
    serviceLocation,
    deviceCategory,
    isWarrantyService,
    warrantyPeriod,
    address,
    notes,
    estimatedCost,
    customerID,
    guestName,
    guestEmail,
    guestPhone
  } = req.body;

  try {
    // Kiểm tra dữ liệu đầu vào
    if (!appointmentDateTime || !estimatedArrivalTime || !serviceType || !serviceLocation || !deviceCategory) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc.' });
    }

    // Chuẩn bị dữ liệu để chèn vào bảng appointments
    const appointmentData = {
      customerID: customerID || null,
      employeeID: null, // Có thể gán sau khi phân công nhân viên
      appointmentDateTime,
      estimatedArrivalTime,
      duration: duration || 60,
      status: 'pending',
      serviceType,
      serviceLocation,
      deviceCategory,
      isWarrantyService: isWarrantyService || false,
      warrantyPeriod: warrantyPeriod || null,
      address: serviceLocation !== 'store' ? address : null,
      notes: notes || null,
      estimatedCost: estimatedCost || null,
      guestName: customerID ? null : guestName,
      guestEmail: customerID ? null : guestEmail,
      guestPhone: customerID ? null : guestPhone
    };

    // Chèn dữ liệu vào bảng appointments
    const query = `
      INSERT INTO appointments (
        customerID, employeeID, appointmentDateTime, estimatedArrivalTime, duration,
        status, serviceType, serviceLocation, deviceCategory, isWarrantyService,
        warrantyPeriod, address, notes, estimatedCost, guestName, guestEmail, guestPhone
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      appointmentData.customerID,
      appointmentData.employeeID,
      appointmentData.appointmentDateTime,
      appointmentData.estimatedArrivalTime,
      appointmentData.duration,
      appointmentData.status,
      appointmentData.serviceType,
      appointmentData.serviceLocation,
      appointmentData.deviceCategory,
      appointmentData.isWarrantyService,
      appointmentData.warrantyPeriod,
      appointmentData.address,
      appointmentData.notes,
      appointmentData.estimatedCost,
      appointmentData.guestName,
      appointmentData.guestEmail,
      appointmentData.guestPhone
    ];

    await db.query(query, values); // Giả sử db.query là hàm thực hiện truy vấn SQL

    res.json({ success: true, message: 'Đặt lịch hẹn thành công!' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi đặt lịch hẹn. Vui lòng thử lại.' });
  }
};

module.exports = { bookAppointment };