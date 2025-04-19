export default function ProductCard({ product }) {
  return (
    <div className="border-none rounded-none p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-2"
      />
      {product.inStock && <p className="text-green-600 text-sm">In stock</p>}

      <div className="flex items-center text-yellow-500 text-sm mb-1">
        {"★".repeat(product.rating)}
        {"☆".repeat(5 - product.rating)}
        <span className="ml-2 text-gray-600">Reviews ({product.reviews})</span>
      </div>

      <p className="text-sm font-semibold text-gray-700 mb-1">
        {product.name.length > 60
          ? product.name.slice(0, 60) + "..."
          : product.name}
      </p>

      <div className="mt-1">
        {product.oldPrice && product.oldPrice !== product.price && (
          <span className="line-through text-gray-400 text-sm mr-2">
            ${product.oldPrice.toFixed(2)}
          </span>
        )}
        <span className="text-lg font-bold text-black">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
