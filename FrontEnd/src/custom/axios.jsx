import axios from "axios";


// Cấu hình axios với baseURL chỉ rõ port 4000
const axiosInstance = axios.create({
  baseURL: "https://ba-ptgd.onrender.com", // Đảm bảo là port 4000
});
// Add request interceptor to add authentication token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Lỗi khi gửi request:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Lỗi từ phản hồi server:', error.response || error);
    
    // Handle token expiration or invalid token
    if (error.response && error.response.status === 401) {
      // If token is invalid, clear storage
      if (error.response.data.message?.includes('Token')) {
        console.log('Token không hợp lệ, đăng xuất...');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Redirect to login (if not already there)
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);
export default axiosInstance;
