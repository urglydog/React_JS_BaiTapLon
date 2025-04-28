import React, { memo } from 'react';
import { Loader2, AlertCircle, ImageOff, Search } from 'lucide-react';

// Wrap component with React.memo to prevent unnecessary re-renders
const LaptopTable = memo(({ activeMenu, computers = [], theme = 'dark' }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  if (activeMenu !== 'Laptops') return null;

  // Format price in VND
  const formatPrice = (price) => {
    if (price === undefined || price === null) return 'N/A';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  // Filter computers based on search term
  const filteredComputers = searchTerm.trim() === ''
    ? computers
    : computers.filter(computer =>
        (computer?.productName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (computer?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Define theme-based classes
  const themeClasses = {
    dark: {
      container: 'bg-gray-900 text-gray-200',
      table: 'bg-gray-800 border-gray-700',
      tableHeader: 'bg-gray-900 text-gray-300',
      tableRow: 'hover:bg-gray-700 text-gray-200',
      secondaryText: 'text-gray-400',
      input: 'bg-gray-800 border-gray-600 text-gray-200',
      emptyState: 'text-gray-400',
    },
    light: {
      container: 'bg-white text-gray-800',
      table: 'bg-white border-gray-300',
      tableHeader: 'bg-gray-200 text-gray-700',
      tableRow: 'hover:bg-gray-200 text-gray-800',
      secondaryText: 'text-gray-600',
      input: 'bg-white border-gray-300 text-gray-900',
      emptyState: 'text-gray-500',
    },
  };

  const currentTheme = themeClasses[theme] || themeClasses.dark;

  return (
    <div className={`p-6 ${currentTheme.container}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-center">Danh sách máy tính</h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Tìm kiếm máy tính..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.input}`}
          />
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.secondaryText}`} size={20} />
        </div>
      </div>

      {computers.length === 0 && (
        <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
          <ImageOff className="mr-2" size={24} />
          <span>Không tìm thấy máy tính nào.</span>
        </div>
      )}

      {computers.length > 0 && filteredComputers.length === 0 && (
        <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
          <ImageOff className="mr-2" size={24} />
          <span>Không tìm thấy máy tính phù hợp.</span>
        </div>
      )}

      {filteredComputers.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className={`min-w-full border ${currentTheme.table}`}>
            <thead className={currentTheme.tableHeader}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Hình ảnh</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Tên sản phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Mô tả</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Giá</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Tồn kho</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-300'}`}>
              {filteredComputers.map((computer, index) => (
                <tr
                  key={computer.productID || `computer-${index}`}
                  className={`transition-colors duration-150 ${currentTheme.tableRow}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Uncomment and adjust if you want to display images */}
                    {/* <img
                      src={computer.image ? `/images/${computer.image}` : 'https://via.placeholder.com/48'}
                      alt={computer.productName || 'Computer'}
                      className="h-12 w-12 object-cover rounded-lg shadow-sm"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/48';
                        e.target.onerror = null;
                      }}
                    /> */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{computer.productName || 'N/A'}</td>
                  <td className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}>{computer.description || 'Không có mô tả'}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>{formatPrice(computer.price)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                    {computer.stockQuantity !== undefined ? computer.stockQuantity : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});

export default LaptopTable;