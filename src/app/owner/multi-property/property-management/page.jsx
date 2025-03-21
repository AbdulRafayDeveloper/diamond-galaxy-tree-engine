"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/app/owner/components/header/Header";
import SideBar from "@/app/owner/components/sidebar/SideBar";
import Link from "next/link";
import Pagination from "../../components/pagination/page";
import Swal from "sweetalert2";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  const properties = [
    {
      id: 1,
      name: "St Gamer Property",
      address: "111 W Main St Gamer, NC 27529",
      purchaseDate: "2/22/2022",
      yearBuilt: 2001,
      squareFoot: 1857,
      imageUrl: "/Rectangle 5185.png",
    },
    {
      id: 2,
      name: "Oakwood Estate",
      address: "500 Oakwood Dr, CA 90210",
      purchaseDate: "5/10/2018",
      yearBuilt: 1995,
      squareFoot: 2500,
      imageUrl: "/Rectangle 5185.png",
    },
  ];

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DeleteRecorde = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this record?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DC2626", // Red color for confirm button
        cancelButtonColor: "#6B7280", // Gray for cancel button
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Record has been deleted.",
            icon: "success",
          });
        }
      });
    };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="overflow-y-auto scrollbar-hidden">
      <button
        ref={buttonRef}
        onClick={handleSidebarToggle}
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        ref={sidebarRef}
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <SideBar section="Multi-Property Management" />
      </aside>

      <div className="sm:ml-64">
        <Header appear={false} title={"Multi-Property Management"} />
        <div className="p-6 bg-white">
          <div className="mx-auto bg-white">
            <div className="flex flex-col sm:flex-row gap-4 w-full pt-1 justify-end items-center">
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-[5px] w-full border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#FF9100] text-sm"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Add Item Button */}
              <Link
                href="/owner/multi-property/add-property"
                className="bg-[#FF9100] text-white px-4 py-1 text-sm rounded-md hover:bg-[#e07d00] shadow-lg"
              >
                <div className="flex flex-row justify-center items-center">
                  <img
                    src="/icons/material-symbols_add.png"
                    className="w-6 h-6"
                    alt=""
                  />
                  Add Property
                </div>
              </Link>
            </div>

            {/* Table of items */}
            <div className="flex flex-col gap-3 pt-4">
              <p className="text-base">Select Property</p>
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-red-300 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-md"
                  >
                    {/* Image Section */}
                    <img
                      src={property.imageUrl}
                      alt={property.name}
                      className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-md object-cover"
                    />

                    {/* Text Section */}
                    <div className="flex-1">
                      {/* Property Name */}
                      <h2 className="text-lg sm:text-xl md:text-2xl text-[#393939] font-bold font-sans">
                        {property.name}
                      </h2>

                      {/* Property Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full pt-2">
                        {/* Address (Expands on Click) */}
                        <p
                          className={`text-sm cursor-pointer ${expanded
                              ? "whitespace-normal"
                              : "overflow-hidden text-ellipsis whitespace-nowrap"
                            }`}
                          onClick={() => setExpanded(!expanded)}
                        >
                          <span className="font-semibold">Address:</span>
                          <br />
                          {property.address}
                        </p>

                        {/* Other Details */}
                        <p className="text-sm">
                          <span className="font-semibold">Purchase Date:</span>
                          <br />
                          {property.purchaseDate}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Year Built:</span>
                          <br />
                          {property.yearBuilt}
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Square Foot:</span>
                          <br />
                          {property.squareFoot}
                        </p>
                      </div>
                      {/* View Property Button - Moves Below on Small Screens */}
                      <div className="mt-4 sm:mt-0 flex sm:justify-end gap-3">
                        <Link
                          href={`../multi-property/view-property/${property.id}`}
                          className="bg-[#0B4EA5] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full sm:w-auto text-center"
                        >
                          View 
                        </Link>

                        <Link
                          href={`#`}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 w-full sm:w-auto text-center"
                          onClick={DeleteRecorde}
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No properties found.</p>
              )}
            </div>
            {/* Pagination */}
            <Pagination/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
