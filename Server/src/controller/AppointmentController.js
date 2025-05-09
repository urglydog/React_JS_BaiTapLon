import { addAppointment, getAllAppointments } from "../services/AppointmentService.js";

const createAppointment = async (req, res) => {
  try {
    const data = req.body;

    // Validate bắt buộc
    if (!data.appointmentDateTime) {
      return res.status(400).json({
        EM: "Thời gian hẹn là bắt buộc",
        EC: -1,
        DT: []
      });
    }

    if (data.duration == null || isNaN(data.duration)) {
      return res.status(400).json({
        EM: "Thời lượng (duration) là bắt buộc và phải là số",
        EC: -1,
        DT: []
      });
    }

    if (data.customerType === 'guest') {
      if (!data.guestName || !data.guestPhone) {
        return res.status(400).json({
          EM: "Thông tin khách vãng lai (tên và số điện thoại) là bắt buộc",
          EC: -1,
          DT: []
        });
      }
    } else if (data.customerType === 'registered') {
      if (!data.customerID) {
        return res.status(400).json({
          EM: "Thiếu mã khách hàng cho khách đã đăng ký",
          EC: -1,
          DT: []
        });
      }
    }

    if (data.serviceLocation !== 'store' && !data.address) {
      return res.status(400).json({
        EM: "Địa chỉ là bắt buộc khi địa điểm dịch vụ không phải là cửa hàng",
        EC: -1,
        DT: []
      });
    }

    // Validate parts nếu có
    if (Array.isArray(data.parts)) {
      for (let i = 0; i < data.parts.length; i++) {
        const part = data.parts[i];
        if (
          part.quantity == null ||
          part.unitPrice == null ||
          part.status == null
        ) {
          return res.status(400).json({
            EM: `Linh kiện thứ ${i + 1} thiếu thông tin bắt buộc (quantity, unitPrice, status)`,
            EC: -1,
            DT: []
          });
        }
      }
    }

    // Gọi service thêm lịch hẹn
    const result = await addAppointment(data);

    return res.status(result.EC === 1 ? 201 : 400).json(result);
  } catch (error) {
    console.error("Lỗi controller createAppointment:", error);
    return res.status(500).json({
      EM: "Lỗi server khi tạo lịch hẹn",
      EC: -1,
      DT: []
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const result = await getAllAppointments();

    return res.status(result.EC === 1 ? 200 : 400).json(result);
  } catch (error) {
    console.error("Lỗi controller getAppointments:", error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy danh sách lịch hẹn",
      EC: -1,
      DT: []
    });
  }
};

export { createAppointment, getAppointments };
