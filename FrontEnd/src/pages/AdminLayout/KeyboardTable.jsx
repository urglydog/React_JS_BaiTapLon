import React, { memo, useState } from 'react';
import { Loader2, AlertCircle, ImageOff, Search, Plus, Pencil } from 'lucide-react';
import { FaBan } from 'react-icons/fa';

// Form component for adding/editing keyboards
const KeyboardForm = ({ keyboard = {}, onSave, onCancel, formTitle, theme }) => {
  const [formData, setFormData] = useState({
    productName: keyboard?.productName || '',
    description: keyboard?.description || '',
    price: keyboard?.price || '',
    stockQuantity: keyboard?.stockQuantity || '',
    categoryId: keyboard?.categoryId || 1,
    isLoading: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stockQuantity' ? parseFloat(value) || value : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const productData = {
        productName: formData.productName,
        description: formData.description,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        categoryId: parseInt(formData.categoryId),
      };

      await onSave(productData);
      setFormData((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Error saving keyboard:', error);
      setFormData((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to save keyboard',
      }));
    }
  };

  const currentTheme = {
    dark: {
      container: 'bg-gray-800 text-gray-200',
      input: 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500',
      buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md',
      buttonSecondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-md',
      error: 'text-red-400',
    },
    light: {
      container: 'bg-white text-gray-800',
      input: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400',
      buttonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md',
      buttonSecondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800 shadow-md',
      error: 'text-red-600',
    },
  }[theme || 'dark'];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className={`${currentTheme.container} rounded-lg shadow-xl p-6 w-full max-w-lg`}>
        <h3 className="text-xl font-semibold mb-4">{formTitle}</h3>

        {formData.error && (
          <div className={`${currentTheme.error} mb-4 flex items-center`}>
            <AlertCircle size={20} className="mr-2" />
            {formData.error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Tên sản phẩm</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
                required
              />
            </div>

            <div>
              <label className="block mb-1">Mô tả</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Giá (VND)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
                  required
                />
              </div>

              <div>
                <label className="block mb-1">Tồn kho</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  min="0"
                  className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Danh mục</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
                required
              >
                <option value={1}>Logitech</option>
                <option value={2}>Razer</option>
                <option value={3}>SteelSeries</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className={`px-4 py-2 rounded-lg transition-colors ${currentTheme.buttonSecondary}`}
              disabled={formData.isLoading}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={formData.isLoading}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${currentTheme.buttonPrimary}`}
            >
              {formData.isLoading && <Loader2 size={18} className="animate-spin mr-2" />}
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Wrap component with React.memo to prevent unnecessary re-renders
const KeyboardTable = memo(
  ({
    activeMenu,
    keyboards = [],
    theme = 'dark',
    createProduct,
    updateProduct,
    deleteProduct,
  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formState, setFormState] = useState({
      isOpen: false,
      formType: null, // 'add' or 'edit'
      currentKeyboard: null,
    });

    // Confirmation dialog state
    const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      keyboard: null,
      title: '',
      message: '',
      confirmAction: null,
    });

    // Only render if activeMenu is 'KeyBoard'
    if (activeMenu !== 'KeyBoard') return null;

    // Format price in VND
    const formatPrice = (price) => {
      if (price === undefined || price === null) return 'N/A';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    };

    // Filter keyboards based on search term
    const filteredKeyboards = searchTerm.trim() === ''
      ? keyboards
      : keyboards.filter((keyboard) =>
          (keyboard?.productName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (keyboard?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
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
        buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md',
        buttonDanger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
        buttonIcon: 'text-gray-400 hover:text-gray-200 bg-gray-700 hover:bg-gray-600 p-2 rounded-full shadow-sm',
        dialog: 'bg-gray-800 text-gray-200',
        overlay: '',
      },
      light: {
        container: 'bg-white text-gray-800',
        table: 'bg-white border-gray-300',
        tableHeader: 'bg-gray-200 text-gray-700',
        tableRow: 'hover:bg-gray-200 text-gray-800',
        secondaryText: 'text-gray-600',
        input: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400',
        emptyState: 'text-gray-500',
        buttonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md',
        buttonDanger: 'bg-red-500 hover:bg-red-600 text-white shadow-md',
        buttonIcon: 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-sm',
        dialog: 'bg-white text-gray-800',
        overlay: '',
      },
    };

    const currentTheme = themeClasses[theme] || themeClasses.dark;

    // Add new keyboard handler
    const handleAdd = () => {
      setFormState({
        isOpen: true,
        formType: 'add',
        currentKeyboard: null,
      });
    };

    // Edit keyboard handler
    const handleEdit = (keyboard) => {
      setFormState({
        isOpen: true,
        formType: 'edit',
        currentKeyboard: keyboard,
      });
    };

    // Deactivate/delete keyboard handler
    const handleDeactivate = (keyboard) => {
      setConfirmDialog({
        isOpen: true,
        keyboard,
        title: 'Xác nhận xóa',
        message: `Bạn có chắc chắn muốn xóa "${keyboard.productName}" không?`,
        confirmAction: async () => {
          try {
            setIsLoading(true);
            await deleteProduct(keyboard.id);
            setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
            setIsLoading(false);
          } catch (error) {
            console.error('Error deleting keyboard:', error);
            setError('Failed to delete keyboard: ' + (error.message || ''));
            setIsLoading(false);
          }
        },
      });
    };

    // Save handler for add/edit
    const handleSave = async (productData) => {
      try {
        setIsLoading(true);
        if (formState.formType === 'add') {
          await createProduct(productData);
        } else {
          const productId = formState.currentKeyboard ? formState.currentKeyboard.id : null;
          if (!productId) throw new Error('Product ID is missing');
          await updateProduct(productId, productData);
        }
        setFormState((prev) => ({ ...prev, isOpen: false }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error saving keyboard:', error);
        setError('Failed to save keyboard: ' + (error.message || ''));
        setIsLoading(false);
        throw error; // Propagate error to KeyboardForm
      }
    };

    // Confirmation Dialog Component
    const ConfirmationDialog = () => {
      if (!confirmDialog.isOpen) return null;

      return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`${currentTheme.dialog} rounded-lg shadow-xl p-6 w-full max-w-md`}>
            <h3 className="text-xl font-semibold mb-2">{confirmDialog.title}</h3>
            <p className="mb-6">{confirmDialog.message}</p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className={`px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white`}
                disabled={isLoading}
              >
                Hủy
              </button>
              <button
                onClick={confirmDialog.confirmAction}
                className={`px-4 py-2 rounded-lg flex items-center ${currentTheme.buttonDanger}`}
                disabled={isLoading}
              >

                {isLoading && <Loader2 size={18} className="animate-spin mr-2" />}
                Xóa
              </button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className={`p-6 ${currentTheme.container}`}>
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4 flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {error}
            <button
              className="ml-auto text-white hover:text-gray-200"
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-center">Danh sách bàn phím</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAdd}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentTheme.buttonPrimary}`}
              disabled={isLoading}
            >
              <Plus size={18} />
              <span>Thêm</span>
            </button>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Tìm kiếm bàn phím..."
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

        {isLoading && keyboards.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.secondaryText}`}>
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>Đang tải dữ liệu...</span>
          </div>
        )}

        {!isLoading && keyboards.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
            <ImageOff className="mr-2" size={24} />
            <span>Không tìm thấy bàn phím nào.</span>
          </div>
        )}

        {!isLoading && keyboards.length > 0 && filteredKeyboards.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
            <ImageOff className="mr-2" size={24} />
            <span>Không tìm thấy bàn phím phù hợp.</span>
          </div>
        )}

        {keyboards.length > 0 && filteredKeyboards.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className={`min-w-full border ${currentTheme.table}`}>
              <thead className={currentTheme.tableHeader}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Hình ảnh</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Tên sản phẩm</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Mô tả</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Giá</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Tồn kho</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-300'}`}>
                {filteredKeyboards.map((keyboard, index) => (
                  <tr
                    key={keyboard.id || `keyboard-${index}`}
                    className={`transition-colors duration-150 ${currentTheme.tableRow}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-12 w-12 bg-gray-700 rounded-lg flex items-center justify-center">
                        <img
                          src={keyboard.image || '/api/placeholder/48/48'}
                          alt={keyboard.productName || 'Keyboard'}
                          className="h-12 w-12 object-cover rounded-lg shadow-sm"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {keyboard.productName || 'N/A'}
                    </td>
                    <td className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}>
                      <div className="max-w-xs truncate">{keyboard.description || 'Không có mô tả'}</div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                      {formatPrice(keyboard.price)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                      {keyboard.stockQuantity !== undefined ? keyboard.stockQuantity : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(keyboard)}
                          className={`transition-colors ${currentTheme.buttonIcon}`}
                          title="Chỉnh sửa"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDeactivate(keyboard)}
                          className={`transition-colors ${currentTheme.buttonIcon} text-red-500 hover:text-red-400`}
                          title="Xóa"
                        >
                          <FaBan size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {formState.isOpen && (
          <KeyboardForm
            keyboard={formState.currentKeyboard}
            onSave={handleSave}
            onCancel={() => setFormState((prev) => ({ ...prev, isOpen: false }))}
            formTitle={formState.formType === 'add' ? 'Thêm bàn phím mới' : 'Chỉnh sửa bàn phím'}
            theme={theme}
          />
        )}

        <ConfirmationDialog />
      </div>
    );
  }
);

export default KeyboardTable;