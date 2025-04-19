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
export default function ProductDetail() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-50">
      {/* Product Detail Section */}
      <div className="border border-gray-400 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-6 text-sm">
            <button className="py-1 px-2 text-gray-600">About Product</button>
            <button className="py-1 px-2 text-gray-800 border-b-2 border-gray-800 font-medium">Details</button>
            <button className="py-1 px-2 text-gray-600">Specs</button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-sm">On Sale from $3,299.00</span>
              
              <div className="flex items-center border border-gray-300 rounded ml-4">
                <input type="text" value="1" className="w-8 text-center" readOnly />
                <div className="flex flex-col border-l border-gray-300">
                  <button className="px-2 border-b border-gray-300 text-xs">+</button>
                  <button className="px-2 text-xs">−</button>
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
          {/* Left Section: Product Info */}
          <div className="md:w-1/2 mb-8 md:mb-0 bg-gray-100 p-6 rounded-lg">
            <div className="text-sm mb-4">
              <span className="text-gray-600">Home / Laptops / </span>
              <span className="text-gray-400">MSI MPG Series</span>
            </div>
            
            <h1 className="text-2xl font-bold mb-2">MSI MPG Trident 3</h1>
            <p className="text-blue-500 text-sm mb-6">Be the first to review this product</p>

            <div className="space-y-1 text-sm">
              <p><span className="font-semibold">• Intel Core i7-10700F</span></p>
              <p><span className="font-semibold">• Intel HDD</span></p>
              <p><span className="font-semibold">• Wi-Fi 6</span></p>
              <p><span className="font-semibold">• NVIDIA MSI GeForce RTX 2060 SUPER 8GB AERO ITX OC/8GB</span></p>
              <p><span className="font-semibold">• 32GB DDR4 (16GB x 1) DDR4 2666MHz</span></p>
              <p><span className="font-semibold">• 2 total slots (16GB Max)</span></p>
              <p><span className="font-semibold">• 500GB (1 x 500GB) M.2 NVMe PCIe GEN4 SSD 7TB (3.5") 5400RPM</span></p>
              <p><span className="font-semibold">• Gaming Keyboard (GK8) + Gaming Mouse (GM)</span></p>
              <p><span className="font-semibold">• 15.6" HD (60Hz) 23" HD(1920x1080) (4:3 16:9)</span></p>
              <p><span className="font-semibold">• Intel Wi-Fi/Ethernet (10/100/1000M)</span></p>
              <p><span className="font-semibold">• AC600 (WiFi 5) (H:RB13)</span></p>
              <p><span className="font-semibold">• PSU 330W</span></p>
              <p><span className="font-semibold">• Fan Cooler</span></p>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <p className="text-sm">Have a Question?</p>
                <a href="#" className="text-blue-500 text-sm ml-2">Contact Us</a>
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
                <img 
                  src={a1}
                  alt="MSI MPG Trident 3" 
                  className="mx-auto"
                />
              </div>
            </div>
            
            <div className="w-full mt-auto items-center">
              <div className="flex items-center mt-6 mb-2">
                <img src={zip} alt="Zip payment option" className="ml-40" />
                <p className="text-xs text-gray-600 ">own it now, up to 6 months interest free <a href="#" className="text-blue-500 font-medium">learn more</a></p>
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