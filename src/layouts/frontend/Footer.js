import React from "react";
import { NavLink } from "react-router-dom";
import Menu from "./UI/Menu";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { BiGlobe } from "react-icons/bi";

const Footer = () => {
  const menus = [
    {
      title: "Hesap",
      items: [
        {
          title: "Hesabım",
        },
        {
          title: "Siparişim",
        },
        {
          title: "Favoriler",
        },
        {
          title: "İade Oluştur",
        },
      ],
    },
    {
      title: "Kurumsal",
      items: [
        {
          title: "Hakkımızda",
        },
        {
          title: "Sürdürülebilirlik",
        },
        {
          title: "Kariyer",
        },
        {
          title: "İletişim",
        },
      ],
    },
    {
      title: "Hizmetlerimiz",
      items: [
        {
          title: "Güvenli e-Ticaret",
        },
        {
          title: "Toplu Ürün Girişi",
        },
        {
          title: "Reklam",
        },
      ],
    },
    {
      title: "Gizlilik ve Kullanım",
      items: [
        {
          title: "Güvenli Alışverişin İpuçları",
        },
        {
          title: "Sözleşmeler ve Kurallar",
        },
        {
          title: "Hesap Sözleşmeleri",
        },
        {
          title: "Kullanım Koşulları",
        },
      ],
    },
  ];

  return (
    <div className="bg-white mt-10">
      <div className="container mx-auto xl:px-60 md:px-0 items-center justify-between">
        <div className="grid gap-y-6 md:grid-cols-2 lg:grid-cols-4 pt-5 md:pt-10">
          {menus.map((menu, index) => (
            <Menu key={index} {...menu} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-y-4 justify-between items-center border-t border-gray-100 mt-6 py-6">
          <div className="text-xs text-gray-700 flex gap-x-8">
            &copy; 2022 e-Ticaret
            <NavLink
              to="#"
              className="text-gray-800 hover:underline relative before:w-[3px] before:h-[3px] before:bg-black before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2 before:rounded-full"
            >
              Bilgi Toplumu Hizmetleri
            </NavLink>
          </div>
          <nav className="flex gap-x-3">
            <NavLink
              to="#"
              className="w-8 h-8 rounded-lg text-gray-500 transition-colors hover:bg-gray-800 hover:bg-opacity-10 hover:text-gray-800 flex items-center justify-center"
            >
              <FaFacebook size={21} />
            </NavLink>
            <NavLink
              to="#"
              className="w-8 h-8 rounded-lg text-gray-500 transition-colors hover:bg-gray-800 hover:bg-opacity-10 hover:text-gray-800 flex items-center justify-center"
            >
              <FaTwitter size={21} />
            </NavLink>
            <NavLink
              to="#"
              className="w-8 h-8 rounded-lg text-gray-500 transition-colors hover:bg-gray-800 hover:bg-opacity-10 hover:text-gray-800 flex items-center justify-center"
            >
              <FaInstagram size={21} />
            </NavLink>
            <NavLink
              to="#"
              className="h-8 transition-colors hover:bg-gray-800 hover:bg-opacity-10 hover:text-gray-800 hover:border-transparent flex items-center px-2 text-sm gap-x-2 rounded text-gray-500 border border-gray-100"
            >
              <BiGlobe size={18} />
              Türkçe (TR)
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;
