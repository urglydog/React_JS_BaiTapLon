"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import path from "../../constant/path"
import DiscountModal from "../../components/DiscountModal"
import { UserContext } from "../../context/UserContext"
import CreateOrder from "../../components/order/create-order"
import CartItem from "../../components/ShoppingCard/ShoppingCardItem";
import {
  removeItem,
  updateItemQuantity,
  clearCart,
} from "../../utils/redux/cartSlice";
const ShoppingCardItem = () => {
  const cartItems = useSelector((state) => state.cart.carts)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const { user } = useContext(UserContext)

  const selectedShippingCost = Number.parseInt(localStorage.getItem("selectedShippingCost")) || 0

  const [showDiscountModal, setShowDiscountModal] = useState(false)
  const [enteredDiscountCode, setEnteredDiscountCode] = useState("")
  const [discountValue, setDiscountValue] = useState(0)
  const [appliedVoucher, setAppliedVoucher] = useState(null)
  const [vouchers, setVouchers] = useState([])
  // const [loadingVouchers, setLoadingVouchers] = useState(true)
  // const [errorVouchers, setErrorVouchers] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isPaymentOptionsOpen, setIsPaymentOptionsOpen] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(null)

  const availablePaymentMethods = [
    { id: 4, name: "Apple Pay" },
    { id: 7, name: "Cash" },
    { id: 1, name: "Credit Card" },
    { id: 5, name: "Cryptocurrency" },
    { id: 6, name: "Gift Card" },
    { id: 3, name: "Google Pay" },
    { id: 2, name: "PayPal" },
    { id: 8, name: "Store Credit" },
  ]

  // Fetch customer info from checkout page
  useEffect(() => {
    // In a real app, you would get this from an API or context
    // For now, we'll simulate it with localStorage
    const savedCustomerInfo = localStorage.getItem("customerInfo")
    if (savedCustomerInfo) {
      setCustomerInfo(JSON.parse(savedCustomerInfo))
    }
  }, [])

  const fetchVouchers = async () => {
    // setLoadingVouchers(true)
    try {
      const response = await fetch("http://localhost:4000/api/voucher/getAllVouchers")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data && data.EC === 1) {
        setVouchers(data.DT)
      } else {
        // setErrorVouchers(new Error(data?.EM || "Lỗi khi tải voucher"))
      }
      // setLoadingVouchers(false)
    } catch (error) {
      // setErrorVouchers(error)
      // setLoadingVouchers(false)
      console.error("Lỗi khi tải voucher:", error)
    }
  }

  useEffect(() => {
    fetchVouchers()
  }, [])

  const handleSelectVoucherFromList = (voucherCode) => {
    const voucher = vouchers.find((v) => v.code === voucherCode && new Date(v.expirationDate) >= new Date())
    if (voucher && voucher.discount) {
      const discountAmount = (orderTotalBeforeDiscount * voucher.discount) / 100
      setDiscountValue(discountAmount)
      setAppliedVoucher({ id: voucher.voucherID, code: voucher.code, expired: false })
    }
    setShowDiscountModal(false)
  }

  const handleCloseDiscountModal = () => {
    setShowDiscountModal(false)
  }

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value)
    setIsPaymentOptionsOpen(false)
  }

  const togglePaymentOptions = () => {
    setIsPaymentOptionsOpen(!isPaymentOptionsOpen)
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value)
  }

  const taxRate = 0.1
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * taxRate
  const orderTotalBeforeDiscount = subtotal + selectedShippingCost + tax
  const discountedTotal = Math.max(orderTotalBeforeDiscount - discountValue, 0)

  const getDisplayedPaymentMethods = () => {
    if (selectedShippingCost === 0) {
      return availablePaymentMethods.filter((method) => method.name !== "Cash on Delivery")
    }
    return availablePaymentMethods.filter((method) => method.name !== "Cash on Pickup")
  }

  const selectedPaymentMethodDisplay = paymentMethod || "Select Payment Method"

  const handleOrderCreated = (order) => {
    // You can add additional logic here if needed
    console.log("Order created:", order)

  }

  const handleCompleteOrder = async () => {
    // Kiểm tra nếu giỏ hàng trống
    if (cartItems.length === 0) {
      alert("Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.");
      return; // Dừng lại nếu giỏ hàng trống
    }

    // Hiển thị thông báo xác nhận thanh toán
    const confirmPayment = window.confirm("Bạn có chắc chắn muốn thanh toán đơn hàng này?");
    if (!confirmPayment) {
      return; // Nếu người dùng không xác nhận, dừng lại
    }

    // Gọi API hoặc xử lý logic tạo đơn hàng
    try {
      const orderData = {
        customerInfo,
        cartItems,
        paymentMethod,
        shippingCost: selectedShippingCost,
        total: discountedTotal,
      };

      const response = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      console.log("Order created successfully:", data);

      // Hiển thị thông báo đặt hàng thành công
      alert("Đặt hàng thành công!");

      // Điều hướng về trang chủ
      navigate(path.home);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
    }
  };

  // tiếp tục mua sắm
  const handleContinueShopping = () => {
    navigate("/");
  };
  // xóa giỏ hàng
  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
      dispatch(clearCart());
      setDiscountValue(0);
      setAppliedVoucher(null);
    }
  };


  // xóa từng sản phẩm
  const handleRemoveItem = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      dispatch(removeItem({ id }));
    }
  };

  //điều chỉnh số lường từng sp
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateItemQuantity({ id, newQuantity }));
  };
  return (
    <div className="container mx-auto p-6">
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <Link to={path.home} className="text-blue-500 hover:underline mr-1">
          Home
        </Link>
        <span className="mr-1">/</span>
        <Link to={path.card} className="text-blue-500 hover:underline mr-1">
          Shopping Cart
        </Link>
        <span className="mr-1">/</span>
        <span>Purchase</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Complete Your Purchase</h1>

      {!customerInfo ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please complete the shipping information before proceeding.
                <Link
                  to={path.shopping_card_checkout}
                  className="font-medium underline text-yellow-700 hover:text-yellow-600"
                >
                  {" "}
                  Go to shipping
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Summary</h2>
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-4">Your cart is empty</div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (

                    // <div key={item.productID} className="flex items-center border-b pb-4">
                    //   <div className="w-16 h-16 bg-gray-200 rounded-md mr-4">
                    //     {item.image && item.image.length > 0 && (
                    //       <img
                    //         src={item.image || "/placeholder.svg"}
                    //         alt={item.productName}
                    //         className="w-full h-full object-cover rounded-md"
                    //       />
                    //     )}
                    //   </div>
                    //   <div className="flex-grow">
                    //     <h3 className="text-sm font-medium text-gray-800">{item.productName}</h3>
                    //     <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    //   </div>
                    //   <div className="text-sm font-semibold text-gray-800">
                    //     {formatCurrency(item.price * item.quantity)}
                    //   </div>
                    // </div>
                    <CartItem
                      key={item.productID}
                      item={item}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              )}
              {/* Giỏ hàng action buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleContinueShopping}
                  className="bg-gray-200 text-gray-700 py-2 px-6 rounded-xl hover:bg-gray-300 transition"
                >
                  Tiếp tục mua sắm
                </button>
                <button
                  onClick={handleClearCart}
                  className="bg-gray-800 text-white py-2 px-6 rounded-xl hover:bg-red-600 transition"
                >
                  Xóa giỏ hàng
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name:</p>
                  <p className="font-medium">
                    {customerInfo.firstName} {customerInfo.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email:</p>
                  <p className="font-medium">{customerInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone:</p>
                  <p className="font-medium">{customerInfo.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address:</p>
                  <p className="font-medium">{customerInfo.streetAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Payment Summary</h2>

              {/* Payment Method Selection */}
              <div className="mb-4 relative">
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <button
                  type="button"
                  id="paymentMethod"
                  className="w-full border rounded-md p-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={togglePaymentOptions}
                >
                  {selectedPaymentMethodDisplay}
                </button>
                {isPaymentOptionsOpen && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-md mt-1 z-10">
                    {getDisplayedPaymentMethods().map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                        onClick={() => handlePaymentMethodChange({ target: { value: method.name } })}
                      >
                        {method.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Discount Code */}
              <div className="mb-4">
                <button
                  onClick={() => setShowDiscountModal(true)}
                  className="w-full text-left text-sm font-medium text-indigo-600 flex justify-between items-center hover:text-indigo-700"
                >
                  Apply discount code
                  <span>&gt;</span>
                </button>
              </div>

              {/* Component Modal */}
              <DiscountModal
                isOpen={showDiscountModal}
                onClose={handleCloseDiscountModal}
                vouchers={vouchers}
                onSelectVoucher={handleSelectVoucherFromList}
                enteredCode={enteredDiscountCode}
                setEnteredCode={setEnteredDiscountCode}
              />

              {/* Order Totals */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">{formatCurrency(selectedShippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (10%):</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedVoucher.code}):</span>
                    <span>-{formatCurrency(discountValue)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-4 border-t text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-indigo-600">{formatCurrency(discountedTotal)}</span>
                </div>
              </div>

              {/* Create Order Button */}
              {paymentMethod ? (
                cartItems.length > 0 ? (
                  <CreateOrder
                    customerInfo={customerInfo}
                    cartItems={cartItems}
                    paymentMethod={paymentMethod}
                    shippingCost={selectedShippingCost}
                    voucher={appliedVoucher}
                    onOrderCreated={handleOrderCreated}
                  />
                ) : (
                  <button
                    onClick={handleCompleteOrder}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md mt-4 hover:bg-indigo-700"
                  >
                    Complete Order
                  </button>
                )
              ) : (
                <button
                  className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-md mt-4 cursor-not-allowed"
                  disabled
                >
                  Select Payment Method to Continue
                </button>
              )}
              <button className="w-full bg-yellow-400 text-black p-3 mt-2 rounded-4xl hover:bg-yellow-500">
                Thanh toán qua VNPAY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoppingCardItem
