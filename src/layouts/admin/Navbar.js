import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

// import {
//   IoMdSearch,
// } from 'react-icons/io';
import { CiShoppingBasket } from "react-icons/ci";
import { FaRegEnvelope, FaRegUserCircle } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    axios.post("/api/logout").then((res) => {
      if (res.data.success) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        navigate("/login");
      }
    });
  };

  return (
    <div className="bg-gray-50 drop-shadow-md w-full py-6 items-center justify-between flex px-12">
      {/* search */}
      <div className="w-full lg:flex hidden space-x-4 items-center justify-start py-2">
        <CiShoppingBasket className="w-8 h-8" />
        <Link
          to="/admin/dashboard"
          className="text-xl text-gray-900 font-medium"
        >
          ECOMMERCE
        </Link>
        {/* icon */}
        {/* <IoMdSearch className="w-4 h-4" />
        <input 
          type="text"
          placeholder="Search anything..."
          className="bg-transparent outline-none"
        /> */}
      </div>
      {/* logo */}
      <div className="items-center w-full justify-center flex space-x-4">
        <Link to="/admin/profile" className="text-gray-900 font-medium">
          Profile
        </Link>
        <Link to="#" className="text-gray-900 font-medium">
          Settings
        </Link>
        <Link to="#" className="text-gray-900 font-medium">
          Activity Log
        </Link>
        <Link
          to="#"
          className="text-gray-900 font-medium"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </div>
      {/* icons */}
      <div className="items-center justify-end space-x-6 flex w-full">
        <MdNotificationsNone className="header-icon" />
        <FaRegEnvelope className="header-icon" />
        <FaRegUserCircle className="header-icon" />
      </div>
    </div>
  );
};

export default Navbar;
