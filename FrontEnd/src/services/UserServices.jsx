import axiosInstance from "../custom/axios"; // Đảm bảo import đúng axiosInstance đã cấu hình

/**
 * Hàm lấy thông tin tài khoản người dùng từ API
 * @returns {Promise<Object>} Dữ liệu tài khoản người dùng hoặc lỗi
 */
export const getUserAccount = async () => {
  try {
    const response = await axiosInstance.get("/api/getUserAccount"); // API trả về thông tin người dùng
    return response.data.DT[0]; // Trả về dữ liệu từ API (giả sử dữ liệu dạng { EC: 1, DT: {...} })
  } catch (error) {
    console.error("Error fetching user account:", error);
    return null; // Xử lý lỗi phù hợp
  }
};

// Hàm lấy thông tin người dùng theo email và password
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
    }); // API trả về thông tin người dùng
    return response.data.DT[0]; // Trả về dữ liệu từ API (giả sử dữ liệu dạng { EC: 1, DT: {...} })
  } catch (error) {
    console.error("Error fetching user by email and password:", error);
    return null; // Xử lý lỗi phù hợp
  }
}
