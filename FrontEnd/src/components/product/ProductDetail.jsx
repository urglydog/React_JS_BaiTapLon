import { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineMessage,
} from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaHeadset, FaUserCircle, FaPercentage } from "react-icons/fa";

// import a1 from "../../assets/images/ProductDetail/a1.png";
// import a2 from "../../assets/images/ProductDetail/a2.png";
// import a3 from "../../assets/images/ProductDetail/a3.png";
// import a4 from "../../assets/images/ProductDetail/a4.png";
// import a5 from "../../assets/images/ProductDetail/a5.png";
// import a6 from "../../assets/images/ProductDetail/a6.png";
// import a7 from "../../assets/images/ProductDetail/a7.png";
import zip from "../../assets/images/ProductDetail/zip.png";
import { FaPaypal } from "react-icons/fa";
import axiosInstance from "../../custom/axios";
import { useParams } from "react-router-dom";
export default function ProductDetail() {
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  console.log(id);
  //   Lấy sản phẩm từ API
  async function fetchProduct(id) {
    try {
      const res = await axiosInstance.get(
        `/api/product/getProductDetailById/${id}`
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
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content Area */}
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section: Product Info */}
          <div className="lg:w-1/2">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600 mb-4">
              <span>Home / {product.categoryName} / </span>
              <span className="text-gray-400">{product.seriesName}</span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product.productName}
            </h1>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>

            {/* Review Prompt */}
            <p className="text-blue-500 text-sm mb-6">
              Be the first to review this product
            </p>

            {/* Product Attributes */}
            <div className="space-y-2 mb-6">
              {product.attributeList?.split("|").map((attr, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-gray-700 mr-2">•</span>
                  <span className="text-gray-800">{attr.trim()}</span>
                </div>
              ))}

              <div className="pt-2">
                <p className="text-gray-800">
                  <span className="font-semibold">In stock:</span>{" "}
                  {product.stockQuantity} units
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Supplier:</span>{" "}
                  {product.supplierName}
                </p>
              </div>
            </div>

            {/* Contact & SKU */}
            <div className="mb-6">
              <div className="flex items-center">
                <p className="text-gray-600">Have a Question?</p>
                <a href="#" className="text-blue-500 ml-2 hover:underline">
                  Contact Us
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                SKU: {product.sku || "D33654"}
              </p>
            </div>

            {/* More Info Toggle */}
            <button
              className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
              onClick={() => setExpanded(!expanded)}
            >
              <span className="mr-2 text-lg">{expanded ? "-" : "+"}</span>
              <span>MORE INFORMATION</span>
            </button>
          </div>

          {/* Right Section: Product Image & Actions */}
          <div className="lg:w-1/2">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Action Buttons - Only show on desktop */}
              <div className="hidden md:flex flex-col space-y-3">
                <button
                  className="bg-white rounded-full p-3 border border-gray-200 hover:bg-gray-50 transition-colors"
                  title="Add to wishlist"
                >
                  <AiOutlineHeart className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  className="bg-white rounded-full p-3 border border-gray-200 hover:bg-gray-50 transition-colors"
                  title="Share product"
                >
                  <AiOutlineShareAlt className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  className="bg-white rounded-full p-3 border border-gray-200 hover:bg-gray-50 transition-colors"
                  title="Ask a question"
                >
                  <AiOutlineMessage className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Main Product Image */}
              <div className="flex-1">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>

                {/* Image Pagination Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                  {[1, 2, 3].map((dot, index) => (
                    <span
                      key={index}
                      className={`h-2 w-2 rounded-full ${
                        index === 0 ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    ></span>
                  ))}
                </div>

                {/* Payment Option */}
                <div className="flex items-center mt-6 bg-gray-100 p-3 rounded-lg">
                  <img
                    src={zip}
                    alt="Zip payment option"
                    className="h-6 mr-3"
                  />
                  <p className="text-sm text-gray-700">
                    Own it now, up to 6 months interest free{" "}
                    <a
                      href="#"
                      className="text-blue-500 font-medium hover:underline"
                    >
                      learn more
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex md:hidden justify-center space-x-4 mt-6">
              <button className="bg-white rounded-full p-3 border border-gray-200">
                <AiOutlineHeart className="w-5 h-5 text-gray-600" />
              </button>
              <button className="bg-white rounded-full p-3 border border-gray-200">
                <AiOutlineShareAlt className="w-5 h-5 text-gray-600" />
              </button>
              <button className="bg-white rounded-full p-3 border border-gray-200">
                <AiOutlineMessage className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
