import React from 'react';

const calendars = [
  { id: 'work', name: 'Work', color: 'bg-blue-500', checked: true },
  { id: 'personal', name: 'Personal', color: 'bg-green-500', checked: true },
  { id: 'family', name: 'Family', color: 'bg-purple-500', checked: true },
];

function CalendarList() {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2 text-gray-400">My calendars</h3>
      <ul className="space-y-2">
        {calendars.map((cal) => (
          <li key={cal.id} className="flex items-center text-sm cursor-pointer group">
             {/* Giả lập checkbox */}
             <span className={`w-3 h-3 ${cal.color} rounded-sm mr-2 border border-transparent ${cal.checked ? '' : 'bg-opacity-30 border-gray-500'}`}></span>
             <span className={`group-hover:text-white ${cal.checked ? 'text-gray-200' : 'text-gray-500 line-through'}`}>
               {cal.name}
             </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarList;