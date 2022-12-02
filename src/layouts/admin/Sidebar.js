import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ActiveTabState } from "../../atom/ActiveTabState";
import { navLinks } from "./utils/sidebarLinks";

const Sidebar = () => {
  return (
    <nav className="col-span-2 border-r border-gray-200 min-h-[90vh] w-[80px] xl:w-[250px] pt-8 px-1 flex flex-col items-start justify-between">
      <div className="space-y-8 w-full">
        {navLinks.slice(0, 4).map((link) => (
          <NavItem link={link} key={link.id} url={link.url} />
        ))}
        <div className="w-full border-t border-gray-200">
          {navLinks.slice(4, 6).map((link) => (
            <NavItem link={link} key={link.id} url={link.url} />
          ))}
        </div>
      </div>
      <div className="xl:flex hidden flex-col items-center justify-center space-y-4 p-4">
        <h1 className="text-xl w-full font-medium">
          lskjflak
          <br />
          sflkf
        </h1>
        <p>llakknlfalkfalkjf</p>
        <button className="w-full py-2 px-3 bg-black text-white">button</button>
      </div>
    </nav>
  );
};

function NavItem({ link }) {
  const [actineNavItem, setActiveNavItem] = useRecoilState(ActiveTabState);

  return (
    <div
      onClick={() => setActiveNavItem(link.id)}
      className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer group hover:border-gray-900 border-l-4 border-transparent ${
        actineNavItem === link.id && "border-gray-900"
      }`}
    >
      <Link
        className={`text-gray-600 group-hover:text-black xl:flex hidden ${
          actineNavItem === link.id && "text-black"
        }`}
        to={link.url}
      >
        <div className="sb-nav-link-icon">
          <span>{link.icon}</span>
        </div>
        {link.title}
      </Link>
    </div>
  );
}

export default Sidebar;
