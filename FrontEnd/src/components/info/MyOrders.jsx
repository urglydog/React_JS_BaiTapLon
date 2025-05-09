import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import axiosInstance from "../../custom/axios";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Lấy user từ localStorage
  const user = JSON.parse(localStorage.getItem("user")) || null;
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [month, year]);
  console.log("Danh sách order", orders);

  async function fetchOrders() {
    try {
      const res = await axiosInstance.get(
        `/api/order/getOrdersWithDetails/${user.id}`  // Use the customerID in the URL directly
      );
      const rawData = res.data?.DT || [];

      const ordersMap = new Map();

      rawData.forEach((row) => {
        const orderId = row.orderID;

        // Lọc theo tháng/năm nếu có
        const orderDateObj = new Date(row.orderDate);
        const orderMonth = orderDateObj.getMonth() + 1;
        const orderYear = orderDateObj.getFullYear();

        if (
          (month && parseInt(month) !== orderMonth) ||
          (year && parseInt(year) !== orderYear)
        ) {
          return; // Bỏ qua nếu không phù hợp thời gian lọc
        }

        // Nếu đơn hàng chưa tồn tại, khởi tạo
        if (!ordersMap.has(orderId)) {
          ordersMap.set(orderId, {
            orderID: orderId,
            orderNumber: `#${orderId.toString().padStart(10, "0")}`,
            orderDate: orderDateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            deliveryDate: "", // Có thể cập nhật sau
            shipTo: row.address || "Unknown",
            total: 0,
            totalQuantity: 0,
            items: [],
          });
        }

        // Chuẩn bị sản phẩm
        const item = {
          productID: row.productID,
          name: row.productName,
          color: row.color || "N/A",
          size: row.size || "N/A",
          description: row.description,
          price:
            parseFloat(row.price || 0) * parseInt(row.ProductQuantity || 1),
          quantity: parseInt(row.ProductQuantity || 1),
          image: row.image?.startsWith("http")
            ? row.image
            : `/images/products/${row.image}`,
        };

        // Cập nhật đơn hàng
        const order = ordersMap.get(orderId);
        order.items.push(item);
        order.totalQuantity += item.quantity;
        order.total = row.totalAmount || 0; // Cập nhật tổng tiền
      });

      // Cập nhật danh sách state
      setOrders(Array.from(ordersMap.values()));
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h2>

      {/* Bộ lọc thời gian */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Month:</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="ml-2 border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="ml-2 border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All</option>
            {[2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Danh sách đơn hàng */}
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found for the selected time.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md shadow-sm p-4 bg-white"
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 text-sm text-gray-600 mb-4">
              <div>
                <span className="font-semibold">Order Number</span>
                <br />
                {order.orderNumber}
              </div>
              <div>
                <span className="font-semibold">Order Date</span>
                <br />
                {order.orderDate}
              </div>
              <div>
                <span className="font-semibold">Delivery Date</span>
                <br />
                {order.deliveryDate || "Updating"}
              </div>
              <div>
                <span className="font-semibold">Ship To</span>
                <br />
                {order.shipTo}
              </div>
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                  style={{ objectFit: "contain" }}
                />
                <div className="flex-1">
                  <h3
                    className="font-medium text-gray-800 cursor-pointer hover:font-extrabold"
                    onClick={() =>
                      navigate(`/product/${item.productID}/productAbout`)
                    }
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Color: {item.color || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.description || "No description available."}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-right text-gray-800 font-semibold">
                  {item.price.toLocaleString("vi-VN")}
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-2">
              <div>
                <div className="text-sm text-gray-600 font-semibold">
                  Total Quantity:{" "}
                  <span className="text-black">{order.totalQuantity}</span>
                </div>
                <div className="text-sm text-gray-600 font-semibold">
                  Total Amount:{" "}
                  <span className="text-black">
                    {Number(order.total).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
              <button className="flex items-center text-sm text-blue-600 hover:underline">
                <FaDownload className="mr-1" />
                Download Invoice
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
