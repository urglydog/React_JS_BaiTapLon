import express from "express";
import cors from "cors";
import { connection } from './config/connectDB.js';
import initApiRoutes from './routers/Router.js'; // chỉ import 1 lần thôi
import authRoutes from './routers/authRoutes.js';
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', authRoutes); // Nếu bạn muốn gọi API trực tiếp như /login
// Kết nối DB
connection();

// Khởi tạo routes
initApiRoutes(app);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
