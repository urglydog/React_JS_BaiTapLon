import { useState, useEffect } from 'react';
import { 
  FaChartPie, 
  FaDesktop, 
  FaMicrochip, 
  FaMemory,
  FaHdd,
  FaShoppingCart, 
  FaUsers, 
  FaUserCog, 
  FaTags,
  FaTruck,
  FaFileAlt,
  FaSun,
  FaMoon, 
  FaBell, 
  FaClock,
  FaStar,
  FaEllipsisH,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaLaptop,
  FaApple,
  FaMobileAlt,
  FaQuestionCircle,
  FaTimes,
  FaWindows,
  FaLinux,
  FaAndroid,
  FaUserCircle
} from 'react-icons/fa';
import { Line, Bar, Pie, PieChart, Cell, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart } from 'recharts';

// Base API URL - replace with your actual backend URL
const API_URL = 'http://localhost:4000/api/admin';

export default function ComputerStoreAdminLayout() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for dashboard data
  const [dashboardStats, setDashboardStats] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [deviceUsage, setDeviceUsage] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  
  // Timeframe for sales data
  const [timeframe, setTimeframe] = useState('last7days');
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  console.log('deviceUsage:', deviceUsage)
  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch dashboard stats
        const statsResponse = await fetch(`${API_URL}/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store JWT in localStorage
          }
        });
        
        if (!statsResponse.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        
        const statsData = await statsResponse.json();
        setDashboardStats(statsData);
        
        // Fetch sales performance data
        const salesResponse = await fetch(`${API_URL}/dashboard/sales-performance?timeframe=${timeframe}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!salesResponse.ok) {
          throw new Error('Failed to fetch sales performance data');
        }
        
        const salesData = await salesResponse.json();
        setSalesData(salesData);
        
        // Fetch device usage data
        const deviceResponse = await fetch(`${API_URL}/dashboard/device-usage`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!deviceResponse.ok) {
          throw new Error('Failed to fetch device usage data');
        }
        
        const deviceData = await deviceResponse.json();
        setDeviceUsage(deviceData);
        
        // Fetch category sales data
        const categoryResponse = await fetch(`${API_URL}/dashboard/category-sales`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch category sales data');
        }
        
        const categoryData = await categoryResponse.json();
        setCategorySales(categoryData);
        
        // Fetch trending products
        const trendingResponse = await fetch(`${API_URL}/dashboard/trending-products`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!trendingResponse.ok) {
          throw new Error('Failed to fetch trending products data');
        }
        
        const trendingData = await trendingResponse.json();
        setTrendingProducts(trendingData);
        
        // Fetch recent orders
        const ordersResponse = await fetch(`${API_URL}/dashboard/recent-orders`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!ordersResponse.ok) {
          throw new Error('Failed to fetch recent orders data');
        }
        
        const ordersData = await ordersResponse.json();
        setRecentOrders(ordersData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [timeframe]);

  // Update sales data when timeframe changes
  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const mainBg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const sidebarBg = darkMode ? 'bg-gray-900' : 'bg-white';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const secondaryTextColor = darkMode ? 'text-gray-400' : 'text-gray-500';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  
  // Active menu styling
  const activeMenuBg = darkMode ? 'bg-gray-700' : 'bg-blue-500';
  const activeMenuText = 'text-white'; // Always white text for active menu
  const hoverMenuBg = darkMode ? 'hover:bg-gray-700 hover:bg-opacity-25' : 'hover:bg-gray-200 hover:bg-opacity-75';
  
  // Display loading state
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
  
  // Display error state
  if (error) {
    return (
      <div className={`flex h-screen w-full ${mainBg} ${textColor} items-center justify-center`}>
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
      <div className={`w-64 h-full ${sidebarBg} border-r ${borderColor} flex flex-col`}>
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
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${activeMenuBg} ${activeMenuText} transition-colors`}>
                  <FaChartPie className="mr-3" size={18} />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${hoverMenuBg} transition-colors`}>
                  <FaDesktop className="mr-3" size={18} />
                  <span>Computers</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${hoverMenuBg} transition-colors`}>
                  <FaMicrochip className="mr-3" size={18} />
                  <span>Processors</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${hoverMenuBg} transition-colors`}>
                  <FaMemory className="mr-3" size={18} />
                  <span>RAM</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${hoverMenuBg} transition-colors`}>
                  <FaHdd className="mr-3" size={18} />
                  <span>Storage</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${hoverMenuBg} transition-colors`}>
                  <FaLaptop className="mr-3" size={18} />
                  <span>Laptops</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${hoverMenuBg} transition-colors`}>
                  <FaShoppingCart className="mr-3" size={18} />
                  <span>Orders</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${hoverMenuBg} transition-colors`}>
                  <FaUsers className="mr-3" size={18} />
                  <span>Customers</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${hoverMenuBg} transition-colors`}>
                  <FaTags className="mr-3" size={18} />
                  <span>Promotions</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${hoverMenuBg} transition-colors`}>
                  <FaTruck className="mr-3" size={18} />
                  <span>Inventory</span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center p-3 rounded-lg ${hoverMenuBg} transition-colors`}>
                  <FaFileAlt className="mr-3" size={18} />
                  <span>Reports</span>
                </a>
              </li>
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
            <div className={`text-xs ${secondaryTextColor}`}>Store Manager</div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
          <div className="flex items-center">
            <div className="flex items-center px-2">
              <button className="mr-2">
                <FaEllipsisH size={16} />
              </button>
              <div className="text-sm breadcrumbs">
                <span>Dashboard</span>
                <span className="mx-2">/</span>
                <span>Overview</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center rounded-full px-3 py-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <FaSearch className="text-gray-500 mr-2" size={14} />
              <input 
                type="text" 
                placeholder="Search..." 
                className={`bg-transparent border-none focus:outline-none text-sm w-32 ${textColor}`} 
              />
            </div>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20">
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20">
              <FaClock size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 hover:bg-opacity-20 relative">
              <FaBell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Total Revenue</h3>
                <span className={dashboardStats?.totalRevenue?.percentChange >= 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                  {dashboardStats?.totalRevenue?.percentChange >= 0 ? (
                    <FaArrowUp className="mr-1" size={14} />
                  ) : (
                    <FaArrowDown className="mr-1" size={14} />
                  )}
                  {Math.abs(dashboardStats?.totalRevenue?.percentChange || 0).toFixed(1)}%
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
                  {dashboardStats?.totalOrders?.percentChange >= 0 ? (
                    <FaArrowUp className="mr-1" size={14} />
                  ) : (
                    <FaArrowDown className="mr-1" size={14} />
                  )}
                  {Math.abs(dashboardStats?.totalOrders?.percentChange || 0).toFixed(1)}%
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
                  {dashboardStats?.newCustomers?.percentChange >= 0 ? (
                    <FaArrowUp className="mr-1" size={14} />
                  ) : (
                    <FaArrowDown className="mr-1" size={14} />
                  )}
                  {Math.abs(dashboardStats?.newCustomers?.percentChange || 0).toFixed(1)}%
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
                <span className={dashboardStats?.lowStock?.percentChange <= 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                  {dashboardStats?.lowStock?.percentChange > 0 ? (
                    <FaArrowUp className="mr-1" size={14} />
                  ) : (
                    <FaArrowDown className="mr-1" size={14} />
                  )}
                  {Math.abs(dashboardStats?.lowStock?.percentChange || 0).toFixed(1)}%
                </span>
              </div>
              <p className="text-3xl font-bold">{dashboardStats?.lowStock?.value || 0}</p>
              <p className={`text-xs mt-2 ${secondaryTextColor}`}>
                Compared to {dashboardStats?.lowStock?.previousValue || 0} last month
              </p>
            </div>
          </div>
          
          {/* Sales Graph Section */}
          <div className={`p-6 rounded-lg ${cardBg} border ${borderColor} mb-6`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-4">
                <button className="text-blue-500 border-b-2 border-blue-500 pb-2">Sales Performance</button>
                <button className={`${secondaryTextColor} pb-2`}>Inventory Levels</button>
                <button className={`${secondaryTextColor} pb-2`}>Revenue Forecast</button>
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
            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-blue-500">Customer Device Usage</h3>
                <button>
                  <FaEllipsisH size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              
                {Array.isArray(deviceUsage) && deviceUsage.map((device, index) => {
                  let icon;
                  switch (device.platform) {
                    case 'Windows':
                      icon = <FaWindows />;
                      break;
                    case 'Mac':
                      icon = <FaApple />;
                      break;
                    case 'iOS':
                      icon = <FaMobileAlt />;
                      break;
                    case 'Android':
                      icon = <FaAndroid />;
                      break;
                    case 'Linux':
                      icon = <FaLinux />;
                      break;
                    default:
                      icon = <FaQuestionCircle />;
                  }
                  
                  const isHighlight = index === 0; // Highlight the most used device
                  
                  return (
                    <div className="flex flex-col items-center" key={device.platform}>
                      <div className={`rounded-lg w-12 h-16 ${isHighlight ? 
                        (darkMode ? 'bg-blue-900' : 'bg-blue-400') : 
                        (darkMode ? 'bg-gray-700' : 'bg-gray-200')} 
                        mb-2 flex items-center justify-center relative`}>
                        {isHighlight && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
                            {device.percentage}%
                          </div>
                        )}
                        <div className={isHighlight ? "text-white" : "opacity-50"}>
                          {icon}
                        </div>
                      </div>
                      <span className="text-xs">{device.platform}</span>
                      {!isHighlight && (
                        <span className={`text-xs ${secondaryTextColor}`}>{device.percentage}%</span>
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
            
            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-green-500">Product Category Sales</h3>
                <button>
                  <FaEllipsisH size={16} />
                </button>
              </div>
              
              <div className="space-y-4">
                {Array.isArray(categorySales) && categorySales.map((category, index) => {
                  // Define colors for different categories
                  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
                  const color = colors[index % colors.length];
                  
                  return (
                    <div key={category.categoryName}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{category.categoryName}</span>
                        <span className="text-sm font-semibold">{category.percentage}%</span>
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
                <CategorySalesChart data={categorySales} darkMode={darkMode} />
              </div>
            </div>
          </div>
          
          {/* Trending Products */}
          <div className={`p-6 rounded-lg ${cardBg} border ${borderColor} mb-6`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-purple-500">Trending Products</h3>
              <button>
                <FaEllipsisH size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.isArray(trendingProducts) && trendingProducts.map((product, index) => {
                // Define colors for different products
                const colors = ['blue', 'green', 'purple'];
                const color = colors[index % colors.length];
                
                const icons = [
                  <FaMicrochip key="chip" size={18} />,
                  <FaLaptop key="laptop" size={18} />,
                  <FaMemory key="memory" size={18} />
                ];
                
                return (
                  <div className={`p-4 rounded-lg border ${borderColor}`} key={product.productId}>
                    <div className="flex items-center mb-2">
                      <div className={`w-12 h-12 rounded bg-${color}-500 bg-opacity-20 flex items-center justify-center mr-3`}>
                        <div className={`text-${color}-500`}>
                          {icons[index % icons.length]}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{product.productName}</div>
                        <div className={`text-xs ${secondaryTextColor}`}>{product.categoryName}</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span>Sales: {product.totalSold} units</span>
                      <span className={product.percentChange >= 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                        {product.percentChange >= 0 ? (
                          <FaArrowUp size={12} className="mr-1" />
                        ) : (
                          <FaArrowDown size={12} className="mr-1" />
                        )}
                        {Math.abs(product.percentChange)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Recent Orders Table */}
          <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-blue-500">Recent Orders</h3>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">View All</button>
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
                    <th className="pb-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(recentOrders) && recentOrders.map((order) => {
                    // Define status colors
                    let statusColor;
                    switch (order.status.toLowerCase()) {
                      case 'processing':
                        statusColor = 'blue';
                        break;
                      case 'shipped':
                        statusColor = 'green';
                        break;
                      case 'delivered':
                        statusColor = 'purple';
                        break;
                      case 'canceled':
                        statusColor = 'red';
                        break;
                      default:
                        statusColor = 'gray';
                    }
                    
                    return (
                      <tr key={order.orderId} className={`border-b ${borderColor}`}>
                        <td className="py-3">#{order.orderId}</td>
                        <td className="py-3">{order.customerName}</td>
                        <td className="py-3">{order.mainProduct}</td>
                        <td className="py-3">{order.orderDate}</td>
                        <td className="py-3">${order.totalAmount?.toFixed(2)}</td>
                        <td className="py-3">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full bg-${statusColor}-100 text-${statusColor}-800`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-2">
                            <button className="text-blue-500 hover:text-blue-700">
                              <FaEllipsisH size={14} />
                            </button>
                          </div>
                       </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sales Chart Component
