"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/app/owner/components/header/Header";
import SideBar from "@/app/owner/components/sidebar/SideBar";
import Link from "next/link";
import Swal from "sweetalert2";
import Pagination from "../../components/pagination/page";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Good Health");
  const [selected, setSlected] = useState("Completed");
  const [isStatusCurrent, setIsStatusCurrent] = useState(false);

  const dropdownRef = useRef(null);
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
  };
  const handle = (option) => {
    setSlected(option);
    setIsStatusCurrent(false);
  }
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
      setIsOpen(false);
      setIsStatusCurrent(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const getStatusColor = (status) => {
    if (status === "Good") return "text-green-500 font-medium";
    if (status === "Upcoming Maintenance") return "text-yellow-400 font-medium";
    if (status === "Urgent Repair") return "text-red-400 font-medium";
    if (currentStatus === "Completed") return "text-green-800 font medium";
    if (currentStatus === "Uncompleted") return "text-red-800 font medium";
    return "text-gray-600";
  };
  const [status, setStatus] = useState("Incomplete"); // Default status

  const toggleStatus = () => {
    const newStatus = status === "Incomplete" ? "Complete" : "Incomplete";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this as ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, mark as ${newStatus}`,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setStatus(newStatus);
        Swal.fire("Updated!", `Status changed to ${newStatus}.`, "success");
      }
    });
  };

  const DeleteRecord = () => {
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

  const products = [
    {
      name: "Apple MacBook Pro 17",
      image: "/icons/image_1.png",
      status: "Good",
      currentStatus: "Completed",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
    {
      name: "Microsoft Surface Pro",
      image: "/icons/image_2.png",
      status: "Upcoming Maintenance",
      currentStatus: "Uncompleted",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
    {
      name: "Magic Mouse 2",
      image: "/icons/image_3.png",
      status: "Upcoming Maintenance",
      currentStatus: "Uncompleted",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
    {
      name: "Google Pixel Phone",
      image: "/icons/image_4.png",
      status: "Urgent Repair",
      currentStatus: "Completed",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
    {
      name: "Apple Watch 5",
      image: "/icons/image_5.png",
      status: "Good",
      currentStatus: "Completed",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
    {
      name: "Google Pixel Phone",
      image: "/icons/image_4.png",
      status: "Urgent Repair",
      currentStatus: "Completed",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
    {
      name: "Apple Watch 5",
      image: "/icons/image_5.png",
      status: "Good",
      currentStatus: "Uncompleted",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const dropdownToggle = () => {
    setIsStatusCurrent(!isStatusCurrent);
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
        <SideBar section="Appliance Management" />
      </aside>

      <div className="sm:ml-64">
        <Header appear={false} title={"Appliance Management"} />
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
              <div className={` flex flex-row items-center gap-3`}>
                <p className="text-[#6B7280] text-sm pr-2">Filter by</p>
                <div className="relative inline-block">
                  <button
                    onClick={toggleDropdown}
                    ref={dropdownRef}
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
                        {[
                          "Good Health",
                          "Upcoming Maintenance with Details",
                          "Urgent Repair Required Immediately",
                        ].map((option) => (
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
                <div className="relative inline-block">
                  <button
                    onClick={dropdownToggle}
                    ref={dropdownRef}
                    className="text-black font-medium rounded-full text-sm px-6 py-[5px] text-center inline-flex items-center border border-gray-300 w-40"
                    type="button"
                  >
                    <p className="text-[#777777] truncate w-32 overflow-hidden whitespace-nowrap">
                      {selected}
                    </p>
                    <svg
                      className="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#777777"
                      viewBox="0 0 10 6"
                      style={{
                        transform: isStatusCurrent ? "rotate(180deg)" : "rotate(0deg)",
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
                  {isStatusCurrent && (
                    <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-40 absolute top-full left-0 border border-gray-200 mt-2">
                      <ul className="py-2 text-sm text-gray-700">
                        {[
                          "Completed",
                          "Uncompleted",
                        ].map((option) => (
                          <li key={option}>
                            <button
                              onClick={() => handle(option)}
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
              </div>

              {/* Add Item Button */}
              <Link
                href="/owner/appliance_management/add_appliance"
                className="bg-[#FF9100] text-white px-4 py-1 text-sm rounded-md hover:bg-[#d17701] shadow-lg"
              >
                <div className="flex flex-row justify-center items-center">
                  <img
                    src="/icons/material-symbols_add.png"
                    className="w-6 h-6"
                    alt=""
                  />
                  Add Appliance
                </div>
              </Link>
            </div>

            {/* Table of items */}
            <div className="relative overflow-x-auto scrollbar pt-12">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-center text-base text-gray-700 font-light bg-white">
                  <tr>
                    <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Name
                    </th>
                    <th className="text-center text-black px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Maintenance Status
                    </th>
                    <th className="text-center text-black px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Current Status
                    </th>
                    <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Last Service
                    </th>
                    <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Purchase Date
                    </th>
                    <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Warranty
                    </th>
                    <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Change Status
                    </th>
                    <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map((product, index) => (
                    <tr
                      key={index}
                      className="odd:bg-[#F5F5F5] even:bg-white border-b border-gray-200 text-center"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        {product.name}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </td>
                      {/* current Status */}
                      <td
                        className="px-6 py-4 text-sm text-[#5E5E5E]"
                      >
                        {product.currentStatus}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                        {product.service}
                      </td>
                      <td className="px-6 py-4 text-sm text-black">
                        {product.date}
                      </td>
                      <td className="px-6 py-4">{product.warranty}</td>
                      <td className="px-6 py-4">
                        <Link
                          href="#"
                          onClick={toggleStatus}
                          className={`p-2 text-blue text-sm rounded-md underline ${status === "Incomplete" ? "text-blue-500 hover:text-red-600" : "bg-red-500"
                            }`}
                        >
                          {status === "Incomplete" ? "Update" : "Update"}
                        </Link>
                      </td>
                      <td className="px-6 py-4 flex items-center justify-center gap-1">
                        <Link
                          href={`../appliance_management/view_appliance/${index}`}
                          className="text-gray-800 hover:text-blue-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            class="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                          {/*<img
                            src="/icons/lets-icons_view-fill.png"
                            className="w-auto h-auto max-w-10 max-h-10 sm:max-w-12 sm:max-h-12 md:max-w-14 md:max-h-14 lg:max-w-16 lg:max-h-16"
                            alt="View"
                          />*/}
                        </Link>
                        <button className="text-red-600 hover:text-red-800" onClick={DeleteRecord}>
                          {/*<img
                            src="/icons/ic_baseline-delete.png"
                            className="w-auto h-auto max-w-8 max-h-8 sm:max-w-10 sm:max-h-10 md:max-w-12 md:max-h-12 lg:max-w-14 lg:max-h-14"
                            alt="Delete"
                          />*/}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            class="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
