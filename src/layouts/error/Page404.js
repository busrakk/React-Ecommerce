/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    // <div className="container">
    //   <div className="col-md-6 mx-auto text-center py-5">
    //     <h2>404 NOT FOUND</h2>
    //     <p>Oops! The page you requested was not found !</p>
    //     <Link className="bg-blue-500" to="/">
    //       Back to Home
    //     </Link>
    //   </div>
    // </div>

    
<main className="bg-white overflow-hidden h-screen relative">
    <header className="absolute top-0 left-0 right-0 z-20">
        <nav className="container mx-auto px-6 md:px-12 py-4">
            <div className="md:flex justify-between items-center">
                <div className="flex justify-between items-center">
                    <div className="md:hidden">
                        <button className="text-gray-800 focus:outline-none">
                            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <div className="container mx-auto h-screen pt-32 md:pt-0 px-6 z-10 flex items-center justify-between">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row justify-between items-center relative">
            <div className="w-full mb-16 md:mb-8 text-center lg:text-left">
                <h1 className="font-light font-sans text-center lg:text-left text-5xl lg:text-8xl mt-12 md:mt-0 text-gray-700">
                    Sorry, this page isn&#x27;t available
                </h1>
                <div className="mt-16">
                    <Link to="/" className="px-2 py-2 w-36 font-light transition ease-in duration-200 hover:bg-yellow-400 border-2 text-lg border-gray-700 bg-yellow-300 focus:outline-none">
                    Go back home
                    </Link>
                </div>
            </div>
            {/* <div className="block w-full mx-auto md:mt-0 relative max-w-md lg:max-w-2xl">
                <img src="/images/illustrations/1.svg"/>
            </div> */}
        </div>
    </div>
</main>


  );
};

export default Page404;
