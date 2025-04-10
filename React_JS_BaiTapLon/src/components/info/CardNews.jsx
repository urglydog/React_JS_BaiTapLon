import React from 'react';

const CardNews = ({ 
  title = "Enhance Your Setup with New Peripherals",
  excerpt = "If you’ve recently made a desktop PC or laptop purchase, you might want to consider adding peripherals to enhance your home office setup, your gaming rig, or your business workspace...",
  date = "01.09.2020",
  imageUrl = "/path-to-default-image.jpg" 
}) => {
  return (
    <div className="max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      {/* Phần hình ảnh */}
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Phần nội dung */}
      <div className="p-6">
        {/* Tiêu đề */}
        <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">
          {title}
        </h3>
        
        {/* Đoạn trích */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        {/* Ngày đăng */}
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </div>
      </div>
    </div>
  );
};

export default CardNews;