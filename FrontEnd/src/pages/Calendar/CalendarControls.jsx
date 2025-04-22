import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

function CalendarControls() {
  return (
    // flex-shrink-0 để control không bị co lại khi scroll grid
    <div className="flex items-center mb-4 flex-shrink-0">
       <button className="border border-gray-600/80 rounded-md px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-gray-700/50 mr-4 transition duration-150">
         Today
       </button>
       <div className="flex items-center border border-gray-600/80 rounded-md mr-4">
          <button className="p-1.5 border-r border-gray-600/80 hover:bg-gray-700/50 transition duration-150 rounded-l-md">
              <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-gray-700/50 transition duration-150 rounded-r-md">
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </button>
       </div>
       <h2 className="text-xl font-semibold text-white">March 5</h2>
       {/* Thêm select "Week" - có thể làm component riêng */}
        <div className="ml-4">
           <select className="bg-gray-700/50 border border-gray-600/80 rounded-md px-3 py-1.5 text-sm font-medium text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none">
              <option>Week</option>
              <option>Day</option>
              <option>Month</option>
           </select>
        </div>
       {/* Nút Search / Settings ở góc phải (tùy chọn) */}
       {/* <div className="ml-auto">...</div> */}
    </div>
  );
}

export default CalendarControls;