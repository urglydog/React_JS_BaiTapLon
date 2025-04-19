// Component cho một Item trong giỏ hàng
function CartItem({ item, onQuantityChange, onRemove }) {
    return (
      <div className="flex items-center py-4 border-b">
        <div className="w-24 h-24 mr-4">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow">
          <h3 className="text-sm font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>
        <div className="mr-4">
          <span className="text-sm font-semibold">${item.price}</span>
        </div>
        <div className="flex items-center mr-4">
          <button
            className="bg-gray-200 text-gray-600 rounded-l py-1 px-2 focus:outline-none"
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity}
            className="w-10 text-center border border-gray-300 focus:outline-none"
            onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
          />
          <button
            className="bg-gray-200 text-gray-600 rounded-r py-1 px-2 focus:outline-none"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <div className="mr-4">
          <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  export default CartItem