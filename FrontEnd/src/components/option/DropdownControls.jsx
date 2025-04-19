import React from "react";

const DropdownControls = () => {
  return (
    <div className="flex gap-4">
      {/* Sort By */}
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-1">
        <span className="text-gray-300 text-sm mr-1">Sort By:</span>
        <select className="bg-transparent text-black font-semibold outline-none">
          <option value="position">Position</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
      </div>

      {/* Show per page */}
      <div className="flex items-center border border-gray-300 rounded px-3 py-1">
        <span className="text-gray-300 text-sm mr-1">Show:</span>
        <select className="bg-transparent text-black font-semibold outline-none">
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="35">35 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>
    </div>
  );
};

export default DropdownControls;
