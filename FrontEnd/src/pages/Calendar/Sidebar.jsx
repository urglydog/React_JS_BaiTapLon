import React from 'react';
import MiniCalendar from './MiniCalendar';
import CalendarList from './CalendarList';
import { PlusIcon } from '@heroicons/react/24/solid';

function Sidebar() {
  return (
    <div className="w-64 h-full bg-gray-900/80 text-gray-200 p-4 flex flex-col backdrop-blur-md border-r border-gray-700/50 flex-shrink-0">
      {/* flex-shrink-0 để sidebar không bị co lại */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-4 text-white">Calendar</h1>
        <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 text-sm">
          <PlusIcon className="h-5 w-5 mr-1" />
          Create
        </button>
      </div>

      <MiniCalendar />

      <CalendarList />

      {/* Nút + ở dưới cùng */}
      <div className="mt-auto pt-4">
         <button className="flex items-center justify-center w-10 h-10 bg-gray-700/60 hover:bg-gray-600/80 rounded-full transition duration-150 mx-auto">
            <PlusIcon className="h-6 w-6 text-gray-300" />
         </button>
      </div>
    </div>
  );
}

export default Sidebar;