import React, { memo, useState } from 'react';
import { ImageOff, Search } from 'lucide-react';

// Simplified CustomerTable - read-only with search functionality
const CustomerTable = memo(
  ({
    activeMenu,
    customers = [],
    theme = 'dark'
  }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (activeMenu !== 'Customers') return null;

    // Filter customers based on search term
    const filteredCustomers = searchTerm.trim() === ''
      ? customers
      : customers.filter((customer) =>
          (customer?.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (customer?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (customer?.phoneNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

    // Define theme-based classes
    const themeClasses = {
      dark: {
        container: 'bg-gray-900 text-gray-200',
        table: 'bg-gray-800 border-gray-700',
        tableHeader: 'bg-gray-900 text-gray-300',
        tableRow: 'hover:bg-gray-700 text-gray-200',
        secondaryText: 'text-gray-400',
        input: 'bg-gray-800 border-gray-600 text-gray-200 focus:ring-blue-500',
        emptyState: 'text-gray-400',
      },
      light: {
        container: 'bg-white text-gray-800',
        table: 'bg-white border-gray-300',
        tableHeader: 'bg-gray-200 text-gray-700',
        tableRow: 'hover:bg-gray-200 text-gray-800',
        secondaryText: 'text-gray-600',
        input: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400',
        emptyState: 'text-gray-500',
      },
    };

    const currentTheme = themeClasses[theme] || themeClasses.dark;

    return (
      <div className={`p-6 ${currentTheme.container}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-center">Danh sách khách hàng</h2>
          <div className="flex items-center space-x-4">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Tìm kiếm khách hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${currentTheme.input}`}
              />
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.secondaryText}`}
                size={20}
              />
            </div>
          </div>
        </div>

        {customers.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
            <ImageOff className="mr-2" size={24} />
            <span>Không tìm thấy khách hàng nào.</span>
          </div>
        )}

        {customers.length > 0 && filteredCustomers.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
            <ImageOff className="mr-2" size={24} />
            <span>Không tìm thấy khách hàng phù hợp.</span>
          </div>
        )}

        {customers.length > 0 && filteredCustomers.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className={`min-w-full border ${currentTheme.table}`}>
              <thead className={currentTheme.tableHeader}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Tên khách hàng</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Số điện thoại</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Địa chỉ</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-300'}`}>
                {filteredCustomers.map((customer, index) => (
                  <tr
                    key={customer.customerID || `customer-${index}`}
                    className={`transition-colors duration-150 ${currentTheme.tableRow}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {customer.customerID || `#${index + 1}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {customer.fullName || 'N/A'}
                    </td>
                    <td className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}>
                      {customer.email || 'N/A'}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                      {customer.phoneNumber || 'N/A'}
                    </td>
                    <td className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}>
                      <div className="max-w-xs truncate">{customer.address || 'N/A'}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
);

export default CustomerTable;