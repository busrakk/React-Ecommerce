import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

import { Outlet } from 'react-router-dom';

const MasterLayout = (props) => {
  return (
    <div>
      <div>
        <Navbar />
        <Sidebar />
          <div>
            <main>
              <div>
                <Outlet />
              </div>
            </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default MasterLayout
