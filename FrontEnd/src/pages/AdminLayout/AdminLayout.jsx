import { useState, useEffect } from "react";
import {
  FaChartPie,
  FaDesktop,
  FaCogs,
  FaHeadphones,
  FaRegSquare,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaShoppingCart,
  FaUsers,
  FaUserCircle,
  FaSun,
  FaMoon,
  FaEllipsisH,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaLaptop,
  FaMobile,
  FaMouse,
  FaKeyboard,
  FaServer,
  FaProjectDiagram,
  FaPlug,
  FaTabletAlt,
  FaGamepad,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LaptopTable from "./LaptopTable";
import CustomerTable from "./CustomerTable";
import OrderTable from "./OrderTable";
import PhoneTable from "./PhoneTable";
import MouseTable from "./MouseTable";
import KeyboardTable from "./KeyboardTable";
import MonitorsTable from "./MonitorsTable";
import ProcessorsTable from "./ProcessorsTable";
import Ram from "./Ram";
import Mainboard from "./Mainboard";
import Psus from "./Psus";
import Pc from "./Pc";
import Headphone from "./Headphone";
import Mousepad from "./Mousepad";
import Storage from "./Storage";
import Cases from "./Cases";
import TabletTable from "./TabletTable";
import GamingGearTable from "./GamingGearTable";

const API_URL = "http://localhost:4000/api/admin";

// Định nghĩa danh sách categoryID cho từng danh mục
const CATEGORY_IDS = {
  laptop: [45, 46, 47, 48, 49, 50, 51],
  mouse: [6, 7, 8, 9, 10],
  keyboard: [1, 2, 3, 4, 5],
  phone: [52, 53, 54],
  computers: [36, 37, 38, 39],
  tablet: [44],
  gamingGear: [14, 15, 16],
  processors: [18, 19],
  ram: [30, 31, 32],
  storage: [27, 28, 29],
  case: [17],
  mainboard: [20, 21, 22],
  psu: [23, 24, 25, 26],
  pc: [40, 41],
  headphone: [42, 43],
  mousepad: [11, 12, 13],
};

// Định nghĩa ánh xạ danh mục tới state
const CATEGORY_STATE_MAP = {
  laptop: "computers",
  mouse: "mouses",
  keyboard: "keyboards",
  phone: "phones",
  computers: "monitors",
  tablet: "tablets",
  gamingGear: "gamingGear",
  processors: "processors",
  ram: "ram",
  storage: "storage",
  case: "cases",
  mainboard: "mainboards",
  psu: "psus",
  pc: "pcs",
  headphone: "headphones",
  mousepad: "mousepads",
};

export default function ComputerStoreAdminLayout() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [dashboardStats, setDashboardStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [deviceUsage, setDeviceUsage] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [computers, setComputers] = useState([]);
  const [phones, setPhones] = useState([]);
  const [mouses, setMouses] = useState([]);
  const [keyboards, setKeyboards] = useState([]);
  const [monitors, setMonitors] = useState([]);
  const [processors, setProcessors] = useState([]);
  const [ram, setRam] = useState([]);
  const [storage, setStorage] = useState([]);
  const [cases, setCases] = useState([]);
  const [mainboards, setMainboards] = useState([]);
  const [psus, setPsus] = useState([]);
  const [pcs, setPcs] = useState([]);
  const [headphones, setHeadphones] = useState([]);
  const [mousepads, setMousepads] = useState([]);
  const [tablets, setTablets] = useState([]);
  const [gamingGear, setGamingGear] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [timeframe, setTimeframe] = useState("last7days");
  const [showModal, setShowModal] = useState(false);
  const [topSpenders, setTopSpenders] = useState([]);
  const [spendersTimeframe, setSpendersTimeframe] = useState("last7days");
  const [allImages, setAllImages] = useState({});
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
     
  
        // Fetch all images from Cloudinary
        const imagesResponse = await fetch(`${API_URL}/images/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!imagesResponse.ok) throw new Error("Failed to fetch images");
        const imagesData = await imagesResponse.json();
        setAllImages(imagesData);
  
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchDashboardData();
  }, [timeframe, spendersTimeframe]);
  // Hàm chung để xử lý CRUD cho các danh mục
  const performProductOperation = async (operation, category, productData, productId) => {
    const validCategoryIds = CATEGORY_IDS[category];
    if (!validCategoryIds) {
      throw new Error(`Invalid category: ${category}`);
    }

    // Kiểm tra categoryID cho create và update
    if ((operation === "create" || operation === "update") && productData.categoryID) {
      if (!validCategoryIds.includes(productData.categoryID)) {
        throw new Error(`categoryID ${productData.categoryID} is not valid for ${category}`);
      }
    }

    const stateSetter = {
      computers: setComputers,
      mouses: setMouses,
      keyboards: setKeyboards,
      phones: setPhones,
      monitors: setMonitors,
      processors: setProcessors,
      ram: setRam,
      storage: setStorage,
      cases: setCases,
      mainboards: setMainboards,
      psus: setPsus,
      pcs: setPcs,
      headphones: setHeadphones,
      mousepads: setMousepads,
      tablets: setTablets,
      gamingGear: setGamingGear,
    }[CATEGORY_STATE_MAP[category]];

    try {
      let response;
      if (operation === "create") {
        response = await fetch(`${API_URL}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(productData),
        });
      } else if (operation === "update") {
        response = await fetch(`${API_URL}/products/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(productData),
        });
      } else if (operation === "delete") {
        response = await fetch(`${API_URL}/products/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Failed to ${operation} product: ${responseText}`);
      }

      if (operation === "create") {
        const newProduct = JSON.parse(responseText);
        stateSetter((prev) => [...prev, newProduct]);
        return newProduct;
      } else if (operation === "update") {
        const updatedProduct = JSON.parse(responseText);
        stateSetter((prev) =>
          prev.map((product) => (product.id === productId ? updatedProduct : product))
        );
        return updatedProduct;
      } else if (operation === "delete") {
        stateSetter((prev) => prev.filter((product) => product.id !== productId));
        return true;
      }
    } catch (error) {
      console.error(`Error performing ${operation} on ${category}:`, error);
      throw error;
    }
  };

  // Hàm CRUD cho từng danh mục
  const createProduct = async (category, productData) => {
    return performProductOperation("create", category, productData);
  };

  const updateProduct = async (category, productId, productData) => {
    return performProductOperation("update", category, productData, productId);
  };

  const deleteProduct = async (category, productId) => {
    return performProductOperation("delete", category, null, productId);
  };

  const getProductById = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to get product");
      return await response.json();
    } catch (error) {
      console.error(`Error getting product with ID ${productId}:`, error);
      throw error;
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to get order");
      return await response.json();
    } catch (error) {
      console.error(`Error getting order with ID ${orderId}:`, error);
      throw error;
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update order status");
  
      const updatedOrder = await response.json();
      console.log("Updated order from API:", updatedOrder);
  
      // Re-fetch toàn bộ danh sách orders để đảm bảo đồng bộ
      const ordersResponse = await fetch(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!ordersResponse.ok) throw new Error("Failed to fetch updated orders");
      const ordersData = await ordersResponse.json();
      setOrders(ordersData);
      return updatedOrder;
    } catch (error) {
      console.error(`Error updating order status for ID ${orderId}:`, error);
      throw error;
    }
  };

  // Fetch dashboard data (giữ nguyên logic hiện tại)
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const statsResponse = await fetch(`${API_URL}/dashboard/stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!statsResponse.ok) throw new Error("Failed to fetch dashboard stats");
        const statsData = await statsResponse.json();
        setDashboardStats(statsData);

        const salesResponse = await fetch(
          `${API_URL}/dashboard/sales-performance?timeframe=${timeframe}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (!salesResponse.ok) throw new Error("Failed to fetch sales performance data");
        const salesData = await salesResponse.json();
        setSalesData(salesData);

        const deviceResponse = await fetch(`${API_URL}/dashboard/device-usage`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!deviceResponse.ok) throw new Error("Failed to fetch device usage data");
        const deviceData = await deviceResponse.json();
        setDeviceUsage(deviceData);

        const categoryResponse = await fetch(`${API_URL}/dashboard/category-sales`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!categoryResponse.ok) throw new Error("Failed to fetch category sales data");
        const categoryData = await categoryResponse.json();
        setCategorySales(categoryData);

        const ordersResponse = await fetch(`${API_URL}/dashboard/recent-orders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!ordersResponse.ok) throw new Error("Failed to fetch recent orders data");
        const ordersData = await ordersResponse.json();
        setRecentOrders(Array.isArray(ordersData) ? ordersData : [ordersData]);

        // Fetch data cho từng danh mục
        const fetchCategoryData = async (category, setter) => {
          const response = await fetch(`${API_URL}/products/${category}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          if (!response.ok) throw new Error(`Failed to fetch ${category} data`);
          const data = await response.json();
          setter(data);
        };

        await Promise.all([
          fetchCategoryData("laptop", setComputers),
          fetchCategoryData("phone", setPhones),
          fetchCategoryData("mouse", setMouses),
          fetchCategoryData("keyboard", setKeyboards),
          fetchCategoryData("computers", setMonitors),
          fetchCategoryData("processors", setProcessors),
          fetchCategoryData("ram", setRam),
          fetchCategoryData("storage", setStorage),
          fetchCategoryData("cases", setCases),
          fetchCategoryData("mainboards", setMainboards),
          fetchCategoryData("psus", setPsus),
          fetchCategoryData("pcs", setPcs),
          fetchCategoryData("headphones", setHeadphones),
          fetchCategoryData("mousepads", setMousepads),
          fetchCategoryData("tablet", setTablets),
          fetchCategoryData("gamingear", setGamingGear),
        ]);

        const customerResponse = await fetch(`${API_URL}/customers`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!customerResponse.ok) throw new Error("Failed to fetch customers data");
        const customerData = await customerResponse.json();
        setCustomers(customerData);

        const orders1Response = await fetch(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!orders1Response.ok) throw new Error("Failed to fetch orders data");
        const orders1Data = await orders1Response.json();
        console.log("Orders data from API:", orders1Data);
        setOrders(orders1Data);

        const topSpendersResponse = await fetch(
          `${API_URL}/customers/statistics/top-spenders?timeframe=${spendersTimeframe}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (!topSpendersResponse.ok) throw new Error("Failed to fetch top spenders data");
        const topSpendersData = await topSpendersResponse.json();
        setTopSpenders(topSpendersData);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeframe, spendersTimeframe]);

  const handleTimeframeChange = (event) => setTimeframe(event.target.value);
  const handleSpendersTimeframeChange = (event) => setSpendersTimeframe(event.target.value);

  const mainBg = darkMode ? "bg-gray-900" : "bg-gray-50";
  const sidebarBg = darkMode ? "bg-gray-900" : "bg-white";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const textColor = darkMode ? "text-gray-200" : "text-gray-800";
  const secondaryTextColor = darkMode ? "text-gray-400" : "text-gray-500";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";
  const activeMenuBg = darkMode ? "bg-gray-700" : "bg-blue-500";
  const activeMenuText = "text-white";
  const hoverMenuBg = darkMode ? "hover:bg-gray-700 hover:bg-opacity-25" : "hover:bg-gray-200 hover:bg-opacity-75";

  if (loading && !dashboardStats) {
    return (
      <div className={`flex h-screen w-full ${mainBg} ${textColor} items-center justify-center`}>
        <div className="text-center">
          <p className="text-xl mb-2">Loading dashboard data...</p>
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex h-screen w-full ${mainBg} ${textColor} items-center justify-center`}>
        <div className="text-center">
          <p className="text-xl mb-2 text-red-500">Error loading dashboard</p>
          <p>{error}</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-full ${mainBg} ${textColor}`}>
      <div className={`w-64 h-full ${sidebarBg} border-r ${borderColor} flex flex-col`}>
        <div className="p-4 flex items-center">
          <div className="bg-blue-500 rounded-lg p-1 mr-2">
            <FaDesktop className="text-white" size={20} />
          </div>
          <span className="text-xl font-semibold">TechStore</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-2">
            <ul className="space-y-1">
              {[
                { name: "Dashboard", icon: FaChartPie },
                { name: "Computers", icon: FaDesktop },
                { name: "Processors", icon: FaMicrochip },
                { name: "RAM", icon: FaMemory },
                { name: "Storage", icon: FaHdd },
                { name: "Case", icon: FaServer },
                { name: "Mainboard", icon: FaProjectDiagram },
                { name: "Psu", icon: FaPlug },
                { name: "PC", icon: FaCogs },
                { name: "Headphone", icon: FaHeadphones },
                { name: "Mousepad", icon: FaRegSquare },
                { name: "GamingGear", icon: FaGamepad },
                { name: "Tablet", icon: FaTabletAlt },
                { name: "Laptops", icon: FaLaptop },
                { name: "Phone", icon: FaMobile },
                { name: "Mouse", icon: FaMouse },
                { name: "KeyBoard", icon: FaKeyboard },
                { name: "Orders", icon: FaShoppingCart },
                { name: "Customers", icon: FaUsers },
              ].map((menu) => (
                <li key={menu.name}>
                  <button
                    onClick={() => setActiveMenu(menu.name)}
                    className={`flex items-center p-3 rounded-lg w-full text-left transition-colors ${
                      activeMenu === menu.name ? `${activeMenuBg} ${activeMenuText}` : `${hoverMenuBg}`
                    }`}
                  >
                    <menu.icon className="mr-3" size={18} />
                    <span>{menu.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={`p-4 flex items-center border-t ${borderColor}`}>
          <div className="mr-3">
            <FaUserCircle size={24} className="text-gray-400" />
          </div>
          <div>
            <div className="font-medium">Admin User</div>
            <div
  onClick={() => setShowModal(true)}
  className={`text-xs ${secondaryTextColor} cursor-pointer hover:underline`}
>
  Đăng xuất
</div>
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-[9999]">
            <div className="bg-white text-amber-500 p-6 rounded-xl shadow-lg text-center w-80">
              <h2 className="text-lg font-semibold mb-4">Bạn có chắc muốn đăng xuất không?</h2>
              <div className="flex justify-center gap-4">
                <button onClick={handleLogoutConfirm} className="px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600">
                  Có
                </button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
          <div className="flex items-center">
            <div className="flex items-center px-2">
              <button className="mr-2">
                <FaEllipsisH size={16} />
              </button>
              <div className="text-sm breadcrumbs">
                <span>{activeMenu}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20">
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {activeMenu === "Dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Total Revenue</h3>
                    <span className={dashboardStats?.totalRevenue?.percentChange >= 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                      {dashboardStats?.totalRevenue?.percentChange >= 0 ? <FaArrowUp className="mr-1" size={14} /> : <FaArrowDown className="mr-1" size={14} />}
                      21.6%
                    </span>
                  </div>
                  <p className="text-3xl font-bold">${dashboardStats?.totalRevenue?.value?.toLocaleString() || 0}</p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    Compared to ${dashboardStats?.totalRevenue?.previousValue?.toLocaleString() || 0} last month
                  </p>
                </div>
                <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Total Orders</h3>
                    <span className={dashboardStats?.totalOrders?.percentChange >= 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                      {dashboardStats?.totalOrders?.percentChange >= 0 ? <FaArrowUp className="mr-1" size={14} /> : <FaArrowDown className="mr-1" size={14} />}
                      14.2%
                    </span>
                  </div>
                  <p className="text-3xl font-bold">{dashboardStats?.totalOrders?.value?.toLocaleString() || 0}</p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    Compared to {dashboardStats?.totalOrders?.previousValue?.toLocaleString() || 0} last month
                  </p>
                </div>
                <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">New Customers</h3>
                    <span className={dashboardStats?.newCustomers?.percentChange >= 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                      {dashboardStats?.newCustomers?.percentChange >= 0 ? <FaArrowUp className="mr-1" size={14} /> : <FaArrowDown className="mr-1" size={14} />}
                     
                    </span>
                  </div>
                  <p className="text-3xl font-bold">{dashboardStats?.newCustomers?.value || 0}</p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    Compared to {dashboardStats?.newCustomers?.previousValue || 0} last month
                  </p>
                </div>
                <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Low Stock</h3>
                    <span className={dashboardStats?.lowStock?.percentChange <= 10 ? "text-red-500 flex items-center" : "text-red-500 flex items-center"}>
                      {dashboardStats?.lowStock?.percentChange > 0 ? <FaArrowUp className="mr-1" size={14} /> : <FaArrowDown className="mr-1" size={14} />}
                      25.0%
                    </span>
                  </div>
                  <p className="text-3xl font-bold">{dashboardStats?.lowStock?.value || 0}</p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    Compared to {dashboardStats?.lowStock?.previousValue || 0} last month
                  </p>
                </div>
              </div>
              <div className={`p-6 rounded-lg ${cardBg} border ${borderColor} mb-6`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-4">
                    <button className="text-blue-500 border-b-2 border-blue-500 pb-2">Sales Performance</button>
                  </div>
                  <div className="flex items-center">
                    <select className={`mr-2 ${cardBg} border ${borderColor} rounded px-2 py-1`} value={timeframe} onChange={handleTimeframeChange}>
                      <option value="last7days">Last 7 Days</option>
                      <option value="last30days">Last 30 Days</option>
                      <option value="lastQuarter">Last Quarter</option>
                      <option value="lastYear">Last Year</option>
                    </select>
                    <button>
                      <FaEllipsisH size={16} />
                    </button>
                  </div>
                </div>
                <div className="h-64 w-full">
                  {salesData && salesData.length > 0 ? (
                    <SalesChart data={salesData} timeframe={timeframe} darkMode={darkMode} />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p>No sales data available for the selected timeframe</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-blue-500">Customer Device Usage</h3>
                    <button>
                      <FaEllipsisH size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {Array.isArray(deviceUsage) &&
                      deviceUsage.map((device, index) => {
                        let icon;
                        switch (device.platform) {
                          case "Windows":
                            icon = <FaWindows />;
                            break;
                          case "Mac":
                            icon = <FaApple />;
                            break;
                          case "iOS":
                            icon = <FaMobileAlt />;
                            break;
                          case "Android":
                            icon = <FaAndroid />;
                            break;
                          case "Linux":
                            icon = <FaLinux />;
                            break;
                          default:
                            icon = <FaQuestionCircle />;
                        }
                        const isHighlight = index === 0;
                        return (
                          <div className="flex flex-col items-center" key={device.platform}>
                            <div
                              className={`rounded-lg w-12 h-16 ${
                                isHighlight ? (darkMode ? "bg-blue-900" : "bg-blue-400") : darkMode ? "bg-gray-700" : "bg-gray-200"
                              } mb-2 flex items-center justify-center relative`}
                            >
                              {isHighlight && (
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                                  {device.percentage}%
                                </div>
                              )}
                              <div className={isHighlight ? "text-white" : "opacity-50"}>{icon}</div>
                            </div>
                            <span className="text-xs">{device.platform}</span>
                            {!isHighlight && <span className={`text-xs ${secondaryTextColor}`}>{device.percentage}%</span>}
                          </div>
                        );
                      })}
                  </div>
                  <div className="mt-6 h-48">
                    <DeviceUsageChart data={deviceUsage} darkMode={darkMode} />
                  </div>
                </div>
                <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-green-500">Product Category Sales</h3>
                    <button>
                      <FaEllipsisH size={16} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {Array.isArray(categorySales) &&
                      categorySales.map((category, index) => {
                        const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500"];
                        const color = colors[index % colors.length];
                        return (
                          <div key={category.categoryName}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">{category.categoryName}</span>
                              <span className="text-sm font-semibold">{category.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div className={`${color} h-2 rounded-full`} style={{ width: `${category.percentage}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="mt-6 h-48">
                    <CategorySalesChart data={categorySales} darkMode={darkMode} />
                  </div>
                </div>
              </div>
              <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-blue-500">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${borderColor}`}>
                        <th className="pb-3 text-left">Order ID</th>
                        <th className="pb-3 text-left">Customer</th>
                        <th className="pb-3 text-left">Product</th>
                        <th className="pb-3 text-left">Date</th>
                        <th className="pb-3 text-left">Amount</th>
                        <th className="pb-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders &&
                        Array.isArray(recentOrders) &&
                        recentOrders.map((order) => {
                          let statusColor;
                          switch (order.status) {
                            case "pending":
                              statusColor = "blue";
                              break;
                            case "shipping":
                              statusColor = "green";
                              break;
                            case "completed":
                              statusColor = "purple";
                              break;
                            case "canceled":
                              statusColor = "red";
                              break;
                            default:
                              statusColor = "gray";
                          }
                          return (
                            <tr key={order.orderId} className={`border-b ${borderColor}`}>
                              <td className="py-3">#{order.orderId}</td>
                              <td className="py-3">{order.customerName}</td>
                              <td className="py-3">{order.mainProduct}</td>
                              <td className="py-3">{order.orderDate}</td>
                              <td className="py-3">{order.totalAmount != null ? Number(order.totalAmount).toFixed(2) : "0.00"}</td>
                              <td className="py-3">
                                <span className={`inline-block px-2 py-1 text-xs rounded-full bg-${statusColor}-100 text-${statusColor}-800`}>{order.status}</span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={`mt-5 p-6 rounded-lg ${cardBg} border ${borderColor}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-green-500">Top Spenders</h3>
                  <div className="flex items-center">
                    <select className={`mr-2 ${cardBg} border ${borderColor} rounded px-2 py-1`} value={spendersTimeframe} onChange={handleSpendersTimeframeChange}>
                      <option value="last7days">Last 7 Days</option>
                      <option value="last30days">Last 30 Days</option>
                      <option value="lastYear">Last Year</option>
                    </select>
                    <button>
                      <FaEllipsisH size={16} />
                    </button>
                  </div>
                </div>
                <div className="h-64 w-full">
                  {topSpenders && topSpenders.length > 0 ? (
                    <TopSpendersChart data={topSpenders} darkMode={darkMode} />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p>No top spenders data available for the selected timeframe</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {activeMenu === "Computers" && (
            <div className="p-6">
              <MonitorsTable
                activeMenu="Computers"
                monitors={monitors}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("computers", productData)}
                updateProduct={(productId, productData) => updateProduct("computers", productId, productData)}
                deleteProduct={(productId) => deleteProduct("computers", productId)}
                getProductById={getProductById}
                  validCategoryIds={CATEGORY_IDS.computers}
                  images={[
                    ...(allImages.monitor || []),
                    ...(allImages.monitors_asus || []),
                    ...(allImages.monitors_acer || []),
                    ...(allImages.monitors_lg || []),
                    ...(allImages.monitors_msi || []),
                  ]} // Combine all monitor-related images
              />
            </div>
          )}
          {activeMenu === "Processors" && (
            <div className="p-6">
              <ProcessorsTable
                activeMenu="Processors"
                processors={processors}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("processors", productData)}
                updateProduct={(productId, productData) => updateProduct("processors", productId, productData)}
                deleteProduct={(productId) => deleteProduct("processors", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.processors}
                images={[
                  ...(allImages.cpu || []),
                  ...(allImages.processors_amd || []),
                  ...(allImages.processors_intel || []),
                ]} // Combine all processor-related images
              />
            </div>
          )}
          {activeMenu === "RAM" && (
            <div className="p-6">
              <Ram
                activeMenu="RAM"
                ram={ram}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("ram", productData)}
                updateProduct={(productId, productData) => updateProduct("ram", productId, productData)}
                deleteProduct={(productId) => deleteProduct("ram", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.ram}
                images={[
                  ...(allImages.ram || []),
                  ...(allImages.ram_kingston || []),
                  ...(allImages.ram_corsair || []),
                  ...(allImages.ram_pny || []),
                ]} // Combine all RAM-related images
              />
            </div>
          )}
          {activeMenu === "Storage" && (
            <div className="p-6">
              <Storage
                activeMenu="Storage"
                storage={storage}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("storage", productData)}
                updateProduct={(productId, productData) => updateProduct("storage", productId, productData)}
                deleteProduct={(productId) => deleteProduct("storage", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.storage}
                images={[
                  ...(allImages.storage || []),
                  ...(allImages.storage_kingston || []),
                  ...(allImages.storage_samsung || []),
                  ...(allImages.storage_western_digital || []),
                ]} // Combine all storage-related images
              />
            </div>
          )}
          {activeMenu === "Case" && (
            <div className="p-6">
              <Cases
                activeMenu="Case"
                cases={cases}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("case", productData)}
                updateProduct={(productId, productData) => updateProduct("case", productId, productData)}
                deleteProduct={(productId) => deleteProduct("case", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.case}
                images={[
                  ...(allImages.case || []),
                  ...(allImages.case_xigmatek || []),
                  ...(allImages.case_cougar || []),
                  ...(allImages.case_corsair || []),
                  ...(allImages.case_cooler_master || []),
                  ...(allImages.case_nzxt || []),
                  ...(allImages.case_thermaltake || []),
                ]} // Gộp tất cả hình ảnh liên quan đến case
              />
            </div>
          )}
          {activeMenu === "Mainboard" && (
            <div className="p-6">
              <Mainboard
                activeMenu="Mainboard"
                mainboards={mainboards}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("mainboard", productData)}
                updateProduct={(productId, productData) => updateProduct("mainboard", productId, productData)}
                deleteProduct={(productId) => deleteProduct("mainboard", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.mainboard}
                images={[
                  ...(allImages.motherboard || []),
                  ...(allImages.mainboard_asus || []),
                  ...(allImages.mainboard_gigabyte || []),
                  ...(allImages.mainboard_msi || []),
                ]} // Gộp tất cả hình ảnh liên quan đến mainboard
              />
            </div>
          )}
          {activeMenu === "Psu" && (
            <div className="p-6">
              <Psus
                activeMenu="Psu"
                psus={psus}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("psu", productData)}
                updateProduct={(productId, productData) => updateProduct("psu", productId, productData)}
                deleteProduct={(productId) => deleteProduct("psu", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.psu}
                images={[
                  ...(allImages.power_supply || []),
                  ...(allImages.psu_asus || []),
                  ...(allImages.psu_corsair || []),
                  ...(allImages.psu_deepcool || []),
                  ...(allImages.psu_msi || []),
                ]} // Gộp tất cả hình ảnh liên quan đến PSU
              />
            </div>
          )}
          { activeMenu === "PC" && (
            <div className="p-6">
              <Pc
                activeMenu="PC"
                pcs={pcs}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("pc", productData)}
                updateProduct={(productId, productData) => updateProduct("pc", productId, productData)}
                deleteProduct={(productId) => deleteProduct("pc", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.pc}
                images={[
                  ...(allImages.pc || []),
                  ...(allImages.pc_msi || []),
                  ...(allImages.pc_asus || []),
                ]} // Gộp tất cả hình ảnh liên quan đến PC
              />
            </div>
          )}
          {activeMenu === "Headphone" && (
            <div className="p-6">
              <Headphone
                activeMenu="Headphone"
                headphones={headphones}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("headphone", productData)}
                updateProduct={(productId, productData) => updateProduct("headphone", productId, productData)}
                deleteProduct={(productId) => deleteProduct("headphone", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.headphone}
                images={[
                  ...(allImages.headphone || []),
                  ...(allImages.headphone_asus || []),
                  ...(allImages.headphone_razer || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Headphone
              />
            </div>
          )}
          {activeMenu === "Mousepad" && (
            <div className="p-6">
              <Mousepad
                activeMenu="Mousepad"
                mousepads={mousepads}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("mousepad", productData)}
                updateProduct={(productId, productData) => updateProduct("mousepad", productId, productData)}
                deleteProduct={(productId) => deleteProduct("mousepad", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.mousepad}
                images={[
                  ...(allImages.mousepad || []),
                  ...(allImages.mousepad_daeru || []),
                  ...(allImages.mousepad_asus || []),
                  ...(allImages.mousepad_razer || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Mousepad
              />
            </div>
          )}
          {activeMenu === "Tablet" && (
            <div className="p-6">
              <TabletTable
                activeMenu="Tablet"
                tablets={tablets}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("tablet", productData)}
                updateProduct={(productId, productData) => updateProduct("tablet", productId, productData)}
                deleteProduct={(productId) => deleteProduct("tablet", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.tablet}
                images={[
                  ...(allImages.ipad || []),
                  ...(allImages.tablet_apple || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Tablet
              />
            </div>
          )}
          {activeMenu === "GamingGear" && (
            <div className="p-6">
              <GamingGearTable
                activeMenu="GamingGear"
                gamingGear={gamingGear}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("gamingGear", productData)}
                updateProduct={(productId, productData) => updateProduct("gamingGear", productId, productData)}
                deleteProduct={(productId) => deleteProduct("gamingGear", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.gamingGear}
                images={[
                  ...(allImages.gaming_gear || []),
                  ...(allImages.gamingGear_sony || []),
                  ...(allImages.gamingGear_lenovo || []),
                  ...(allImages.gamingGear_daeru || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Gaming Gear
              />
            </div>
          )}
          {activeMenu === "Laptops" && (
            <div className="p-6">
              <LaptopTable
                activeMenu="Laptops"
                computers={computers}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("laptop", productData)}
                updateProduct={(productId, productData) => updateProduct("laptop", productId, productData)}
                deleteProduct={(productId) => deleteProduct("laptop", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.laptop}
                images={[
                  ...(allImages.laptop || []),
                  ...(allImages.laptop_acer || []),
                  ...(allImages.laptop_asus || []),
                  ...(allImages.laptop_dell || []),
                  ...(allImages.laptop_gigabyte || []),
                  ...(allImages.laptop_lenovo || []),
                  ...(allImages.laptop_mac || []),
                  ...(allImages.laptop_msi || []),
                ]} // Combine all laptop-related images
              />
            </div>
          )}
          {activeMenu === "Phone" && (
            <div className="p-6">
              <PhoneTable
                activeMenu="Phone"
                phones={phones}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("phone", productData)}
                updateProduct={(productId, productData) => updateProduct("phone", productId, productData)}
                deleteProduct={(productId) => deleteProduct("phone", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.phone}
                images={[
                  ...(allImages.phone || []),
                  ...(allImages.phone_iphone || []),
                  ...(allImages.phone_samsung || []),
                  ...(allImages.phone_xiaomi || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Phone
              />
            </div>
          )}
          {activeMenu === "Mouse" && (
            <div className="p-6">
              <MouseTable
                activeMenu="Mouse"
                mouses={mouses}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("mouse", productData)}
                updateProduct={(productId, productData) => updateProduct("mouse", productId, productData)}
                deleteProduct={(productId) => deleteProduct("mouse", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.mouse}
                images={[
                  ...(allImages.mouse || []),
                  ...(allImages.mouse_dareu || []),
                  ...(allImages.mouse_msi || []),
                  ...(allImages.mouse_logitech || []),
                  ...(allImages.mouse_rapoo || []),
                  ...(allImages.mouse_razer || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Mouse
              />
            </div>
          )}
          {activeMenu === "KeyBoard" && (
            <div className="p-6">
              <KeyboardTable
                activeMenu="KeyBoard"
                keyboards={keyboards}
                theme={darkMode ? "dark" : "light"}
                createProduct={(productData) => createProduct("keyboard", productData)}
                updateProduct={(productId, productData) => updateProduct("keyboard", productId, productData)}
                deleteProduct={(productId) => deleteProduct("keyboard", productId)}
                getProductById={getProductById}
                validCategoryIds={CATEGORY_IDS.keyboard}
                images={[
                  ...(allImages.keyboard || []),
                  ...(allImages.keyboard_logitech || []),
                  ...(allImages.keyboard_aula || []),
                  ...(allImages.keyboard_rapoo || []),
                  ...(allImages.keyboard_asus || []),
                ]} // Gộp tất cả hình ảnh liên quan đến Keyboard
              />
            </div>
          )}
          {activeMenu === "Orders" && (
            <div className="p-6">
              <OrderTable
                orders={orders}
                theme={darkMode ? "dark" : "light"}
                getOrderById={getOrderById}
                updateOrderStatus={updateOrderStatus}
              />
            </div>
          )}
          {activeMenu === "Customers" && (
            <div className="p-6">
              <CustomerTable activeMenu="Customers" customers={customers} theme={darkMode ? "dark" : "light"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Các component biểu đồ (giữ nguyên từ mã gốc)
function SalesChart({ data, timeframe, darkMode }) {
  if (!data || data.length === 0) return <div>No data available</div>;
  const chartData = data.map((item) => ({
    name: timeframe === "last7days" || timeframe === "last30days" ? item.date : `Tháng ${item.month}`,
    revenue: Number(item.revenue),
  }));
  const lineColor = darkMode ? "#3b82f6" : "#2563eb";
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="name" tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }} axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }} />
        <YAxis tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }} axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "#f3f4f6" : "#111827",
          }}
          formatter={(value) => [`$${value.toLocaleString()}`, "Doanh thu"]}
        />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke={lineColor} strokeWidth={2} name="Doanh thu" dot={{ fill: lineColor, strokeWidth: 1, r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function DeviceUsageChart({ data, darkMode }) {
  const [displayType, setDisplayType] = useState("categories");
  if (!data) return <div>No device usage data available</div>;
  let chartData = [];
  switch (displayType) {
    case "distribution":
      chartData = Array.isArray(data.distribution) ? data.distribution.map((item) => ({ name: item.category, value: item.percentage })) : [];
      break;
    case "brands":
      chartData = Array.isArray(data.brands) ? data.brands.map((item) => ({ name: item.brand, value: item.percentage })) : [];
      break;
    case "categories":
    default:
      chartData = Array.isArray(data.categories) ? data.categories.map((item) => ({ name: item.category, value: item.percentage })) : [];
      break;
  }
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280", "#ec4899", "#14b8a6", "#f97316", "#84cc16"];
  if (!chartData.length) return <div>No {displayType} data available</div>;
  return (
    <div className="w-full h-full flex">
      <div className="w-1/4 flex flex-col items-start justify-center pl-1">
        <h3 className={`text-base font-medium mb-3 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Phân tích theo</h3>
        <div className="w-full">
          <select
            value={displayType}
            onChange={(e) => setDisplayType(e.target.value)}
            className={`w-full px-3 py-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
          >
            <option value="categories">Danh mục</option>
            <option value="brands">Thương hiệu</option>
            <option value="distribution">Độ Phân phối</option>
          </select>
        </div>
      </div>
      <div className="w-3/4 flex items-center justify-center">
        <PieChart width={360} height={220}>
          <Pie data={chartData} cx={150} cy={100} outerRadius={80} innerRadius={40} fill="#8884d8" dataKey="value" nameKey="name" label={({ value }) => `${value}%`}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Tỷ lệ"]}
            labelFormatter={() => ""}
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#f3f4f6" : "#111827",
            }}
          />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" formatter={(value) => <span style={{ color: darkMode ? "#d1d5db" : "#374151" }}>{value}</span>} />
        </PieChart>
      </div>
    </div>
  );
}

function CategorySalesChart({ data, darkMode }) {
  const normalizedData = Array.isArray(data) ? data : [data];
  const chartData = normalizedData.map((item) => ({ name: item.categoryName, percentage: item.percentage, revenue: item.revenue }));
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
  if (!chartData.length) return <div>No product category sales data available</div>;
  return (
    <div className="w-full h-full">
      <BarChart width={700} height={200} data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="name" tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }} axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }} />
        <YAxis tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }} axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }} tickFormatter={(value) => `${value}%`} />
        <Tooltip
          formatter={(value, name) => (name === "percentage" ? [`${value}%`, "Tỉ lệ doanh thu"] : [value, "Doanh thu"])}
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "#f3f4f6" : "#111827",
          }}
        />
        <Bar dataKey="percentage" name="Tỉ lệ doanh thu">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

function TopSpendersChart({ data, darkMode }) {
  if (!data || data.length === 0) return <div>No data available</div>;
  const chartData = data.map((item) => ({ name: item.fullName, totalSpent: Number(item.totalSpent) }));
  const barColor = darkMode ? "#10b981" : "#059669";
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
        <XAxis dataKey="name" tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }} axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }} />
        <YAxis tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }} axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }} tickFormatter={(value) => `$${value.toLocaleString()}`} />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "#f3f4f6" : "#111827",
          }}
          formatter={(value) => [`$${value.toLocaleString()}`, "Total Spent"]}
        />
        <Legend />
        <Bar dataKey="totalSpent" fill={barColor} name="Total Spent" />
      </BarChart>
    </ResponsiveContainer>
  );
}