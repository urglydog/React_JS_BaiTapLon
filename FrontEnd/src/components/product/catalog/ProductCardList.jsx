import logo_add_cart from "../../../assets/svg/btn_add_to_cart.svg";

export default function ProductCardList({ product }) {
  return (
    <div className="border-none rounded-lg p-4 shadow-sm hover:shadow-lg transition bg-white flex gap-4">
      {/* Hình ảnh */}
      <div className="w-1/3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Thông tin chi tiết */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Tên và SKU */}
        <div>
          <p className="text-xs text-gray-400 mb-1">SKU {product.sku}</p>
          <h2 className="font-semibold text-sm text-gray-800 mb-2">
            {product.name}
          </h2>
        </div>

        {/* Giá */}
        <div className="mb-2">
          {product.oldPrice !== product.price && (
            <span className="line-through text-sm text-gray-400 mr-2">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-black">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Đánh giá + trạng thái */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-yellow-500 text-sm">
            {"★".repeat(product.rating)}
            {"☆".repeat(5 - product.rating)}
            <span className="text-gray-500 ml-2 text-xs">
              Reviews ({product.reviews})
            </span>
          </div>
          {product.inStock ? (
            <span className="text-green-500 text-xs font-medium">
              ● In Stock
            </span>
          ) : (
            <span className="text-red-500 text-xs font-medium">
              ● Check availability
            </span>
          )}
        </div>

        {/* Thông tin phụ (đơn giản hóa) */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
          <div>
            <span className="font-medium">CPU:</span> N/A
          </div>
          <div>
            <span className="font-medium">Featured:</span> N/A
          </div>
          <div>
            <span className="font-medium">I/O Ports:</span> N/A
          </div>
        </div>

        {/* Nút và hành động */}
        <div className="flex items-center justify-between">
          <button className="bg-white text-[#0156FF] border-[#0156FF] border-2 px-4 py-2 text-sm rounded-4xl hover:font-bold transition">
            <img
              src={logo_add_cart}
              alt="Add to cart"
              className="inline-block mr-1"
            />
            Add To Cart
          </button>
          <div className="flex gap-2 text-gray-400 text-lg">
            <i className="far fa-envelope"></i>
            <i className="far fa-exchange-alt"></i>
            <i className="far fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
