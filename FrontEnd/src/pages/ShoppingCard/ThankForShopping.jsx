import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Check,
  Package,
  ChevronRight,
  Truck,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../utils/redux/cartSlice";

export default function ThankYouPage() {
  const order = JSON.parse(localStorage.getItem("orders"));
  const paymentMethod = order?.paymentMethod || "N/A"; // Lấy paymentMethod từ Redux store

  console.log("Order ", order);
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState({});
  const [orderNumber] = useState(order?.orderID || "N/A"); // Lấy orderId từ Redux store
  const [countdown, setCountdown] = useState(10);
  const dispatch = useDispatch(); // Initialize dispatch from Redux
  const [savedItems, setSavedItems] = useState([]);
  const [hasClearedCart, setHasClearedCart] = useState(false);

  // Fetch purchased items from the Redux store
  const purchasedItems = useSelector((state) => state.cart.carts);

  // Calculate subtotal, tax, and total based on purchased items
  const subtotal = savedItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
  const tax = order?.tax || 0; // Lấy tax từ Redux store
  const shippingCost = order?.shippingCost || 0; // Lấy shippingCost từ Redux store
  const discount =
    (Number(subtotal) + Number(tax) + Number(shippingCost)) *
    Number(order?.discount ?? 0) *
    -1;

  console.log(discount);

  const total = order?.total || 0; // Lấy total từ Redux store

  useEffect(() => {
    const code = searchParams.get("code");
    const amount = searchParams.get("amount");

    setResult({
      code,
      amount: amount ? parseInt(amount) / 100 : 0, // VNPAY trả về số tiền x100
      message:
        code === "00" ? "Payment successful!" : "Payment failed or cancelled.",
      success: code === "00",
    });
  }, [searchParams]);

  // Countdown logic (optional)
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      window.location.href = "/";
    }
  }, [countdown]);

  //   Xóa giỏ hàng sau khi đặt hàng thành công
  useEffect(() => {
    if (
      result &&
      result.success &&
      typeof result.amount === "number" &&
      !hasClearedCart
    ) {
      setSavedItems(purchasedItems);
      dispatch(clearCart());
      setHasClearedCart(true);
    }
  }, [result, dispatch, purchasedItems, hasClearedCart]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-blue-700">TechComponents</div>
          <div className="text-sm text-gray-500">Order #{orderNumber}</div>
        </div>

        {/* Payment Result Message */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className={`p-3 rounded-full mb-4 ${
                result.success ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {result.success ? (
                <Check className="text-green-600 w-8 h-8" />
              ) : (
                <XCircle className="text-red-600 w-8 h-8" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {result.success
                ? "Thank You For Your Purchase!"
                : "Payment Failed or Cancelled"}
            </h1>
            {paymentMethod === "VNPAY" ? (
              <p className="text-lg text-gray-600 max-w-lg">{result.message}</p>
            ) : null}

            {result.amount &&
              (paymentMethod === "VNPAY" ? (
                result.success && (
                  <p className="mt-2 text-sm text-gray-500">
                    Paid amount:{" "}
                    <strong>
                      {(result.amount).toLocaleString()} VND
                    </strong>
                  </p>
                )
              ) : (
                <p className="mt-2 text-sm text-gray-500">
                  Please prepare{" "}
                  <strong>{result.amount.toLocaleString()} VND</strong> for
                  payment.
                </p>
              ))}
          </div>

          {result.success && (
            <>
              {/* Order Status */}
              <div className="border-t border-b border-gray-200 py-6 my-6">
                <div className="relative max-w-2xl mx-auto px-4">
                  <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 z-0"></div>
                  <div className="absolute top-5 left-10 right-1/2 h-1 bg-blue-200 z-10"></div>

                  <div className="relative z-20 flex justify-between items-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-600 rounded-full p-2 mb-2 z-10">
                        <Check className="text-white w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        Order Placed
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-blue-100 rounded-full p-2 mb-2 z-10">
                        <Package className="text-blue-600 w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-400">
                        Processing
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-200 rounded-full p-2 mb-2 z-10">
                        <Truck className="text-gray-400 w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-400">
                        Shipped
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  {savedItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded-md bg-white p-2 border border-gray-200"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-800">
                          {item.productName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        {parseFloat(item.price).toLocaleString("vi-VN")} VND
                      </div>
                    </div>
                  ))}
                </div>
                {/* Phần này tính chưa đúng */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {subtotal.toLocaleString()} VND
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost.toLocaleString()} VND
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      {tax.toLocaleString()} VND
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-500">
                      {discount.toLocaleString("vi-VN")} VND
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-medium mt-4">
                    <span className="text-gray-800">Total</span>
                    <span className="text-blue-700">
                      {total.toLocaleString("vi-VN")} VND
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Next Steps (only if success) */}
        {result.success && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              What's Next?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <RefreshCw className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Track Your Order
                  </h3>
                  <p className="text-sm text-gray-600">
                    Check your email for tracking information once your order
                    ships.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <Package className="text-blue-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">
                    Prepare for Delivery
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ensure someone is available to receive your package or
                    follow tracking instructions for delivery updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Redirect Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Redirecting to homepage in{" "}
            <span className="font-medium text-blue-600">{countdown}</span>{" "}
            seconds...
          </p>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
