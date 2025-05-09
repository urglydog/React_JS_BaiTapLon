// src/components/ProductCard.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.productID}/productAbout`);
  };

  return (
    <div
      className="w-[200px] h-[340px] bg-white shadow rounded-lg p-3 hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
      onClick={handleClick}
    >
      {/* Tình trạng */}
      <div className="text-xs font-semibold text-green-600 mb-1 h-4">
        {product.inStock ? (
          <span className="text-green-600">🟢 in stock</span>
        ) : (
          <span className="text-red-500">🔴 check availability</span>
        )}
      </div>

      {/* Ảnh sản phẩm */}
      <div className="h-32 mb-2 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.productName}
          className="max-h-full object-contain"
        />
      </div>

      {/* Đánh giá */}
      <div className="flex items-center text-sm text-gray-600 mb-1 h-5">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-yellow-400 mr-1" size={12} />
        ))}
        {/* <span className="ml-1">({product.reviews})</span> */}
      </div>

      {/* Tên sản phẩm */}
      <h3 className="text-xs font-semibold text-gray-800 mb-1 line-clamp-2 h-[2.5rem]">
        {product.productName}
      </h3>

      {/* Giá */}
      <div className="mt-1">
        <p className="line-through text-sm text-gray-400">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price * 1.25)}
        </p>
        <p className="text-lg font-bold text-black">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
