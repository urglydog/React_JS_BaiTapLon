import axiosInstance from "../custom/axios"; // Đảm bảo import đúng axiosInstance đã cấu hình

/**
 * Hàm lấy thông tin tài khoản người dùng từ API
 * @returns {Promise<Object>} Dữ liệu tài khoản người dùng hoặc lỗi
 */
export const getUserAccount = async () => {
  try {
    const response = await axiosInstance.get("/api/getUserAccount");
    return response.data.DT[0]; 
  } catch (error) {
    console.error("Error fetching user account:", error);
    return null; 
  }
};


/**
 * Hàm lấy thông tin người dùng theo email và password
 * @param {string} email Email người dùng
 * @param {string} password Mật khẩu người dùng
 * @returns {Promise<Object>} Dữ liệu người dùng hoặc lỗi
 */

export const getUserByEmailAndPassword = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/getUserByEmailAndPassword", {
      email,
      password,
    }); 
    return response.data.DT[0]; 
  } catch (error) {
    console.error("Error fetching user by email and password:", error);
    return null; 
  }
}
