import React from 'react';
import EventCard from './EventCard';

// --- CẢNH BÁO: Phần này cực kỳ phức tạp để làm đúng ---
// Code dưới đây chỉ tạo cấu trúc cơ bản và đặt sự kiện tĩnh làm ví dụ.
// Logic thực tế cần tính toán vị trí (grid-row-start, grid-column-start, grid-row-end)
// dựa trên ngày, giờ bắt đầu, giờ kết thúc của sự kiện.

function CalendarGrid() {
  const days = ['Mon 3', 'Tue 4', 'Wed 5', 'Thu 6', 'Fri 7', 'Sat 8', 'Sun 9']; // Ví dụ 1 tuần
  const hours = Array.from({ length: 15 }, (_, i) => i + 7); // Từ 7 AM đến 9 PM

  // Tổng số hàng = số giờ * 2 (nếu chia mỗi giờ làm 2 slot 30 phút) + 1 hàng header
  // Hoặc đơn giản hơn là mỗi giờ 1 hàng = 15 hàng + 1 header = 16
  const totalRows = (hours.length * 2) + 1; // Giả sử mỗi giờ 2 slot 30 phút
  const hourRowHeight = 'h-12'; // Chiều cao ước tính cho mỗi giờ

  return (
    // Sử dụng CSS Grid để tạo lưới chính
    // Cột đầu tiên cho thời gian, các cột sau cho các ngày
    <div className="relative grid grid-cols-[auto_repeat(7,minmax(0,1fr))] grid-rows-[auto_repeat(30,minmax(0,1fr))] gap-0 border-t border-l border-gray-700/50">
      {/* Header trống góc trên trái */}
      <div className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-sm border-b border-r border-gray-700/50 h-10"></div>

      {/* Header các ngày trong tuần (dính ở trên khi cuộn) */}
      {days.map((day, index) => (
        <div key={day || index} className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-sm text-center p-2 border-b border-r border-gray-700/50 h-10">
          <span className="text-xs text-gray-400 block">{day.split(' ')[0]}</span>
          <span className="text-lg font-semibold text-white">{day.split(' ')[1]}</span>
        
          
          {/* Có thể thêm đánh dấu ngày hiện tại */}
        </div>
      ))}

      {/* Cột hiển thị thời gian (bên trái) */}
      <div className={`col-start-1 col-end-2 row-start-2 row-end-[${totalRows + 2}] border-r border-gray-700/50`}>
        {hours.map((hour) => (
           // Mỗi giờ chiếm 2 hàng (cho slot 30 phút)
           <React.Fragment key={hour}>
             <div className={`row-span-2 ${hourRowHeight} flex justify-end items-start pt-1 pr-2 border-b border-gray-700/50`}>
               <span className="text-xs text-gray-400">{`${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 || hour === 24 ? 'AM' : 'PM'}`}</span>
             </div>
           </React.Fragment>
        ))}
      </div>

      {/* Các ô lưới chính cho các ngày và giờ */}
      {days.map((day, dayIndex) => (
        <div key={`day-col-${dayIndex}`} className={`col-start-${dayIndex + 2} col-end-${dayIndex + 3} row-start-2 row-end-[${totalRows + 2}] grid grid-rows-[repeat(30,minmax(0,1fr))] divide-y divide-gray-700/50 border-r border-gray-700/50`}>
           {/* Tạo các đường kẻ ngang cho slot 30 phút */}
           {Array.from({length: 30}).map((_, slotIndex) => (
              <div key={`slot-${dayIndex}-${slotIndex}`} className="h-full"></div>
           ))}
        </div>
      ))}


      {/* --- Đặt các EventCard tĩnh làm VÍ DỤ --- */}
      {/* Logic thực tế sẽ tính toán các giá trị col-start, row-start, row-span */}

      {/* Team Meeting (8:30 - 10:00 Tue 4) */}
      <EventCard title="Team Meeting" time="08:30 - 10:00" color="blue" style={{ gridColumnStart: 3, gridRowStart: 4, gridRowEnd: 7 }} />
      {/* Morning Exercise (8:30 - 9:30 Wed 5) */}
      <EventCard title="Morning Exercise" time="08:30 - 09:30" color="blue" style={{ gridColumnStart: 4, gridRowStart: 4, gridRowEnd: 6 }} />
      {/* Event Xanh lá (11:00 - 12:30 Tue 4) */}
      <EventCard title="Travel with friends" time="11:00 - 12:30" color="green" style={{ gridColumnStart: 3, gridRowStart: 9, gridRowEnd: 12 }} />
      {/* Event Vàng (10:00 - 11:30 Wed 5) */}
      <EventCard title="Client Call" time="10:00 - 11:30" color="yellow" style={{ gridColumnStart: 4, gridRowStart: 7, gridRowEnd: 10 }} />
      {/* Event Hồng (10:30 - 12:00 Thu 6) */}
      <EventCard title="Product Demo" time="10:30 - 12:00" color="pink" style={{ gridColumnStart: 5, gridRowStart: 8, gridRowEnd: 11 }} />
       {/* Event Cam (10:30 - 12:00 Fri 7) */}
       <EventCard title="Client Presentation" time="10:30 - 12:00" color="orange" style={{ gridColumnStart: 6, gridRowStart: 8, gridRowEnd: 11 }} />
        {/* Event Đỏ (12:00 - 13:30 Sat 8) */}
       <EventCard title="Dentist Meeting" time="12:00 - 13:30" color="red" style={{ gridColumnStart: 7, gridRowStart: 11, gridRowEnd: 14 }} />
      {/* Event Xanh lá (10:00 - 11:30 Thu 6) */}
      <EventCard title="Staff Training" time="10:00 - 11:30" color="green" style={{ gridColumnStart: 5, gridRowStart: 7, gridRowEnd: 10 }} />
       {/* Event Hồng (13:00 - 14:00 Tue 4) */}
      <EventCard title="Design Meeting" time="13:00 - 14:00" color="pink" style={{ gridColumnStart: 3, gridRowStart: 13, gridRowEnd: 15 }} />
       {/* Event Vàng (13:30 - 15:00 Wed 5) */}
      <EventCard title="Team Brainstorm" time="13:30 - 15:00" color="yellow" style={{ gridColumnStart: 4, gridRowStart: 14, gridRowEnd: 17 }} />
        {/* Event Tím (15:00 - 16:00 Wed 5) */}
      <EventCard title="Project Sync" time="15:00 - 16:00" color="purple" style={{ gridColumnStart: 4, gridRowStart: 17, gridRowEnd: 19 }} />
       {/* Event Tím đậm (14:30 - 16:00 Thu 6) */}
       <EventCard title="Design Review" time="14:30 - 16:00" color="purple" style={{ gridColumnStart: 5, gridRowStart: 16, gridRowEnd: 19 }} />
       {/* Event Cam (14:30 - 15:30 Fri 7) */}
       <EventCard title="Marketing Meeting" time="14:30 - 15:30" color="orange" style={{ gridColumnStart: 6, gridRowStart: 16, gridRowEnd: 18 }} />
       {/* Event Tím (15:00 - 16:30 Sat 8) */}
       <EventCard title="Meeting with Marketing" time="15:00 - 16:30" color="purple" style={{ gridColumnStart: 7, gridRowStart: 17, gridRowEnd: 20 }} />


    </div>
  );
}

export default CalendarGrid;