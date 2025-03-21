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

  const [selectOption, setSelectOption] = useState("Plumber");
  const dropdownRef = useRef(null);
  const handleSelect = (option) => {
    setSelectOption(option);
    setIsOpen(false); // Close dropdown after selection
  };
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)} ...` : text;
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
      setIsOpen(false);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const properties = [
    {
      id: 1,
      name: "St David",
      service_type: "Plumber",
      company_name: "Alpha",
      contact_detail: "93 74329",
      imageUrl: "/Rectangle 5185.png",
    },
    {
      id: 2,
      name: "Marrie",
      service_type: "Plumber",
      company_name: "Alpha",
      contact_detail: "93 74329",
      imageUrl: "/Rectangle 5185.png",
    },
    {
      id: 3,
      name: "Marrie",
      service_type: "Plumber",
      company_name: "Alpha",
      contact_detail: "93 74329",
      imageUrl: "/Rectangle 5185.png",
    },{
      id: 4,
      name: "Marrie",
      service_type: "Plumber",
      company_name: "Alpha",
      contact_detail: "93 74329",
      imageUrl: "/Rectangle 5185.png",
    },{
      id: 5,
      name: "Marrie",
      service_type: "Plumber",
      company_name: "Alpha",
      contact_detail: "93 74329",
      imageUrl: "/Rectangle 5185.png",
    },{
      id: 6,
      name: "Marrie",
      service_type: "Plumber",
      company_name: "Alpha",
      contact_detail: "93 74329",
      imageUrl: "/Rectangle 5185.png",
    },
  ];

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [modalOpen, setModalOpen] = useState(false);

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
        <SideBar section="Contractor Management" />
      </aside>

      <div className="sm:ml-64">
        <Header appear={false} title={"Contractor Management"} />
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
              <div className={` flex flex-row items-center`}>
                <p className="text-[#6B7280] text-sm pr-2">Filter by</p>
                <div className="relative inline-block">
                  <button
                    onClick={toggleDropdown}
                    ref={dropdownRef}
                    className="text-black font-medium rounded-full text-sm px-6 py-[5px] text-center inline-flex items-center border border-gray-300"
                    type="button"
                  >
                    <p className="text-[#777777] truncate w-32 overflow-hidden whitespace-nowrap">
                      {selectOption}
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
                        {["Plumber", "Electrician"].map((option) => (
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
              </div>

              {/* Add Item Button */}
              <Link
                href="/owner/contractor_management/add_contractors"
                className="bg-[#FF9100] text-white px-4 py-1 text-sm rounded-md hover:bg-[#e88402] shadow-lg"
              >
                <div className="flex flex-row justify-center items-center">
                  <img
                    src="/icons/material-symbols_add.png"
                    className="w-6 h-6"
                    alt=""
                  />
                  Add Contractor
                </div>
              </Link>
            </div>

            <div className="relative overflow-x-auto scrollbar pt-12">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-center text-base text-gray-700 font-light bg-white">
                  <tr>
                    <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Name
                    </th>
                    <th className="text-center text-black px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Company Name
                    </th>
                    <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Service Type
                    </th>
                    <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Contact Details
                    </th>
                    <th className="text-black text-center px-6 py-3 font-normal font-Poppins whitespace-nowrap">
                      Activity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map((product, index) => (
                    <tr
                      key={index}
                      className="odd:bg-[#F5F5F5] even:bg-white border-b border-gray-200 text-center"
                    >
                      <td className="px-6 py-4 text-sm text-black">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-black">
                        {product.company_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-black">
                        {product.service_type}
                      </td>

                      <td className="px-6 py-4 text-sm text-black">
                        {product.contact_detail}
                      </td>

                      <td className="px-6 py-4 flex items-center justify-center gap-1">
                        <button
                          onClick={() => setModalOpen(true)}
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
                        </button>
                        {modalOpen && (
                          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-20">
                            <div className="bg-white w-[680px] h-[500px] rounded-lg shadow-lg overflow-y-scroll ">
                              <div className="flex bg-[#FF9100] items-center justify-center text-center p-6 rounded-t-lg">
                                <h2 className="text-white text-lg">
                                  Contractor Details
                                </h2>
                              </div>
                              <div className="bg-white">
                                <div className="flex flex-col justify-center items-center mt-5">
                                  <div>
                                    <h2 className="text-lg">John Smith</h2>
                                  </div>
                                  <div className="flex gap-5 mt-3">
                                    {/* <div>
                                      <button className="bg-[#FF9100] p-2 rounded-lg w-[150px] text-white">
                                        call me
                                      </button>
                                    </div> */}
                                    <div>
                                      <button className="bg-[#F5F5F5] p-2 rounded-lg w-[150px]">
                                        <Link href={`/owner/contractor_management/edit_contractor/${product.id}`} className="flex flex-row gap-2">
                                          <img
                                            src="/icons/ic_round-edit.png"
                                            className="w-4 h-4"
                                            alt="edit"
                                          />
                                          <span>Edit details</span>
                                        </Link>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                {/* details */}
                                <div className="flex justify-center">
                                  <div className="grid grid-cols-3 gap-8 p-2 mt-5">
                                    <p>
                                      <strong>Service Type:</strong> <br></br>{" "}
                                      <span>Plumber</span>
                                    </p>
                                    <p>
                                      <strong>Company Name: </strong>
                                      <br></br> <span>Alpha B</span>
                                    </p>
                                    <p>
                                      <strong>Contact Website: </strong>
                                      <br></br> <span>john123@gmail.com</span>
                                    </p>
                                    <p>
                                      <strong>Contact Phone:</strong> <br></br>{" "}
                                      <span>123 456 789</span>
                                    </p>
                                    <p>
                                      <strong>Contact Email:</strong> <br></br>{" "}
                                      <span>john123@gmail.com</span>
                                    </p>
                                  </div>
                                </div>
                                <div className="p-4">
                                  <h2 className="text-lg font-bold">
                                    Additional Notes:
                                  </h2>
                                  <p>
                                    Please perform a thorough inspection of the
                                    HVAC system, including the furnace, air
                                    conditioning unit, and ductwork. Clean and
                                    replace any necessary filters, check for
                                    leaks, and ensure that the refrigerant
                                    levels are appropriate. Test the thermostat
                                    and verify that all controls are functioning
                                    properly.replace any necessary filters, check for
                                    leaks, and ensure that the refrigerant
                                    levels are appropriate. Test the thermostat
                                    and verify that all controls are functioning
                                    properly.replace any necessary filters, check for
                                    leaks, and ensure that the refrigerant
                                    levels are appropriate. Test the thermostat
                                    and verify that all controls are functioning
                                    properly.
                                  </p>
                                </div>
                                <div className="flex justify-center items-center pb-3">
                                  <button
                                    onClick={() => setModalOpen(false)}
                                    className="p-2 w-[150px] text-white bg-[#FF9100] rounded-lg hover:bg-[#eb8601]"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
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
            <Pagination/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
