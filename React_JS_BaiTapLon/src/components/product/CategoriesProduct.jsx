import React from 'react';
import { Link } from 'react-router-dom';
import custom_builds from "../../assets/images/custom_buid.webp"; // Đã sửa lỗi chính tả tên biến

const CategoriesProduct = ({ image = custom_builds, text = "Custom Builds", link = "/products" }) => {
  return (
    <div className="relative w-full h-[290px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Background Image */}
      <img 
        src={image}  // Sử dụng prop image được truyền vào
        alt={text}   // Sử dụng text prop cho alt
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = 'https://via.placeholder.com/300x250?text=Image+Not+Found';
        }}
      />

      {/* Overlay + Text Centered */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end text-white text-center p-4 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{text}</h2>
        <Link
          to={link}
          className="mt-2 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          See All Products
        </Link>
      </div>
    </div>
  );
};

export default CategoriesProduct;