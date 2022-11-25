/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react';
import {Collapse} from 'react-collapse';
import { useWindowWidth } from '@react-hook/window-size'
import { IoIosArrowDown } from 'react-icons/io';

const Menu = ({ title, items }) => {

    const windowWidth = useWindowWidth()
    const [isOpen, setIsOpen] = useState(true);

    const toggleCollapse = () => {
        if (windowWidth <= 768) {
            setIsOpen(!isOpen);
        }
    }

    useEffect(() => {
        if (isOpen && windowWidth <= 768) {
            setIsOpen(false)
        }
        if (!isOpen && windowWidth > 768) {
            setIsOpen(true)
        }
    }, [isOpen, windowWidth])

  return (
    <section>
            <nav className="grid gap-y-2 md:gap-y-4">
                <h6 onClick={toggleCollapse} className="text-lg text-black flex items-center justify-between">
                    {title}
                    <button className="grid md:hidden w-6 h-6 place-items-center rounded-lg bg-black bg-opacity-10 text-black">
                        <span className={`transition-all transform ${isOpen ? '-rotate-180' : ''}`}>
                            <IoIosArrowDown size={14} />
                        </span>
                    </button>
                </h6>
                <Collapse isOpened={isOpen}>
                    <nav>
                        <ul className="grid gap-y-1 md:gap-y-2">
                        {items.map((item, key) => (
                            <li key={key}>
                                <a href="#" className="text-sm hover:text-gray-400">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                        </ul>
                    </nav>
                </Collapse>
            </nav>
        </section>
  )
}

export default Menu