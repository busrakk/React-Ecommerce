import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categoryInsertApi } from "../../../service/serviceApi";
import swal from "sweetalert";

import { TiArrowBackOutline } from 'react-icons/ti';

const CategoryAdd = () => {

  const initialData = {
    slug: "",
    name: "",
    description: "",
    status: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    error_list: [],
  };

  const [categoryInput, setCategoryInput] = useState(initialData);

  const handleInput = (e) => {
    e.persist();
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategoryInput({ ...categoryInput, error_list: [] });
    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      description: categoryInput.description,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_keywords: categoryInput.meta_keywords,
      meta_description: categoryInput.meta_description,
    };

    // axios.post("/api/admin/category-store", data).then((res) => {
    categoryInsertApi(data).then((res) => {
      if (res.data.success) {
        if (res.data.status === "success") {
          // document.getElementById("category-form").reset();
          swal("Success", res.data.message, "success");
          setCategoryInput(initialData);
        }
      } else {
        if (res.data.status === "validation-error") {
          setCategoryInput({ ...categoryInput, error_list: res.data.errors });
        } else {
          swal("Error", res.data.message, "error");
        }
      }
    });
  };

  return (
    <div>
      <div className="container max-w-5xl px-2 mx-auto sm:px-4 shadow">
        <div className="py-4">
          <div className="flex flex-row p-6 justify-between w-full font-semibold mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">Add Category</h2>
            <div className="text-end">
              <div className="flex flex-col justify-center w-full max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <Link 
                  to="/admin/category"
                  type="button"
                  class="py-2 px-4 flex justify-center items-center  bg-violet-600 hover:bg-violet-700 focus:ring-violet-500 focus:ring-offset-violet-200 text-white w-full transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  <TiArrowBackOutline size={20} />
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-auto mt-5 shadow-md">
      <section className="max-w-5xl p-4 mx-auto bg-white rounded-md shadow-md">
        <form onSubmit={handleSubmit} id="category-form">
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="username">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                onChange={handleInput}
                value={categoryInput.slug}
                placeholder="Slug"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {categoryInput.error_list.slug}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInput}
                value={categoryInput.name}
                placeholder="Name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {categoryInput.error_list.name}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Description
              </label>
              <textarea
                name="description"
                onChange={handleInput}
                value={categoryInput.description}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Description"
                rows="8"
                id="description"
              ></textarea>
              <span className="text-red-500">
                {categoryInput.error_list.description}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="passwordConfirmation">
                Status
              </label>
              <input
                type="checkbox"
                name="status"
                value={categoryInput.status}
                onChange={handleInput}
                id="status"
                className="block px-4 py-4 m-4 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <hr className="m-4" />

          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="username">
                Meta Title
              </label>
              <input
                type="text"
                name="meta_title"
                id="meta_title"
                onChange={handleInput}
                value={categoryInput.meta_title}
                placeholder="Meta Title"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {categoryInput.error_list.meta_title}
              </span>
            </div>

            <div></div>

            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Meta Keywords
              </label>
              <textarea
                name="meta_keywords"
                onChange={handleInput}
                value={categoryInput.meta_keywords}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Meta Keywords"
                rows="8"
                id="meta_keywords"
              ></textarea>
              <span className="text-red-500">
                {categoryInput.error_list.meta_keywords}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Meta Description
              </label>
              <textarea
                name="meta_description"
                onChange={handleInput}
                value={categoryInput.meta_description}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Meta Description"
                rows="8"
                id="description"
              ></textarea>
              <span className="text-red-500">
                {categoryInput.error_list.meta_description}
              </span>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
    </div>
  );
};

export default CategoryAdd;
