import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SidebarFilters = ({ products = [], allProducts, onApplyFilters }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [filterName, setFilterName] = useState("");
  const [expanded, setExpanded] = useState({
    category: true,
    price: true,
    color: true,
    name: true,
  });

  const toggleSection = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const clearFilters = () => {
    setSelectedColor("");
    setSelectedCategory("");
    setSelectedPriceRange("");
    setFilterName("");
    onApplyFilters(allProducts);
  };

  const priceRanges = [
    { min: 0, max: 1000000, label: "₫0 - ₫1,000,000" },
    { min: 1000000, max: 2000000, label: "₫1,000,000 - ₫2,000,000" },
    { min: 2000000, max: 3000000, label: "₫2,000,000 - ₫3,000,000" },
    { min: 3000000, max: 4000000, label: "₫3,000,000 - ₫4,000,000" },
    { min: 4000000, max: 5000000, label: "₫4,000,000 - ₫5,000,000" },
    { min: 5000000, max: 6000000, label: "₫5,000,000 - ₫6,000,000" },
    { min: 6000000, max: 7000000, label: "₫6,000,000 - ₫7,000,000" },
    { min: 7000000, max: Infinity, label: "₫7,000,000 And Above" },
  ];

  // Hàm lọc sản phẩm theo lựa chọn hiện tại
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.categoryName === selectedCategory
      );
    }
    if (selectedPriceRange) {
      const [minStr, maxStr] = selectedPriceRange.split(" - ");
      const min = parseFloat(minStr.replace(/[₫,]/g, ""));
      const max = maxStr ? parseFloat(maxStr.replace(/[₫,]/g, "")) : Infinity;
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.price.replace(/[₫,]/g, ""));
        return price >= min && price <= max;
      });
    }

    return filtered;
  }, [products, selectedCategory, selectedPriceRange]);

  // Tính categoryCounts dựa trên filteredProducts
  const categoryCounts = useMemo(() => {
    const counts = {};
    filteredProducts.forEach((product) => {
      counts[product.categoryName] = (counts[product.categoryName] || 0) + 1;
    });
    return counts;
  }, [filteredProducts]);

  const categories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Tính priceCounts dựa trên filteredProducts
  const priceCounts = priceRanges.map(({ min, max }) => {
    return filteredProducts.filter((product) => {
      const productPrice = parseFloat(product.price.replace(/[₫,]/g, ""));
      return productPrice >= min && (max ? productPrice <= max : true);
    }).length;
  });

  // Tính colorCounts (không phụ thuộc vào selectedCategory/Price)
  const colorCounts = useMemo(() => {
    const counts = {};
    products.forEach((product) => {
      if (product.color) {
        counts[product.color] = (counts[product.color] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const colors = Object.entries(colorCounts).map(([color, count]) => ({
    color,
    count,
  }));

  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  return (
    <div className="w-full max-w-xs p-4 bg-[#f6f8ff] rounded-md font-sans text-sm text-black">
      <h2 className="text-center text-xl font-bold mb-4">Filters</h2>

      <button
        onClick={clearFilters}
        className="w-full border border-gray-400 text-gray-400 font-semibold py-2 rounded-full mb-4"
      >
        Clear Filters
      </button>

      {/* Category */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center font-bold cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <span>Category</span>
          {expanded.category ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </div>
        {expanded.category && (
          <div className="mt-2 space-y-2">
            {categories.map((item) => (
              <div
                key={item.name}
                className={`flex justify-between items-center cursor-pointer px-2 py-1 rounded ${
                  selectedCategory === item.name ? "bg-blue-100" : ""
                }`}
                onClick={() => setSelectedCategory(item.name)}
              >
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
            {priceRanges.map(({ label }, index) => (
              <div
                key={label}
                className={`flex justify-between items-center cursor-pointer px-2 py-1 rounded ${
                  selectedPriceRange === label ? "bg-blue-100" : ""
                }`}
                onClick={() => {
                  setSelectedPriceRange(label);
                  setMinPriceInput("");
                  setMaxPriceInput("");
                }}
              >
                <span>{label}</span>
                <span>{priceCounts[index]} sản phẩm</span>
              </div>
            ))}

            <div className="flex items-center gap-2 mt-4">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 p-2 border rounded"
                value={minPriceInput}
                onChange={(e) => {
                  setMinPriceInput(e.target.value);
                  setSelectedPriceRange(""); // Clear chọn preset
                }}
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 p-2 border rounded"
                value={maxPriceInput}
                onChange={(e) => {
                  setMaxPriceInput(e.target.value);
                  setSelectedPriceRange(""); // Clear chọn preset
                }}
              />
            </div>
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
          <div className="flex flex-wrap gap-3 mt-3">
            {colors.map((color) => (
              <div
                key={color.color}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                  selectedColor === color.color
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color.color }}
                onClick={() => setSelectedColor(color.color)}
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
        {expanded.name && (
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Search by name..."
            className="mt-3 w-full px-3 py-2 border rounded-md"
          />
        )}
      </div>

      <button
        className="w-full bg-blue-600 text-white py-2 rounded-full font-bold"
        onClick={() => {
          let finalFiltered = [...products];

          if (selectedCategory) {
            finalFiltered = finalFiltered.filter(
              (product) => product.categoryName === selectedCategory
            );
          }
          if (selectedPriceRange) {
            const [minStr, maxStr] = selectedPriceRange.split(" - ");
            const min = parseFloat(minStr.replace(/[₫,]/g, ""));
            const max = maxStr
              ? parseFloat(maxStr.replace(/[₫,]/g, ""))
              : Infinity;
            finalFiltered = finalFiltered.filter((product) => {
              const price = parseFloat(product.price.replace(/[₫,]/g, ""));
              return price >= min && price <= max;
            });
          }
          if (selectedColor) {
            finalFiltered = finalFiltered.filter(
              (product) => product.color === selectedColor
            );
          }
          if (filterName) {
            finalFiltered = finalFiltered.filter((product) =>
              product.name.toLowerCase().includes(filterName.toLowerCase())
            );
          }

          onApplyFilters(finalFiltered);
        }}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default SidebarFilters;
