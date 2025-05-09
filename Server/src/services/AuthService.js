import db from "../config/db.js";
import jwt from "jsonwebtoken";
import crypto from "crypto"; // ES6 import for crypto

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "demotokenlogin";
const JWT_EXPIRES_IN = "24h";

class AuthService {
  // Generate JWT token
  static generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  // Validate user credentials
  static async validateUser(email, password) {
    try {
      if (!email || !password) {
        throw new Error("Vui lòng nhập email và mật khẩu");
      }

      console.log("Đang xác thực email:", email);

      // Đơn giản hóa: Luôn sử dụng Node.js crypto để tạo hash
      const generatedHash = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
      console.log("Mật khẩu được mã hóa:", generatedHash);

      let user = null;
      let table = "";

      // Step 2: Find user by email in Employees table
      try {
        const employeeQuery = "SELECT * FROM employees WHERE email = ?";
        const result = await db.query(employeeQuery, [email]);
        console.log("Kết quả truy vấn nhân viên:", result);

        // Kiểm tra xem result có phải là mảng hay đối tượng
        let employee = result[0] || result;

        employee = employee[0] || employee; // Chuyển đổi thành đối tượng nếu cần thiết
        console.log("Kết quả truy vấn nhân viên sau chuyển đổi:", employee);

        if (employee && employee.email) {
          console.log("Tìm thấy nhân viên với email:", email);
          console.log("Mật khẩu trong DB:", employee.password);

          const dbPassRaw = employee.password;
          const dbHash = String(dbPassRaw).trim().toLowerCase();
          const clientHash = generatedHash.trim().toLowerCase();
          console.log("Hash từ DB:", dbHash);
          console.log("Hash từ client:", clientHash);
          console.log("So khớp:", dbHash === clientHash);

          // So sánh hash với mật khẩu đã lưu
          if (dbHash === clientHash) {
            user = employee;
            table = "employees";
            console.log("Mật khẩu khớp cho nhân viên!");
          } else {
            console.log("Mật khẩu không khớp cho nhân viên.");
          }
        }
      } catch (err) {
        console.error("Lỗi truy vấn Employees database:", err);
      }

      // If no matching employee found, try customers table
      if (!user) {
        try {
          const customerQuery = "SELECT * FROM customers WHERE email = ?";
          const result = await db.query(customerQuery, [email]);
          console.log("Kết quả truy vấn khách hàng:", result);

          // Kiểm tra xem result có phải là mảng hay đối tượng
          let customer = result[0] || result;

          customer = customer[0] || customer; // Chuyển đổi thành đối tượng nếu cần thiết
          console.log("Kết quả truy vấn khách hàng sau chuyển đổi:", customer);

          if (customer && customer.email) {
            console.log("Tìm thấy khách hàng với email:", email);
            console.log("Mật khẩu trong DB:", customer.password);

            const dbHash = String(customer.password).trim().toLowerCase();
            const clientHash = generatedHash.trim().toLowerCase();

            // So sánh hash với mật khẩu đã lưu
            if (dbHash === clientHash) {
              user = customer;
              table = "Customers";
              console.log("Mật khẩu khớp cho khách hàng!");
            } else {
              console.log("Mật khẩu không khớp cho khách hàng.");
            }
          }
        } catch (err) {
          console.error("Lỗi truy vấn Customers database:", err);
        }
      }

      // If no user found or password didn't match
      if (!user) {
        console.log(
          "Đăng nhập thất bại - không tìm thấy người dùng hoặc mật khẩu không khớp"
        );
        throw new Error("Email hoặc mật khẩu không chính xác");
      }

      console.log("Đăng nhập thành công cho người dùng:", user.fullName);

      // Set role and ID
      user.role = table === "employees" ? user.position : "customer";
      user.id = table === "employees" ? user.employeeID : user.customerID;

      return user;
    } catch (error) {
      console.error("Lỗi đăng nhập:", error.message);
      throw error;
    }
  }

  // Register new user
  static async registerUser(userData) {
    try {
      const { fullName, email, password, phoneNumber, address } = userData;

      // Validate required fields
      if (!fullName || !email || !password) {
        throw new Error("Vui lòng điền đầy đủ thông tin");
      }

      // Trực tiếp kiểm tra email
      try {
        const checkEmailQuery = `
          SELECT email FROM customers WHERE email = ?
          UNION ALL
          SELECT email FROM employees WHERE email = ?
        `;
        const result = await db.query(checkEmailQuery, [email, email]);
        const existingUsers = Array.isArray(result) ? result : [result];

        if (existingUsers.length > 0 && existingUsers[0].email) {
          throw new Error("Email đã được sử dụng");
        }
      } catch (error) {
        console.error("Lỗi kiểm tra email:", error.message);
        throw new Error("Không thể kiểm tra tính khả dụng của email");
      }

      // Hash password
      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

      // Current date for registration
      const registrationDate = new Date().toISOString().split("T")[0];

      // Insert new customer
      const insertQuery = `
        INSERT INTO customers 
        (fullName, email, phoneNumber, address, password, registrationDate) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const result = await db.query(insertQuery, [
        fullName,
        email,
        phoneNumber || "",
        address || "",
        hashedPassword,
        registrationDate,
      ]);

      console.log("Kết quả đăng ký:", result);

      // Chuyển đổi BigInt sang Number
      const insertId = result.insertId
        ? Number(result.insertId)
        : result[0] && result[0].insertId
        ? Number(result[0].insertId)
        : null;

      if (!insertId) {
        throw new Error("Không thể tạo tài khoản mới");
      }

      return {
        id: insertId, // Đã chuyển từ BigInt sang Number
        fullName,
        email,
        role: "customer",
      };
    } catch (error) {
      console.error("Lỗi đăng ký:", error.message);
      throw error;
    }
  }
  // Thêm đoạn này vào AuthService class
  static async isEmailAvailable(email) {
    try {
      const checkEmailQuery = `
      SELECT email FROM customers WHERE email = ?
      UNION ALL
      SELECT email FROM employees WHERE email = ?
    `;
      const result = await db.query(checkEmailQuery, [email, email]);
      const existingUsers = Array.isArray(result) ? result : [result];

      return !(existingUsers.length > 0 && existingUsers[0].email);
    } catch (error) {
      console.error("Lỗi kiểm tra email:", error.message);
      throw new Error("Không thể kiểm tra tính khả dụng của email");
    }
  }
  // Get user by ID
  static async getUserById(id, role) {
    try {
      let query;
      let idField;

      if (role === "customer") {
        query =
          "SELECT customerID as id, fullName, email, phoneNumber, address, registrationDate FROM customers WHERE customerID = ?";
        idField = "customerID";
      } else {
        query =
          "SELECT employeeID as id, fullName, email, phoneNumber, position FROM employees WHERE employeeID = ?";
        idField = "employeeID";
      }

      const [users] = await db.query(query, [id]);

      if (!users || users.length === 0) {
        return null;
      }

      const user = users[0];
      user.role = role === "customer" ? "customer" : user.position;

      return user;
    } catch (error) {
      console.error("Lỗi lấy thông tin người dùng:", error.message);
      throw error;
    }
  }
}

export default AuthService;
