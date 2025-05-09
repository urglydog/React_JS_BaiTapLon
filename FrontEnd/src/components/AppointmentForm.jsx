"use client"

import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { toast } from "react-toastify" // Make sure to import toast
export default function AppointmentForm() {
  const { user } = useContext(UserContext)
  console.log("Người dùng là", user)

  const backendURL = import.meta.env.VITE_BACK_END_URL

  // Bảng giá và thời gian dự kiến theo loại dịch vụ và địa điểm
  const servicePricing = {
    repair: {
      store: { baseDuration: 60, baseCost: 200000 },
      home: { baseDuration: 90, baseCost: 350000 },
      office: { baseDuration: 90, baseCost: 400000 },
    },
    assembly: {
      store: { baseDuration: 120, baseCost: 300000 },
      home: { baseDuration: 150, baseCost: 450000 },
      office: { baseDuration: 150, baseCost: 500000 },
    },
    installation: {
      store: { baseDuration: 45, baseCost: 150000 },
      home: { baseDuration: 75, baseCost: 250000 },
      office: { baseDuration: 75, baseCost: 300000 },
    },
    purchase: {
      store: { baseDuration: 30, baseCost: 0 },
      home: { baseDuration: 60, baseCost: 100000 },
      office: { baseDuration: 60, baseCost: 150000 },
    },
    consultation: {
      store: { baseDuration: 30, baseCost: 100000 },
      home: { baseDuration: 60, baseCost: 200000 },
      office: { baseDuration: 60, baseCost: 250000 },
    },
    maintenance: {
      store: { baseDuration: 90, baseCost: 250000 },
      home: { baseDuration: 120, baseCost: 400000 },
      office: { baseDuration: 120, baseCost: 450000 },
    },
    upgrade: {
      store: { baseDuration: 120, baseCost: 300000 },
      home: { baseDuration: 150, baseCost: 450000 },
      office: { baseDuration: 150, baseCost: 500000 },
    },
    data_recovery: {
      store: { baseDuration: 180, baseCost: 500000 },
      home: { baseDuration: 210, baseCost: 650000 },
      office: { baseDuration: 210, baseCost: 700000 },
    },
    warranty_service: {
      store: { baseDuration: 60, baseCost: 0 },
      home: { baseDuration: 90, baseCost: 150000 },
      office: { baseDuration: 90, baseCost: 200000 },
    },
    software_installation: {
      store: { baseDuration: 45, baseCost: 150000 },
      home: { baseDuration: 75, baseCost: 250000 },
      office: { baseDuration: 75, baseCost: 300000 },
    },
    other: {
      store: { baseDuration: 60, baseCost: 200000 },
      home: { baseDuration: 90, baseCost: 350000 },
      office: { baseDuration: 90, baseCost: 400000 },
    },
  }

  // Bảng giá linh kiện theo loại thiết bị
  const devicePartsPricing = {
    BanPhim: 350000,
    Mouse: 250000,
    Mousepad: 150000,
    GamingGear: 500000,
    Headphone: 400000,
    Case: 800000,
    CPU: 3500000,
    Main: 2500000,
    PSU: 1200000,
    HDD: 1500000,
    RAM: 1000000,
    VGA: 5000000,
    screen: 3000000,
    PC: 15000000,
    Laptop: 12000000,
    iPad: 8000000,
    Phone: 5000000,
    other: 500000,
  }

  // Mô tả linh kiện mặc định theo loại thiết bị
  const devicePartsDescription = {
    BanPhim: "Bàn phím thay thế",
    Mouse: "Chuột thay thế",
    Mousepad: "Lót chuột thay thế",
    GamingGear: "Thiết bị gaming thay thế",
    Headphone: "Tai nghe thay thế",
    Case: "Vỏ máy thay thế",
    CPU: "CPU thay thế",
    Main: "Mainboard thay thế",
    PSU: "Nguồn thay thế",
    HDD: "Ổ cứng thay thế",
    RAM: "RAM thay thế",
    VGA: "Card đồ họa thay thế",
    screen: "Màn hình thay thế",
    PC: "Linh kiện PC thay thế",
    Laptop: "Linh kiện Laptop thay thế",
    iPad: "Linh kiện iPad thay thế",
    Phone: "Linh kiện điện thoại thay thế",
    other: "Linh kiện thay thế",
  }

  // Lấy ngày hiện tại ở định dạng YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0]

  const [formData, setFormData] = useState({
    customerType: user ? "registered" : "guest",
    customerID: user ? user.id.toString() : "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    appointmentDateTime: "",
    duration: "60",
    serviceType: "repair",
    serviceLocation: "store",
    deviceCategory: "Laptop",
    isWarrantyService: false,
    warrantyPeriod: "",
    address: "",
    notes: "",
    estimatedCost: "200000", // Giá mặc định cho dịch vụ sửa chữa tại cửa hàng
    parts: [
      {
        name: "Linh kiện Laptop thay thế",
        quantity: "1",
        unitPrice: "12000000",
        isReplacement: true,
        status: "in_stock",
      },
    ],
  })
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Tính toán thời gian và chi phí dự kiến dựa trên loại dịch vụ và địa điểm
  const calculateEstimates = (serviceType, serviceLocation) => {
    const pricing = servicePricing[serviceType]?.[serviceLocation] || { baseDuration: 60, baseCost: 200000 } // Giá trị mặc định

    // Nếu là dịch vụ bảo hành và tại cửa hàng, chi phí = 0
    const finalCost = formData.isWarrantyService && serviceLocation === "store" ? 0 : pricing.baseCost

    return {
      duration: pricing.baseDuration.toString(),
      estimatedCost: finalCost.toString(),
    }
  }

  // Cập nhật giá linh kiện dựa trên loại thiết bị
  const updatePartsPricing = (deviceCategory) => {
    const defaultPrice = devicePartsPricing[deviceCategory] || 500000
    const defaultName = devicePartsDescription[deviceCategory] || "Linh kiện thay thế"

    return formData.parts.map((part) => ({
      ...part,
      name: defaultName,
      unitPrice: defaultPrice.toString(),
    }))
  }

  // Ẩn modal Contact Us khi component được mount
  useEffect(() => {
    // Tìm và ẩn modal Contact Us
    const hideContactModal = () => {
      const contactModal = document.querySelector(".contact-us-modal")
      if (contactModal) {
        contactModal.style.display = "none"
      }

      // Hoặc tìm nút đóng và click vào nó
      const closeButton = document.querySelector(".contact-us-modal .close-button")
      if (closeButton) {
        closeButton.click()
      }
    }

    // Thực hiện ngay khi component mount và sau một khoảng thời gian ngắn để đảm bảo modal đã được render
    hideContactModal()
    setTimeout(hideContactModal, 500)

    setIsMounted(true)

    // If user exists, set customer type to registered and populate user data
    if (user) {
      setFormData((prev) => ({
        ...prev,
        customerType: "registered",
        customerID: user.id ? user.id.toString() : "",
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        customerType: "guest",
      }))
    }

    // Tính toán giá trị ban đầu
    const { duration, estimatedCost } = calculateEstimates("repair", "store")
    setFormData((prev) => ({
      ...prev,
      duration,
      estimatedCost,
    }))
  }, [user])

  // Cập nhật thời gian và chi phí khi thay đổi loại dịch vụ hoặc địa điểm
  useEffect(() => {
    const { duration, estimatedCost } = calculateEstimates(formData.serviceType, formData.serviceLocation)

    setFormData((prev) => ({
      ...prev,
      duration,
      estimatedCost,
    }))
  }, [formData.serviceType, formData.serviceLocation, formData.isWarrantyService])

  // Cập nhật giá linh kiện khi thay đổi loại thiết bị
  useEffect(() => {
    const updatedParts = updatePartsPricing(formData.deviceCategory)

    setFormData((prev) => ({
      ...prev,
      parts: updatedParts,
    }))
  }, [formData.deviceCategory])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePartChange = (index, field, value) => {
    const newParts = [...formData.parts]
    newParts[index][field] = value
    setFormData((prev) => ({ ...prev, parts: newParts }))
  }

  const addPart = () => {
    const defaultPrice = devicePartsPricing[formData.deviceCategory] || 500000
    const defaultName = devicePartsDescription[formData.deviceCategory] || "Linh kiện thay thế"

    setFormData((prev) => ({
      ...prev,
      parts: [
        ...prev.parts,
        {
          name: defaultName,
          quantity: "1",
          unitPrice: defaultPrice.toString(),
          isReplacement: true,
          status: "in_stock",
        },
      ],
    }))
  }

  const removePart = (index) => {
    setFormData((prev) => ({
      ...prev,
      parts: prev.parts.filter((_, i) => i !== index),
    }))
  }

  const validateForm = () => {
    if (formData.customerType === "guest" && (!formData.guestName || !formData.guestPhone)) {
      alert("Phải có thông tin khách vãng lai (guestName và guestPhone)")
      return false
    }
    if (formData.serviceLocation !== "store" && !formData.address) {
      alert('Phải có địa chỉ nếu serviceLocation không phải là "store"')
      return false
    }
    if (!formData.appointmentDateTime) {
      alert("Vui lòng chọn thời gian hẹn")
      return false
    }

    // Kiểm tra ngày hẹn không được là ngày trong quá khứ
    const appointmentDate = new Date(formData.appointmentDateTime)
    const now = new Date()
    if (appointmentDate < now) {
      alert("Thời gian hẹn không thể là thời gian trong quá khứ")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    // Validate customerID cho khách đã đăng ký
    if (formData.customerType === "registered" && !formData.customerID) {
      toast.error("Vui lòng nhập mã khách hàng")
      setIsSubmitting(false)
      return
    }

    try {
      // Tính toán estimatedArrivalTime
      const appointmentDate = new Date(formData.appointmentDateTime)
      const durationMinutes = Number.parseInt(formData.duration) || 60
      const estimatedArrivalTime = new Date(appointmentDate.getTime() + durationMinutes * 60000)

      // Chuẩn bị dữ liệu
      const dataToSend = {
        ...formData,
        customerID: formData.customerType === "registered" ? Number.parseInt(formData.customerID, 10) : null,
        duration: durationMinutes,
        estimatedArrivalTime: estimatedArrivalTime.toISOString(),
        warrantyPeriod: formData.isWarrantyService ? Number.parseInt(formData.warrantyPeriod) || 0 : null,
        estimatedCost: formData.estimatedCost ? Number.parseFloat(formData.estimatedCost) || 0 : null,
        parts: formData.parts.map((part) => ({
          ...part,
          quantity: Number.parseInt(part.quantity) || 1,
          unitPrice: Number.parseFloat(part.unitPrice) || 0,
          isReplacement: Boolean(part.isReplacement),
        })),
      }
      console.log("customerID kiểu dữ liệu:", typeof dataToSend.customerID)

      console.log("Dữ liệu gửi đi:", dataToSend)

      // Gọi API
      const response = await fetch(`${backendURL}/api/appointments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("Chi tiết lỗi:", {
          status: response.status,
          statusText: response.statusText,
          serverMessage: result,
        })
        throw new Error(result.EM || "Lỗi khi gửi yêu cầu")
      }

      if (result.EC === 1) {
        toast.success("Đặt lịch hẹn thành công!")
        // Reset form
        const defaultPrice = devicePartsPricing["Laptop"] || 12000000
        const defaultName = devicePartsDescription["Laptop"] || "Linh kiện Laptop thay thế"

        setFormData({
          customerType: "registered",
          customerID: user ? user.id.toString() : "",
          guestName: "",
          guestEmail: "",
          guestPhone: "",
          appointmentDateTime: "",
          duration: "60",
          serviceType: "repair",
          serviceLocation: "store",
          deviceCategory: "Laptop",
          isWarrantyService: false,
          warrantyPeriod: "",
          address: "",
          notes: "",
          estimatedCost: "200000",
          parts: [
            {
              name: defaultName,
              quantity: "1",
              unitPrice: defaultPrice.toString(),
              isReplacement: true,
              status: "in_stock",
            },
          ],
        })
      } else {
        toast.error(`Đặt lịch không thành công: ${result.EM}`)
      }
    } catch (error) {
      console.error("Lỗi khi gửi form:", error)
      toast.error(error.message || "Có lỗi xảy ra khi gửi form, vui lòng thử lại")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount)
  }

  return (
    <>
      <style>
        {`
                    @keyframes fadeSlideUp {
                        0% {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .animate-fadeSlideUp {
                        animation: fadeSlideUp 0.5s ease-out forwards;
                    }
                `}
      </style>
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl mx-auto transition-all duration-300 ${
          isMounted ? "animate-fadeSlideUp" : "opacity-0"
        }`}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Đặt Lịch Hẹn</h2>

        {/* Customer Type */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Loại khách hàng</label>
          <select
            name="customerType"
            value={formData.customerType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors bg-gray-100"
            disabled={true}
          >
            <option value="registered">Khách hàng đã đăng ký</option>
            <option value="guest">Khách vãng lai</option>
          </select>
        </div>

        {/* Customer Info */}
        {formData.customerType === "registered" ? (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Mã khách hàng</label>
            <input
              type="number"
              name="customerID"
              value={formData.customerID}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
              placeholder="Nhập mã khách hàng"
              disabled={!!user}
            />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Họ tên</label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                placeholder="Nhập họ tên"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="guestEmail"
                value={formData.guestEmail}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                placeholder="Nhập email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Số điện thoại</label>
              <input
                type="text"
                name="guestPhone"
                value={formData.guestPhone}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
          </>
        )}

        {/* Appointment Details */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Thời gian hẹn</label>
          <input
            type="datetime-local"
            name="appointmentDateTime"
            value={formData.appointmentDateTime}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
            min={new Date().toISOString().slice(0, 16)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Loại dịch vụ</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
          >
            <option value="repair">Sửa chữa</option>
            <option value="assembly">Lắp ráp</option>
            <option value="installation">Cài đặt</option>
            <option value="purchase">Mua hàng</option>
            <option value="consultation">Tư vấn</option>
            <option value="maintenance">Bảo trì</option>
            <option value="upgrade">Nâng cấp</option>
            <option value="data_recovery">Khôi phục dữ liệu</option>
            <option value="warranty_service">Dịch vụ bảo hành</option>
            <option value="software_installation">Cài đặt phần mềm</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Địa điểm dịch vụ</label>
          <select
            name="serviceLocation"
            value={formData.serviceLocation}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
          >
            <option value="store">Cửa hàng</option>
            <option value="home">Nhà riêng</option>
            <option value="office">Văn phòng</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Loại thiết bị</label>
          <select
            name="deviceCategory"
            value={formData.deviceCategory}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
          >
            <option value="BanPhim">Bàn phím</option>
            <option value="Mouse">Chuột</option>
            <option value="Mousepad">Lót chuột</option>
            <option value="GamingGear">Gaming Gear</option>
            <option value="Headphone">Tai nghe</option>
            <option value="Case">Vỏ máy</option>
            <option value="CPU">CPU</option>
            <option value="Main">Mainboard</option>
            <option value="PSU">Nguồn</option>
            <option value="HDD">HDD</option>
            <option value="RAM">RAM</option>
            <option value="VGA">Card đồ họa</option>
            <option value="screen">Màn hình</option>
            <option value="PC">PC</option>
            <option value="Laptop">Laptop</option>
            <option value="iPad">iPad</option>
            <option value="Phone">Điện thoại</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* Thời gian dự kiến - Chỉ đọc */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Thời gian thực hiện dự kiến (phút)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            className="w-full p-3 border rounded-md bg-gray-100 text-gray-700"
            readOnly
          />
        </div>

        {/* Chi phí dự kiến - Chỉ đọc */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Chi phí dự kiến</label>
          <input
            type="text"
            value={formatCurrency(formData.estimatedCost)}
            className="w-full p-3 border rounded-md bg-gray-100 text-gray-700"
            readOnly
          />
          <input type="hidden" name="estimatedCost" value={formData.estimatedCost} />
        </div>

        {formData.serviceLocation !== "store" && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
              placeholder="Nhập địa chỉ"
              required
            />
          </div>
        )}

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            name="isWarrantyService"
            checked={formData.isWarrantyService}
            onChange={handleInputChange}
            className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-500"
          />
          <label className="text-gray-700 font-medium">Dịch vụ bảo hành</label>
        </div>
        {formData.isWarrantyService && (
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Thời gian bảo hành (tháng)</label>
            <input
              type="number"
              name="warrantyPeriod"
              value={formData.warrantyPeriod}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
              placeholder="Nhập số tháng"
            />
          </div>
        )}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Ghi chú</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
            placeholder="Nhập ghi chú"
            rows="4"
          />
        </div>

        {/* Parts Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Linh kiện sử dụng</h3>
          {formData.parts.map((part, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50 transition-all hover:shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-gray-700 font-medium">Linh kiện {index + 1}</h4>
                {formData.parts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePart(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    Xóa
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Tên linh kiện</label>
                  <input
                    type="text"
                    value={part.name}
                    onChange={(e) => handlePartChange(index, "name", e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Số lượng</label>
                  <input
                    type="number"
                    value={part.quantity}
                    onChange={(e) => handlePartChange(index, "quantity", e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Đơn giá (VND)</label>
                  <input
                    type="text"
                    value={formatCurrency(part.unitPrice)}
                    className="w-full p-3 border rounded-md bg-gray-100 text-gray-700"
                    readOnly
                  />
                  <input type="hidden" name={`parts[${index}].unitPrice`} value={part.unitPrice} />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Trạng thái</label>
                  <select
                    value={part.status}
                    onChange={(e) => handlePartChange(index, "status", e.target.value)}
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                  >
                    <option value="in_stock">Có sẵn trong kho</option>
                    <option value="ordered">Đã đặt mua</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={part.isReplacement}
                    onChange={(e) => handlePartChange(index, "isReplacement", e.target.checked)}
                    className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-500"
                  />
                  <label className="text-gray-700 font-medium">Thay thế</label>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addPart}
            className="mt-2 text-blue-500 hover:text-blue-700 font-medium transition-colors"
          >
            + Thêm linh kiện
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors transform hover:scale-105"
          >
            Đặt Lịch
          </button>
        </div>
      </form>
    </>
  )
}
