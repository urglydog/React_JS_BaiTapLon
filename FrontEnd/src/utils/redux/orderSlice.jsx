import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], // Danh sách đơn hàng
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload); // Thêm đơn hàng mới vào danh sách
    },
    setOrders: (state, action) => {
      state.orders = action.payload; // Cập nhật toàn bộ danh sách đơn hàng
    },
  },
});

export const { addOrder, setOrders } = orderSlice.actions;
export default orderSlice.reducer;