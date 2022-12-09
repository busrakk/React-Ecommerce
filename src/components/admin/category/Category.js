/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import {
  categoryListApi,
  categoryDeleteApi,
} from "../../../service/serviceApi";

import { Link } from "react-router-dom";

import { BiPlus, BiChevronDown } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { HiOutlinePencil, HiOutlineEye } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";

const Category = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryList = () => {
    categoryListApi().then((res) => {
      if (res.data.success) {
        if (res.data.status === "success") {
          setIsLoading(false);
          setCategoryList(res.data.data);
        }
      } else {
        setCategoryList([]);
      }
    });
  };

  const removeCategory = (removeId) => {
    const newCategory = categoryList.filter(
      (category) => category.id !== removeId
    );
    setCategoryList(newCategory);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this information!",
      icon: "warning",
      buttons: "True",
      dangerMode: "true",
    }).then((willDelete) => {
      if (willDelete) {
        categoryDeleteApi(id).then((res) => {
          if (res.data.success) {
            if (res.data.status === "success") {
              swal("Success", res.data.message, "success");
              removeCategory(id);
            }
          } else {
            swal("Error", res.data.message, "error");
          }
        });
      } else {
      }
    });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const renderTableData = () => {
    let view = [];
    // eslint-disable-next-line array-callback-return
    categoryList.map((item) => {
      view.push(
        <tr key={item.id} class="border-b border-gray-200 hover:bg-gray-100">
          <td class="py-3 px-6 text-left whitespace-nowrap">
            <div class="flex items-center">
              <div class="mr-2">
                <img />
              </div>
              <span class="font-medium">{item.name}</span>
            </div>
          </td>
          <td class="py-3 px-6 text-left">
            <div class="flex items-center">
              <span>{item.slug}</span>
            </div>
          </td>
          <td class="py-3 px-6 text-center">
            <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
              {item.status}
            </span>
          </td>
          <td class="py-3 px-6 text-center">
            <div class="flex item-center justify-center">
              <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                <HiOutlineEye size={16} />
              </div>
              <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                <Link to="#">
                  <HiOutlinePencil size={16} />
                </Link>
              </div>
              <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <TbTrash size={16} />
                </button>
              </div>
            </div>
          </td>
        </tr>
      );
    });
    if (view.length === 0) {
      return (
        <tr key="1">
          <td
            colSpan={4}
            className="px-5 py-5 text-sm bg-white border-b border-gray-200"
          >
            <div className="flex items-center">
              <div className="ml-1">
                <p className="text-gray-900 whitespace-no-wrap">
                  No Data Found!
                </p>
              </div>
            </div>
          </td>
        </tr>
      );
    } else {
      return view;
    }
  };

  return (
    <div class="overflow-x-auto mt-10 -z-50">
      <div class="min-w-screen flex items-center justify-center bg-white font-sans overflow-hidden">
        <div class="w-full lg:w-5/6">
          <div className="flex justify-between">
            <h2 class="text-2xl font-semibold leading-tight">Users</h2>
            <div className="flex justify-end mr-1">
              <Link to="/admin/category-add">
                <button class="flex items-center px-4 py-2 font-medium text-sky-900 capitalize transition-colors duration-300 transform bg-sky-300/50 rounded-lg hover:bg-sky-700 hover:text-white focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-80">
                  <BiPlus className="font-bold" size={20} />
                  <span class="mx-1">Add Category</span>
                </button>
              </Link>
            </div>
          </div>
          <div class="my-2 flex sm:flex-row flex-col">
            <div class="flex flex-row mb-1 sm:mb-0">
              <div class="relative">
                <select class="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <BiChevronDown />
                </div>
              </div>
              <div class="relative">
                <select class="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <BiChevronDown />
                </div>
              </div>
            </div>
            <div class="block relative">
              <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <IoMdSearch size={20} />
              </span>
              <input
                placeholder="Search"
                class="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          <div class="bg-white shadow-md rounded my-6">
            <table class="min-w-max w-full table-auto">
              <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th class="py-3 px-6 text-left">Name</th>
                  <th class="py-3 px-6 text-left">Slug</th>
                  <th class="py-3 px-6 text-center">Status</th>
                  <th class="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm font-light">
                {isLoading && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-5 text-sm bg-white border-b border-gray-200"
                    >
                      <div className="flex items-center">
                        <div className="ml-1">
                          <p className="text-gray-900 whitespace-no-wrap">
                            Loading...
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {!isLoading && renderTableData()}
              </tbody>
            </table>
            <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <div class="inline-flex mt-2 xs:mt-0">
                <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
