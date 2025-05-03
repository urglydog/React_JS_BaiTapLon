// // AppRouter.jsx
// import React, { useContext } from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate
// } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import ProtectedRoute from "../services/ProtectedRoute";

// // Pages
// import Layout from "../pages/Layout/Layout";

// import Content from "../components/Content/Content";
// import Contact from "../components/Contact";
// import About from "../components/About";
// import LoginWave from "../pages/login/LoginWave";
// import Profile from "../pages/Profile/Profile";
// import Laptop from "../pages/Laptops/Laptops";
// import Desktop from "../pages/Desktops/Desktops";
// import NetWorking from "../pages/Networking_devices/Networking_devices";
// import Printer_Scanner from "../pages/Printer_scanner/Printer_scanner";
// import PC_Part from "../pages/Pc_parts/PC_Part";
// import All_Product from "../pages/All_Products/All_Products";
// import Repair from "../pages/Repair/Repair";
// import Our_Deal from "../pages/Our_Deal/Our_Deal";
// import Card from "../pages/Card/Card";
// import Catalog from "../pages/Laptops/Catalog";
// import FAQ from "../pages/faq/FAQ";
// import ShoppingCartItem from "../pages/ShoppingCard/ShoppingCardItem";
// import ShoppingCard_CheckOut from "../pages/ShoppingCard/ShoppingCard_CheckOut";
// import ProductDetail from "../components/product/ProductDetail";
// import ProductSpeccs from "../components/product/ProductSpecss";
// import Admin from "../pages/AdminLayout/AdminLayout";
// import ProductAbout from "../components/product/ProductAbout";
// import Product from "../components/product/Product";
// import ScrollToTop from "../components/option/ScrollToTop";
// const AppRouter = () => {
//   const { getUserRole, loading } = useContext(UserContext);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
//       </div>
//     );
//   }

//   const userRole = getUserRole();
//   console.log("Current user role:", userRole);

//   return (
//     <BrowserRouter>
//       <ScrollToTop />
//       <Routes>
//         {/* Public routes */}
//         <Route path="/login" element={<LoginWave />} />

//         {/* Admin routes  */}
//         <Route path="/admin" element={
//           <ProtectedRoute requiredRoles={['manager']}>
//             <Admin />
//           </ProtectedRoute>
//         } />

//         {/* Customer/public routes */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Content />} />
//           {/* Fix nested routes by removing leading slashes */}
//           <Route path="contact" element={<Contact />} />
//           <Route path="about" element={<About />} />
//           <Route path="laptops" element={<Laptop />} />
//           <Route path="laptops/catalog" element={<Catalog />} />
//           <Route path="faq" element={<FAQ />} />
//           <Route path="desktops" element={<Desktop />} />
//           <Route path="networking_devices" element={<NetWorking />} />
//           <Route path="printer_scanner" element={<Printer_Scanner />} />
//           <Route path="pc_parts" element={<PC_Part />} />
//           <Route path="all_products" element={<All_Product />} />
//           <Route path="repair" element={<Repair />} />
//           <Route path="our_deal" element={<Our_Deal />} />

//           {/* Protected customer routes - also fix nested paths */}
//           <Route path="profile" element={
//             <ProtectedRoute requiredRoles={['customer']}>
//               <Profile />
//             </ProtectedRoute>
//           } />
//           <Route path="card" element={
//             <ProtectedRoute requiredRoles={['customer']}>
//               <Card />
//             </ProtectedRoute>
//           } />
//           <Route path="shopping_card_checkout" element={
//             <ProtectedRoute requiredRoles={['customer']}>
//               <ShoppingCard_CheckOut />
//             </ProtectedRoute>
//           } />
//           <Route path="shopping_card_item" element={
//             <ProtectedRoute requiredRoles={['customer']}>
//               <ShoppingCartItem />
//             </ProtectedRoute>
//           } />
//         </Route>
//         <Route path="/product/:id" element={<Product />}>
//             <Route path="productAbout" element={<ProductAbout />}></Route>
//             <Route path="productDetail" element={<ProductDetail />}></Route>
//             <Route path="productSpeccs" element={<ProductSpeccs />}></Route>
//             <Route index element={<ProductAbout />}></Route>
//           </Route>
//         {/* Redirect based on role */}
//         <Route path="/dashboard" element={
//           userRole === 'manager' ? <Navigate to="/admin" /> :
//           userRole === 'employee' ? <Navigate to="/employee" /> :
//           <Navigate to="/" />
//         } />
//         <Route path="/products" element={<Catalog />}></Route>

