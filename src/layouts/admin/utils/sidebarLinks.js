import {
    HiOutlineTemplate,
    HiOutlineShoppingCart,
    HiOutlineUser,
    HiOutlineChatAlt2,
    HiOutlineCog,
    HiOutlineLogout,
} from 'react-icons/hi';
import {
    MdOutlineCategory,
} from 'react-icons/md';

export const navLinks = [
    {
        id: 0,
        title: "Dashboard",
        icon: <HiOutlineTemplate className='nav-icon' />,
        url: "/admin/dashboard"
    },
    {
        id: 1,
        title: "Category",
        icon: <MdOutlineCategory className='nav-icon' />,
        url: "/admin/category"
    },
    {
        id: 2,
        title: "Market",
        icon: <HiOutlineShoppingCart className='nav-icon' />
    },
    {
        id: 3,
        title: "Portfolio",
        icon: <HiOutlineUser className='nav-icon' />
    },
    {
        id: 4,
        title: "News",
        icon: <HiOutlineChatAlt2 className='nav-icon' />
    },
    {
        id: 5,
        title: "Settings",
        icon: <HiOutlineCog className='nav-icon' />
    },
    {
        id: 6,
        title: "Logout",
        icon: <HiOutlineLogout className='nav-icon' />
    }
];