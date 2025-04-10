// src/components/ProductCard.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full max-w-[200px]  bg-white shadow rounded-lg p-3 mx-auto hover:shadow-lg transition">
      {/* Tình trạng */}
      <div className="text-xs font-semibold text-green-600 mb-1">
        {product.inStock ? (
          <span className="text-green-600">🟢 in stock</span>
        ) : (
          <span className="text-red-500">🔴 check availability</span>
        )}
      </div>

      {/* Ảnh sản phẩm */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-contain mb-2"
      />

      {/* Đánh giá */}
      <div className="flex items-center text-sm text-gray-600 mb-1">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-yellow-400 mr-1" size={12} />
        ))}
        <span>Reviews ({product.reviews})</span>
      </div>

      {/* Tên sản phẩm */}
      <h3 className="text-xs font-semibold text-gray-800 mb-1 line-clamp-2 cursor-pointer">
        {product.name}
      </h3>

      {/* Giá */}
      <div className="mt-1">
        <p className="line-through text-sm text-gray-400">${product.oldPrice}</p>
        <p className="text-lg font-bold text-black">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
