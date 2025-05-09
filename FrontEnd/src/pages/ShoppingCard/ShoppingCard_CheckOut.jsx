"use client";

import { useState, useContext } from "react";
import Support from "../../components/Support/Support";
import { Link, useNavigate } from "react-router-dom";
import path from "../../constant/path";
import { useSelector } from "react-redux";
import { UserContext } from "../../context/UserContext"; // Đảm bảo đường dẫn chính xác

// Component tượng trưng cho Order Summary (đã chỉnh sửa để nhận prop và hiển thị dữ liệu thật)
const OrderSummary = ({ cartItems, selectedShippingCost }) => {
  console.log("Cart Items in OrderSummary:", cartItems); // Kiểm tra dữ liệu cartItems
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + selectedShippingCost;

  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Order Summary
      </h2>
      <div className="space-y-3">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">Giỏ hàng trống.</p>
        ) : (
          cartItems.map((item) => (
            <div
              className="flex items-center justify-between"
              key={item.productID}
              style={{ width: "100%" }}
            >
              {" "}
              {/* Thêm inline style */}
              <div className="flex items-center" style={{ flexGrow: 1 }}>
                {" "}
                {/* Thêm inline style */}
                <div className="w-16 h-16 bg-gray-200 rounded-md mr-3">
                  {item.image && item.image.length > 0 && (
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.productName}
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                </div>
                <div style={{ flexGrow: 1 }}>
                  {" "}
                  {/* Thêm inline style */}
                  <h6 className="text-sm font-medium text-gray-800">
                    {item.productName}
                  </h6>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price * item.quantity)}
              </span>
            </div>
          ))
        )}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm font-semibold text-gray-800">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-600">Shipping</span>
            <span className="text-sm font-semibold text-gray-800">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(selectedShippingCost)}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-md font-semibold text-gray-800">Total</span>
            <span className="text-md font-bold text-indigo-600">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function ShoppingCard_CheckOut() {
  // const location = useLocation()
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.carts);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState("standard");
  const { user } = useContext(UserContext); // Lấy thông tin user từ UserContext

  console.log("Checkout");

  // Tính toán phí vận chuyển dựa trên tùy chọn đã chọn
  const shippingCost = selectedShippingOption === "standard" ? 20000 : 0;

  var id;
  if (user) {
    id = user.id;
  } else {
    id = 0;
  }
  const [email, setEmail] = useState(user?.email || ""); // Sử dụng optional chaining
  const [firstName, setFirstName] = useState(
    user?.fullName?.split(" ")[0] || ""
  ); // Sử dụng optional chaining
  const [lastName, setLastName] = useState(
    user?.fullName?.split(" ").slice(1).join(" ") || ""
  ); // Sử dụng optional chaining
  const [streetAddress, setStreetAddress] = useState(user?.address || ""); // Sử dụng optional chaining
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || ""); // Sử dụng optional chaining

  // State để lưu lỗi
  const [errors, setErrors] = useState({});

  const handleNext = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    // Only check once when component mounts
    if (!user) {
      if (window.confirm("Vui lòng đăng nhập để xem giỏ hàng.")) {
        navigate(path.login);
        return;
      } else {
        // If user cancels the confirmation, navigate back to previous page
        navigate(-1);
      }
    }
    // Empty dependency array so it only runs once

    // Kiểm tra các trường bắt buộc
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email Address is required.";
    if (!firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!streetAddress.trim())
      newErrors.streetAddress = "Shipping Address is required.";
    if (!phoneNumber.trim())
      newErrors.phoneNumber = "Phone Number is required.";

    // Nếu có lỗi, đặt lỗi vào state và focus vào ô đầu tiên bị lỗi
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    // Nếu không có lỗi, lưu shipping cost và chuyển hướng
    localStorage.setItem("selectedShippingCost", shippingCost);
    navigate(path.shopping_card_item);

    // Lưu thông tin khách hàng vào localStorage
    const customerInfo = {
      id,
      firstName,
      lastName,
      email,
      streetAddress,
      phoneNumber,
    };
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
  };

  const handleShippingChange = (event) => {
    setSelectedShippingOption(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Link to={path.home} className="text-blue-500 hover:underline mr-1">
              Home
            </Link>
            <span className="mr-1">/</span>
            <Link to={path.card} className="text-blue-500 hover:underline mr-1">
              Shopping Cart
            </Link>
            <span className="mr-1">/</span>
            <span>Checkout Process</span>
          </div>
          <div className="flex items-center">
            {" "}
            {/* Sử dụng flex để xếp hàng ngang và căn chỉnh dọc */}
            <h1 className="text-2xl font-bold mb-4 mr-4 mt-4">Checkout</h1>{" "}
            {/* Thêm margin-right */}
            {/* Nút Sign In */}
            {/* <Link to={path.login}>
              <button className="bg-white border border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                Sign In
              </button>
            </Link> */}
          </div>
          <div className="mt-4 grid grid-cols-2 items-center">
            <div className=""></div>
            <div className="mt-4 flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-semibold text-indigo-600">
                  Shipping
                </span>
              </div>
              <div className="border-t-2 border-gray-300 w-24"></div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 text-gray-500 flex items-center justify-center text-xs font-semibold">
                  2
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  Payment & Review
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Address Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Shipping Information
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Email */}
                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
                      errors.email
                        ? "border-red-400 focus:ring-red-200"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
                      errors.firstName
                        ? "border-red-400 focus:ring-red-200"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
                      errors.lastName
                        ? "border-red-400 focus:ring-red-200"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div className="col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                  />
                </div>

                {/* Shipping Address */}
                <div className="col-span-2">
                  <label
                    htmlFor="streetAddress"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Shipping Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
                      errors.streetAddress
                        ? "border-red-400 focus:ring-red-200"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.streetAddress && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.streetAddress}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                  />
                </div>

                {/* State/Province */}
                <div>
                  <label
                    htmlFor="stateProvince"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State/Province
                  </label>
                  <select
                    id="stateProvince"
                    className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjB2MHYwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]"
                  >
                    <option value="">
                      Please select a region, state or province
                    </option>
                    {/* Các option giữ nguyên */}
                    <option value="hanoi">Hà Nội</option>
                    <option value="hochiminh">Hồ Chí Minh</option>
                    <option value="haiphong">Hải Phòng</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="cantho">Cần Thơ</option>
                    <option value="angiang">An Giang</option>
                    <option value="bacgiang">Bắc Giang</option>
                    <option value="backan">Bắc Kạn</option>
                    <option value="baclieu">Bạc Liêu</option>
                    <option value="bacninh">Bắc Ninh</option>
                    <option value="bentre">Bến Tre</option>
                    <option value="binhdinh">Bình Định</option>
                    <option value="binhduong">Bình Dương</option>
                    <option value="binhphuoc">Bình Phước</option>
                    <option value="binhthuan">Bình Thuận</option>
                    <option value="camau">Cà Mau</option>
                    <option value="caobang">Cao Bằng</option>
                    <option value="daklak">Đắk Lắk</option>
                    <option value="daknong">Đắk Nông</option>
                    <option value="dienbien">Điện Biên</option>
                    <option value="dongnai">Đồng Nai</option>
                    <option value="dongthap">Đồng Tháp</option>
                    <option value="gialai">Gia Lai</option>
                    <option value="hagiang">Hà Giang</option>
                    <option value="hanam">Hà Nam</option>
                    <option value="hatinh">Hà Tĩnh</option>
                    <option value="haiduong">Hải Dương</option>
                    <option value="haugiang">Hậu Giang</option>
                    <option value="hoabinh">Hòa Bình</option>
                    <option value="hungyen">Hưng Yên</option>
                    <option value="khanhhoa">Khánh Hòa</option>
                    <option value="kiengiang">Kiên Giang</option>
                    <option value="kontum">Kon Tum</option>
                    <option value="laichau">Lai Châu</option>
                    <option value="lamdong">Lâm Đồng</option>
                    <option value="langson">Lạng Sơn</option>
                    <option value="laocai">Lào Cai</option>
                    <option value="longan">Long An</option>
                    <option value="namdinh">Nam Định</option>
                    <option value="nghean">Nghệ An</option>
                    <option value="ninhbinh">Ninh Bình</option>
                    <option value="ninhthuan">Ninh Thuận</option>
                    <option value="phutho">Phú Thọ</option>
                    <option value="phuyen">Phú Yên</option>
                    <option value="quangbinh">Quảng Bình</option>
                    <option value="quangnam">Quảng Nam</option>
                    <option value="quangngai">Quảng Ngãi</option>
                    <option value="quangninh">Quảng Ninh</option>
                    <option value="quangtri">Quảng Trị</option>
                    <option value="soctrang">Sóc Trăng</option>
                    <option value="sonla">Sơn La</option>
                    <option value="tayninh">Tây Ninh</option>
                    <option value="thaibinh">Thái Bình</option>
                    <option value="thainguyen">Thái Nguyên</option>
                    <option value="thanhhoa">Thanh Hóa</option>
                    <option value="thuathienhue">Thừa Thiên Huế</option>
                    <option value="tiengiang">Tiền Giang</option>
                    <option value="travinh">Trà Vinh</option>
                    <option value="tuyenquang">Tuyên Quang</option>
                    <option value="vinhlong">Vĩnh Long</option>
                    <option value="vinhphuc">Vĩnh Phúc</option>
                    <option value="yenbai">Yên Bái</option>
                  </select>
                </div>

                {/* Zip/Postal Code */}
                <div>
                  <label
                    htmlFor="zipPostalCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Zip/Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipPostalCode"
                    className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                  />
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjB2MHYwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]"
                  >
                    {/* Các option giữ nguyên */}
                    <option value="vietnam">Việt Nam</option>
                    <option value="us">United States</option>
                    <option value="china">China</option>
                    <option value="japan">Japan</option>
                    <option value="korea">South Korea</option>
                    <option value="singapore">Singapore</option>
                    <option value="thailand">Thailand</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="indonesia">Indonesia</option>
                    <option value="philippines">Philippines</option>
                    <option value="australia">Australia</option>
                    <option value="uk">United Kingdom</option>
                    <option value="france">France</option>
                    <option value="germany">Germany</option>
                    <option value="canada">Canada</option>
                    <option value="russia">Russia</option>
                    <option value="india">India</option>
                    <option value="brazil">Brazil</option>
                    <option value="mexico">Mexico</option>
                    <option value="southafrica">South Africa</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`mt-1 block w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
                      errors.phoneNumber
                        ? "border-red-400 focus:ring-red-200"
                        : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary
              cartItems={cartItems}
              selectedShippingCost={shippingCost}
            />

            {/* Shipping Options */}
            <div className="bg-white rounded-md shadow-md p-4 mt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Shipping Options
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      id="standard"
                      className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      value="standard"
                      checked={selectedShippingOption === "standard"}
                      onChange={handleShippingChange}
                    />
                    <label
                      htmlFor="standard"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Standard Shipping
                    </label>
                  </div>
                  <span className="text-sm text-gray-700">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(20000)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  Price may vary depending on the item/destination. Shop Staff
                  will contact you.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shipping"
                      id="pickup"
                      className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      value="pickup"
                      checked={selectedShippingOption === "pickup"}
                      onChange={handleShippingChange}
                    />
                    <label
                      htmlFor="pickup"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Pickup from store
                    </label>
                  </div>
                  <span className="text-sm text-gray-700">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(0)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  123 Hung Vuong street, Tuy Hoa City, Phu Yen
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-8 flex justify-end">
          <Link to={path.shopping_card_item}>
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Next
            </button>
          </Link>
        </div>
      </div>
      <Support></Support>
    </div>
  );
}

export default ShoppingCard_CheckOut;
