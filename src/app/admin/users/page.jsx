"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/app/admin/components/header/Header";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import Table from "@/app/admin/components/itemTable/Table";
import Link from "next/link";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Active");

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
  };

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

  const products = [
    {
      name: "Johnathan Smith",
      propertyAddress: "111 W Main St Gamer, NC 27529",
      status: "Active",
      date: "15/may/2024",
    },
    {
      name: "Johnathan Smith",
      propertyAddress: "111 W Main St Gamer, NC 27529",
      status: "Pending",
      date: "15/may/2024",
    },
    {
      name: "Johnathan Smith",
      propertyAddress: "111 W Main St Gamer, NC 27529",
      status: "Expire",
      date: "15/may/2024",
    },
    {
      name: "Johnathan Smith",
      propertyAddress: "111 W Main St Gamer, NC 27529",
      status: "Active",
      date: "15/may/2024",
    },
    {
      name: "Johnathan Smith",
      propertyAddress: "111 W Main St Gamer, NC 27529",
      status: "Active",
      date: "15/may/2024",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filteredProperties = products.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <SideBar section="Users" />
      </aside>

      <div className="sm:ml-64">
        <Header appear={false} title={"All Users"} />
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
              {/* <div className={` flex flex-row items-center`}>
                <p className="text-[#6B7280] text-sm pr-2">Filter by</p>
                <div className="relative inline-block">
                  <button
                    onClick={toggleDropdown}
                    className="text-black font-medium rounded-full text-sm px-6 py-[5px] text-center inline-flex items-center border border-gray-300 w-40"
                    type="button"
                  >
                    <p className="text-[#777777] truncate w-32 overflow-hidden whitespace-nowrap">
                      {selectedOption}
                    </p>
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#777777"
                      viewBox="0 0 10 6"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 absolute top-full left-0 border border-gray-200 mt-2">
                      <ul className="py-2 text-sm text-gray-700">
                        {["Active", "Pending", "Expire"].map((option) => (
                          <li key={option}>
                            <button
                              onClick={() => handleSelect(option)}
                              className="block px-4 py-2 hover:bg-gray-100 w-full text-left truncate"
                            >
                              {option}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div> */}

              {/* Add Item Button */}
              {/* <Link
                href="/mortageLender/payment_subscriptions/homeowner_detail"
                className="bg-[#FF9202] text-white px-4 py-1 text-sm rounded-md hover:bg-[#FF9202] shadow-lg"
              >
                <div className="flex flex-row justify-center items-center">
                  <img
                    src="/icons/material-symbols_add.png"
                    className="w-6 h-6"
                    alt=""
                  />
                  Add Homeowner
                </div>
              </Link> */}
            </div>

            {/* Table of items */}
            <Table products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
