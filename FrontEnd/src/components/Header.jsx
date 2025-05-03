import React, { useContext, useEffect, useState, useRef } from "react";
import logo from "../assets/images/logo1.svg";
import { FaSearch, FaShoppingCart, FaFacebookF } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import path from "../constant/path";
import { useSelector } from "react-redux";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Access UserContext
  const { user, logout, isCustomer, isManager, isEmployee } = useContext(UserContext);

  // Define navigate
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.matches(":hover")) {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuItemClick = (action) => {
    console.log(`Selected action: ${action}`);
    setShowDropdown(false);
  };

  // Handle logout
  const handleLogoutConfirm = () => {
    logout(); // Call logout from UserContext
    setShowDropdown(false);
    // navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getFormattedDate = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const day = days[currentDateTime.getDay()];
    const date = currentDateTime.getDate();
    const month = months[currentDateTime.getMonth()];
    const year = currentDateTime.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  const formatTime = () => {
    let hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentDateTime.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const handleClickCart = () => {
    navigate("/shopping_card_item");
  };
  const cartQuantity = useSelector((state) => state.cart.carts.length);

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
          <Link to="/contact" className="underline cursor-pointer text-gray-300 hover:text-white">
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
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.home}> Home</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.laptops}> Laptops</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.desktops}>Desktop PCs</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.networking_devices}>Networking Devices</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.printer_scanner}>Printers & Scanners</Link>

            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.pc_parts}>PC Parts</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.all_products}>All Other Products</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.repair}> Repairs</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.productDetail}> ProductDetail</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.productSpeccs}> ProductSpeccs</Link>
            </li>
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
          <div className="relative">
            <FaShoppingCart
              className="cursor-pointer text-gray-600 hover:text-black"
              onClick={handleClickCart}
              size={20}
            />
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-semibold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {cartQuantity}
              </span>
            )}
          </div>
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
                  <p className="text-sm text-gray-500">
                    {user ? `Xin chào, ${user.fullName}` : "Xin chào, vui lòng đăng nhập"}
                  </p>
                </div>
                <ul className="py-1">
                  {user ? (
                    <>
                      {/* Show profile link for customers */}
                      {isCustomer() && (
                        <li
                          className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleMenuItemClick("profile")}
                        >
                          <Link to="/profile">Tài khoản của tôi</Link>
                        </li>
                      )}
                      {/* Show admin link for managers */}
                      {isManager() && (
                        <li
                          className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleMenuItemClick("admin")}
                        >
                          <Link to="/admin">Quản lý</Link>
                        </li>
                      )}
                      {/* Show employee link for employees */}
                      {isEmployee() && (
                        <li
                          className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleMenuItemClick("employee")}
                        >
                          <Link to="/employee">Nhân viên</Link>
                        </li>
                      )}
                      <li
                        className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleMenuItemClick("orders")}
                      >
                        Đơn hàng
                      </li>
                      <li
                        className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogoutConfirm}
                      >
                        Đăng xuất
                      </li>
                    </>
                  ) : (
                    <li
                      className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleMenuItemClick("login")}
                    >
                      <Link
                        to="/login"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      >
                        Đăng nhập/Đăng Kí
                      </Link>
                    </li>
                  )}
                  <li
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleMenuItemClick("help")}
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