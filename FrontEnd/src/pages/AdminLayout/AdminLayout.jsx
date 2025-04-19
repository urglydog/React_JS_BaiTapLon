import { useState } from 'react';
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

export default function ComputerStoreAdminLayout() {
  const [darkMode, setDarkMode] = useState(true);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
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
                <span className="text-green-500 flex items-center">
                  <FaArrowUp className="mr-1" size={14} />
                  12.5%
                </span>
              </div>
              <p className="text-3xl font-bold">$189,432</p>
              <p className={`text-xs mt-2 ${secondaryTextColor}`}>Compared to $168,400 last month</p>
            </div>
            
            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Total Orders</h3>
                <span className="text-green-500 flex items-center">
                  <FaArrowUp className="mr-1" size={14} />
                  8.2%
                </span>
              </div>
              <p className="text-3xl font-bold">4,827</p>
              <p className={`text-xs mt-2 ${secondaryTextColor}`}>Compared to 4,460 last month</p>
            </div>
            
            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">New Customers</h3>
                <span className="text-green-500 flex items-center">
                  <FaArrowUp className="mr-1" size={14} />
                  16.8%
                </span>
              </div>
              <p className="text-3xl font-bold">384</p>
              <p className={`text-xs mt-2 ${secondaryTextColor}`}>Compared to 329 last month</p>
            </div>
            
            <div className={`p-6 rounded-lg ${cardBg} border ${borderColor}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Low Stock</h3>
                <span className="text-red-500 flex items-center">
                  <FaArrowUp className="mr-1" size={14} />
                  23.1%
                </span>
              </div>
              <p className="text-3xl font-bold">42</p>
              <p className={`text-xs mt-2 ${secondaryTextColor}`}>Compared to 34 last month</p>
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
                <select className={`mr-2 ${cardBg} border ${borderColor} rounded px-2 py-1`}>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Last Year</option>
                </select>
                <button>
                  <FaEllipsisH size={16} />
                </button>
              </div>
            </div>
            
            {/* Placeholder for Graph */}
            <div className="h-64 w-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-blue-500 text-xl mb-2">Monthly Sales Performance</div>
                <p className={secondaryTextColor}>Showing sales data from January to December 2025</p>
              </div>
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
                <div className="flex flex-col items-center">
                  <div className={`rounded-lg w-12 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-2 flex items-center justify-center`}>
                    <FaLinux className="opacity-50" size={20} />
                  </div>
                  <span className="text-xs">Linux</span>
                  <span className={`text-xs ${secondaryTextColor}`}>8%</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`rounded-lg w-12 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-2 flex items-center justify-center`}>
                    <FaApple className="opacity-50" size={20} />
                  </div>
                  <span className="text-xs">Mac</span>
                  <span className={`text-xs ${secondaryTextColor}`}>21%</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`rounded-lg w-12 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-2 flex items-center justify-center`}>
                    <FaMobileAlt className="opacity-50" size={20} />
                  </div>
                  <span className="text-xs">iOS</span>
                  <span className={`text-xs ${secondaryTextColor}`}>15%</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`rounded-lg w-12 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-2 flex items-center justify-center`}>
                    <FaWindows className="opacity-50" size={20} />
                  </div>
                  <span className="text-xs">Windows</span>
                  <span className={`text-xs ${secondaryTextColor}`}>38%</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`rounded-lg w-12 h-20 ${darkMode ? 'bg-blue-900' : 'bg-blue-400'} relative mb-2 flex items-center justify-center`}>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">18%</div>
                    <FaAndroid className="text-white" size={20} />
                  </div>
                  <span className="text-xs">Android</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`rounded-lg w-12 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-2 flex items-center justify-center`}>
                    <FaQuestionCircle className="opacity-50" size={20} />
                  </div>
                  <span className="text-xs">Other</span>
                  <span className={`text-xs ${secondaryTextColor}`}>0%</span>
                </div>
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
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Laptops</span>
                    <span className="text-sm font-semibold">42%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-5/12"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Desktop PCs</span>
                    <span className="text-sm font-semibold">28%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-3/12"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Components</span>
                    <span className="text-sm font-semibold">16%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full w-2/12"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Peripherals</span>
                    <span className="text-sm font-semibold">9%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full w-1/12"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Accessories</span>
                    <span className="text-sm font-semibold">5%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-0.5/12"></div>
                  </div>
                </div>
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
              <div className={`p-4 rounded-lg border ${borderColor}`}>
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded bg-blue-500 bg-opacity-20 flex items-center justify-center mr-3">
                    <FaMicrochip className="text-blue-500" size={18} />
                  </div>
                  <div>
                    <div className="font-medium">AMD Ryzen 9000X</div>
                    <div className={`text-xs ${secondaryTextColor}`}>16-Core Processor</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Sales: 342 units</span>
                  <span className="text-green-500 flex items-center">
                    <FaArrowUp size={12} className="mr-1" />
                    24%
                  </span>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${borderColor}`}>
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded bg-green-500 bg-opacity-20 flex items-center justify-center mr-3">
                    <FaLaptop className="text-green-500" size={18} />
                  </div>
                  <div>
                    <div className="font-medium">UltraBook Pro X5</div>
                    <div className={`text-xs ${secondaryTextColor}`}>Gaming Laptop</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Sales: 278 units</span>
                  <span className="text-green-500 flex items-center">
                    <FaArrowUp size={12} className="mr-1" />
                    18%
                  </span>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg border ${borderColor}`}>
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded bg-purple-500 bg-opacity-20 flex items-center justify-center mr-3">
                    <FaMemory className="text-purple-500" size={18} />
                  </div>
                  <div>
                    <div className="font-medium">HyperRAM DDR6</div>
                    <div className={`text-xs ${secondaryTextColor}`}>32GB Memory</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Sales: 256 units</span>
                  <span className="text-green-500 flex items-center">
                    <FaArrowUp size={12} className="mr-1" />
                    12%
                  </span>
                </div>
              </div>
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
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${borderColor}`}>
                    <td className="py-4">#ORD-7892</td>
                    <td className="py-4">James Wilson</td>
                    <td className="py-4">Gaming PC Pro</td>
                    <td className="py-4">Apr 12, 2025</td>
                    <td className="py-4">$2,405.00</td>
                    <td className="py-4"><span className="px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-500 rounded-md text-sm">Processing</span></td>
                  </tr>
                  <tr className={`border-b ${borderColor}`}>
                    <td className="py-4">#ORD-7891</td>
                    <td className="py-4">Sarah Chen</td>
                    <td className="py-4">UltraBook Pro X5</td>
                    <td className="py-4">Apr 11, 2025</td>
                    <td className="py-4">$1,899.00</td>
                    <td className="py-4"><span className="px-2 py-1 bg-green-500 bg-opacity-20 text-green-500 rounded-md text-sm">Completed</span></td>
                  </tr>
                  <tr className={`border-b ${borderColor}`}>
                    <td className="py-4">#ORD-7890</td>
                    <td className="py-4">Michael Parker</td>
                    <td className="py-4">AMD Ryzen 9000X</td>
                    <td className="py-4">Apr 10, 2025</td>
                    <td className="py-4">$649.00</td>
                    <td className="py-4"><span className="px-2 py-1 bg-yellow-500 bg-opacity-20 text-yellow-500 rounded-md text-sm">Shipped</span></td>
                  </tr>
                  <tr className={`border-b ${borderColor}`}>
                    <td className="py-4">#ORD-7889</td>
                    <td className="py-4">Jessica Brown</td>
                    <td className="py-4">HyperRAM DDR6 (32GB)</td>
                    <td className="py-4">Apr 9, 2025</td>
                    <td className="py-4">$269.00</td>
                    <td className="py-4"><span className="px-2 py-1 bg-purple-500 bg-opacity-20 text-purple-500 rounded-md text-sm">Delivered</span></td>
                  </tr>
                  <tr>
                    <td className="py-4">#ORD-7888</td>
                    <td className="py-4">Robert Kim</td>
                    <td className="py-4">4TB NVMe SSD Ultra</td>
                    <td className="py-4">Apr 8, 2025</td>
                    <td className="py-4">$499.00</td>
                    <td className="py-4"><span className="px-2 py-1 bg-red-500 bg-opacity-20 text-red-500 rounded-md text-sm">Cancelled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className={`p-4 border-t ${borderColor} text-xs ${secondaryTextColor} flex justify-between`}>
          <div>© 2025 TechStore Admin Panel</div>
          <div className="flex space-x-4">
            <a href="#">Documentation</a>
            <a href="#">Support</a>
            <a href="#">Settings</a>
          </div>
        </footer>
      </div>
    </div>
  );
}