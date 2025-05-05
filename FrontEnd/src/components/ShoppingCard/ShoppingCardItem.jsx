// CartItem.js
import { useEffect, useState } from "react";

function CartItem({ item, onQuantityChange, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity); // Cập nhật lại quantity khi item thay đổi
  }, [item.quantity]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return; // Không cho phép số lượng nhỏ hơn 1
    setQuantity(newQuantity);
    onQuantityChange(item.productID, newQuantity); // Gọi hàm onQuantityChange
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      {/* Hình ảnh sản phẩm */}
      <div className="w-24 h-24 mr-4">
        <img
          src={item.image}
          alt={item.productName}
          className="w-full h-full object-cover rounded-lg"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-gray-700">
          {item.productName}
        </h3>
        <p className="text-xs text-gray-500">{item.description}</p>
      </div>

      {/* Giá sản phẩm */}
      <div className="mr-4 text-sm font-semibold text-gray-700">
        {parseFloat(item?.price?.replace(/[₫,]/g, "") || 0).toLocaleString(
          "vi-VN",
          {
            style: "currency",
            currency: "VND",
          }
        )}
      </div>

      {/* Số lượng */}
      <div className="flex items-center space-x-1 mr-4">
        {/* Decrease button */}
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Quantity input */}
        <div className="relative">
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 1;
              handleQuantityChange(Math.max(1, value));
            }}
            min="1"
            className="w-12 h-8 border border-gray-300 rounded-md text-center font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Increase button */}
        <button
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Tổng tiền sản phẩm */}
      <div className="mr-4 text-sm font-semibold text-gray-700">
        {parseFloat(
          item?.price?.replace(/[₫,]/g, "") * item?.quantity || 0
        ).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </div>

      {/* Nút xóa sản phẩm */}
      <button
        onClick={() => onRemove(item.productID)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default CartItem;
