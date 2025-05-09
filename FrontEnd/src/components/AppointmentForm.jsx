import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Make sure to import toast
export default function AppointmentForm() {

    const backendURL = import.meta.env.VITE_BACK_END_URL;

    const [formData, setFormData] = useState({
        customerType: 'registered',
        customerID: '',
        guestName: '',
        guestEmail: '',
        guestPhone: '',
        appointmentDateTime: '',
        duration: '60',
        serviceType: 'repair',
        serviceLocation: 'store',
        deviceCategory: 'Laptop',
        isWarrantyService: false,
        warrantyPeriod: '',
        address: '',
        notes: '',
        estimatedCost: '',
        parts: [{ quantity: '1', unitPrice: '', isReplacement: true, status: 'in_stock' }],
    });
    const [isMounted, setIsMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handlePartChange = (index, field, value) => {
        const newParts = [...formData.parts];
        newParts[index][field] = value;
        setFormData((prev) => ({ ...prev, parts: newParts }));
    };

    const addPart = () => {
        setFormData((prev) => ({
            ...prev,
            parts: [...prev.parts, { quantity: '1', unitPrice: '', isReplacement: true, status: 'in_stock' }],
        }));
    };

    const removePart = (index) => {
        setFormData((prev) => ({
            ...prev,
            parts: prev.parts.filter((_, i) => i !== index),
        }));
    };

    const validateForm = () => {
        if (formData.customerType === 'guest' && (!formData.guestName || !formData.guestPhone)) {
            alert('Phải có thông tin khách vãng lai (guestName và guestPhone)');
            return false;
        }
        if (formData.serviceLocation !== 'store' && !formData.address) {
            alert('Phải có địa chỉ nếu serviceLocation không phải là "store"');
            return false;
        }
        if (!formData.appointmentDateTime) {
            alert('Vui lòng chọn thời gian hẹn');
            return false;
        }
        if (formData.duration < 15) {
            alert('Thời gian thực hiện phải ít nhất 15 phút');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Validate form
        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }
    
        // Validate customerID cho khách đã đăng ký
        if (formData.customerType === 'registered' && !formData.customerID) {
            toast.error('Vui lòng nhập mã khách hàng');
            setIsSubmitting(false);
            return;
        }
    
        try {
            // Tính toán estimatedArrivalTime
            const appointmentDate = new Date(formData.appointmentDateTime);
            const durationMinutes = parseInt(formData.duration) || 60;
            const estimatedArrivalTime = new Date(appointmentDate.getTime() + durationMinutes * 60000);
    
            // Chuẩn bị dữ liệu
            const dataToSend = {
                ...formData,
                customerID: formData.customerType === 'registered' ? parseInt(formData.customerID, 10) : null,
                duration: durationMinutes,
                estimatedArrivalTime: estimatedArrivalTime.toISOString(),
                warrantyPeriod: formData.isWarrantyService ? 
                    (parseInt(formData.warrantyPeriod) || 0) : 
                    null,
                estimatedCost: formData.estimatedCost ? 
                    (parseFloat(formData.estimatedCost) || 0) : 
                    null,
                parts: formData.parts.map(part => ({
                    ...part,
                    quantity: parseInt(part.quantity) || 1,
                    unitPrice: parseFloat(part.unitPrice) || 0,
                    isReplacement: Boolean(part.isReplacement)
                }))
            };
            console.log("customerID kiểu dữ liệu:", typeof dataToSend.customerID);

    
            console.log('Dữ liệu gửi đi:', dataToSend);
    
            // Gọi API
            const response = await fetch(`${backendURL}/api/appointments/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                console.error('Chi tiết lỗi:', {
                    status: response.status,
                    statusText: response.statusText,
                    serverMessage: result
                });
                throw new Error(result.EM || 'Lỗi khi gửi yêu cầu');
            }
    
            if (result.EC === 1) {
                toast.success('Đặt lịch hẹn thành công!');
                // Reset form
                setFormData({
                    customerType: 'registered',
                    customerID: '',
                    guestName: '',
                    guestEmail: '',
                    guestPhone: '',
                    appointmentDateTime: '',
                    duration: '60',
                    serviceType: 'repair',
                    serviceLocation: 'store',
                    deviceCategory: 'Laptop',
                    isWarrantyService: false,
                    warrantyPeriod: '',
                    address: '',
                    notes: '',
                    estimatedCost: '',
                    parts: [{ quantity: '1', unitPrice: '', isReplacement: true, status: 'in_stock' }],
                });
            } else {
                toast.error(`Đặt lịch không thành công: ${result.EM}`);
            }
        } catch (error) {
            console.error('Lỗi khi gửi form:', error);
            toast.error(error.message || 'Có lỗi xảy ra khi gửi form, vui lòng thử lại');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    isMounted ? 'animate-fadeSlideUp' : 'opacity-0'
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
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                    >
                        <option value="registered">Khách hàng đã đăng ký</option>
                        <option value="guest">Khách vãng lai</option>
                    </select>
                </div>

                {/* Customer Info */}
                {formData.customerType === 'registered' ? (
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Mã khách hàng</label>
                        <input
                            type="number"
                            name="customerID"
                            value={formData.customerID}
                            onChange={handleInputChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                            placeholder="Nhập mã khách hàng"
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
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Thời gian thực hiện (phút)</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                        min="15"
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
                {formData.serviceLocation !== 'store' && (
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
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Chi phí dự kiến (VND)</label>
                    <input
                        type="number"
                        name="estimatedCost"
                        value={formData.estimatedCost}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                        placeholder="Nhập chi phí dự kiến"
                        step="0.01"
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
                                    <label className="block text-gray-700 font-medium mb-2">Số lượng</label>
                                    <input
                                        type="number"
                                        value={part.quantity}
                                        onChange={(e) => handlePartChange(index, 'quantity', e.target.value)}
                                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                                        min="1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Đơn giá (VND)</label>
                                    <input
                                        type="number"
                                        value={part.unitPrice}
                                        onChange={(e) => handlePartChange(index, 'unitPrice', e.target.value)}
                                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition-colors"
                                        step="0.01"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Trạng thái</label>
                                    <select
                                        value={part.status}
                                        onChange={(e) => handlePartChange(index, 'status', e.target.value)}
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
                                        onChange={(e) => handlePartChange(index, 'isReplacement', e.target.checked)}
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
    );
}