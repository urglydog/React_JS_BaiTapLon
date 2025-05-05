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
          {/* Left Section: Product Info */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-6">
            <div className="text-sm mb-4">
              <span className="text-gray-600">
                Home / {product.categoryName} /{" "}
              </span>
              <span className="text-gray-400">{product.seriesName}</span>
            </div>

            <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
            <p className="text-blue-500 text-sm mb-6">
              Be the first to review this product
            </p>

            <div className="space-y-1 text-sm">
              <p className="mb-4">{product.description}</p>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-blue-900 border-2 border-blue-500 mr-2"></div>
                <div className="w-6 h-6 rounded-full bg-gray-100 mr-2"></div>
                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <p className="text-sm">Have a Question?</p>
                <a href="#" className="text-blue-500 text-sm ml-2">
                  Contact Us
                </a>
              </div>
              <p className="text-gray-500 text-xs mt-2">SKU: D33654</p>
            </div>

            <div className="mt-8">
              <button
                className="flex items-center font-medium"
                onClick={() => setExpanded(!expanded)}
              >
                <span className="mr-2">+</span>
                <span>MORE INFORMATION</span>
              </button>
            </div>
          </div>

          {/* Right Section: Product Image & Icons */}
          <div className="md:w-1/2 flex flex-col items-center">
            <div className="flex justify-between w-full">
              <div className="flex flex-col space-y-2">
                <button className="bg-white rounded-full p-2 border border-gray-200">
                  <AiOutlineHeart className="w-5 h-5 text-gray-500" />
                </button>
                <button className="bg-white rounded-full p-2 border border-gray-200">
                  <AiOutlineShareAlt className="w-5 h-5 text-gray-500" />
                </button>
                <button className="bg-white rounded-full p-2 border border-gray-200">
                  <AiOutlineMessage className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 flex justify-center">
                <img src={product.image} alt={product.productName} className="mx-auto" />
              </div>
            </div>

            <div className="w-full mt-auto items-center">
              <div className="flex items-center mt-6 mb-2">
                <img src={zip} alt="Zip payment option" className="ml-40" />
                <p className="text-xs text-gray-600 ">
                  own it now, up to 6 months interest free{" "}
                  <a href="#" className="text-blue-500 font-medium">
                    learn more
                  </a>
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <span className="h-2 w-2 rounded-full bg-blue-600 mx-1"></span>
                <span className="h-2 w-2 rounded-full bg-gray-300 mx-1"></span>
                <span className="h-2 w-2 rounded-full bg-gray-300 mx-1"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
