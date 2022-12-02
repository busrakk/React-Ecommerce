import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";

const MasterLayout = (props) => {
  return (
    <div>
      <Navbar />
      <div className="w-full min-h-[90vh] grid grid-cols-12">
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MasterLayout;
