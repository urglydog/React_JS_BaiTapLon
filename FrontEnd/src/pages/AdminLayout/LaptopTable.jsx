import React, { memo } from 'react';
import { Loader2, AlertCircle, ImageOff, Search } from 'lucide-react';

// Wrap component with React.memo to prevent unnecessary re-renders
const ComputerTable = memo(({ activeMenu, computers = [] }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  if (activeMenu !== 'Computers') return null;

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 text-center">Danh sách máy tính</h2>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Tìm kiếm máy tính..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {computers.length === 0 && (
        <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400">
          <ImageOff className="mr-2" size={24} />
          <span>Không tìm thấy máy tính nào.</span>
        </div>
      )}

      {computers.length > 0 && filteredComputers.length === 0 && (
        <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400">
          <ImageOff className="mr-2" size={24} />
          <span>Không tìm thấy máy tính phù hợp.</span>
        </div>
      )}

      {filteredComputers.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Hình ảnh</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tên sản phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Mô tả</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Giá</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tồn kho</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredComputers.map((computer, index) => (
                <tr
                  key={computer.productID || `computer-${index}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{computer.productName || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{computer.description || 'Không có mô tả'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{formatPrice(computer.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
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

export default ComputerTable;