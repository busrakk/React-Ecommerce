import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import {
  categoryFindApi,
  categoryUpdateApi,
} from "../../../service/serviceApi";
import Switch from "../../elements/Switch";

function CategoryUpdateForm(props) {
  const initialData = {
    slug: "",
    name: "",
    description: "",
    meta_title: "",
    meta_keywords: "",
    meta_descripiton: "",
    error_list: [],
  };

  const [categoryInput, setCategoryInput] = useState(initialData);
  const [error_list, setErrorList] = useState([]);
  const [status, setStatus] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getCurrentData(props.categoryId);
  }, [props.categoryId]);

  const handleStatus = () => {
    setStatus(!status);
  };

  const getCurrentData = (id) => {
    categoryFindApi(id, []).then((res) => {
      if (res.data.success) {
        if (res.data.status === "success") {
          setCategoryInput(res.data.data);
          setStatus(res.data.data.status === 1 ? true : false);
          setLoader(false);
        } else {
          swal("Error", res.data.message, "error");
        }
      } else {
        swal("Error", res.data.message, "error");
      }
    });
  };

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
      status: status,
      meta_title: categoryInput.meta_title,
      meta_keywords: categoryInput.meta_keywords,
      meta_descripiton: categoryInput.meta_descripiton,
    };

    categoryUpdateApi(props.categoryId, data).then((res) => {
      if (res.data.success) {
        if (res.data.status === "success") {
          swal("Success", res.data.message, "success");
          props.onClose("success");
        }
      } else {
        if (res.data.status === "validation-error") {
          setErrorList(res.data.errors);
        } else {
          swal("Error", res.data.message, "error");
        }
      }
    });
  };

  return (
    <>
      {loader && (
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="mx-auto" role="status">
              <span className="visually-hidden">Loading ...</span>
            </div>
          </div>
        </div>
      )}
      {!loader && (
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
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
                <span className="text-red-500">{error_list.slug}</span>
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
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
                <span className="text-red-500">{error_list.name}</span>
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
                  rows="4"
                  id="description"
                ></textarea>
                <span className="text-red-500">{error_list.description}</span>
              </div>

              <div className="space-x-4 m-10">
                <label className="text-gray-700">Status</label>
                <Switch
                  isOn={status}
                  handleToggle={handleStatus}
                  onColor="#32c832"
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
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
                <span className="text-red-500">{error_list.meta_title}</span>
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
                  rows="4"
                  id="meta_keywords"
                ></textarea>
                <span className="text-red-500">{error_list.meta_keywords}</span>
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
                  rows="4"
                  id="description"
                ></textarea>
                <span className="text-red-500">
                  {error_list.meta_description}
                </span>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Update
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

export default CategoryUpdateForm;
