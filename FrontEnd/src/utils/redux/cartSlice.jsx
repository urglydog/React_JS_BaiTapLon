import { createSlice } from "@reduxjs/toolkit";

// Lấy cart từ localStorage nếu có
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    const cart = serializedCart ? JSON.parse(serializedCart) : { carts: [] };
    console.log("Loaded cart from localStorage:", cart); // Log lại dữ liệu khi lấy từ localStorage
    return cart;
  } catch (e) {
    console.error("Không thể lấy cart từ localStorage", e);
    return { carts: [] };
  }
};

// Lưu cart vào localStorage
const saveCartToLocalStorage = (cartState) => {
  try {
    const serializedCart = JSON.stringify(cartState);
    localStorage.setItem("cart", serializedCart);
    console.log("Cart saved to localStorage:", serializedCart); // Log dữ liệu được lưu vào localStorage
    // Kiểm tra lại dữ liệu trong localStorage ngay sau khi lưu
    const storedCart = localStorage.getItem("cart");
    console.log("Stored cart in localStorage:", storedCart);
  } catch (e) {
    console.error("Không thể lưu cart vào localStorage", e);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(), // Dạng { carts: [] }
  reducers: {
    addItem: (state, action) => {
      const existingProduct = state.carts.find(
        (item) => item.productID === action.payload.productID
      );

      if (existingProduct) {
        // Nếu đã có sản phẩm, cộng thêm số lượng
        existingProduct.quantity += action.payload.quantity;
      } else {
        // Nếu chưa có, thêm mới
        state.carts.push(action.payload);
      }

      saveCartToLocalStorage(state);
    },
    removeItem: (state, action) => {
      state.carts = state.carts.filter((item) => item.productID !== action.payload.productID);
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.carts = [];
      saveCartToLocalStorage(state);
    },
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateItemQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      if (newQuantity < 1) return; // Không cho phép số lượng nhỏ hơn 1
      const existingItem = state.carts.find((item) => item.productID === id);
      if (existingItem) {
        existingItem.quantity = newQuantity; // Cập nhật số lượng
        saveCartToLocalStorage(state); // Lưu lại giỏ hàng sau khi thay đổi
      }
    },
  },
});

export const { addItem, removeItem, clearCart, updateItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
