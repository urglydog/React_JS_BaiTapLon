import axios from "axios";

// Cấu hình axios với baseURL chỉ rõ port 4000
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Đảm bảo là port 4000
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout if 401 response returned from api
    if (error.response && error.response.status === 401) {
      // Check if not login page
      if (!window.location.href.includes('/login')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Redirect to login
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);
export default axiosInstance;
