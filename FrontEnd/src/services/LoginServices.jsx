// Đảm bảo import đúng axiosInstance đã cấu hình
import axiosInstance from "../custom/axios"; // Import your axios instance

// Login function - authenticate user and return user data
export const loginContext = async (credentials) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    
    if (response.status === 200 && response.data) {
      // Store token in localStorage or secure cookie
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      
      // Return user data
      return response.data.user;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Invalid credentials');
  }
};

// Logout function - clear user data and tokens
export const logoutContext = async () => {
  try {
    // Call logout endpoint to invalidate token on server side
    await axiosInstance.post('/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear local storage even if server request fails
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

// Register function - create new user
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/register', userData);
    
    if (response.status === 201 && response.data) {
      return response.data;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Verify token and get current user
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return null;
    }
    
    // Set auth header
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    const response = await axiosInstance.get('/api/auth/me');
    
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error('Failed to get user data');
    }
  } catch (error) {
    console.error('Get current user error:', error);
    // If token is invalid, clear it
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
    return null;
  }
};

// Check if user has specific role
export const hasRole = (user, role) => {
  if (!user || !user.position) return false;
  return user.position.toLowerCase() === role.toLowerCase();
};

// Create authentication header with token
export const authHeader = () => {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};