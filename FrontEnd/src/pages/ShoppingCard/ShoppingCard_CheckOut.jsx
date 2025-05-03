import React from 'react';
import Support from '../../components/Support/Support';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import path from '../../constant/path';

// Component tượng trưng cho Order Summary
const OrderSummaryPlaceholder = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-md mr-3">
              {/* Hình ảnh sản phẩm */}
            </div>
            <div>
              <h6 className="text-sm font-medium text-gray-800">Product Name 1</h6>
              <p className="text-xs text-gray-500">Qty: 1</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-800">$XX.XX</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-md mr-3">
              {/* Hình ảnh sản phẩm */}
            </div>
            <div>
              <h6 className="text-sm font-medium text-gray-800">Another Product</h6>
              <p className="text-xs text-gray-500">Qty: 2</p>
            </div>
          </div>
          <span className="text-sm font-semibold text-gray-800">$YY.YY</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span className="text-sm font-semibold text-gray-800">$ZZ.ZZ</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-gray-600">Shipping</span>
            <span className="text-sm font-semibold text-gray-800">$W.WW</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-md font-semibold text-gray-800">Total</span>
            <span className="text-md font-bold text-indigo-600">$VV.VV</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function ShoppingCard_CheckOut() {
  const location = useLocation();
  const navigate = useNavigate(); // chỉ dùng để kiếm tra logic trước khi chuyển trang, ví dụ kiểm tra login trước khi navigate đến trang chủ
console.log(location);

  const handleNext = () => {
    navigate("/shopping_card_item");
  }
  return (
    <div className="bg-gray-100 min-h-screen font-sans py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Link to={path.home} className="text-blue-500 hover:underline mr-1">
              Home
            </Link>
            <span className="mr-1">/</span>
            <Link to={path.card} className="text-blue-500 hover:underline mr-1">
              Shopping Cart
            </Link>
            <span className="mr-1">/</span>
            <span>Checkout Process</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <div className="mt-4 grid grid-cols-2 items-center">
            <div className=""></div>
            <div className="mt-4 flex items-center justify-center space-x-8">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-semibold text-indigo-600">Shipping</span>
              </div>
              <div className="border-t-2 border-gray-300 w-24"></div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 text-gray-500 flex items-center justify-center text-xs font-semibold">
                  2
                </div>
                <span className="ml-2 text-sm text-gray-500">Payment & Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Address Form */}
          <div className="bg-white rounded-md shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Address</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                <p className="text-xs text-gray-500 mt-1">You can create an account after checkout.</p>
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name *</label>
                <input type="text" id="firstName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
                <input type="text" id="lastName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                <input type="text" id="company" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address *</label>
                <input type="text" id="streetAddress" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                <input type="text" className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /> {/* Address Line 2 (Optional) */}
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                <input type="text" id="city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="stateProvince" className="block text-sm font-medium text-gray-700">State/Province *</label>
                <select id="stateProvince" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>Please select a region, state or province</option>
                  {/* Add options here */}
                </select>
              </div>
              <div>
                <label htmlFor="zipPostalCode" className="block text-sm font-medium text-gray-700">Zip/Postal Code *</label>
                <input type="text" id="zipPostalCode" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country *</label>
                <select id="country" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option>United States</option>
                  {/* Add options here */}
                </select>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input type="tel" id="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummaryPlaceholder />

            {/* Shipping Options */}
            <div className="bg-white rounded-md shadow-md p-4 mt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Shipping Options</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input type="radio" name="shipping" id="standard" className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" defaultChecked />
                    <label htmlFor="standard" className="ml-2 text-sm text-gray-700">Standard Shipping</label>
                  </div>
                  <span className="text-sm text-gray-700">$2.00</span>
                </div>
                <p className="text-xs text-gray-500 ml-6">Price may vary depending on the item/destination. Shop Staff will contact you.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input type="radio" name="shipping" id="pickup" className="form-radio h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" />
                    <label htmlFor="pickup" className="ml-2 text-sm text-gray-700">Pickup from store</label>
                  </div>
                  <span className="text-sm text-gray-700">$0.00</span>
                </div>
                <p className="text-xs text-gray-500 ml-6">1234 Street Address City Address, 1234</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-8 flex justify-end">
          <Link to={path.shopping_card_item}>
            <button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Next
            </button></Link>
        </div>
      </div>
      <Support></Support>
    </div>
  );
}

export default ShoppingCard_CheckOut;