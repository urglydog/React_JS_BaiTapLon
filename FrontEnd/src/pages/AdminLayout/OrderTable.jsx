import React, { memo, useState, useEffect } from "react";
import { ImageOff, Search } from "lucide-react";

// OrderTable - Displays a list of orders with search and status update functionality
const OrderTable = memo(
  ({ orders = [], theme = "dark", updateOrderStatus, getOrderById }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [localOrders, setLocalOrders] = useState(orders); // State nội bộ

    // Đồng bộ localOrders với orders từ props khi orders thay đổi
    useEffect(() => {
      const normalizedOrders = orders.map((order) => ({
        ...order,
        status: order.status.toLowerCase(),
      }));

      // Chỉ cập nhật nếu dữ liệu thực sự thay đổi
      setLocalOrders((prevLocalOrders) => {
        if (
          JSON.stringify(prevLocalOrders) === JSON.stringify(normalizedOrders)
        ) {
          return prevLocalOrders; // Không cập nhật nếu không thay đổi
        }
        return normalizedOrders;
      });
    }, [orders]);
    console.log(getOrderById);

    // Filter orders based on search term
    const filteredOrders =
      searchTerm.trim() === ""
        ? localOrders
        : localOrders.filter(
            (order) =>
              (order.orderID?.toString() || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              (order.status || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          );

    // Define theme-based classes
    const themeClasses = {
      dark: {
        container: "bg-gray-900 text-gray-200",
        table: "bg-gray-800 border-gray-700",
        tableHeader: "bg-gray-900 text-gray-300",
        tableRow: "hover:bg-gray-700 text-gray-200",
        secondaryText: "text-gray-400",
        input: "bg-gray-800 border-gray-600 text-gray-200 focus:ring-blue-500",
        emptyState: "text-gray-400",
        select: "bg-gray-800 border-gray-600 text-gray-200 focus:ring-blue-500",
      },
      light: {
        container: "bg-white text-gray-800",
        table: "bg-white border-gray-300",
        tableHeader: "bg-gray-200 text-gray-700",
        tableRow: "hover:bg-gray-200 text-gray-800",
        secondaryText: "text-gray-600",
        input: "bg-white border-gray-300 text-gray-900 focus:ring-blue-400",
        emptyState: "text-gray-500",
        select: "bg-white border-gray-300 text-gray-900 focus:ring-blue-400",
      },
    };

    const currentTheme = themeClasses[theme] || themeClasses.dark;

    // Determine color for status
    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case "pending":
          return "bg-blue-100 text-blue-800";
        case "shipping":
          return "bg-green-100 text-green-800";
        case "completed":
          return "bg-purple-100 text-purple-800";
        case "canceled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    // Format the order date to DD/MM/YYYY
    const formatOrderDate = (dateString) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    // Handle status change
    const handleStatusChange = async (orderId, newStatus) => {
      console.log(
        "Cập nhật trạng thái đơn hàng:",
        orderId,
        "Thành:",
        newStatus
      );
      if (!orderId) {
        console.error("Order ID is undefined");
        alert("Không thể cập nhật trạng thái: Order ID không hợp lệ.");
        return;
      }
      if (
        !newStatus ||
        typeof newStatus !== "string" ||
        newStatus.trim() === ""
      ) {
        console.error("Trạng thái không hợp lệ:", newStatus);
        alert("Không thể cập nhật trạng thái: Trạng thái không hợp lệ.");
        return;
      }

      const normalizedStatus = newStatus.toLowerCase();
      const validStatuses = ["pending", "shipping", "completed", "canceled"];
      if (!validStatuses.includes(normalizedStatus)) {
        console.error("Trạng thái không được hỗ trợ:", newStatus);
        alert(
          `Không thể cập nhật trạng thái: Trạng thái "${newStatus}" không được hỗ trợ.`
        );
        return;
      }

      // Kiểm tra trạng thái hiện tại
      const currentOrder = localOrders.find(
        (order) => order.orderID === orderId
      );
      if (currentOrder && currentOrder.status === normalizedStatus) {
        console.log(
          `Trạng thái của đơn hàng ${orderId} không thay đổi, bỏ qua cập nhật.`
        );
        return; // Không gọi API nếu trạng thái không thay đổi
      }

      const previousOrders = [...localOrders];
      setLocalOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderID === orderId
            ? { ...order, status: normalizedStatus }
            : order
        )
      );

      if (updateOrderStatus) {
        try {
          await updateOrderStatus(orderId, normalizedStatus);
          console.log("Cập nhật trạng thái thành công cho đơn hàng:", orderId);
        } catch (error) {
          if (error.message.includes("Order not found or no changes made")) {
            console.log(
              `Đơn hàng ${orderId} không tồn tại hoặc trạng thái không thay đổi.`
            );
            return; // Không rollback nếu đơn hàng không tồn tại hoặc không thay đổi
          }
          console.error(`Không thể cập nhật đơn hàng ${orderId}:`, error);
          alert(`Cập nhật trạng thái thất bại: ${error.message}`);
          setLocalOrders(previousOrders);
        }
      }
    };

    return (
      <div className={`p-6 ${currentTheme.container}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Danh sách đơn hàng</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng (ID, trạng thái)..."
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

        {localOrders.length === 0 && (
          <div
            className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}
          >
            <ImageOff className="mr-2" size={24} />
            <span>Không tìm thấy đơn hàng nào.</span>
          </div>
        )}

        {localOrders.length > 0 && filteredOrders.length === 0 && (
          <div
            className={`flex justify-center items-center h-64 ${currentTheme.emptyState}`}
          >
            <ImageOff className="mr-2" size={24} />
            <span>Không tìm thấy đơn hàng phù hợp.</span>
          </div>
        )}

        {localOrders.length > 0 && filteredOrders.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className={`min-w-full border ${currentTheme.table}`}>
              <thead className={currentTheme.tableHeader}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Customer ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Voucher ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  theme === "dark" ? "divide-gray-700" : "divide-gray-300"
                }`}
              >
                {filteredOrders.map((order, index) => (
                  <tr
                    key={order.orderID || `order-${index}`}
                    className={`transition-colors duration-150 ${currentTheme.tableRow}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      #{order.orderID || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {order.customerID || "N/A"}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}
                    >
                      {order.employeeID || "N/A"}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${currentTheme.secondaryText}`}
                    >
                      {order.voucherID || "No Use"}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}
                    >
                      {formatOrderDate(order.orderDate)}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${currentTheme.secondaryText}`}
                    >
                      {order.totalAmount != null
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order.totalAmount)
                        : "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={order.status || "pending"} // Sửa giá trị mặc định thành chữ thường
                        onChange={(e) =>
                          handleStatusChange(order.orderID, e.target.value)
                        }
                        className={`px-2 py-1 text-xs rounded-full border focus:outline-none focus:ring-2 ${
                          currentTheme.select
                        } ${getStatusColor(order.status)}`}
                      >
                        {["pending", "shipping", "completed", "canceled"].map(
                          (status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
                              {/* Hiển thị chữ cái đầu in hoa */}
                            </option>
                          )
                        )}
                      </select>
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

export default OrderTable;
