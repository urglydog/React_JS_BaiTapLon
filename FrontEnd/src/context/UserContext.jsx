import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../custom/axios";

// Create UserContext
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

      if (response.data?.success && response.data?.token) {
        const { token, user: userData } = response.data;
        
        // Store user info and token
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", token);
        
        // Update state
        setUser(userData);
        return userData;
      } else {
        throw new Error(response.data?.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error("Login error:", err);
      throw new Error(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

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
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };