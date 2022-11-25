import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
//import { registerApi } from '../../../service/serviceApi';
import { useNavigate } from "react-router-dom";
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
  HiUser,
} from 'react-icons/hi';

const Register = () => {

  const navigate = useNavigate()

  const [ registerInput, setRegister ] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    error_list: [],
    isLoading: false
  })

  const handleInput = (e) =>{
    e.persist();
    setRegister({...registerInput, [e.target.name]: e.target.value})
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    setRegister({...registerInput, isLoading: true})
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
      password_confirmation: registerInput.password_confirmation
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/register', data).then(res => {
        if(res.data.success){
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal('Success', res.data.message, 'success');
          setTimeout(() => {
            navigate('/');
          }, "1500");
        }else{
          if(res.data.status === 'validation-error'){
            setRegister({...registerInput, error_list: res.data.errors})
          }
        }
      })
    })

  }

  return (
    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl">
          Create an Account
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
          <form onSubmit={registerSubmit} autoComplete="off">
          <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <HiUser size={16}/>
                </span>
                <input
                  type="text"
                  name="name"
                  onChange={handleInput}
                  value={registerInput.name}
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your name"
                />
                <span className="text-red-500">{registerInput.error_list.name}</span>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <MdEmail size={16}/>
                </span>
                <input
                  type="text"
                  name="email"
                  onChange={handleInput}
                  value={registerInput.email}
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your email"
                />
                <span className="text-red-500">{registerInput.error_list.email}</span>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                 <HiLockOpen size={16}/>
                </span>
                <input
                  type="password"
                  name="password"
                  onChange={handleInput}
                  value={registerInput.password}
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your password"
                />
                <span className="text-red-500">{registerInput.error_list.password}</span>
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <HiLockOpen size={16}/>
                </span>
                <input
                  type="password"
                  name="password_confirmation"
                  onChange={handleInput}
                  value={registerInput.password_confirmation}
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your password confirmation"
                />
                <span className="text-red-500">{registerInput.error_list.password_confirmation}</span>
              </div>
            </div>
            <div className="flex w-full">
              <input
                type="submit"
                value="Register"
                className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              />
            </div>
            {registerInput.isLoading && 
            <div className="flex items-center">
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
            <span className="ml-2">Already have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;