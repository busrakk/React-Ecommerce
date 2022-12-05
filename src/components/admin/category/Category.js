import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { categoryListApi, categoryDeleteApi } from "../../../service/serviceApi";

import { Link } from "react-router-dom";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { RiDeleteBinLine } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';

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
    const newCategory = categoryList.filter((category) => category.id !== removeId);
    setCategoryList(newCategory);
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this information!",
      icon: "warning",
      buttons: "True",
      dangerMode:"true",
    })
    .then((willDelete) => {
      if (willDelete) {
        categoryDeleteApi(id).then(res => {
          if(res.data.success) {
            if(res.data.status === 'success'){
              swal('Success', res.data.message, 'success');
              removeCategory(id)
            }
          }else{
            swal('Error', res.data.message, 'error');
          }
        });
      }else{

      }
    });
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  const renderTableData = () => {
    let view = [];
    // eslint-disable-next-line array-callback-return
    categoryList.map((item) => {
      view.push(
        <tr key={item.id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="ml-1">
                <p className="text-gray-900 whitespace-no-wrap">{item.name}</p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{item.slug}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-green-200 rounded-full opacity-50"
              ></span>
              <span className="relative">active</span>
            </span>
          </td>
          <td className="flex flex-row px-5 py-8 space-x-8 text-sm bg-white border-b border-gray-200">
            <Link
              to="#"
            >
              <GrEdit size={18} className="text-indigo-500" />
            </Link>
            <button
              onClick={(e) => handleDelete(e, item.id)}
            >
              <RiDeleteBinLine size={18} className="text-red-600" />
            </button>
          </td>
        </tr>
      );
    });
    if (view.length === 0) {
      return (
        <tr key="1">
          <td
            colSpan={3}
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
    <div>
      <div className="container max-w-5xl px-4 mx-auto sm:px-8 shadow-md">
        <div className="py-8">
          <div className="flex flex-row p-6 justify-between font-semibold w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">Category List</h2>
            <div className="text-end">
              <div className="flex flex-col justify-center font-medium w-full max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                <Link 
                  to="/admin/category-add"
                  type="button"
                  class="py-2 px-4 flex justify-center items-center bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 focus:ring-offset-emerald-200 text-white w-full transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  <BiPlus size={20} />
                  Add New
                </Link>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Slug
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py- text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <td
                        colSpan={3}
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
              {/* pagination */}
              <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                  >
                    <FaAngleLeft size={10} />
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 "
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                  >
                    4
                  </button>
                  <button
                    type="button"
                    className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                  >
                    <FaAngleRight size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
