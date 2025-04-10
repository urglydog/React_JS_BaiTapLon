import axios from "axios";

// Cấu hình axios với baseURL chỉ rõ port 4000
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Đảm bảo là port 4000
});

export default axiosInstance;
