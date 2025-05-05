import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/ShoppingCard/ShoppingCardItem";
import path from "../../constant/path";
import {
  removeItem,
  updateItemQuantity,
  clearCart,
} from "../../utils/redux/cartSlice"; // Giả sử bạn đã tạo các action này trong cartSlice

const ShoppingCartItem = () => {
  const cartItems = useSelector((state) => state.cart.carts); // Lấy giỏ hàng từ Redux store
  const dispatch = useDispatch();

  const [showShippingTax, setShowShippingTax] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép số lượng nhỏ hơn 1
    console.log(`Updating quantity for item ${id} to ${newQuantity}`);
    dispatch(updateItemQuantity({ id, newQuantity })); // Gọi action update số lượng
  };

  const handleRemoveItem = (id) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")
    ) {
      dispatch(removeItem({ id })); // Gọi action xóa sản phẩm
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
      dispatch(clearCart()); // Gọi action xóa toàn bộ giỏ hàng
    }
  };

  const handleContinueShopping = () => {
    navigate("/"); // Quay về trang chủ
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Tính toán tổng tiền, thuế, và phí vận chuyển
  const shippingCost = 21.0;
  const taxRate = 0.1;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * taxRate;
  const orderTotal = subtotal + shippingCost + tax;

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
            <div className="mr-4 text-sm font-semibold text-gray-700">
              Price
            </div>
            <div className="mr-4 text-sm font-semibold text-gray-700">Qty</div>
            <div className="mr-4 text-sm font-semibold text-gray-700">
              Subtotal
            </div>
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
                  Tỷ lệ chuẩn: Giá có thể thay đổi tùy theo mặt hàng/địa điểm.
                  Nhân viên cửa hàng sẽ liên hệ với bạn.{" "}
                  {formatCurrency(500000)}
                </div>
                <div className="text-xs text-gray-500">
                  Nhận tại cửa hàng: 1234 Địa chỉ đường phố Thành phố, 1234
                  {formatCurrency(0)}
                </div>
              </div>
            )}
          </div>

          {/* Dropdown 2 - Discount Code */}
          <div className="mb-4">
            <button
              onClick={() => setShowDiscount((prev) => !prev)}
              className="w-full text-left text-sm font-semibold text-gray-800 flex justify-between items-center"
            >
              Áp dụng mã giảm giá
              <span>{showDiscount ? "−" : "+"}</span>
            </button>
            {showDiscount && (
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="w-full border p-2 rounded mb-2"
                />
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                  Áp dụng giảm giá
                </button>
              </div>
            )}
          </div>

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
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Tổng đơn hàng</span>
            <span>{formatCurrency(orderTotal)}</span>
          </div>
          <button className="w-full bg-blue-600 text-white p-3 mt-4 rounded-4xl hover:bg-blue-700">
            Tiến hành thanh toán
          </button>
          <button className="w-full bg-yellow-400 text-black p-3 mt-2 rounded-4xl hover:bg-yellow-500">
            Thanh toán qua PayPal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
