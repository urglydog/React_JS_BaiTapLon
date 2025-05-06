import { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineMessage,
} from "react-icons/ai";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {
  FaHeadset,
  FaUserCircle,
  FaPercentage,
  FaPaypal,
} from "react-icons/fa";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import a1 from "../../assets/images/ProductDetail/a1.png";
import a2 from "../../assets/images/ProductDetail/a2.png";
import a3 from "../../assets/images/ProductDetail/a3.png";
import a4 from "../../assets/images/ProductDetail/a4.png";
import a5 from "../../assets/images/ProductDetail/a5.png";
import a6 from "../../assets/images/ProductDetail/a6.png";
import a7 from "../../assets/images/ProductDetail/a7.png";
import zip from "../../assets/images/ProductDetail/zip.png";
import axiosInstance from "../../custom/axios";
import { useDispatch } from "react-redux";
import { addItem } from "../../utils/redux/cartSlice";
import { toast } from "react-toastify";

export default function Product() {
  console.log(a1);
  console.log(zip);

  // const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
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
        setProduct({ ...res.data.DT[0], quantity: 1 });
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

  const dispatch = useDispatch();

  const handleClickAddToCart = (product) => {
    console.log(product);

    // Thêm hàm xử lý sự kiện khi nhấn nút
    toast.success("Add to cart successfully!");
    console.log("Thêm sản phẩm vào giỏ hàng:", product);
    dispatch(
      addItem({
        ...product,
        description: product.description,
        image: product.image, // Truyền link ảnh
      })
    );
  };

  //   Hàm tăng giảm số lượng sản phẩm
  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setProduct((prevProduct) => ({
      ...prevProduct,
      quantity: newQuantity,
    }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      // Không cho giảm dưới 1
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      setProduct((prevProduct) => ({
        ...prevProduct,
        quantity: newQuantity,
      }));
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Product Detail Section */}
      <div className="border border-gray-400 p-4 mb-4">
        <div className="flex items-center justify-between">
          {/* Navigation Tabs */}
          <div className="flex space-x-6 text-sm">
            <Link
              to={`/product/${id}/productAbout`}
              className={`py-1 px-2 ${
                location.pathname === `/product/${id}/productAbout`
                  ? "text-gray-800 border-b-2 border-gray-800 font-medium"
                  : "text-gray-600"
              }`}
            >
              About Product
            </Link>
            <Link
              to={`/product/${id}/productDetail`}
              className={`py-1 px-2 ${
                location.pathname === `/product/${id}/productDetail`
                  ? "text-gray-800 border-b-2 border-gray-800 font-medium"
                  : "text-gray-600"
              }`}
            >
              Details
            </Link>
            <Link
              to={`/product/${id}/productSpeccs`}
              className={`py-1 px-2 ${
                location.pathname === `/product/${id}/productSpeccs`
                  ? "text-gray-800 border-b-2 border-gray-800 font-medium"
                  : "text-gray-600"
              }`}
            >
              Specs
            </Link>
          </div>

          {/* Cart Area */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm">
                <span className="font-light">On Sale from</span>{" "}
                <span className="font-bold">
                  {parseFloat(
                    product?.price?.replace(/[₫,]/g, "") * product?.quantity ||
                      0
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </span>

              <div className="flex items-center bg-[#f7f8ff] rounded-md px-2 py-1 w-[60px] justify-between">
                <span className="text-black text-sm font-medium">
                  {quantity}
                </span>
                <div className="flex flex-col items-center">
                  <button
                    className="text-gray-400 text-xs leading-none hover:text-black"
                    onClick={handleIncrease}
                  >
                    ▲
                  </button>
                  <button
                    className="text-gray-400 text-xs leading-none hover:text-black"
                    onClick={handleDecrease}
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>

            <button
              className="bg-blue-600 text-white p-3 rounded-4xl hover:bg-blue-700 font-bold cursor-pointer"
              onClick={() => {
                handleClickAddToCart(product);
              }} // Thêm hàm xử lý sự kiện khi nhấn nút
            >
              Add to Cart
            </button>
            <button className="bg-yellow-400 text-yellow-800 p-3 rounded-4xl hover:bg-yellow-500 flex items-center justify-center cursor-pointer">
              <FaPaypal className="mr-1 text-blue-700" />
              PayPal
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="">
        <Outlet />
      </div>

      {/* Outplay the Competition Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Outplay the Competition</h2>
            <p className="max-w-lg text-center text-gray-300">
              Experience a 40% boost in computing from last generation. MSI
              Desktop equips the 10th Gen. Intel Core i7 processor with the
              upmost computing power to bring you an unparalleled gaming
              experience.
            </p>
            <p className="text-xs text-gray-400 mt-4">
              *Performance compared to i7-9700. Specs varies by model.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <img
              src={a2}
              alt="Intel Core i7 Processor"
              className="max-w-full"
            />
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <span className="h-2 w-2 rounded-full bg-white mx-1"></span>
              <span className="h-2 w-2 rounded-full bg-gray-600 mx-1"></span>
              <span className="h-2 w-2 rounded-full bg-gray-600 mx-1"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Section: Support Options */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="max-w-md">
                <div className="bg-white rounded-lg shadow-sm">
                  <button className="w-full flex items-center justify-between p-4 border-b border-gray-200">
                    <span className="font-medium">Product Support</span>
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border-b border-gray-200">
                    <span className="font-medium">FAQ</span>
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>

                  <button className="w-full flex items-center justify-between p-4">
                    <span className="font-medium">Our Buyer Guide</span>
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section: Customer Support Image */}
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img
                src={a3}
                alt="Customer Support"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <p className="text-center max-w-3xl mx-auto mb-16 text-gray-300">
            The MSI series brings out the best in gamers by allowing full
            expression in color with advanced RGB lighting control and
            synchronization.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-black rounded-full p-4 mb-4">
                <img src={a4} alt="Intel" className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                INTEL Core™ i7 processor
              </h3>
              <p className="text-sm text-gray-400">
                with the upmost computing power to bring you an unparalleled
                gaming experience.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-black rounded-full p-4 mb-4">
                <img src={a5} alt="RTX" className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                The new GeForce RTX SUPER™
              </h3>
              <p className="text-sm text-gray-400">
                Series has more cores and higher clocks for superior performance
                compared to previous gen RTX.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-black rounded-full p-4 mb-4">
                <img src={a6} alt="SSD" className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                Unleash the full potential with the latest SSD technology
              </h3>
              <p className="text-sm text-gray-400">
                the NVMe transfer, 6 times faster than traditional SATA SSD.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-black rounded-full p-4 mb-4">
                <img src={a7} alt="DDR4" className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                Featuring the latest 10th Gen Intel® Core™ i7 processors
              </h3>
              <p className="text-sm text-gray-400">
                memory can support up to DDR4 2666MHz to boost your gaming
                experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Icons Section */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 rounded-full p-4 mb-4">
                <FaHeadset className="text-white text-2xl" />
              </div>
              <h3 className="font-bold mb-2">Product Support</h3>
              <p className="text-sm text-gray-600">
                Up to 3 years on-site service and available for your peace of
                mind.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 rounded-full p-4 mb-4">
                <FaUserCircle className="text-white text-2xl" />
              </div>
              <h3 className="font-bold mb-2">Personal Account</h3>
              <p className="text-sm text-gray-600">
                With big discounts, free delivery and a dedicated support
                specialist.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 rounded-full p-4 mb-4">
                <FaPercentage className="text-white text-2xl" />
              </div>
              <h3 className="font-bold mb-2">Amazing Savings</h3>
              <p className="text-sm text-gray-600">
                Up to 70% off new products, you can be sure of the best price.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
