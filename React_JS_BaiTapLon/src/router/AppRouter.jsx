import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Content />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/laptops" element={<Laptop />}></Route>
          <Route path="/desktops" element={<Desktop />}></Route>
          <Route path="/networking_devices" element={<NetWorking />}></Route>
          <Route path="/printer_scanner" element={<Printer_Scanner />}></Route>
          <Route path="/pc_parts" element={<PC_Part />}></Route>
          <Route path="/all_products" element={<All_Product />}></Route>
          <Route path="/repair" element={<Repair />}></Route>
          <Route path="/our_deal" element={<Our_Deal />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
      
          <Route path="/card" element={<Card />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>


  );
};

export default AppRouter;
