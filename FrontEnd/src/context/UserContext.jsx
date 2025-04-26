// Enhanced UserContext.js
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../custom/axios";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(true);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("/login", credentials);
      
      const { success, token, user } = response.data || {};
  
      if (success && token && user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("authToken", token);
        setUser(user);
        return user;
      } else {
        throw new Error(response.data?.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
      } else if (err.message) {
        throw new Error(err.message);
      } else {
        throw new Error("Đăng nhập thất bại, vui lòng thử lại sau");
      }
    }
  };
  
  // Get user role
  const getUserRole = () => {
    if (!user) return null;
    
    console.log("User object in getUserRole:", user);
    
    // Try different properties that might contain the role
    let roleValue = user?.position || user?.role || user?.userRole;
    console.log("Raw role value:", roleValue);
    
    // Convert to string and lowercase for consistent comparison
    if (roleValue) {
      roleValue = String(roleValue).toLowerCase();
      
      // Map Vietnamese roles to standardized English roles
      if (roleValue === "quản lý cửa hàng" || roleValue.includes("quản lý")) {
        return "manager";
      } else if (roleValue.includes("nhân viên")) {
        return "employee";
      }
    }
    
    // If no specific employee role is found, assume customer
    return "customer";
  };

  const isManager = () => getUserRole() === "manager";
  const isEmployee = () => getUserRole() === "employee";
  const isCustomer = () => getUserRole() === "customer";
  
  // Logout function
  const logout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await axiosInstance.post('/logout');
      }
    } catch (error) {
      console.error('Logout API call error:', error);
    } finally {
      // Always clear user state and local storage
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    }
  };

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await axiosInstance.get('/me');
          
          if (response.data?.success && response.data?.user) {
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
          } else {
            // Clear invalid data
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Auto-login error:", error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading,
      getUserRole,
      isManager,
      isEmployee,
      isCustomer 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };