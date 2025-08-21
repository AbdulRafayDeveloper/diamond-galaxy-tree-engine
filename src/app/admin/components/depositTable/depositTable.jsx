"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";

const Table = ({ products }) => {

  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRefs = useRef([]);

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      const isClickInsideDropdown = dropdownRefs.current.some((ref) =>
        ref?.contains(event.target)
      );
      if (!isClickInsideDropdown) {
        setOpenDropdownIndex(null);
      }
    }
  };

  const DeleteRecorde = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Approve this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0D4715",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Approved!", "Record has been approved.", "success");
      }
    });
  };

  // reset password
  const ResetPassword = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Reject",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Reject!", "Reject Record Successfully", "success");
      }
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(true);
  };

  const closeModal = () => {
    setIsZoomed(false);
  };

  return (
    <div className="relative overflow-x-auto scrollbar-none pt-12 ">
      <table className="w-full text-sm text-left text-gray-500 p-3">
        <thead className="text-center text-base text-gray-700 font-light bg-white">
          <tr>
            <th className="text-black text-center px-6 py-3  font-normal font-Poppins whitespace-nowrap">
              Username
            </th>
            <th className="text-center text-black px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Email
            </th>
            <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Amount
            </th>
            <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Payment Gateway
            </th>
            <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Upload Transcript
            </th>
            <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className="odd:bg-[#F6F1DE] even:bg-white border-b border-gray-200 text-center "
            >
              <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                {product.username}
              </td>
              <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                {product.email}
              </td>
              <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                {product.amount}
              </td>
              <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                {product.paymentGateway}
              </td>
              <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                <div className="flex justify-center items-center cursor-pointer" onClick={handleImageClick}>
                  <Image 
                    src={product.image || "/placeholder.png"} 
                    alt="image" 
                    width={40} 
                    height={30}
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>

                {/* Zoom Modal */}
                {isZoomed && (
                  <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center" onClick={closeModal}>
                    <Image
                      src={product.image || "/placeholder.png"}
                      alt="Zoomed image"
                      width={250}
                      height={250}
                      className="rounded shadow-lg transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </div>
                )}

              </td>

              <td className="px-6 py-6 flex justify-center items-center gap-2">
                <div className="px-6 py-6 flex justify-center items-center text-center">
                  <button className="text-gray-800 hover:text-blue-800 text-lg" onClick={ResetPassword}>
                    {/* View Icon */}
                    ❌
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 text-lg"
                    onClick={DeleteRecorde}
                  >
                    {/* Delete Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="size-6" fill="#255F38" stroke="#255F38">
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
