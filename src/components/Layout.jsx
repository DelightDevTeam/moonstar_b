import React from "react";
import { Outlet } from "react-router-dom";
import Marquee from "./Marquee";
import Navbar from "./Navbar";
import FixedBottom from "./FixedBottom";
import FooterProviders from "./FooterProviders";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "../context/AuthContext";


const Layout = () => {
  return (
    <AuthContextProvider>
      <div className="site-background">
        <Toaster />
        <Marquee />
        <Navbar />
        <Outlet />
        <FooterProviders />
        <FixedBottom />
      </div>
    </AuthContextProvider>
  );
};

export default Layout;
