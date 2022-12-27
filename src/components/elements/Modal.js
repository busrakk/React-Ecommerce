import React, { useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Modal = ({ title, show, onClose, children, customClass = "md" }) => {
  const openModal = () => {
    document.getElementById("backdrop").style.display = "block";
    document.getElementById("exampleModal").style.display = "block";
    document.getElementById("exampleModal").classList.add("show");
  };
  const closeModal = () => {
    document.getElementById("exampleModal").classList.add("exit");
    setTimeout(() => {
      document.getElementById("backdrop").style.display = "none";
      document.getElementById("exampleModal").style.display = "none";
      document.getElementById("exampleModal").classList.remove("show");
      document.getElementById("exampleModal").classList.remove("exit");
    }, 500);
  };
  useEffect(() => {
    if (show === true) {
      openModal();
    } else if (show === false) {
      closeModal();
    }
  }, [show]);

  return (
    <>
      <div className="mx-24 mt-10" id="exampleModal">
        <nav className="bg-white shadow">
          <div className="px-8 mx-auto max-w-7xl">
            <div className="flex items-center justify-between h-16">
              <div className=" flex items-center">
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    <div className={`modal-${customClass}`}>
                      <h5
                        className="text-gray-900 mt-5 px-3 py-2 rounded-md text-2xl font-bold"
                        id="exampleModalLabel"
                      >
                        {title}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block">
                <div className="flex items-center ml-4 md:ml-6">
                  <div className="relative ml-3">
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          onClick={() => onClose()}
                          type="button"
                          className=" close flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 focus:ring-red-300"
                          id="options-menu"
                        >
                          <IoMdCloseCircleOutline
                            size={24}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>{show && children}</div>
        </nav>
      </div>

      <div className="show" id="backdrop" style={{ display: "none" }}></div>
    </>
  );
};

export default Modal;
