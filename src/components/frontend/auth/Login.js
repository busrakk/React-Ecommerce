import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

import {
  SlSocialFacebook,
  SlSocialGoogle,
} from 'react-icons/sl';

import {
  MdEmail,
} from 'react-icons/md';

import {
  HiLockOpen,
} from 'react-icons/hi';

const Login = () => {

  const navigate = useNavigate()

  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
    error_list: [],
    isLoading: false
  })

  const handleInput = (e) => {
    e.persist();
    setLoginInput({...loginInput, [e.target.name]: e.target.value})
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginInput({...loginInput, isLoading: true});
    const data = {
      email: loginInput.email,
      password: loginInput.password
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/login', data).then(res => {
        if(res.data.success){
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal('Success', res.data.message, 'success');
          setTimeout(() => {
            navigate('/');
          }, "1500")
        }else{
          swal('Error', res.data.message, 'error');
          setLoginInput({...loginInput, isLoading: false, error_list: []})
        }
      })
    })

  }

  return (
    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl">
          Login To Your Account
        </div>
        <div className="flex gap-4 item-center">
          <button
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <SlSocialFacebook size={20} className="mr-2 fill-white" />
            Facebook
          </button>
          <button
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            <SlSocialGoogle size={20} className="mr-2 fill-white" />
            Google
          </button>
        </div>
        <div className="mt-8">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <MdEmail size={16}/>
                </span>
                <input
                  type="email"
                  name="email"
                  onChange={handleInput}
                  value={loginInput.email}
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your email"
                />
                <span className="text-red-500">{loginInput.error_list.email}</span>
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <HiLockOpen size={16}/>
                </span>
                <input
                  type="password"
                  name="password"
                  onChange={handleInput}
                  value={loginInput.password}
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your password"
                />
              </div>
            </div>
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <Link
                  to="#"
                  className="inline-flex text-xs font-thin text-gray-500 sm:text-sm hover:text-gray-700"
                >
                  Forgot Your Password?
                </Link>
              </div>
            </div>
            <div className="flex w-full">
              <input
                type="submit"
                value="Sign In"
                className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              />
            </div>
            {loginInput.isLoading && 
              <div>
                <div>
                  <span>Loading...</span>
                </div>
              </div>
            }
          </form>
        </div>
        <div className="flex items-center justify-center mt-6">
          <Link
            to="#"
            target="_blank"
            className="inline-flex items-center text-xs font-thin text-center text-gray-500 hover:text-gray-700"
          >
            <span className="ml-2">You don&#x27;t have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
