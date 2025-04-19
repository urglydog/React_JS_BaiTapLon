import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CartItem from "../../components/ShoppingCard/ShoppingCardItem";
import img_item1 from '../../assets/images/desktop.jpg';
import img_item2 from '../../assets/images/custom_buid.webp';
import path from "../../constant/path";

const ShoppingCartItem = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'MSI MEG Trident X 10SD-1012AU Intel i7',
            description: '10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home...',
            price: 4349.00,
            quantity: 1,
            image: img_item1,
        },
        {
            id: 2,
            name: 'MSI MEG Trident X 10SD-1012AU Intel i7',
            description: '10700K, 2070 SUPER, 32GB RAM, 1TB SSD, Windows 10 Home...',
            price: 4349.00,
            quantity: 2,
            image: img_item2,
        },
    ]);

    const [showShippingTax, setShowShippingTax] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);

    const navigate = useNavigate();

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev =>
            prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
        );
    };

    const handleRemoveItem = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
            setCartItems(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleClearCart = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
            setCartItems([]);
        }
    };

    const handleContinueShopping = () => {
        navigate("/");
    };

    const handleUpdateCard=()=>{

    }

    const shippingCost = 21.00;
    const taxRate = 0.1;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * taxRate;
    const orderTotal = subtotal + shippingCost + tax;

    return (
        <div className="container mx-auto p-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
                <Link to={path.home} className="text-blue-500 hover:underline mr-1">Home</Link>
                <span className="mr-1">/</span>
                <Link to={path.card} className="text-blue-500 hover:underline mr-1">Shopping Cart</Link>
                <span className="mr-1">/</span>
                <span>Purchase</span>
            </div>
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Giỏ hàng */}
                <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                    <div className="hidden md:flex items-center mb-4">
                        <div className="w-24 mr-4">Item</div>
                        <div className="flex-grow"></div>
                        <div className="mr-4">Price</div>
                        <div className="mr-4">Qty</div>
                        <div className="mr-4">Subtotal</div>
                        <div></div>
                    </div>
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveItem}
                        />
                    ))}
                    <div className="flex justify-between mt-4">
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="flex space-x-2">
                            <button onClick={handleContinueShopping} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-4xl">Continue Shopping</button>
                            <button onClick={handleClearCart} className="bg-gray-800 text-white py-2 px-4 rounded-4xl">Clear Shopping Cart</button>
                            </div>
                            <div className="flex justify-end">
                            <button onClick={handleUpdateCard} className="bg-gray-800 text-white py-2 px-4 rounded-4xl">Update Shopping Cart</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
                    {/* Dropdown 1 - Shipping & Tax */}
                    <div className="mb-4">
                        <button
                            onClick={() => setShowShippingTax(prev => !prev)}
                            className="w-full text-left text-sm font-semibold text-gray-800 flex justify-between items-center"
                        >
                            Estimate Shipping and Tax
                            <span>{showShippingTax ? '−' : '+'}</span>
                        </button>
                        {showShippingTax && (
                            <div className="mt-2 space-y-2 text-sm text-gray-700">
                                <select className="w-full border p-2 rounded">
                                    <option>Australia</option>
                                </select>
                                <input className="w-full border p-2 rounded" type="text" placeholder="State/Province" />
                                <input className="w-full border p-2 rounded" type="text" placeholder="Zip/Postal Code" />
                                <div className="text-xs text-gray-500 mt-1">
                                    Standard Rate: Price may vary depending on the item/destination. Shop Staff will contact you. $21.00
                                </div>
                                <div className="text-xs text-gray-500">
                                    Pickup from store: 1234 Street Address City Address, 1234 $0.00
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dropdown 2 - Discount Code */}
                    <div className="mb-4">
                        <button
                            onClick={() => setShowDiscount(prev => !prev)}
                            className="w-full text-left text-sm font-semibold text-gray-800 flex justify-between items-center"
                        >
                            Apply Discount Code
                            <span>{showDiscount ? '−' : '+'}</span>
                        </button>
                        {showDiscount && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Enter discount code"
                                    className="w-full border p-2 rounded mb-2"
                                />
                                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Apply Discount</button>
                            </div>
                        )}
                    </div>

                    {/* Tổng tiền */}
                    <div className="flex justify-between mb-2 text-sm text-gray-700 font-semibold">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-sm text-gray-700 font-semibold">
                        <span>Shipping</span>
                        <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-sm text-gray-700 font-semibold">
                        <span>GST (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-gray-800">
                        <span>Order Total</span>
                        <span>${orderTotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white p-3 mt-4 rounded-4xl hover:bg-blue-700">
                        Proceed to Checkout
                    </button>
                    <button className="w-full bg-yellow-400 text-black p-3 mt-2 rounded-4xl hover:bg-yellow-500">
                        Check out with PayPal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartItem;
