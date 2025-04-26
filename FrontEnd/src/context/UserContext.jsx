import React, { createContext, useState, useEffect } from "react";

// Tạo UserContext
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Lấy thông tin từ localStorage khi khởi tạo
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Hàm đăng nhập
  const loginContext = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Lưu vào localStorage
  };

  // Hàm đăng xuất
  const logoutContext = () => {
    setUser(null);
    localStorage.removeItem("user"); // Xóa khỏi localStorage
  };

  // Lắng nghe sự thay đổi của user và hiển thị thông báo
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log(`Người dùng đã đăng nhập: ${user.fullName}`);
    } else {
      console.log("Người dùng đã đăng xuất hoặc chưa được set.");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };