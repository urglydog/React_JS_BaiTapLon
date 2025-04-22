import React from 'react'
import Sidebar from './Sidebar';
import MainCalendarView from './MainCalendarView';
import backgroundImage from './assets/image.png';
export default function Taki() {
  return (
    <div
      className="flex h-screen bg-cover bg-center overflow-hidden" // Thêm overflow-hidden để tránh scroll toàn trang
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Lớp phủ có thể thêm nếu muốn hiệu ứng tối/mờ hơn */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div> */}

      {/* Container chính đặt trên lớp phủ (nếu có), dùng relative để các phần tử con absolute định vị theo */}
      <div className="relative flex h-full w-full z-10">
        <Sidebar />
        <MainCalendarView />
        {/* Bạn có thể thêm Popup thông báo ở đây */}
        {/* <NotificationPopup /> */}
      </div>
    </div>
  )
}
