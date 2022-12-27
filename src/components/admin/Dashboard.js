import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dashboardDataApi } from "../../service/serviceApi";

import {
  HiOutlineUserGroup,
  HiOutlineShoppingCart,
  HiOutlineShoppingBag,
} from "react-icons/hi";

const Dashboard = () => {
  const initialData = {
    countCategory: null,
    countProduct: null,
    countUser: null,
  };

  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState(initialData);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = () => {
    dashboardDataApi().then((res) => {
      if (res.data.success) {
        if (res.data.status === "success") {
          setIsLoading(false);
          setCardData(res.data.cardData);
        }
      }
    });
  };

  return (
    <>
      {!isLoading && (
        <div className="flex items-center">
          <div role="status">
            <span>Loading...</span>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="container bg-gray-100 mx-auto p-5">
          <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
            <div className="rounded border-gray-300 h-24">
              <div className="flex flex-row bg-white shadow-sm rounded p-5">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                  <HiOutlineShoppingCart size={24} />
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-lg font-bold">
                    {cardData.countProduct} Products
                  </div>
                  <div className="text-gray-500 hover:underline">
                    <Link to="/admin/product" classname="tracking-tight">
                      <span className="text-sm">View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded border-gray-300 h-24">
              <div className="flex flex-row bg-white shadow-sm rounded p-5">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                  <HiOutlineUserGroup size={24} />
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-lg font-bold">
                    {cardData.countUser} Users
                  </div>
                  <div className="text-gray-500 hover:underline">
                    <Link to="/admin/product" classname="tracking-tight">
                      <span className="text-sm">View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded border-gray-300 h-24">
              <div className="flex flex-row bg-white shadow-sm rounded p-5">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                  <HiOutlineShoppingBag size={24} />
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-lg font-bold">
                    {cardData.countCategory} Categories
                  </div>
                  <div className="text-gray-500 hover:underline">
                    <Link to="/admin/category" classname="tracking-tight">
                      <span className="text-sm">View Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
