import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
// import Button from "../Button";
//import NavLinks from "./Navlinks";
import { Tr } from 'react-flags-select';

import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineUserAdd,
  HiOutlineLogout,
} from "react-icons/hi";

import {
  MdOutlineSettings,
} from 'react-icons/md';

import {
  CgProfile,
} from 'react-icons/cg';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    axios.post('/api/logout').then(res => {
      if(res.data.success){
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal('Success', res.data.message, 'success');
        navigate('/');
      }
    })
  }

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white fixed top-0 z-50 w-full">

      <header className="relative bg-white z-50">
        <div className="flex h-7 items-center justify-end space-x-8 tracking-tighter bg-black px-8 text-[13px] font-light text-white sm:px-10 lg:px-12">
          {(!localStorage.getItem('auth_token')) ? 
          <>
            <div className="font-light">|</div>
            <Link
              className="flex text-sm justify-between transition-colors duration-300 transform hover:text-gray-500"
              to="register"
            >
              <HiOutlineUserAdd size={23} className="font-extralight" />Kayıt Ol
            </Link>
            <div className="font-light">|</div>
            <Link
              className="flex text-sm justify-between transition-colors duration-300 transform hover:text-gray-500"
              to="login"
            >
              <HiOutlineUser size={23} className="font-extralight" />Oturum Aç
            </Link>
            <div className="font-light">|</div>
            <Tr />
          </>
          :
          <>
          <Link to="#">
            {(localStorage.getItem('auth_name')) ? localStorage.getItem('auth_name'): 'UNDEFIND'}
          </Link>
          <div className="font-light">|</div>
          <Link
            className="flex text-sm justify-between transition-colors duration-300 transform hover:text-gray-500"
            to="/admin/profile"
          >
            <CgProfile size={20} />Profile
          </Link>
          <div className="font-light">|</div>
          <Link
            className="flex text-sm justify-between transition-colors duration-300 transform hover:text-gray-500"
            to="#"
          >
            <MdOutlineSettings size={20} />Settings
          </Link>
          <div className="font-light">|</div>
          <Link
            className="flex text-sm justify-between transition-colors duration-300 transform hover:text-gray-500"
            to="#"
            onClick={handleLogout}
          >
            <HiOutlineLogout size={20} />Logout
          </Link>
          </>
          }
        </div>
      </header>

      <div className="flex items-center font-medium shadow-lg justify-around">
        <div className="z-50 p-4 md:w-auto w-full flex justify-between">
          <Link to="/">
            <img src="" alt="logo" className="md:cursor-pointer h-7" />
          </Link>
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <div className="md:flex hidden z-50 uppercase text-sm items-center gap-2 font-semibold">
          <div>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </div>
          {/* <NavLinks /> */}
        </div>
        <div className="flex flex-row space-x-4">
        <div className="md:block hidden">
            <Link
              className="relative text-black transition-colors duration-300 transform hover:text-gray-500"
              to="#"
            >
              <HiOutlineShoppingBag size={25} />
              <span className="absolute top-[2px] left-38 p-1 text-xs text-white bg-indigo-600 rounded-full"></span>
            </Link>
          </div>
          <div className="md:block hidden">
            <Link
              className="relative text-black transition-colors duration-300 transform hover:text-gray-500"
              to="#"
            >
              <HiOutlineHeart size={25} />
              <span className="absolute top-[2px] left-38 p-1 text-xs text-white bg-indigo-600 rounded-full"></span>
            </Link>
          </div>
        </div>
        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          <div>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </div>
          {/* <NavLinks /> */}
          <div className="py-5">{/* <Button /> */}</div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;