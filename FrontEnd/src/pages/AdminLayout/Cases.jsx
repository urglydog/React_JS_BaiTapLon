import React, { memo, useState, useEffect } from 'react';
import { Loader2, AlertCircle, ImageOff, Search, Pencil, Plus } from 'lucide-react';

// Ánh xạ subCategoryID với tên hãng cho danh mục Cases
const CATEGORY_BRAND_MAPPING = {
  1: 'Xigmatek',
  2: 'Cougar',
  3: 'Corsair',
  4: 'Cooler Master',
  5: 'NZXT',
  6: 'Thermaltake',
};

// Form component for adding/editing cases
const CaseForm = ({
  caseItem = {},
  onSave,
  onCancel,
  formTitle,
  theme,
  validSubCategoryIds = [1, 2, 3, 4, 5, 6],
  images = [], // Add images prop
}) => {
  const [formData, setFormData] = useState({
    productName: caseItem?.productName || '',
    description: caseItem?.description || '',
    price: caseItem?.price || '',
    stockQuantity: caseItem?.stockQuantity || '',
    subCategoryID: caseItem?.subCategoryID || '',
    image: caseItem?.image || '', // Store image filename
    isLoading: false,
    error: null,
  });

  const [imageSearchTerm, setImageSearchTerm] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);

  useEffect(() => {
    if (formData.error) {
      const timer = setTimeout(() => {
        setFormData((prev) => ({ ...prev, error: null }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formData.error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' || name === 'stockQuantity'
          ? parseFloat(value) || value
          : name === 'subCategoryID'
          ? value === '' ? '' : parseInt(value)
          : value,
    }));
  };

  const handleImageSelect = (image) => {
    setFormData((prev) => ({
      ...prev,
      image: image.filename, // Store the selected image's filename
    }));
    setShowImagePicker(false);
    setImageSearchTerm('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Validation
      if (!formData.subCategoryID || !validSubCategoryIds.includes(parseInt(formData.subCategoryID))) {
        throw new Error('Vui lòng chọn một hãng hợp lệ');
      }
      if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) < 0) {
        throw new Error('Giá phải là số dương');
      }
      if (isNaN(parseInt(formData.stockQuantity)) || parseInt(formData.stockQuantity) < 0) {
        throw new Error('Số lượng tồn kho phải là số không âm');
      }

      const productData = {
        productName: formData.productName,
        description: formData.description,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        categoryID: 17, // categoryID cố định cho Cases
        subCategoryID: parseInt(formData.subCategoryID),
        image: formData.image || null, // Include image filename (or null if not selected)
      };

      await onSave(productData);
      setFormData((prev) => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Error saving case:', error);
      setFormData((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Không thể lưu vỏ máy tính',
      }));
    }
  };

  const filteredImages = imageSearchTerm.trim() === ''
    ? images
    : images.filter((image) =>
        (image.filename || '').toLowerCase().includes(imageSearchTerm.toLowerCase())
      );

  const currentTheme = {
    dark: {
      container: 'bg-gray-800 text-gray-200',
      input: 'bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500',
      buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md',
      buttonSecondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-md',
      error: 'text-red-400',
      imagePicker: 'bg-gray-700 border-gray-600',
    },
    light: {
      container: 'bg-white text-gray-800',
      input: 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400',
      buttonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md',
      buttonSecondary: 'bg-gray-300 hover:bg-gray-400 text-gray-800 shadow-md',
      error: 'text-red-600',
      imagePicker: 'bg-gray-100 border-gray-300',
    },
  }[theme || 'dark'];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className={`${currentTheme.container} rounded-lg shadow-xl p-6 w-full max-w-lg relative`}>
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
              <label className="block mb-1">Hãng</label>
              <select
                name="subCategoryID"
                value={formData.subCategoryID}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input}`}
                required
              >
                <option value="">Chọn hãng</option>
                {validSubCategoryIds.map((id) => (
                  <option key={id} value={id}>
                    {CATEGORY_BRAND_MAPPING[id] || `Hãng ${id}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Hình ảnh</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.image || 'Chọn hình ảnh'}
                  onClick={() => setShowImagePicker(true)}
                  readOnly
                  className={`w-full rounded-lg border px-4 py-2 ${currentTheme.input} cursor-pointer`}
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={images.find((img) => img.filename === formData.image)?.url || ''}
                      alt="Selected"
                      className="h-20 w-20 object-cover rounded-lg shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {showImagePicker && (
            <div className={`absolute top-0 left-0 w-full h-full ${currentTheme.imagePicker} rounded-lg p-4 overflow-y-auto z-10`}>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Chọn hình ảnh</h4>
                <button
                  type="button"
                  onClick={() => setShowImagePicker(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  Đóng
                </button>
              </div>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Tìm kiếm hình ảnh..."
                  value={imageSearchTerm}
                  onChange={(e) => setImageSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${currentTheme.input}`}
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                {filteredImages.length > 0 ? (
                  filteredImages.map((image) => (
                    <div
                      key={image.filename}
                      onClick={() => handleImageSelect(image)}
                      className={`cursor-pointer p-1 rounded-lg hover:bg-gray-600 ${formData.image === image.filename ? 'border-2 border-blue-500' : ''}`}
                    >
                      <img
                        src={image.url}
                        alt={image.filename}
                        className="h-20 w-full object-cover rounded-lg"
                      />
                      <p className="text-xs truncate mt-1">{image.filename}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center text-gray-400">
                    Không tìm thấy hình ảnh
                  </div>
                )}
              </div>
            </div>
          )}

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

// Component bảng danh sách cases
const Cases = memo(
  ({
    activeMenu,
    cases = [],
    theme = 'dark',
    createProduct,
    updateProduct,
    getProductById,
    validSubCategoryIds = [1, 2, 3, 4, 5, 6],
    images = [], // Add images prop
  }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formState, setFormState] = useState({
      isOpen: false,
      formType: null, // 'add' or 'edit'
      currentCase: null,
    });
    const [localCases, setLocalCases] = useState(cases);
    const [isSynced, setIsSynced] = useState(true);
console.log(getProductById);

    useEffect(() => {
      if (isSynced) {
        setLocalCases(cases);
      }
    }, [cases, isSynced]);

    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => {
          setError(null);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [error]);

    if (activeMenu !== 'Case') return null;

    const formatPrice = (price) => {
      if (price === undefined || price === null) return 'N/A';
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    };

    // Hàm tìm ảnh từ danh sách images dựa trên caseItem.image
    const findMatchingImage = (imageFilename) => {
      if (!imageFilename || !images || images.length === 0) {
        console.log('No image found: invalid filename or empty images', { imageFilename, images });
        return null;
      }
      const foundImage = images.find((img) => img.filename === imageFilename);
      if (!foundImage) {
        console.log('No matching image found for filename:', imageFilename);
      }
      return foundImage;
    };

    const filteredCases = searchTerm.trim() === ''
      ? localCases
      : localCases.filter((item) =>
          (item?.productName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

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
        buttonIcon: 'text-gray-400 hover:text-gray-200 bg-gray-700 hover:bg-gray-600 p-2 rounded-full shadow-sm',
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
        buttonIcon: 'text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-sm',
      },
    };

    const currentTheme = themeClasses[theme] || themeClasses.dark;

    const handleAdd = () => {
      setFormState({
        isOpen: true,
        formType: 'add',
        currentCase: null,
      });
    };

    const handleEdit = (caseItem) => {
      console.log('Editing case:', caseItem);
      setFormState({
        isOpen: true,
        formType: 'edit',
        currentCase: caseItem,
      });
    };

    const handleSave = async (productData) => {
      try {
        setIsLoading(true);
        setIsSynced(false);
        if (formState.formType === 'add') {
          const newProduct = await createProduct(productData);
          if (!newProduct.id && !newProduct.productID) {
            throw new Error('API không trả về ID sản phẩm');
          }
          setLocalCases((prev) => [
            ...prev,
            {
              ...productData,
              id: newProduct.id || newProduct.productID,
            },
          ]);
        } else {
          const productId = formState.currentCase?.id || formState.currentCase?.productID;
          if (!productId) {
            throw new Error('Không tìm thấy ID sản phẩm để cập nhật');
          }
          await updateProduct(productId, productData);
          setLocalCases((prev) =>
            prev.map((item) =>
              (item.id || item.productID) === productId
                ? { ...item, ...productData }
                : item
            )
          );
        }
        setFormState((prev) => ({ ...prev, isOpen: false }));
        setIsLoading(false);
      } catch (error) {
        console.error('Error saving case:', error);
        setError(error.message || 'Không thể lưu vỏ máy tính');
        setIsLoading(false);
        throw error;
      }
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
          <h2 className="text-2xl font-semibold">Danh sách vỏ máy tính</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAdd}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentTheme.buttonPrimary}`}
            >
              <Plus size={18} />
              <span>Thêm</span>
            </button>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Tìm kiếm vỏ máy tính..."
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

        {isLoading && localCases.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.secondaryText}`}>
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>Đang tải dữ liệu...</span>
          </div>
        )}

        {!isLoading && localCases.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
            <ImageOff className="mr-2" size={24} />
            <span>Không tìm thấy vỏ máy tính nào.</span>
          </div>
        )}

        {!isLoading && localCases.length > 0 && filteredCases.length === 0 && (
          <div className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}>
            <ImageOff className="mr-2" size={24} />
            <span>Không tìm thấy vỏ máy tính phù hợp.</span>
          </div>
        )}

        {localCases.length > 0 && filteredCases.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className={`min-w-full border ${currentTheme.table}`}>
              <thead className={currentTheme.tableHeader}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Hình ảnh</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Tên sản phẩm</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Mô tả</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Giá</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Tồn kho</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Hãng</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-300'}`}>
                {filteredCases.map((caseItem, index) => {
                  const matchingImage = findMatchingImage(caseItem.image);

                  return (
                    <tr
                      key={caseItem.id || caseItem.productID || `case-${index}`}
                      className={`transition-colors duration-150 ${currentTheme.tableRow}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-12 w-12 bg-gray-700 rounded-lg flex items-center justify-center">
                          {matchingImage ? (
                            <img
                              src={matchingImage.url}
                              alt={caseItem.productName || 'Case'}
                              className="h-12 w-12 object-cover rounded-lg shadow-sm"
                            />
                          ) : (
                            <ImageOff
                              className={currentTheme.secondaryText}
                              size={24}
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {caseItem.productName || 'N/A'}
                      </td>
                      <td className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}>
                        <div className="max-w-xs truncate">{caseItem.description || 'Không có mô tả'}</div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                        {formatPrice(caseItem.price)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                        {caseItem.stockQuantity !== undefined ? caseItem.stockQuantity : 'N/A'}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}>
                        {CATEGORY_BRAND_MAPPING[caseItem.subCategoryID] || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleEdit(caseItem)}
                          className={`transition-colors ${currentTheme.buttonIcon}`}
                          title="Chỉnh sửa"
                        >
                          <Pencil size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {formState.isOpen && (
          <CaseForm
            caseItem={formState.currentCase}
            onSave={handleSave}
            onCancel={() => setFormState((prev) => ({ ...prev, isOpen: false }))}
            formTitle={formState.formType === 'add' ? 'Thêm vỏ máy tính mới' : 'Chỉnh sửa vỏ máy tính'}
            theme={theme}
            validSubCategoryIds={validSubCategoryIds}
            images={images} // Pass images prop to CaseForm
          />
        )}
      </div>
    );
  }
);

export default Cases;