/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { categoryDeleteApi, productListApi } from "../../../service/serviceApi";
import Modal from "../../elements/Modal";
import CategoryUpdateForm from "../category/CategoryUpdateForm";
import ProductAdd from "./ProductAdd";

import { BiPlus, BiChevronDown } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { HiOutlinePencil, HiOutlineEye } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";

function Product() {
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [show, setShow] = useState(false); //show of hide modal
  const [productId, setProductId] = useState(0);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    productListApi().then((res) => {
      if (res.data.success) {
        if (res.data.status === "success") {
          setIsLoading(false);
          setProductList(res.data.data);
        }
      } else {
        setProductList([]);
      }
    });
  };

  const removeProduct = (removeId) => {
    const newProduct = productList.filter((product) => product.id !== removeId);
    setProductList(newProduct);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this information!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        categoryDeleteApi(id).then((res) => {
          if (res.data.success) {
            if (res.data.status === "success") {
              swal("Success", res.data.message, "success");
              removeProduct(id);
            }
          } else {
            swal("Error", res.data.message, "error");
          }
        });
      }
    });
  };

  const onClose = (status = "close") => {
    if (status === "success") {
      getProductList();
    }
    setShow(false);
  };

  const handleModal = (isShow = false, newProductId = 0) => {
    setProductId(newProductId);
    setShow(isShow);
  };

  const renderTableData = () => {
    let view = [];
    productList.map((item) => {
      view.push(
        <tr
          key={item.id}
          className="border-b border-gray-200 hover:bg-gray-100"
        >
          <td className="py-3 px-6 text-left whitespace-nowrap">
            <div className="flex items-center">
              <div className="mr-2">
                <img />
              </div>
              <span className="font-medium">{item.name}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-left">
            <div className="flex items-center">
              <span>{item.slug}</span>
            </div>
          </td>
          <td className="py-3 px-6 text-center">
            {item.status === 1 ? (
              <strong className="rounded bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700">
                Active
              </strong>
            ) : (
              <strong className="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700">
                Inactive
              </strong>
            )}
          </td>
          <td className="py-3 px-6 text-center">
            <div className="flex item-center justify-center">
              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                <HiOutlineEye size={16} />
              </div>
              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                <button onClick={() => handleModal(true, item.id)}>
                  <HiOutlinePencil size={16} />
                </button>
              </div>
              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <TbTrash size={16} />
                </button>
              </div>
            </div>
          </td>
        </tr>
      );
      return view;
    });
    if (view.length === 0) {
      return (
        <tr key="1">
          <div className="flex justify-center p-3 items-center">
            <span className="capitalize font-medium text-lg">
              No Data found
            </span>
          </div>
        </tr>
      );
    } else {
      return view;
    }
  };

  return (
    <div className="overflow-x-auto bg-gray-100">
      <div className="min-w-screen mt-10 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-tight">
              Product List
            </h2>
            <div className="flex justify-end mt-2 mr-1">
              {/* <Link to="/admin/category-add"> */}
              <button
                onClick={() => handleModal(true, 0)}
                className="flex items-center px-3 py-2 text-xs font-normal text-indigo-900 capitalize transition-colors duration-300s bg-indigo-300/50 rounded-lg hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
              >
                <BiPlus className="font-bold" size={20} />
                <span className="mx-1">Add Product</span>
              </button>
              {/* </Link> */}
            </div>
          </div>
          <div className="my-2 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <BiChevronDown />
                </div>
              </div>
              <div className="relative">
                <select className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <BiChevronDown />
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <IoMdSearch size={20} />
              </span>
              <input
                placeholder="Search"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Slug</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
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
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                <button className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={productId !== 0 ? "Update Product" : "Add Product"}
        onClose={onClose}
        show={show}
      >
        {productId !== 0 ? (
          <CategoryUpdateForm onClose={onClose} productId={productId} />
        ) : (
          <ProductAdd show={show} onClose={onClose} />
        )}
      </Modal>
    </div>
  );
}

export default Product;
