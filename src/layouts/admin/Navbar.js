import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import { IoMdSearch } from "react-icons/io";
import { CiShoppingBasket } from "react-icons/ci";
import { FaRegEnvelope, FaRegUserCircle } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";
import {
  RiUserLine,
  RiUserSettingsLine,
  RiUserReceivedLine,
  RiUserLocationLine,
} from "react-icons/ri";

const Navbar = () => {
  // dropdown menu
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    axios.post("/api/logout").then((res) => {
      if (res.data.success) {
        localStorage.removeItem("__rea_token");
        localStorage.removeItem("__rea_auth_name");
        swal("Success", res.data.message, "success");
        navigate("/login");
      }
    });
  };

  return (
    <div className="bg-white border-b drop-shadow-md w-full py-6 items-center justify-between flex px-12">
      {/* search */}
      <div className="w-full lg:flex text-gray-900 font-bold hidden space-x-4 items-center justify-start py-2">
        <CiShoppingBasket className="w-8 h-8" />
        <Link to="/admin/dashboard" className="text-xl text-gray-900 font-bold">
          ECOMMERCE
        </Link>
      </div>
      {/* search */}
      <div className="items-center w-full justify-center flex space-x-1">
        <IoMdSearch className="w-7 h-7" size={24} />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent px-2 hover:border hover:border-gray-700 rounded-lg h-10"
        />
      </div>
      {/* icons */}
      <div className="items-center text-gray-500 justify-end space-x-6 flex w-full">
        <span className="hover:text-gray-900">
          <MdNotificationsNone className="header-icon" />
        </span>
        <span className="hover:text-gray-900">
          <FaRegEnvelope className="header-icon" />
        </span>
        <div className="relative h-full rounded-l hover:text-gray-900 block appearance-none">
          <FaRegUserCircle
            onClick={() => setOpen(!open)}
            className="header-icon"
          />
          {open && (
            <div className="bg-white z-0 hover:z-50 p-4 w-52 shadow-lg absolute -left-40 top-10">
              <ul className="space-x-4">
                {/* {Menus.map((menu) => (
                  <li
                    onClick={() => setOpen(false)}
                    className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100"
                    key={menu}
                  >
                    {menu}
                  </li>
                ))} */}
                <li
                  onClick={() => setOpen(false)}
                  className="text-lg cursor-pointer flex flex-col"
                >
                  <Link
                    to="/admin/profile"
                    className="text-gray-900 font-medium hover:text-indigo-900 hover:bg-indigo-100 p-2 rounded"
                  >
                    <div className="flex hover:font-bold items-center space-x-4">
                      <RiUserLine />
                      <span>Profile</span>
                    </div>
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-900 font-medium hover:text-indigo-900 hover:bg-indigo-100 p-2 rounded"
                  >
                    <div className="flex hover:font-bold items-center space-x-4">
                      <RiUserSettingsLine />
                      <span>Settings</span>
                    </div>
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-900 font-medium hover:text-indigo-900 hover:bg-indigo-100 p-2 rounded"
                  >
                    <div className="flex hover:font-bold items-center space-x-4">
                      <RiUserLocationLine />
                      <span>Activity Log</span>
                    </div>
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-900 font-medium hover:text-indigo-900 hover:bg-indigo-100 p-2 rounded"
                    onClick={handleLogout}
                  >
                    <div className="flex hover:font-bold items-center space-x-4">
                      <RiUserReceivedLine />
                      <span>Logout</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
