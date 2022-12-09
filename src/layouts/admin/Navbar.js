import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import { IoMdSearch } from "react-icons/io";
import { CiShoppingBasket } from "react-icons/ci";
import { FaRegEnvelope, FaRegUserCircle } from "react-icons/fa";
import { MdNotificationsNone } from "react-icons/md";

const Navbar = () => {
  // dropdown menu
  const [open, setOpen] = useState(false);

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
      </div>
      {/* search */}
      <div className="items-center w-full justify-center flex space-x-1">
        <IoMdSearch className="w-5 h-5" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent px-2 hover:border rounded-lg h-10"
        />
      </div>
      {/* icons */}
      <div className="items-center justify-end space-x-6 flex w-full">
        <MdNotificationsNone className="header-icon" />
        <FaRegEnvelope className="header-icon" />
        <div className="relative h-full rounded-l block appearance-none">
          <FaRegUserCircle
            onClick={() => setOpen(!open)}
            className="header-icon"
          />
          {open && (
            <div className="bg-white z-0 hover:z-50 p-4 w-52 shadow-lg absolute -left-40 top-10">
              <ul>
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
                    className="text-gray-900 font-medium  hover:bg-blue-100 p-2 rounded"
                  >
                    Profile
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-900 font-medium  hover:bg-blue-100 p-2 rounded"
                  >
                    Settings
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-900 font-medium  hover:bg-blue-100 p-2 rounded"
                  >
                    Activity Log
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-900 font-medium  hover:bg-blue-100 p-2 rounded"
                    onClick={handleLogout}
                  >
                    Logout
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
