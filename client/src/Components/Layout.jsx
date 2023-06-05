import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      {/* context of the page accoring to path */}
      <div className="min-h-[calc(100vh-154px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
