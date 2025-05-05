import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/ShoppingCard/ShoppingCardItem";
import path from "../../constant/path";
import DiscountModal from "../../components/DiscountModal";
import { UserContext } from "../../context/UserContext";
import {
  removeItem,
  updateItemQuantity,
  clearCart,
} from "../../utils/redux/cartSlice";

const ShoppingCartItem = () => {
  const cartItems = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showShippingTax, setShowShippingTax] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [enteredDiscountCode, setEnteredDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [loadingVouchers, setLoadingVouchers] = useState(true);
  const [errorVouchers, setErrorVouchers] = useState(null);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateItemQuantity({ id, newQuantity }));
  };

  const handleRemoveItem = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      dispatch(removeItem({ id }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
      dispatch(clearCart());
      setDiscountValue(0);
      setAppliedVoucher(null);
    }
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const shippingCost = cartItems.length > 0 ? 21.0 : 0;
  const taxRate = 0.1;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const orderTotalBeforeDiscount = subtotal + shippingCost + tax;
  const discountedTotal = Math.max(orderTotalBeforeDiscount - discountValue, 0);

  const fetchVouchers = async () => {
    setLoadingVouchers(true);
    try {
      const response = await fetch("http://localhost:4000/api/voucher/getAllVouchers");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.EC === 1) {
        setVouchers(data.DT);
      } else {
        setErrorVouchers(new Error(data?.EM || "Lỗi khi tải voucher"));
      }
      setLoadingVouchers(false);
    } catch (error) {
      setErrorVouchers(error);
      setLoadingVouchers(false);
      console.error("Lỗi khi tải voucher:", error);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  // Hàm này sẽ được gọi khi DiscountModal áp dụng mã thủ công
  // const handleApplyManualDiscount = (voucher) => {
  //   if (voucher) {
  //     if (new Date(voucher.expirationDate) < new Date()) {
  //       setAppliedVoucher({ code: voucher.code, expired: true });
  //       setDiscountValue(0);
  //     } else if (voucher.discount) {
  //       const discountAmount = (orderTotalBeforeDiscount * voucher.discount) / 100;
  //       setDiscountValue(discountAmount);
  //       setAppliedVoucher({ code: voucher.code, expired: false });
  //     }
  //   } else {
  //     alert("Mã không hợp lệ.");
  //     setDiscountValue(0);
  //     setAppliedVoucher(null);
  //   }
  //   setShowDiscountModal(false);
  //   setEnteredDiscountCode(""); // Reset input sau khi áp dụng
  // };

  // Hàm này sẽ được gọi khi DiscountModal chọn một voucher từ danh sách
  const handleSelectVoucherFromList = (voucherCode) => {
    const voucher = vouchers.find(v => v.code === voucherCode && new Date(v.expirationDate) >= new Date());
    if (voucher && voucher.discount) {
      const discountAmount = (orderTotalBeforeDiscount * voucher.discount) / 100;
      setDiscountValue(discountAmount);
      setAppliedVoucher({ code: voucher.code, expired: false });
    }
    setShowDiscountModal(false);
  };

  const handleCloseDiscountModal = () => {
    setShowDiscountModal(false);
  };


  //sử lý thanh toán 
  const { user } = useContext(UserContext); // Lấy thông tin user từ UserContext
  const handleCheckout = () => {
    if (user) {
      // Nếu đã đăng nhập, chuyển sang trang Checkout
      navigate(path.shopping_card_checkout, { state: { user } });
    } else {
      // Nếu chưa đăng nhập, hiển thị thông báo và chuyển đến trang đăng nhập
      if (window.confirm("Vui lòng đăng nhập để thanh toán.")) {
        navigate(path.login);
      }
    }
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
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Giỏ hàng */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="hidden md:flex items-center mb-4 border-b pb-4">
            <div className="w-24 text-sm font-semibold text-gray-700">Item</div>
            <div className="flex-grow"></div>
            <div className="mr-4 text-sm font-semibold text-gray-700">Price</div>
            <div className="mr-4 text-sm font-semibold text-gray-700">Qty</div>
            <div className="mr-4 text-sm font-semibold text-gray-700">Subtotal</div>
            <div></div>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-4">Giỏ hàng trống</div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.productID}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))
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

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
          {cartItems.length > 0 ? (
            <>
              {/* Dropdown 1 - Shipping & Tax */}
              <div className="mb-4">
                <button
                  onClick={() => setShowShippingTax((prev) => !prev)}
                  className="w-full text-left text-sm font-semibold text-gray-800 flex justify-between items-center"
                >
                  Ước tính phí vận chuyển và thuế
                  <span>{showShippingTax ? "−" : "+"}</span>
                </button>
                {showShippingTax && (
                  <div className="mt-2 space-y-2 text-sm text-gray-700">
                    <select className="w-full border p-2 rounded">
                      <option>Australia</option>
                    </select>
                    <input
                      className="w-full border p-2 rounded"
                      type="text"
                      placeholder="Tỉnh/Thành phố"
                    />
                    <input
                      className="w-full border p-2 rounded"
                      type="text"
                      placeholder="Mã bưu điện"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Tỷ lệ chuẩn: Giá có thể thay đổi tùy theo mặt hàng/địa điểm. Nhân viên cửa hàng sẽ liên hệ với bạn. {formatCurrency(500000)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Nhận tại cửa hàng: 1234 Địa chỉ đường phố Thành phố, 1234 {formatCurrency(0)}
                    </div>
                  </div>
                )}
              </div>

              {/* Dropdown 2 - Discount Code */}
              <div className="mb-4">
                <button
                  onClick={() => setShowDiscountModal(true)}
                  className="w-full text-left text-sm font-semibold text-gray-800 flex justify-between items-center"
                >
                  Áp dụng mã giảm giá
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
              {loadingVouchers ? (
                <div className="text-center text-gray-500 py-4">Đang tải mã giảm giá...</div>
              ) : errorVouchers ? (
                <div className="text-center text-red-500 py-4">
                  Lỗi khi tải mã giảm giá: {errorVouchers.message}
                </div>
              ) : (
                <>
                  {/* Tổng tiền */}
                  <div className="flex justify-between mb-2 text-sm text-gray-700 font-semibold">
                    <span>Tổng phụ</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm text-gray-700 font-semibold">
                    <span>Vận chuyển</span>
                    <span>{formatCurrency(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-sm text-gray-700 font-semibold">
                    <span>Thuế VAT (10%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  {appliedVoucher && (
                    <div
                      className={`flex justify-between mb-2 text-sm font-semibold ${appliedVoucher.expired ? "text-red-500" : "text-green-700"
                        }`}
                    >
                      <span>
                        {appliedVoucher.expired
                          ? `Voucher (${appliedVoucher.code}) - Hết hạn`
                          : `Giảm giá (${appliedVoucher.code})`}
                      </span>
                      <span>
                        {appliedVoucher.expired ? "Hết hạn" : `-${formatCurrency(discountValue)}`}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Tổng đơn hàng</span>
                    <span>{formatCurrency(discountedTotal)}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 text-white p-3 mt-4 rounded-4xl hover:bg-blue-700"
                  >
                    Tiến hành thanh toán
                  </button>
                  <button className="w-full bg-yellow-400 text-black p-3 mt-2 rounded-4xl hover:bg-yellow-500">
                    Thanh toán qua PayPal
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="p-6 text-center text-gray-500">
              Giỏ hàng trống
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;