import express from "express";
import cors from "cors";
import { connection } from "./config/connectDB.js";
import initApiRoutes from "./routers/Router.js"; // chỉ import 1 lần thôi
import authRoutes from "./routers/authRoutes.js";
import adminRoutes from "./routers/AdminRoutes.js";
import cloudinaryModule from "./config/cloudinary.js";
import ReviewRoutes from "./routers/ReviewRoutes.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/reviews", ReviewRoutes);
// Kết nối DB
connection();

app.get("/api", (req, res) => {
  res.send("Server is running!");
});

const {
  router,
  updateProductImages,
  addProductWithImage,
  getImagesFromFolder,
  getAllImageFolders,
} = cloudinaryModule;
app.use("/api/cloudinary", router);
// Khởi tạo routes

initApiRoutes(app);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
