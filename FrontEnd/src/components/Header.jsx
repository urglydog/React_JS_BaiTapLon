import React from "react";
import logo from "../assets/images/logo1.svg";
import { FaSearch, FaShoppingCart, FaFacebookF } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import path from "../constant/path";
import { useEffect, useState, useRef } from "react";
const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const handleMouseEnter = () => {
    setShowDropdown(true);
  };


  const handleMouseLeave = () => {
    setTimeout(() => {

      if (dropdownRef.current && !dropdownRef.current.matches(':hover')) {
        setShowDropdown(false);
      }
    }, 100);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleMenuItemClick = (action) => {
    console.log(`Selected action: ${action}`);

    // For example: if(action === 'login') { /* handle login */ }
    setShowDropdown(false);
  };
  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clean up on unmount
    return () => clearInterval(timer);
  }, []);


  const getFormattedDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[currentDateTime.getDay()];
    const date = currentDateTime.getDate();
    const month = months[currentDateTime.getMonth()];
    const year = currentDateTime.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const formatTime = () => {
    let hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentDateTime.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };
  return (
    <header className="font-sans">
      {/* Top Black Bar */}
      <div className="bg-black text-white text-sm flex justify-between items-center px-6 py-1">
        <div>
          <span className="font-semibold">{getFormattedDate()}:</span>{" "}
          <span>{formatTime()}</span>
        </div>
        <div>
          Visit our Shop at 123 Hung Vuong street, Tuy Hoa City, Phu Yen, Group01{" "}
          <Link
            to="/contact"
            className="underline cursor-pointer text-gray-300 hover:text-white"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          <span>
            Call Us: <strong>(00) In Contact us</strong>
          </span>
          <FaFacebookF className="text-white cursor-pointer hover:text-blue-400" />
        </div>
      </div>
      {/* Main Navigation Bar */}
      <div className="bg-white border-b border-gray-200 flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-10 rounded-xl" />

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-6 text-sm font-medium">
            <li className="hover:text-blue-600 cursor-pointer"><Link to={path.home}> Home</Link></li>
            <li className="hover:text-blue-600 cursor-pointer"><Link to={path.laptops}> Laptops</Link></li>
            <li className="hover:text-blue-600 cursor-pointer"><Link to={path.desktops}>Desktop PCs</Link> </li>
            <li className="hover:text-blue-600 cursor-pointer"><Link to={path.networking_devices}>Networking Devices</Link> </li>
            <li className="hover:text-blue-600 cursor-pointer"><Link to={path.printer_scanner}>Printers & Scanners</Link> </li>
            <li className="hover:text-blue-600 cursor-pointer"><Link to={path.pc_parts}>PC Parts</Link> </li>
            <li className="hover:text-blue-600 cursor-pointer"><Link to={path.all_products}>All Other Products</Link> </li>
            <li className="hover:text-blue-600 cursor-pointer"><Link to={path.repair}> Repairs</Link></li>
          </ul>
        </nav>

        {/* Right Side Icons & Button */}
        <div className="flex items-center space-x-4">
          <Link
            to="/our_deal"
            className="border border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white text-sm"
          >
            Our Deals
          </Link>
          <FaSearch className="cursor-pointer text-gray-600 hover:text-black" />
          <Link to={path.shopping_card_checkout}>
            <FaShoppingCart className="cursor-pointer text-gray-600 hover:text-black" />
          </Link>
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <IoPersonCircle
              className="text-2xl text-gray-600 cursor-pointer hover:text-black"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {showDropdown && (
              <div className="absolute right-0 w-48 mt-2 bg-white border rounded shadow-lg z-10">
                <div className="p-3 border-b">
                  <p className="text-sm text-gray-500">Xin chào, vui lòng đăng nhập</p>
                </div>
                <ul className="py-1">
                  <li
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMenuItemClick('login')}
                  >
                    Đăng nhập
                  </li>

                  <li
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMenuItemClick('account')}
                  >
<<<<<<< Updated upstream
                    <Link to={path.profile}>Tài khoản của tôi</Link>

=======
                    <Link to="/profile">
                      Tài khoản của tôi
                    </Link>
>>>>>>> Stashed changes
                  </li>
                  <li
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMenuItemClick('orders')}
                  >
                    Đơn hàng
                  </li>
                  <li
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMenuItemClick('help')}
                  >
                    Trợ giúp
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
