import { useState } from 'react';
import { AiOutlineHeart, AiOutlineShareAlt, AiOutlineMessage } from 'react-icons/ai';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { FaHeadset, FaUserCircle, FaPercentage } from 'react-icons/fa';


import a1 from "../../assets/images/ProductDetail/a1.png"
import a2 from "../../assets/images/ProductDetail/a2.png"
import a3 from "../../assets/images/ProductDetail/a3.png"
import a4 from "../../assets/images/ProductDetail/a4.png"
import a5 from "../../assets/images/ProductDetail/a5.png"
import a6 from "../../assets/images/ProductDetail/a6.png"
import a7 from "../../assets/images/ProductDetail/a7.png"
import zip from "../../assets/images/ProductDetail/zip.png"
import { FaPaypal } from 'react-icons/fa';
export default function ProductSpeccs() {
  const [expanded, setExpanded] = useState(false);
  // const [expanded, setExpanded] = useState(false);
  // State để quản lý số lượng (thêm vào để nút +/- hoạt động)
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-gray-50">
      {/* Product Detail Section */}
      <div className="border border-gray-400 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          {/* Tabs */}
          <div className="flex space-x-6 text-sm">
            <button className="py-1 px-2 text-gray-600">About Product</button>
            <button className="py-1 px-2 text-gray-600">Details</button>
            {/* "Specs" được chọn theo ảnh */}
            <button className="py-1 px-2 text-gray-800 border-b-2 border-gray-800 font-medium">Specs</button>
          </div>

          {/* Phần mua hàng */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm">On Sale from $3,299.00</span>

              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded ml-4">
                {/* Giữ lại input từ code gốc, nhưng làm cho nó controlled */}
                <input
                  type="text"
                  value={quantity}
                  className="w-8 text-center outline-none" // Thêm outline-none
                  readOnly // Hoặc onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} nếu muốn cho phép nhập
                />
                {/* Giữ lại nút +/- từ code gốc */}
                <div className="flex flex-col border-l border-gray-300">
                  <button onClick={handleIncrease} className="px-2 border-b border-gray-300 text-xs hover:bg-gray-100">+</button>
                  <button onClick={handleDecrease} className="px-2 text-xs hover:bg-gray-100">−</button>
                </div>
              </div>
            </div>

            <button className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 text-sm">
              Add to Cart
            </button>
            <button className="bg-yellow-400 text-yellow-800 py-1 px-4 rounded hover:bg-yellow-500 flex items-center justify-center text-sm">
              <FaPaypal className="mr-1 text-blue-700" />
              PayPal
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="border border-gray-400 rounded-lg p-4">
        <div className="flex flex-col md:flex-row">

          {/* Left Section: Product Info - SỬA ĐỔI THEO ẢNH */}
          {/* Bỏ class bg-gray-100 */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-6"> {/* Thêm padding phải để tách biệt */}
            <div className="text-sm mb-4">
              <span className="text-gray-600">Home / Laptops / </span>
              {/* Màu chữ trong ảnh nhạt hơn */}
              <span className="text-gray-500">MSI MPG Series</span>
            </div>

            <h1 className="text-2xl font-bold mb-2">MSI MPG Trident 3</h1>
            <p className="text-blue-500 text-sm mb-6 hover:underline cursor-pointer">Be the first to review this product</p>

            {/* Phần Specs đơn giản theo ảnh */}
            <div className="border border-gray-300 rounded mb-6">
                <div className="flex justify-between p-3 border-b border-gray-300">
                    <span className="font-medium text-sm">CPU</span>
                    <span className="text-sm text-gray-700">N/A</span>
                </div>
                <div className="flex justify-between p-3 border-b border-gray-300">
                    <span className="font-medium text-sm">Featured</span>
                    <span className="text-sm text-gray-700">N/A</span>
                </div>
                <div className="flex justify-between p-3">
                    <span className="font-medium text-sm">I/O Ports</span>
                    <span className="text-sm text-gray-700">N/A</span>
                </div>
            </div>

            {/* Phần Have a Question và SKU giữ nguyên */}
            <div className="mt-6">
              <div className="flex items-center">
                <p className="text-sm">Have a Question?</p>
                <a href="#" className="text-blue-500 text-sm ml-2 hover:underline">Contact Us</a>
              </div>
              <p className="text-gray-500 text-xs mt-2">SKU: D33654</p> {/* SKU trong ảnh viết hoa */}
            </div>

            {/* Nút More Information giữ nguyên */}
            <div className="mt-8">
              <button
                className="flex items-center font-medium text-sm hover:text-blue-600" // Thêm hover effect
                onClick={() => setExpanded(!expanded)}
              >
                {/* Thay đổi icon tùy theo state expanded */}
                <span className="mr-2 text-lg">{expanded ? '−' : '+'}</span>
                <span>MORE INFORMATION</span>
              </button>
              {/* Có thể thêm nội dung được mở rộng ở đây nếu expanded là true */}
              {expanded && (
                <div className="mt-4 text-sm text-gray-700">
                  {/* Nội dung chi tiết hơn sẽ hiện ở đây */}
                  Đây là nơi hiển thị thêm thông tin chi tiết khi được mở rộng...
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
              <div className="flex-1 flex justify-center items-center"> {/* Thêm items-center */}
                <img
                  src={a1} // Sử dụng biến đã import
                  alt="MSI MPG Trident 3"
                  className="max-w-full h-auto object-contain" // Đảm bảo ảnh vừa vặn
                />
              </div>
            </div>

             {/* Zip payment & Dots */}
            <div className="w-full mt-auto items-center pt-4"> {/* Thêm padding top */}
              {/* Zip */}
              <div className="flex items-center justify-center mt-6 mb-2"> {/* Căn giữa theo ảnh */}
                <img src={zip} alt="Zip payment option" className="h-6 mr-2" /> {/* Điều chỉnh kích thước và margin */}
                <p className="text-xs text-gray-600 ">own it now, up to 6 months interest free <a href="#" className="text-blue-500 font-medium hover:underline">learn more</a></p>
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

      {/* Outplay the Competition Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Outplay the Competition</h2>
            <p className="max-w-lg text-center text-gray-300">
              Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. 
              Intel Core i7 processor with the upmost computing power to bring you an unparalleled 
              gaming experience.
            </p>
            <p className="text-xs text-gray-400 mt-4">*Performance compared to i7-9700. Specs varies by model.</p>
          </div>

          <div className="flex justify-center mb-10">
            <img src={a2} alt="Intel Core i7 Processor" className="max-w-full" />
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
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-200">
              <span className="font-medium">FAQ</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            
            <button className="w-full flex items-center justify-between p-4">
              <span className="font-medium">Our Buyer Guide</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
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
            The MSI series brings out the best in gamers by allowing full expression in color with
            advanced RGB lighting control and synchronization.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-black rounded-full p-4 mb-4">
                <img src={a4} alt="Intel" className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2">INTEL Core™ i7 processor</h3>
              <p className="text-sm text-gray-400">
                with the upmost computing power to bring you an unparalleled gaming experience.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-black rounded-full p-4 mb-4">
                <img src={a5} alt="RTX" className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2">The new GeForce RTX SUPER™</h3>
              <p className="text-sm text-gray-400">
                Series has more cores and higher clocks for superior performance compared to previous gen RTX.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-black rounded-full p-4 mb-4">
                <img src={a6} alt="SSD" className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2">Unleash the full potential with the latest SSD technology</h3>
              <p className="text-sm text-gray-400">
                the NVMe transfer, 6 times faster than traditional SATA SSD.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-black rounded-full p-4 mb-4">
                <img src={a7} alt="DDR4" className="mx-auto" />
              </div>
              <h3 className="text-lg font-bold mb-2">Featuring the latest 10th Gen Intel® Core™ i7 processors</h3>
              <p className="text-sm text-gray-400">
                memory can support up to DDR4 2666MHz to boost your gaming experience.
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
                Up to 3 years on-site service and available for your peace of mind.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-600 rounded-full p-4 mb-4">
                <FaUserCircle className="text-white text-2xl" />
              </div>
              <h3 className="font-bold mb-2">Personal Account</h3>
              <p className="text-sm text-gray-600">
                With big discounts, free delivery and a dedicated support specialist.
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