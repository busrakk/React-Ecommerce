import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

const Navbar = () => {

  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    axios.post('/api/logout').then(res => {
      if(res.data.success){
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal('Success', res.data.message, 'success');
        navigate('/login');
      }
    })
  }

  return (
    <nav>
        <Link to="/admin/dashboard">Ecommerce</Link>
        <ul>
            <li>
                <Link></Link>
                <ul>
                    <li><Link to="/admin/profile">Profile</Link></li>
                    <li><Link to="#">Settings</Link></li>
                    <li><Link to="#">Activity Log</Link></li>
                    <li><hr /></li>
                    <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
                </ul>
            </li>
        </ul>
    </nav>
  );
};

export default Navbar;
