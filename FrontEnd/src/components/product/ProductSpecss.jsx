import { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineMessage,
} from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaHeadset, FaUserCircle, FaPercentage } from "react-icons/fa";

import a1 from "../../assets/images/ProductDetail/a1.png";
// import a2 from "../../assets/images/ProductDetail/a2.png";
// import a3 from "../../assets/images/ProductDetail/a3.png";
// import a4 from "../../assets/images/ProductDetail/a4.png";
// import a5 from "../../assets/images/ProductDetail/a5.png";
// import a6 from "../../assets/images/ProductDetail/a6.png";
// import a7 from "../../assets/images/ProductDetail/a7.png";
import zip from "../../assets/images/ProductDetail/zip.png";
import { FaPaypal } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axiosInstance from "../../custom/axios";
export default function ProductSpeccs() {
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  console.log(id);
  //   Lấy sản phẩm từ API
  async function fetchProduct(id) {
    try {
      const res = await axiosInstance.get(
        `/api/product/getProductByIdWithDetails/${id}`
      );
      if (res.data && res.data.DT && res.data.DT.length > 0) {
        setProduct(res.data.DT[0]);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("ID hiện tại:", id);
    fetchProduct(id);
  }, [id]);

  useEffect(() => {
    console.log("Product sau khi set:", product);
  }, [product]);

  return (
    <div className="bg-gray-50">
      {/* Main Content Area */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row">
          {/* Left Section: Product Info - SỬA ĐỔI THEO ẢNH */}
          {/* Bỏ class bg-gray-100 */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-6">
            {" "}
            {/* Thêm padding phải để tách biệt */}
            <div className="text-sm mb-4">
              <span className="text-gray-600">
                Home / {product.categoryName} /{" "}
              </span>
              <span className="text-gray-400">{product.seriesName}</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
            <p className="text-blue-500 text-sm mb-6 hover:underline cursor-pointer">
              Be the first to review this product
            </p>
            {/* Phần Specs đơn giản theo ảnh */}
            <div className="border border-gray-300 rounded mb-6">
              {product.attributeList?.split("|").map((item, index, arr) => {
                const [key, value] = item.split(":");
                return (
                  <div
                    key={index}
                    className={`flex justify-between p-3 ${
                      index !== arr.length - 1 ? "border-b border-gray-300" : ""
                    }`}
                  >
                    <span className="font-medium text-sm">{key?.trim()}</span>
                    <span className="text-sm text-gray-700">
                      {value?.trim() || "N/A"}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Phần Have a Question và SKU giữ nguyên */}
            <div className="mt-6">
              <div className="flex items-center">
                <p className="text-sm">Have a Question?</p>
                <a
                  href="#"
                  className="text-blue-500 text-sm ml-2 hover:underline"
                >
                  Contact Us
                </a>
              </div>
              <p className="text-gray-500 text-xs mt-2">SKU: D33654</p>{" "}
              {/* SKU trong ảnh viết hoa */}
            </div>
            {/* Nút More Information giữ nguyên */}
            <div className="mt-8">
              <button
                className="flex items-center font-medium text-sm hover:text-blue-600" // Thêm hover effect
                onClick={() => setExpanded(!expanded)}
              >
                {/* Thay đổi icon tùy theo state expanded */}
                <span className="mr-2 text-lg">{expanded ? "−" : "+"}</span>
                <span>MORE INFORMATION</span>
              </button>
              {/* Có thể thêm nội dung được mở rộng ở đây nếu expanded là true */}
              {expanded && (
                <div className="mt-4 text-sm text-gray-700">
                  {/* Nội dung chi tiết hơn sẽ hiện ở đây */}
                  Đây là nơi hiển thị thêm thông tin chi tiết khi được mở
                  rộng...
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Product Image & Icons - Giữ nguyên cấu trúc */}
          <div className="md:w-1/2 flex flex-col items-center">
            <div className="flex justify-between w-full">
              {/* Icons */}
              <div className="flex flex-col space-y-2">
                <button className="bg-white rounded-full p-2 border border-gray-200 hover:border-gray-400">
                  <AiOutlineHeart className="w-5 h-5 text-gray-500" />
                </button>
                <button className="bg-white rounded-full p-2 border border-gray-200 hover:border-gray-400">
                  <AiOutlineShareAlt className="w-5 h-5 text-gray-500" />
                </button>
                <button className="bg-white rounded-full p-2 border border-gray-200 hover:border-gray-400">
                  <AiOutlineMessage className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Product Image */}
              <div className="flex-1 flex justify-center items-center">
                {" "}
                {/* Thêm items-center */}
                <img
                  src={a1} // Sử dụng biến đã import
                  alt="MSI MPG Trident 3"
                  className="max-w-full h-auto object-contain" // Đảm bảo ảnh vừa vặn
                />
              </div>
            </div>

            {/* Zip payment & Dots */}
            <div className="w-full mt-auto items-center pt-4">
              {" "}
              {/* Thêm padding top */}
              {/* Zip */}
              <div className="flex items-center justify-center mt-6 mb-2">
                {" "}
                {/* Căn giữa theo ảnh */}
                <img
                  src={zip}
                  alt="Zip payment option"
                  className="h-6 mr-2"
                />{" "}
                {/* Điều chỉnh kích thước và margin */}
                <p className="text-xs text-gray-600 ">
                  own it now, up to 6 months interest free{" "}
                  <a
                    href="#"
                    className="text-blue-500 font-medium hover:underline"
                  >
                    learn more
                  </a>
                </p>
              </div>
              {/* Dots */}
              <div className="flex justify-center mt-4">
                <span className="h-2 w-2 rounded-full bg-blue-600 mx-1 cursor-pointer"></span>
                <span className="h-2 w-2 rounded-full bg-gray-300 mx-1 cursor-pointer hover:bg-gray-400"></span>
                <span className="h-2 w-2 rounded-full bg-gray-300 mx-1 cursor-pointer hover:bg-gray-400"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
