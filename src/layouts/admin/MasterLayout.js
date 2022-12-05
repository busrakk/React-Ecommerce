import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import { Outlet } from "react-router-dom";
import { RecoilRoot } from 'recoil';

const MasterLayout = (props) => {
  return (
    <RecoilRoot>
    <div>
      <Navbar />
      <div className="w-full min-h-[90vh] grid grid-cols-12">
        <Sidebar />
        <div className="grid xl:grid-cols-1 w-full col-span-10">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
    </RecoilRoot>
  );
};

export default MasterLayout;
