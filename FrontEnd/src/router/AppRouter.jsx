import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter , Navigate} from "react-router-dom";
import About from "../components/About";
import Contact from "../components/Contact";
import Login from "../pages/login/Login";
import Content from "../components/Content/Content";
import Laptop from "../pages/Laptops/Laptops"
import Desktop from "../pages/Desktops/Desktops"
import NetWorking from "../pages/Networking_devices/Networking_devices"
import Printer_Scanner from "../pages/Printer_scanner/Printer_scanner"
import PC_Part from "../pages/Pc_parts/PC_Part"
import All_Product from "../pages/All_Products/All_Products"
import Repair from "../pages/Repair/Repair"
import Our_Deal from "../pages/Our_Deal/Our_Deal"
import Profile from "../pages/Profile/Profile"
import Card from "../pages/Card/Card"
import Layout from "../pages/Layout/Layout";
import Catalog from "../pages/Laptops/Catalog";
import FAQ from "../pages/faq/FAQ";
import ShoppingCartItem from "../pages/ShoppingCard/ShoppingCardItem";
import ShoppingCard_CheckOut from "../pages/ShoppingCard/ShoppingCard_CheckOut";
import path from "../constant/path";

const AppRouter = () => {
  return (
<BrowserRouter>
      <Routes>
        {/* Redirect root sang login */}
        <Route path="/" element={<Navigate to={path.login} />} />
        <Route path={path.login} element={<Login />} />

        {/* Tất cả trang bên trong layout */}
        <Route path={path.home} element={<Layout />}>
          <Route index element={<Content />} />
          <Route path="contact" element={<Contact />} />
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
          <Route path="profile" element={<Profile />} />
          <Route path="card" element={<Card />} />
          <Route path="shopping_card_checkout" element={<ShoppingCard_CheckOut />} />
          <Route path="shopping_card_item" element={<ShoppingCartItem />} />
        </Route>
      </Routes>
    </BrowserRouter>


  );
};

export default AppRouter;