//         <Route path="/about" element={<About />}></Route>
//         {/* Catch all - 404 */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRouter;
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import ProtectedRoute from "../services/ProtectedRoute";

// Pages and Components
import Layout from "../pages/Layout/Layout";
import Content from "../components/Content/Content";
import Contact from "../components/Contact";
import About from "../components/About";
import LoginWave from "../pages/login/LoginWave";
import Login from "../pages/login/Login";
import Profile from "../pages/Profile/Profile";
import Laptop from "../pages/Laptops/Laptops";
import Desktop from "../pages/Desktops/Desktops";
import NetWorking from "../pages/Networking_devices/Networking_devices";
import Printer_Scanner from "../pages/Printer_scanner/Printer_scanner";
import PC_Part from "../pages/Pc_parts/PC_Part";
import All_Product from "../pages/All_Products/All_Products";
import Repair from "../pages/Repair/Repair";
import Our_Deal from "../pages/Our_Deal/Our_Deal";
import Card from "../pages/Card/Card";
import Catalog from "../pages/Laptops/Catalog";
import FAQ from "../pages/faq/FAQ";
import ShoppingCartItem from "../pages/ShoppingCard/ShoppingCardItem";
import ShoppingCard_CheckOut from "../pages/ShoppingCard/ShoppingCard_CheckOut";
import ProductDetail from "../components/product/ProductDetail";
import ProductSpeccs from "../components/product/ProductSpecss";
import Admin from "../pages/AdminLayout/AdminLayout";
import ProductAbout from "../components/product/ProductAbout";
import Product from "../components/product/Product";
import ScrollToTop from "../components/option/ScrollToTop";

const AppRouter = () => {
  const { getUserRole, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700"></div>
      </div>
    );
  }

  const userRole = getUserRole();
  console.log("Current user role:", userRole);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginWave />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRoles={["manager"]}>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Customer/public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="laptops" element={<Laptop />} />
          <Route path="laptops/catalog" element={<Catalog />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="desktops" element={<Desktop />} />
          <Route path="networking_devices" element={<NetWorking />} />
          <Route path="printer_scanner" element={<Printer_Scanner />} />
          <Route path="pc_parts" element={<PC_Part />} />
          <Route path="all_products" element={<All_Product />} />
          <Route path="repair" element={<Repair />} />
          <Route path="our_deal" element={<Our_Deal />} />

          {/* Protected customer routes */}
          <Route
            path="profile"
            element={
              <ProtectedRoute requiredRoles={["customer"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="card"
            element={
              <ProtectedRoute requiredRoles={["customer"]}>
                <Card />
              </ProtectedRoute>
            }
          />
          <Route
            path="shopping_card_checkout"
            element={
              <ProtectedRoute requiredRoles={["customer"]}>
                <ShoppingCard_CheckOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="shopping_card_item"
            element={
              <ProtectedRoute requiredRoles={["customer"]}>
                <ShoppingCartItem />
              </ProtectedRoute>
            }
          />
          {/* Product routes */}
          <Route path="/product/:id" element={<Product />}>
            <Route path="productAbout" element={<ProductAbout />} />
            <Route path="productDetail" element={<ProductDetail />} />
            <Route path="productSpeccs" element={<ProductSpeccs />} />
            <Route index element={<ProductAbout />} />
          </Route>
          {/* Catalog route */}
          <Route path="/products" element={<Catalog />} />
        </Route>

        {/* Redirect based on role */}
        <Route
          path="/dashboard"
          element={
            userRole === "manager" ? (
              <Navigate to="/admin" />
            ) : userRole === "employee" ? (
              <Navigate to="/employee" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Catch all - 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
