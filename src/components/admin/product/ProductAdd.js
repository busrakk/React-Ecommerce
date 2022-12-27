import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import {
  categoryDropdownApi,
  productSaveApi,
} from "../../../service/serviceApi";
//import { TiArrowBackOutline } from 'react-icons/ti';
import Switch from "../../elements/Switch";
import Select from "react-select";

function ProductAdd(onClose) {
  const initialData = {
    category: null,
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    slug: "",
    name: "",
    brand: "",
    selling_price: "",
    original_price: "",
    image: "",
    description: "",
    qty: "",
    featured: "",
    popular: "",
    quantity: "",
    error_list: [],
  };

  // const [categoryInput, setCategoryInput] = useState(initialData)
  const DEFAULT_CATEGORY = { label: "Select Category", value: "" };
  const [productInput, setProductInput] = useState(initialData);
  const [status, setStatus] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [popular, setPopular] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [categoryList, setCategoryList] = useState([DEFAULT_CATEGORY]);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [picture, setPicture] = useState([]);

  useEffect(() => {
    getCategoryDropdown();
  });

  const getCategoryDropdown = () => {
    categoryDropdownApi().then((res) => {
      if (res.data.success) {
        if (res.data.status === "success") {
          // setLoader(false)
          let allOptions = [];
          if (res.data.data.length > 0) {
            allOptions = res.data.data.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            });
            setCategoryList([DEFAULT_CATEGORY, ...allOptions]);
          }
        }
      }
      setLoader(false);
    });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const handleInput = (e) => {
    e.persist();
    setProductInput({ ...productInput, [e.target.name]: e.target.value });
  };

  const handleStatus = () => {
    setStatus(!status);
  };

  const handleFeatured = () => {
    setFeatured(!featured);
  };

  const handlePopular = () => {
    setPopular(!popular);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setProductInput({ ...productInput, error_list: [] });

    const formData = new FormData();
    formData.append("image", picture.image);
    formData.append("category", selectedCategory.value);
    formData.append("slug", productInput.slug);
    formData.append("name", productInput.name);
    formData.append("description", productInput.description);
    formData.append("meta_title", productInput.meta_title);
    formData.append("meta_keywords", productInput.meta_keywords);
    formData.append("meta_description", productInput.meta_description);
    formData.append("brand", productInput.brand);
    formData.append("selling_price", productInput.selling_price);
    formData.append("orginal_price", productInput.orginal_price);
    formData.append("quantity", productInput.quantity);
    formData.append("featured", featured === true ? 1 : 0);
    formData.append("status", status === true ? 1 : 0);
    formData.append("popular", popular === true ? 1 : 0);

    productSaveApi(formData).then((res) => {
      if (res.data.success) {
        if (res.data.status === "success") {
          swal("Success", res.data.message, "success");
          onClose("success");
        }
      } else {
        if (res.data.status === "validation-error") {
          setProductInput({ ...productInput, error_list: res.data.errors });
        } else {
          swal("Error", res.data.message, "error");
        }
      }
      setIsLoading(false);
    });
  };

  return (
    <section className="max-w-5xl p-4 mx-auto bg-white rounded-md shadow-md">
      {loader === false ? (
        <div className="flex text-center py-5">
          <div className="flex text-center">
            <div className="mx-auto" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {isLoading && (
            <div className="flex text-center">
              <div className="flex text-center">
                <div className="mx-auto" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label className="text-gray-700">Category</label>
              <Select
                options={categoryList}
                onChange={setSelectedCategory}
                value={selectedCategory}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="bg-red-500">
                {productInput.error_list.category}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="slug">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                id="name"
                onChange={handleInput}
                value={productInput.slug}
                placeholder="Slug"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {productInput.error_list.slug}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInput}
                value={productInput.name}
                placeholder="Name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {productInput.error_list.name}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                onChange={handleInput}
                value={productInput.description}
                placeholder="Description"
                rows="4"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              ></textarea>
              <span className="text-red-500">
                {productInput.error_list.description}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="metatitle">
                Meta Title
              </label>
              <textarea
                type="text"
                name="meta_title"
                onChange={handleInput}
                value={productInput.meta_title}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Meta title"
                rows="4"
                id="meta_title"
              ></textarea>
              <span className="text-red-500">
                {productInput.error_list.meta_title}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Meta Keywords
              </label>
              <textarea
                ntype="text"
                name="meta_keywords"
                onChange={handleInput}
                value={productInput.meta_keywords}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Meta Keywords"
                rows="4"
                id="meta_keywords"
              ></textarea>
              <span className="text-red-500">
                {productInput.error_list.meta_keywords}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Meta Description
              </label>
              <textarea
                name="meta_description"
                onChange={handleInput}
                value={productInput.meta_description}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Meta Description"
                rows="4"
                id="description"
              ></textarea>
              <span className="text-red-500">
                {productInput.error_list.meta_description}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="selling_price">
                Selling Price
              </label>
              <input
                type="number"
                name="selling_price"
                id="selling_price"
                value={productInput.selling_price}
                onChange={handleInput}
                placeholder="Selling Price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {productInput.error_list.selling_price}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="orginal_price">
                Orginal Price
              </label>
              <input
                type="number"
                name="orginal_price"
                value={productInput.orginal_price}
                onChange={handleInput}
                placeholder="Orginal Price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {productInput.error_list.orginal_price}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={productInput.quantity}
                onChange={handleInput}
                placeholder="Quantity"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {productInput.error_list.quantity}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="orginal_price">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={productInput.brand}
                onChange={handleInput}
                placeholder="Brand"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {productInput.error_list.brand}
              </span>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImage}
                accept="image/png, image/jpeg, image/jpeg"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              <span className="text-red-500">
                {productInput.error_list.image}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="space-x-4">
                <label className="text-gray-700" htmlFor="featured">
                  Featured
                </label>
                <Switch
                  isOn={featured}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                  handleToggle={handleFeatured}
                  index="1"
                />
              </div>

              <div className="space-x-4">
                <label className="text-gray-700" htmlFor="popular">
                  Popular
                </label>
                <Switch
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                  isOn={popular}
                  handleToggle={handlePopular}
                  index="2"
                />
              </div>

              <div className="space-x-4">
                <label className="text-gray-700" htmlFor="status">
                  Status
                </label>
                <Switch
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                  isOn={status}
                  handleToggle={handleStatus}
                  index="3"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end m-10">
            <button
              type="submit"
              className="px-10 py-3 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default ProductAdd;
