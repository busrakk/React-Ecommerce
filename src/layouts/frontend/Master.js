import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Footer from './Footer';

const Master = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Master
