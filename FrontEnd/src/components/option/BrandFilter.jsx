import React from "react";

import logo1 from "../../assets/images/logo/logo_roccat.svg";
import logo2 from "../../assets/images/logo/logo_msi.svg";
import logo3 from "../../assets/images/logo/logo_razer.svg";
import logo4 from "../../assets/images/logo/logo_thermaltake.svg";
import logo5 from "../../assets/images/logo/logo_adata.svg";
import logo6 from "../../assets/images/logo/logo_hp.svg";
import logo7 from "../../assets/images/logo/logo_gigabytes.svg";

const brands = [
  { name: "ROCCAT", img: logo1 },
  { name: "MSI", img: logo2 },
  { name: "Razer", img: logo3 },
  { name: "Thermaltake", img: logo4 },
  { name: "ADATA", img: logo5 },
  { name: "Hewlett Packard", img: logo6 },
  { name: "GIGABYTE", img: logo7 },
];

export default function BrandFilter({ onSelectBrand }) {
  return (
    <div className="bg-[#f6f8ff] p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">Brands</h2>

      <button
        onClick={() => onSelectBrand(null)}
        className="w-full border border-gray-400 text-gray-500 font-medium py-2 mb-6 rounded-full hover:bg-gray-200 transition"
      >
        All Brands
      </button>

      <div className="grid grid-cols-2 gap-4">
        {brands.map((brand) => (
          <button
            key={brand.name}
            onClick={() => onSelectBrand(brand.name)}
            className="flex items-center justify-center border border-transparent hover:border-gray-300 rounded-md p-2 bg-white transition"
          >
            <img
              src={brand.img}
              alt={brand.name}
              className="max-h-10 object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
