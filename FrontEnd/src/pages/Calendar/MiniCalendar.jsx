import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

function MiniCalendar() {
  // --- Logic xử lý ngày tháng thực tế cần thêm ở đây ---
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  // Dữ liệu ngày giả lập (cần logic thật để tính toán)
  const days = [
    { day: 24, isCurrentMonth: false }, { day: 25, isCurrentMonth: false }, { day: 26, isCurrentMonth: false }, { day: 27, isCurrentMonth: false }, { day: 28, isCurrentMonth: false }, { day: 1, isCurrentMonth: true }, { day: 2, isCurrentMonth: true },
    { day: 3, isCurrentMonth: true }, { day: 4, isCurrentMonth: true }, { day: 5, isCurrentMonth: true, isToday: true }, { day: 6, isCurrentMonth: true }, { day: 7, isCurrentMonth: true }, { day: 8, isCurrentMonth: true }, { day: 9, isCurrentMonth: true },
    { day: 10, isCurrentMonth: true }, { day: 11, isCurrentMonth: true }, { day: 12, isCurrentMonth: true }, { day: 13, isCurrentMonth: true }, { day: 14, isCurrentMonth: true }, { day: 15, isCurrentMonth: true }, { day: 16, isCurrentMonth: true },
    { day: 17, isCurrentMonth: true }, { day: 18, isCurrentMonth: true }, { day: 19, isCurrentMonth: true }, { day: 20, isCurrentMonth: true }, { day: 21, isCurrentMonth: true }, { day: 22, isCurrentMonth: true }, { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true }, { day: 25, isCurrentMonth: true }, { day: 26, isCurrentMonth: true }, { day: 27, isCurrentMonth: true }, { day: 28, isCurrentMonth: true }, { day: 29, isCurrentMonth: true }, { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true }, { day: 1, isCurrentMonth: false }, { day: 2, isCurrentMonth: false }, { day: 3, isCurrentMonth: false }, { day: 4, isCurrentMonth: false }, { day: 5, isCurrentMonth: false }, { day: 6, isCurrentMonth: false }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-sm text-white">March 2025</h2>
        <div className="flex space-x-1">
          <button className="p-1 rounded hover:bg-gray-700/70 text-gray-400 hover:text-gray-200">
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button className="p-1 rounded hover:bg-gray-700/70 text-gray-400 hover:text-gray-200">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-1 gap-x-0 text-center text-xs text-gray-400 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1 gap-x-0 text-center text-xs">
        {days.map((d, index) => (
          <button
            key={index}
            className={`p-1 rounded w-full h-6 flex items-center justify-center
              ${ d.isToday ? 'bg-blue-600 text-white' : ''}
              ${ !d.isToday && d.isCurrentMonth ? 'text-gray-200 hover:bg-gray-700/70' : ''}
              ${ !d.isCurrentMonth ? 'text-gray-600 hover:bg-gray-700/40' : ''}
            `}
          >
            {d.day}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MiniCalendar;