import banner1 from "../../assets/images/logo_banner_catalog.png"; // Import banner image
import Breadcrumb from "../../components/info/Breadcrumb";
import DropdownControls from "../../components/option/DropdownControls";

import group from "../../assets/svg/group.svg";
import list from "../../assets/svg/list.svg";
import SidebarFilters from "../../components/option/SidebarFilters";
import ProductGroupCatalog from "../../components/product/catalog/ProductGroupCatalog";

import FilterTagsBar from "../../components/product/catalog/FilterTagsBar";
import { useState } from "react";
import BrandFilter from "../../components/option/BrandFilter";
import WishList from "../../components/option/WishList";
import CompareProducts from "../../components/option/CompareProducts";

import productImageQR from "../../assets/images/products/product_qr_1.png";
import Pagination from "../../components/option/Pagination";
import DescriptionSection from "../../components/option/DescriptionSection";
import ProductListCatalog from "../../components/product/catalog/ProductListCatalog";

export default function Catalog() {
  // Trong function Catalog():
  const [filters, setFilters] = useState([
    { label: "CUSTOM PCS (24)" },
    { label: "HP/COMPAQ PCS (24)" },
  ]);

  const handleRemoveFilter = (filterToRemove) => {
    setFilters(filters.filter((f) => f.label !== filterToRemove.label));
  };

  const handleClearFilters = () => {
    setFilters([]);
  };

  const SupportCard = ({ icon, title, description }) => {
    return (
      <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto">
        <div className="mb-4 p-3 bg-blue-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  const supportItems = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Product Support",
      description:
        "Up to 3 years on-site warranty available for your peace of mind.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      title: "Personal Account",
      description:
        "With big discounts, free delivery and a dedicated support specialist.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Amazing Savings",
      description:
        "Up to 70% off new Products, you can be sure of the best price.",
    },
  ];

  // Pagination
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 15;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Load dữ liệu tương ứng tại đây
    }
  };

  return (
    <>
      {" "}
      <div className="py-6 max-w-screen-xl mx-auto">
        <img src={banner1} alt="" className="mb-2" />
        <Breadcrumb
          items={[
            { label: "Trang chủ", url: "/" },
            { label: "Sản phẩm", url: "/products" },
            { label: "MSI WS Series", url: "/products/msi-ws-series" },
          ]}
        />
      </div>
      <div className="py-6 max-w-screen-xl mx-auto">
        <p className="text-4xl font-bold">MSI PS Series (20)</p>
      </div>
      {/* Phần header danh sách */}
      <div className="py-6 max-w-screen-xl mx-auto grid grid-cols-4 items-center gap-4">
        <div className="">
          <button
            type="button"
            className=" w-full text-2xl font-bold cursor-pointer"
          >
            Back
          </button>
        </div>

        <div className="px-2 py-1 flex justify-items-start text-[#A2A6B0]">
          Items 1-35 of 61
        </div>

        <div className="col-span-2 flex justify-end">
          <DropdownControls />
          <div className="flex">
            <img src={group} alt="" />
            <img src={list} alt="" />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-4 gap-4">
        {/* Phần filter */}
        <div className="">
          <SidebarFilters />
          <div className="h-2"></div>
          <BrandFilter />
          <div className="h-2"></div>
          <WishList />
          <div className="h-2"></div>
          <CompareProducts />
          <img src={productImageQR} alt="" className="w-full" />
        </div>
        {/* Phần hiển thị danh sách */}
        <div className="col-span-3 flex flex-col min-h-[80vh]">
          {/* Thanh filter tag */}
          <FilterTagsBar
            filters={filters}
            onRemove={handleRemoveFilter}
            onClear={handleClearFilters}
          />

          {/* Danh sách sản phẩm, chiếm chiều cao còn lại */}
          <div className="flex-grow">
            <ProductGroupCatalog />
            {/* <ProductListCatalog /> */}
          </div>

          {/* Pagination + Mô tả thêm, nằm dưới cùng */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <DescriptionSection />
          </div>
        </div>
      </div>
      {/* Support */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportItems.map((item, index) => (
              <SupportCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
