import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ActiveTabState } from "../../atom/ActiveTabState";
import { navLinks } from "./utils/sidebarLinks";

const Sidebar = () => {
  return (
    <nav className="col-span-2 bg-white drop-shadow-md min-h-[90vh] w-[80px] xl:w-[250px] pt-8 px-1 flex flex-col items-start justify-between">
      <div className="space-y-8 w-full">
        {navLinks.slice(0, 6).map((link) => (
          <NavItem link={link} key={link.id} url={link.url} />
        ))}
      </div>
    </nav>
  );
};

function NavItem({ link }) {
  const [actineNavItem, setActiveNavItem] = useRecoilState(ActiveTabState);

  return (
    <div
      onClick={() => setActiveNavItem(link.id)}
      className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer group hover:font-extrabold hover:border-gray-900 border-l-4 border-transparent ${
        actineNavItem === link.id && "border-gray-900"
      }`}
    >
      <Link to={link.url} className={`sb-nav-link-icon text-gray-800 group-hover:text-black xl:flex ${
          actineNavItem === link.id && "text-black"
        }`}>
          <span>{link.icon}</span>
        </Link>
      <Link
        className={`text-gray-800 group-hover:text-black xl:flex hidden ${
          actineNavItem === link.id && "text-black"
        }`}
        to={link.url}
      >
        {link.title}
      </Link>
    </div>
  );
}

export default Sidebar;
