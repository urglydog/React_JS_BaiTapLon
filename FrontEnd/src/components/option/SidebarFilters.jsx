import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SidebarFilters = () => {
  const [selectedColor, setSelectedColor] = useState("red");
  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    color: true,
    name: true,
  });

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = [
    { name: "CUSTOM PCS", count: 15 },
    { name: "MSI ALL-IN-ONE PCS", count: 45 },
    { name: "HP/COMPAQ PCS", count: 1 },
  ];

  const prices = [
    "$0.00 - $1,000.00",
    "$1,000.00 - $2,000.00",
    "$2,000.00 - $3,000.00",
    "$3,000.00 - $4,000.00",
    "$4,000.00 - $5,000.00",
    "$5,000.00 - $6,000.00",
    "$6,000.00 - $7,000.00",
    "$7,000.00 And Above",
  ];

  const priceCounts = [19, 21, 9, 6, 3, 1, 1, 1];

  return (
    <div className="w-full max-w-xs p-4 bg-[#f6f8ff] rounded-md font-sans text-sm text-black">
      <h2 className="text-center text-xl font-bold mb-4">Filters</h2>

      <button className="w-full border border-gray-400 text-gray-400 font-semibold py-2 rounded-full mb-4">
        Clear Filter
      </button>

      {/* Category */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center font-bold cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <span>Category</span>
          {expanded.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expanded.category && (
          <div className="mt-2 space-y-2">
            {categories.map((item) => (
              <div className="flex justify-between" key={item.name}>
                <span>{item.name}</span>
                <span>{item.count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center font-bold cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <span>Price</span>
          {expanded.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expanded.price && (
          <div className="mt-2 space-y-2">
            {prices.map((price, index) => (
              <div className="flex justify-between" key={price}>
                <span>{price}</span>
                <span>{priceCounts[index]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Color */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center font-bold cursor-pointer"
          onClick={() => toggleSection("color")}
        >
          <span>Color</span>
          {expanded.color ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
        {expanded.color && (
          <div className="flex mt-3 space-x-4">
            {["black", "red"].map((color) => (
              <div
                key={color}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                  selectedColor === color ? "border-blue-500" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Filter Name */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center font-bold cursor-pointer"
          onClick={() => toggleSection("name")}
        >
          <span>Filter Name</span>
          {expanded.name ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-full font-bold">
        Apply Filters (2)
      </button>
    </div>
  );
};

export default SidebarFilters;
