import React from "react";

const DropdownControls = ({ 
  handleChangePerPage, 
  productsPerPage, 
  sortOption, 
  handleChangeSortOption 
}) => {
  return (
    <div className="flex gap-4">
      {/* Sort By */}
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-1">
        <span className="text-gray-300 text-sm mr-1">Sort By:</span>
        <select
          className="bg-transparent text-black font-semibold outline-none"
          value={sortOption}
          onChange={handleChangeSortOption}
        >
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
          <option value="date-desc">Newest</option>
          <option value="date-asc">Oldest</option>
          <option value="brand-asc">Brand A-Z</option>
          <option value="stock-desc">Stock High to Low</option>
        </select>
      </div>

      {/* Show per page */}
      <div className="flex items-center border border-gray-300 rounded px-3 py-1">
        <span className="text-gray-300 text-sm mr-1">Show:</span>
        <select
          className="bg-transparent text-black font-semibold outline-none"
          onChange={handleChangePerPage}
          value={productsPerPage}
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={35}>35 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
    </div>
  );
};

export default DropdownControls;
