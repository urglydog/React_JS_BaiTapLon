import React from 'react';
import CalendarControls from './CalendarControls';
import CalendarGrid from './CalendarGrid';

function MainCalendarView() {
  return (
    <div className="flex-1 flex flex-col text-gray-800 p-6 overflow-hidden">
      {/* Thêm overflow-hidden để nội dung không tràn ra ngoài */}
       <CalendarControls />
       {/* Cho phép CalendarGrid scroll nếu nội dung dài hơn */}
       <div className="flex-1 overflow-y-auto pr-1">
         <CalendarGrid />
       </div>
    </div>
  );
}

export default MainCalendarView;