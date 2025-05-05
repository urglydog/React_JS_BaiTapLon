import React, { useContext, useEffect, useState, useRef } from "react";
import logo from "../assets/images/logo1.svg";
import { FaSearch, FaShoppingCart, FaFacebookF } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import path from "../constant/path";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../context/UserContext";
import { fetchProducts } from "../utils/redux/fetchProductsSlice";
import { FaChevronDown } from "react-icons/fa";
const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showProductSuggestions, setShowProductSuggestions] = useState(false);

  // Access UserContext
  const { user, logout, isCustomer, isManager, isEmployee } =
    useContext(UserContext);

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
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

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

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // Lấy danh sách sản phẩm từ Redux store
  const { products, loading, error } = useSelector((state) => state.products);

  // Hàm loại bỏ dấu tiếng Việt
  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  // Lọc sản phẩm theo từ khóa tìm kiếm (theo productName và catalogName, không dấu)
  const filteredProducts = products.filter((product) => {
    const normalizedSearch = removeVietnameseTones(searchTerm.toLowerCase());
    const productName = removeVietnameseTones(
      product.productName.toLowerCase()
    );
    const catalogName = removeVietnameseTones(
      product.categoryName.toLowerCase()
    );

    return (
      productName.includes(normalizedSearch) ||
      catalogName.includes(normalizedSearch)
    );
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  // Khi người dùng nhập
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowProductSuggestions(true); // bật dropdown
  };

  // Khi nhấn Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
      setShowProductSuggestions(false); // ẩn dropdown
    }
  };

  // Khi click sản phẩm
  const handleProductClick = (productID) => {
    navigate(`/product/${productID}/productAbout`);
    setShowProductSuggestions(false); // ẩn dropdown
  };

  // Khi click vào icon tìm kiếm
  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${searchTerm}`);
      setShowProductSuggestions(false); // ẩn dropdown
    }
  };

  // Khi focus vào input tìm kiếm và text không rỗng
  const handleFocus = () => {
    if (searchTerm.trim() !== "") {
      setShowProductSuggestions(true); // bật dropdown
    }
  };
  // Khi blur khỏi input tìm kiếm
  const handleBlur = () => {
    setTimeout(() => {
      setShowProductSuggestions(false); // ẩn dropdown
    }, 100);
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
          Visit our Shop at 123 Hung Vuong street, Tuy Hoa City, Phu Yen,
          Group01{" "}
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
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to={path.home}> Home</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/products?search=laptop"> Laptops</Link>
            </li>
            {/* <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/products?search=mouse">Mouses</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/products?search=BanPhim">KeyBoard</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/products?search=GamingGear">GameGear</Link>
            </li> */}
            <li className="relative group">
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                <span>Gaming Gear</span>
                <FaChevronDown size={16} />
              </div>

              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-20 invisible group-hover:visible transition-all duration-300 opacity-0 group-hover:opacity-100">
                <a
                  href="/products?search=mouse"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  Mouse
                </a>
                <a
                  href="/products?search=BanPhim"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  KeyBoard
                </a>

                <a
                  href="/products?search=GamingGear"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  Game Gear
                </a>
              </div>
            </li>
            <li className="relative group">
              <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                <span>PC Parts</span>
                <FaChevronDown size={16} />
              </div>

              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-20 invisible group-hover:visible transition-all duration-300 opacity-0 group-hover:opacity-100">
                <a
                  href="/products?search=screen"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  Monitors screen
                </a>
                <a
                  href="/products?search=Case"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  Case
                </a>
                <a
                  href="/products?search=CPU"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  CPU
                </a>
                <a
                  href="/products?search=Main"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  MainBoard
                </a>
                <a
                  href="/products?search=PSU"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  PSU Power
                </a>
                <a
                  href="/products?search=HDD"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  HDD Hard Drive
                </a>
                <a
                  href="/products?search=RAM"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                >
                  RAM
                </a>
              </div>
            </li>
            <li 
                className="relative group"
              >
                <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                  <span>All Other Products</span>
                  <FaChevronDown size={16} />
                </div>
                
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-20 invisible group-hover:visible transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <a 
                    href="/products?search=Mousepad" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                  >
                    Mouse Pad
                  </a>
                  <a 
                    href="/products?search=Headphone" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                  >
                    Head Phone
                  </a>
                </div>
              </li>
            
              <li 
                className="relative group"
              >
                <div className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                  <span>
                  Smart Device</span>
                  <FaChevronDown size={16} />
                </div>
                
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-20 invisible group-hover:visible transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <a 
                    href="/products?search=iPhone" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                  >
                    IPhone
                  </a>
                  <a 
                    href="/products?search=SamSung Galaxy" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                  >
                   SamSung
                  </a>
                  <a 
                    href="/products?search=Xiaomi" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                  >
                  Xiaomi
                  </a>
                  <a 
                    href="/products?search=iPad" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-blue-600"
                  >
                    iPad
                  </a>
                </div>
              </li>
          </ul>
        </nav>

        {/* Right Side Icons & Button */}
        <div className="flex items-center space-x-4">
          {/* <Link
            to="/our_deal"
            className="border border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-600 hover:text-white text-sm"
          >
            Our Deals
          </Link> */}

          <div className="relative">
            {/* Input tìm kiếm với icon */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-lg p-2 w-[200px] lg:w-[200px] xl:w-[270px] pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch
                className="absolute left-3 top-3 text-gray-400 cursor-pointer"
                onClick={handleSearch}
              />
            </div>

            {/* Dropdown kết quả tìm kiếm */}
            {showProductSuggestions && searchTerm.length > 0 && (
              <div className="absolute w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.productID}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150 flex items-center"
                      onClick={() => handleProductClick(product.productID)}
                    >
                      {/* Ảnh sản phẩm thu nhỏ */}
                      <div className="w-10 h-10 bg-gray-100 rounded mr-3 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {product.productName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.price
                            ? `${parseFloat(product.price).toLocaleString(
                                "vi-VN"
                              )}₫`
                            : "Liên hệ"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500 text-center">
                    Không tìm thấy sản phẩm phù hợp
                  </div>
                )}
              </div>
            )}
          </div>

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
                    {user
                      ? `Xin chào, ${user.fullName}`
                      : "Xin chào, vui lòng đăng nhập"}
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
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
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
