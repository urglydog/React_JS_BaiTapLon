import { useState, useEffect } from "react";

import {
  FaChartPie,
  FaDesktop,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaShoppingCart,
  FaUsers,
  FaUserCircle,
  FaSun,
  FaMoon,
  FaBell,
  FaClock,
  FaEllipsisH,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaLaptop,
  FaApple,
  FaMobileAlt,
  FaQuestionCircle,
  FaWindows,
  FaLinux,
  FaAndroid,
  FaPhone,
  FaPhoneSlash,
  FaPhoneSquare,
  FaMobile,
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
// Base API URL - replace with your actual backend URL
const API_URL = "http://localhost:4000/api/admin";

export default function ComputerStoreAdminLayout() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard"); // Thêm trạng thái cho menu

  // State for dashboard data
  const [dashboardStats, setDashboardStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [deviceUsage, setDeviceUsage] = useState([]);
  const [categorySales, setCategorySales] = useState([]);

  const [recentOrders, setRecentOrders] = useState([]);
  const [computers, setComputers] = useState([]); // State for computers
  const [customers ,setCustomers]=useState([]); 
  // Timeframe for sales data
  const [timeframe, setTimeframe] = useState("last7days");
  const [showModal, setShowModal] = useState(false);
  const [topSpenders, setTopSpenders] = useState([]);
  const [spendersTimeframe, setSpendersTimeframe] = useState("last7days"); // Mặc định là tuần

  const [orders, setOrders] = useState([]);
  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch dashboard stats
        const statsResponse = await fetch(`${API_URL}/dashboard/stats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!statsResponse.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const statsData = await statsResponse.json();
        setDashboardStats(statsData);

        // Fetch sales performance data
        const salesResponse = await fetch(
          `${API_URL}/dashboard/sales-performance?timeframe=${timeframe}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!salesResponse.ok) {
          throw new Error("Failed to fetch sales performance data");
        }

        const salesData = await salesResponse.json();
        setSalesData(salesData);

        // Fetch device usage data
        const deviceResponse = await fetch(
          `${API_URL}/dashboard/device-usage`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!deviceResponse.ok) {
          throw new Error("Failed to fetch device usage data");
        }

        const deviceData = await deviceResponse.json();
        setDeviceUsage(deviceData);

        // Fetch category sales data
        const categoryResponse = await fetch(
          `${API_URL}/dashboard/category-sales`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch category sales data");
        }

        const categoryData = await categoryResponse.json();
        setCategorySales(categoryData);

        // Fetch recent orders
        const ordersResponse = await fetch(
          `${API_URL}/dashboard/recent-orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch recent orders data");
        }

        const ordersData = await ordersResponse.json();
        const formattedOrders = Array.isArray(ordersData)
          ? ordersData
          : [ordersData];
        setRecentOrders(formattedOrders);

        const laptopResponse = await fetch(`${API_URL}/products/laptop`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!laptopResponse.ok) {
          throw new Error("Failed to fetch device usage data");
        }

        const laptopData = await laptopResponse.json();
        setComputers(laptopData);

        const customerResponse = await fetch(`${API_URL}/customers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!customerResponse.ok) {
          throw new Error("Failed to fetch device usage data");
        }
        console.log(customerResponse);
        
        const customerData = await customerResponse.json();
        console.log(customerData);
        setCustomers(customerData);
        //
        const topSpendersResponse = await fetch(
          `${API_URL}/customers/statistics/top-spenders?timeframe=${spendersTimeframe}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (!topSpendersResponse.ok) throw new Error("Failed to fetch top spenders data");
        const topSpendersData = await topSpendersResponse.json();
        setTopSpenders(topSpendersData);

        

        const orders1Response = await fetch(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!orders1Response.ok) {
          throw new Error("Failed to fetch orders data");
        }

        const orders1Data = await orders1Response.json();
        console.log("Orders data:", orders1Data);
        setOrders(orders1Data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeframe]);
  // CRUD operations for products
  const createProduct = async (productData) => {
    try {
      console.log("Sending product data:", productData);
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(productData),
      });

      // Log toàn bộ response để debug
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const responseText = await response.text();
      console.log("Response text:", responseText);

      // Nếu không phải JSON hợp lệ, sẽ báo lỗi ở đây
      let newProduct;
      try {
        newProduct = JSON.parse(responseText);
      } catch (e) {
        console.error("Invalid JSON response:", e);
        throw new Error("Server returned invalid JSON");
      }

      if (!response.ok) {
        throw new Error(
          `Failed to create product: ${newProduct.error || response.statusText}`
        );
      }

      // Update the computers state with the new product
      setComputers((prevComputers) => [...prevComputers, newProduct]);

      return newProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const getProductById = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get product");
      }

      return await response.json();
    } catch (error) {
      console.error(`Error getting product with ID ${productId}:`, error);
      throw error;
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();

      // Update the computers state with the updated product
      setComputers((prevComputers) =>
        prevComputers.map((product) =>
          product.id === productId ? updatedProduct : product
        )
      );

      return updatedProduct;
    } catch (error) {
      console.error(`Error updating product with ID ${productId}:`, error);
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      console.log("Deleting product with ID:", productId);
      console.log("Type of productId:", typeof productId); // Kiểm tra kiểu dữ liệu của ID

      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Delete response status:", response.status);
      const responseText = await response.text();
      console.log("Delete response text:", responseText);

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${responseText}`);
      }

      // Remove the deleted product from the computers state
      setComputers((prevComputers) =>
        prevComputers.filter((product) => product.id !== productId)
      );

      return true;
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
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

      if (!response.ok) {
        throw new Error("Failed to get order");
      }

      return await response.json();
    } catch (error) {
      console.error(`Error getting order with ID ${orderId}:`, error);
      throw error;
    }
  };

  // Hàm cập nhật trạng thái đơn hàng
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

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const updatedOrder = await response.json();

      // Cập nhật danh sách đơn hàng trong state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? updatedOrder : order
        )
      );

      return updatedOrder;
    } catch (error) {
      console.error(`Error updating order status for ID ${orderId}:`, error);
      throw error;
    }
  };
  // Update sales data when timeframe changes
  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };
  const handleSpendersTimeframeChange = (event) => {
    setSpendersTimeframe(event.target.value);
  };

  const mainBg = darkMode ? "bg-gray-900" : "bg-gray-50";
  const sidebarBg = darkMode ? "bg-gray-900" : "bg-white";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const textColor = darkMode ? "text-gray-200" : "text-gray-800";
  const secondaryTextColor = darkMode ? "text-gray-400" : "text-gray-500";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-200";

  // Active menu styling
  const activeMenuBg = darkMode ? "bg-gray-700" : "bg-blue-500";
  const activeMenuText = "text-white";
  const hoverMenuBg = darkMode
    ? "hover:bg-gray-700 hover:bg-opacity-25"
    : "hover:bg-gray-200 hover:bg-opacity-75";

  // Display loading state
  if (loading && !dashboardStats) {
    return (
      <div
        className={`flex h-screen w-full ${mainBg} ${textColor} items-center justify-center`}
      >
        <div className="text-center">
          <p className="text-xl mb-2">Loading dashboard data...</p>
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div
        className={`flex h-screen w-full ${mainBg} ${textColor} items-center justify-center`}
      >
        <div className="text-center">
          <p className="text-xl mb-2 text-red-500">Error loading dashboard</p>
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-full ${mainBg} ${textColor}`}>
      {/* Sidebar */}
      <div
        className={`w-64 h-full ${sidebarBg} border-r ${borderColor} flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center">
          <div className="bg-blue-500 rounded-lg p-1 mr-2">
            <FaDesktop className="text-white" size={20} />
          </div>
          <span className="text-xl font-semibold">TechStore</span>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-2">
            <ul className="space-y-1">
              {[
                { name: "Dashboard", icon: FaChartPie },
                { name: "Computers", icon: FaDesktop },
                { name: "Processors", icon: FaMicrochip },
                { name: "RAM", icon: FaMemory },
                { name: "Storage", icon: FaHdd },
                { name: "Laptops", icon: FaLaptop },
                { name: "Phone", icon: FaMobile },
                { name: "Orders", icon: FaShoppingCart },
                { name: "Customers", icon: FaUsers },
              ].map((menu) => (
                <li key={menu.name}>
                  <button
                    onClick={() => setActiveMenu(menu.name)}
                    className={`flex items-center p-3 rounded-lg w-full text-left transition-colors ${
                      activeMenu === menu.name
                        ? `${activeMenuBg} ${activeMenuText}`
                        : `${hoverMenuBg}`
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

        {/* User section at bottom */}
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

        {/* Modal xác nhận */}
        {showModal && (
          <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-[9999]">
            <div className="bg-white text-amber-500 p-6 rounded-xl shadow-lg text-center w-80">
              <h2 className="text-lg font-semibold mb-4">
                Bạn có chắc muốn đăng xuất không?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLogoutConfirm}
                  className="px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600"
                >
                  Có
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header
          className={`flex items-center justify-between p-4 border-b ${borderColor}`}
        >
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
            {/* <div className={`flex items-center rounded-full px-3 py-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <FaSearch className="text-gray-500 mr-2" size={14} />
              <input
                type="text"
                placeholder="Search..."
                className={`bg-transparent border-none focus:outline-none text-sm w-32 ${textColor}`}
              />
            </div> */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeMenu === "Dashboard" && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Total Revenue</h3>
                    <span
                      className={
                        dashboardStats?.totalRevenue?.percentChange >= 0
                          ? "text-green-500 flex items-center"
                          : "text-red-500 flex items-center"
                      }
                    >
                      {dashboardStats?.totalRevenue?.percentChange >= 0 ? (
                        <FaArrowUp className="mr-1" size={14} />
                      ) : (
                        <FaArrowDown className="mr-1" size={14} />
                      )}
                      21.6%
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    $
                    {dashboardStats?.totalRevenue?.value?.toLocaleString() || 0}
                  </p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    Compared to $
                    {dashboardStats?.totalRevenue?.previousValue?.toLocaleString() ||
                      0}{" "}
                    last month
                  </p>
                </div>

                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Total Orders</h3>
                    <span
                      className={
                        dashboardStats?.totalOrders?.percentChange >= 0
                          ? "text-green-500 flex items-center"
                          : "text-red-500 flex items-center"
                      }
                    >
                      {dashboardStats?.totalOrders?.percentChange >= 0 ? (
                        <FaArrowUp className="mr-1" size={14} />
                      ) : (
                        <FaArrowDown className="mr-1" size={14} />
                      )}
                      14.2%
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    {dashboardStats?.totalOrders?.value?.toLocaleString() || 0}
                  </p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    Compared to{" "}
                    {dashboardStats?.totalOrders?.previousValue?.toLocaleString() ||
                      0}{" "}
                    last month
                  </p>
                </div>

                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">New Customers</h3>
                    <span
                      className={
                        dashboardStats?.newCustomers?.percentChange >= 0
                          ? "text-green-500 flex items-center"
                          : "text-red-500 flex items-center"
                      }
                    >
                      {dashboardStats?.newCustomers?.percentChange >= 0 ? (
                        <FaArrowUp className="mr-1" size={14} />
                      ) : (
                        <FaArrowDown className="mr-1" size={14} />
                      )}
                      16%
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    {dashboardStats?.newCustomers?.value || 0}
                  </p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    Compared to{" "}
                    {dashboardStats?.newCustomers?.previousValue || 0} last
                    month
                  </p>
                </div>

                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Low Stock</h3>
                    <span
                      className={
                        dashboardStats?.lowStock?.percentChange <= 10
                          ? "text-red-500 flex items-center"
                          : "text-red-500 flex items-center"
                      }
                    >
                      {dashboardStats?.lowStock?.percentChange > 0 ? (
                        <FaArrowUp className="mr-1" size={14} />
                      ) : (
                        <FaArrowDown className="mr-1" size={14} />
                      )}
                      25.0%
                    </span>
                  </div>
                  <p className="text-3xl font-bold">
                    {dashboardStats?.lowStock?.value || 0}
                  </p>
                  <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                    Compared to {dashboardStats?.lowStock?.previousValue || 0}{" "}
                    last month
                  </p>
                </div>
              </div>

              {/* Sales Graph Section */}
              <div
                className={`p-6 rounded-lg ${cardBg} border ${borderColor} mb-6`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-4">
                    <button className="text-blue-500 border-b-2 border-blue-500 pb-2">
                      Sales Performance
                    </button>
                  </div>
                  <div className="flex items-center">
                    <select
                      className={`mr-2 ${cardBg} border ${borderColor} rounded px-2 py-1`}
                      value={timeframe}
                      onChange={handleTimeframeChange}
                    >
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

                {/* Sales Performance Graph */}
                <div className="h-64 w-full">
                  {salesData && salesData.length > 0 ? (
                    <SalesChart
                      data={salesData}
                      timeframe={timeframe}
                      darkMode={darkMode}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p>No sales data available for the selected timeframe</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Device and Category Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-blue-500">
                      Customer Device Usage
                    </h3>
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
                          <div
                            className="flex flex-col items-center"
                            key={device.platform}
                          >
                            <div
                              className={`rounded-lg w-12 h-16 ${
                                isHighlight
                                  ? darkMode
                                    ? "bg-blue-900"
                                    : "bg-blue-400"
                                  : darkMode
                                  ? "bg-gray-700"
                                  : "bg-gray-200"
                              } mb-2 flex items-center justify-center relative`}
                            >
                              {isHighlight && (
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                                  {device.percentage}%
                                </div>
                              )}
                              <div
                                className={
                                  isHighlight ? "text-white" : "opacity-50"
                                }
                              >
                                {icon}
                              </div>
                            </div>
                            <span className="text-xs">{device.platform}</span>
                            {!isHighlight && (
                              <span className={`text-xs ${secondaryTextColor}`}>
                                {device.percentage}%
                              </span>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  {/* Device Usage Chart */}
                  <div className="mt-6 h-48">
                    <DeviceUsageChart data={deviceUsage} darkMode={darkMode} />
                  </div>
                </div>

                <div
                  className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-green-500">
                      Product Category Sales
                    </h3>
                    <button>
                      <FaEllipsisH size={16} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {Array.isArray(categorySales) &&
                      categorySales.map((category, index) => {
                        // Define colors for different categories
                        const colors = [
                          "bg-blue-500",
                          "bg-green-500",
                          "bg-yellow-500",
                          "bg-red-500",
                          "bg-purple-500",
                        ];
                        const color = colors[index % colors.length];

                        return (
                          <div key={category.categoryName}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">
                                {category.categoryName}
                              </span>
                              <span className="text-sm font-semibold">
                                {category.percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className={`${color} h-2 rounded-full`}
                                style={{ width: `${category.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Category Sales Chart */}
                  <div className="mt-6 h-48">
                    <CategorySalesChart
                      data={categorySales}
                      darkMode={darkMode}
                    />
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium textsac-blue-500">
                    Recent Orders
                  </h3>
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
                            <tr
                              key={order.orderId}
                              className={`border-b ${borderColor}`}
                            >
                              <td className="py-3">#{order.orderId}</td>
                              <td className="py-3">{order.customerName}</td>
                              <td className="py-3">{order.mainProduct}</td>
                              <td className="py-3">{order.orderDate}</td>
                              <td className="py-3">
                                {order.totalAmount != null
                                  ? Number(order.totalAmount).toFixed(2)
                                  : "0.00"}
                              </td>
                              <td className="py-3">
                                <span
                                  className={`inline-block px-2 py-1 text-xs rounded-full bg-${statusColor}-100 text-${statusColor}-800`}
                                >
                                  {/* {order.status} */}
                                  {order.status}
                                  
                                  
                                </span>
                              </td>
                              {/* <td className="py-3">
                                <div className="flex space-x-2">
                                  <button className="text-blue-500 hover:text-blue-700">
                                    <FaEllipsisH size={14} />
                                  </button>
                                </div>
                              </td> */}
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>


                </div>
              </div>

              <div className={`mt-5 p-6 rounded-lg ${cardBg} border ${borderColor}` }>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-green-500">Top Spenders</h3>
                  <div className="flex items-center">
                    <select
                      className={`mr-2 ${cardBg} border ${borderColor} rounded px-2 py-1`}
                      value={spendersTimeframe}
                      onChange={handleSpendersTimeframeChange}
                    >
                      <option value="last7days">Last 7 Days</option>
                      <option value="last30days">Last 30 Days</option>
                      <option value="lastYear">Last Year</option>
                    </select>
                    <button>
                      <FaEllipsisH size={16} />
                    </button>
                  </div>
                </div>

                {/* Biểu đồ cột Top Spenders */}
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
              {/* <h2 className="text-2xl font-semibold mb-4">Computers</h2> */}

              {/* Thêm logic để hiển thị danh sách máy tính, ví dụ: gọi API và hiển thị bảng */}
            </div>
          )}
          {activeMenu === "Processors" && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Processors</h2>
              <p>Đây là danh sách các bộ vi xử lý.</p>
              {/* Thêm logic để hiển thị danh sách bộ vi xử lý */}
            </div>
          )}
          {activeMenu === "RAM" && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">RAM</h2>
              <p>Đây là danh sách các RAM.</p>
              {/* Thêm logic để hiển thị danh sách RAM */}
            </div>
          )}
          {activeMenu === "Storage" && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Storage</h2>
              <p>Đây là danh sách các thiết bị lưu trữ.</p>
              {/* Thêm logic để hiển thị danh sách thiết bị lưu trữ */}
            </div>
          )}
          {activeMenu === "Laptops" && (
            <div className="p-6">
              <LaptopTable
                activeMenu="Laptops"
                computers={computers}
                theme={darkMode ? "dark" : "light"}
                createProduct={createProduct}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
                getProductById={getProductById}
              />
              {/* Thêm logic để hiển thị danh sách laptop */}
            </div>
          )}
          {activeMenu === "Phone" && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Phone</h2>
              <p>Đây là danh sách các dien thoai.</p>
              {/* Thêm logic để hiển thị danh sách đơn hàng */}
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
             
             <CustomerTable
               activeMenu="Customers"
               customers={customers}
               theme={darkMode ? "dark" : "light"}
             />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sales Chart Component
function SalesChart({ data, timeframe, darkMode }) {
  if (!data || data.length === 0) return <div>No data available</div>;

  const chartData = data.map((item) => ({
    name:
      timeframe === "last7days" || timeframe === "last30days"
        ? item.date
        : `Tháng ${item.month}`,
    revenue: Number(item.revenue),
  }));

  const lineColor = darkMode ? "#3b82f6" : "#2563eb";

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={darkMode ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
        />
        <YAxis
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "#f3f4f6" : "#111827",
          }}
          formatter={(value) => [`$${value.toLocaleString()}`, "Doanh thu"]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke={lineColor}
          strokeWidth={2}
          name="Doanh thu"
          dot={{ fill: lineColor, strokeWidth: 1, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Device Usage Chart Component
function DeviceUsageChart({ data, darkMode }) {
  const [displayType, setDisplayType] = useState("categories");

  if (!data) return <div>No device usage data available</div>;

  let chartData = [];

  switch (displayType) {
    case "distribution":
      chartData = Array.isArray(data.distribution)
        ? data.distribution.map((item) => ({
            name: item.category,
            value: item.percentage,
          }))
        : [];
      break;
    case "brands":
      chartData = Array.isArray(data.brands)
        ? data.brands.map((item) => ({
            name: item.brand,
            value: item.percentage,
          }))
        : [];
      break;
    case "categories":
    default:
      chartData = Array.isArray(data.categories)
        ? data.categories.map((item) => ({
            name: item.category,
            value: item.percentage,
          }))
        : [];
      break;
  }

  const COLORS = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // purple
    "#6b7280", // gray
    "#ec4899", // pink
    "#14b8a6", // teal
    "#f97316", // orange
    "#84cc16", // lime
  ];

  if (!chartData.length) return <div>No {displayType} data available</div>;

  const displayLabels = {
    categories: "Danh mục sản phẩm",
    brands: "Thương hiệu",
    distribution: "Phân phối sản phẩm",
  };
  console.log(displayLabels);

  return (
    <div className="w-full h-full flex">
      {/* Left side - Selection controls */}
      <div className="w-1/4 flex flex-col items-start justify-center pl-1">
        <h3
          className={`text-base font-medium mb-3 ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Phân tích theo
        </h3>

        <div className="w-full">
          <select
            value={displayType}
            onChange={(e) => setDisplayType(e.target.value)}
            className={`w-full px-3 py-2 rounded border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300"
            }`}
          >
            <option value="categories">Danh mục </option>
            <option value="brands">Thương hiệu</option>
            <option value="distribution">Độ Phân phối </option>
          </select>
        </div>

        <div className="mt-4"></div>
      </div>

      {/* Right side - Chart */}
      <div className="w-3/4 flex items-center justify-center">
        <PieChart width={360} height={220}>
          <Pie
            data={chartData}
            cx={150}
            cy={100}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ value }) => `${value}%`} // bỏ tên nếu không cần
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Tỷ lệ"]}
            labelFormatter={() => ""} // ẩn dòng đầu (dòng "0")
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#f3f4f6" : "#111827",
            }}
          />
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            formatter={(value) => (
              <span style={{ color: darkMode ? "#d1d5db" : "#374151" }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </div>
    </div>
  );
}
// Category Sales Chart Component
function CategorySalesChart({ data, darkMode }) {
  const normalizedData = Array.isArray(data) ? data : [data];

  const chartData = normalizedData.map((item) => ({
    name: item.categoryName,
    percentage: item.percentage,
    revenue: item.revenue,
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  if (!chartData.length)
    return <div>No product category sales data available</div>;

  return (
    <div className="w-full h-full">
      <BarChart
        width={700}
        height={200}
        data={chartData}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={darkMode ? "#374151" : "#e5e7eb"}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
        />
        <YAxis
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          formatter={(value, name) => {
            if (name === "percentage") return [`${value}%`, "Tỉ lệ doanh thu"];
            if (name === "revenue") return [value, "Doanh thu"];
            return [value, name];
          }}
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

  // Chuyển đổi dữ liệu để phù hợp với biểu đồ
  const chartData = data.map((item) => ({
    name: item.fullName,
    totalSpent: Number(item.totalSpent),
  }));

  const barColor = darkMode ? "#10b981" : "#059669"; // Màu xanh lá cho cột

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
        <XAxis
          dataKey="name"
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
        />
        <YAxis
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
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