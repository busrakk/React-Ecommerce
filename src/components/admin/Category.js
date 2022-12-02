import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const Category = () => {
  const [categoryInput, setCategoryInput] = useState({
    slug: "",
    name: "",
    description: "",
    status: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setCategoryInput({ ...categoryInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategoryInput({...categoryInput, error_list: []});
    const data = {
      slug: categoryInput.slug,
      name: categoryInput.name,
      description: categoryInput.description,
      status: categoryInput.status,
      meta_title: categoryInput.meta_title,
      meta_keywords: categoryInput.meta_keywords,
      meta_description: categoryInput.meta_description,
    };

    axios.post("/api/admin/category-store", data).then((res) => {
      if (res.data.success) {
        if (res.data.status === "success") {
          document.getElementById("category-form").reset();
          swal('Success', res.data.message, 'success');
        }} else {
          if(res.data.status === 'validation-error'){
            setCategoryInput({...categoryInput, error_list: res.data.errors})
          }else{
            swal("Error", res.data.message, "error");
          }
        }
    });
  };

  return (
    <div className="h-auto mt-5 shadow-md">
      <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 class="text-lg font-semibold text-gray-700 capitalize">
          Add Category
        </h2>

        <form onSubmit={handleSubmit} id="category-form">
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label class="text-gray-700" for="username">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                id="slug"
                onChange={handleInput}
                value={categoryInput.slug}
                placeholder="Slug"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {categoryInput.error_list.slug}
              </span>
            </div>

            <div>
            <label class="text-gray-700" for="emailAddress">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInput}
                value={categoryInput.name}
                placeholder="Name"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {categoryInput.error_list.name}
              </span>
            </div>

            <div>
              <label class="text-gray-700" for="emailAddress">
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
              <label class="text-gray-700" for="passwordConfirmation">
                Status
              </label>
              <input
                type="checkbox"
                name="status"
                value={categoryInput.status}
                onChange={handleInput}
                id="status"
                class="block px-4 py-4 m-4 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <hr className="m-4" />

          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label class="text-gray-700" for="username">
                Meta Title
              </label>
              <input
                type="text"
                name="meta_title"
                id="meta_title"
                onChange={handleInput}
                value={categoryInput.meta_title}
                placeholder="Meta Title"
                class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {categoryInput.error_list.meta_title}
              </span>
            </div>

            <div>
            </div>

            <div>
              <label class="text-gray-700" for="emailAddress">
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
              <label class="text-gray-700" for="emailAddress">
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

          <div class="flex justify-end mt-6">
            <button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Category;
