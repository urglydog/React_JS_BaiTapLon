import React from 'react';

function EventCard({ title, time, color, style }) {
  // Map màu tên sang class Tailwind (có thể làm tốt hơn)
  const colorClasses = {
    blue: 'bg-blue-500/80 border-blue-400',
    green: 'bg-green-500/80 border-green-400',
    yellow: 'bg-yellow-500/80 border-yellow-400',
    pink: 'bg-pink-500/80 border-pink-400',
    purple: 'bg-purple-500/80 border-purple-400',
    orange: 'bg-orange-500/80 border-orange-400',
    red: 'bg-red-500/80 border-red-400',
    // Thêm các màu khác nếu cần
  };

  return (
    <div
      className={`absolute p-1.5 rounded text-white text-xs leading-tight overflow-hidden border-l-2 ${colorClasses[color] || 'bg-gray-500/80 border-gray-400'}`}
      style={style} // style này chứa grid-column-start, grid-row-start, grid-row-end
    >
      <p className="font-semibold">{title}</p>
      <p>{time}</p>
    </div>
  );
}

export default EventCard;