function SalesChart({ data, timeframe, darkMode }) {
  const chartData = data.map(item => ({
    name: timeframe === 'last7days' || timeframe === 'last30days' ? item.date : `Tháng ${item.month}`,
    revenue: Number(item.revenue)
  }));
  
  const lineColor = darkMode ? "#3b82f6" : "#2563eb"; // Blue colors
  
  return (
    <div className="w-full h-full">
      <Line 
        data={chartData}
        width={800}
        height={256}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
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
            color: darkMode ? "#f3f4f6" : "#111827"
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
      </Line>
    </div>
  );
}

// Device Usage Chart Component
function DeviceUsageChart({ data, darkMode }) {
  const chartData = data || [];
  
  // Define colors for the pie chart
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'];
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <PieChart width={400} height={180}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={50}
          fill="#8884d8"
          dataKey="percentage"
          nameKey="platform"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
          labelLine={false}
        >
          {Array.isArray(chartData) && chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => [`${value}%`, "Tỉ lệ sử dụng"]}
          contentStyle={{ 
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "#f3f4f6" : "#111827"
          }}
        />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          formatter={(value) => <span style={{ color: darkMode ? "#d1d5db" : "#374151" }}>{value}</span>}
        />
      </PieChart>
    </div>
  );
}

// Category Sales Chart Component
function CategorySalesChart({ data, darkMode }) {
  const chartData = data || [];
  
  // Define colors for the bar chart
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  return (
    <div className="w-full h-full">
      <BarChart
        width={500}
        height={180}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
        <XAxis 
          dataKey="categoryName" 
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
        />
        <YAxis 
          tick={{ fill: darkMode ? "#9ca3af" : "#4b5563" }}
          axisLine={{ stroke: darkMode ? "#4b5563" : "#d1d5db" }}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip 
          formatter={(value) => [`${value}%`, "Tỉ lệ doanh thu"]}
          contentStyle={{ 
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
            color: darkMode ? "#f3f4f6" : "#111827"
          }}
        />
        <Bar dataKey="percentage" name="Tỉ lệ doanh thu">
          {Array.isArray(chartData) && chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}