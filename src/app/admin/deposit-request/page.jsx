"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/app/admin/components/header/Header";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import Table from "@/app/admin/components/depositTable/depositTable";
import Pagination from "../components/pagination/Pagination";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Swal from "sweetalert2";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dropdownRefs = useRef([]);

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
      username: "Ali",
      email: "abcd1234@gmail.com",
      amount: "0.00$",
      paymentGateway: "Debit/Credit",
      image: "/transcript.webp",
    },
    {
      username: "Rafy",
      email: "abcd1234@gmail.com",
      amount: "0.00$",
      paymentGateway: "Debit/Credit",
      image: "/transcript.webp",
    },
    {
      username: "Abbas",
      email: "abcd1234@gmail.com",
      amount: "0.00$",
      paymentGateway: "Debit/Credit",
      image: "/transcript.webp",
    },
    {
      username: "Husnain",
      email: "abcd1234@gmail.com",
      amount: "0.00$",
      paymentGateway: "Debit/Credit",
      image: "/transcript.webp",
    },
    {
      username: "Qasim",
      email: "abcd1234@gmail.com",
      amount: "0.00$",
      paymentGateway: "Debit/Credit",
      image: "/transcript.webp",
    },
  ];

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [withdrawals, setWithdrawals] = useState([]);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const fetchWithdrawals = async (search = "", pageNumber = 1) => {
    try {
      const token = Cookies.get("token");

      const response = await axios.get("/api/admin/depositors", {
        params: {
          search,
          pageNumber,
          pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);

      if (response.data.status == 200) {
        const data = response.data.data;
        setWithdrawals(data.depositors);

        setTotalWithdrawals(data.totalDepositors);

        setCurrentPage(data.pageNumber);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("API responded with error:", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(
        "Error fetching withdrawals:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchWithdrawals(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

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

  const handleDepositAction = async (withdrawal, actionType) => {
    try {
      const token = Cookies.get("token");

      const response = await axios.put(
        `/api/admin/depositors/${withdrawal._id}`,
        { status: actionType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        Swal.fire(
          actionType === "accepted" ? "Approved!" : "Rejected!",
          `Deposit ${actionType}.`,
          "success"
        );
        fetchWithdrawals(searchTerm, currentPage);
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || error.message,
        "error"
      );
    }
  };

  const section = "Desposit Request";
  return (
    <div className="overflow-y-auto scrollbar-hidden">
      <div className="p-2 w-full">
        <div className="flex items-center justify-between">
          {/* Mobile: Show sidebar toggle */}
          <button
            ref={buttonRef}
            onClick={handleSidebarToggle}
            aria-controls="separator-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
              />
            </svg>
          </button>

          {/* Title */}
          <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64 p-5">
            Desposit Request
          </p>

          {/* Header component */}
          <div className="ml-auto">
            <Header appear={true} />
          </div>
        </div>
        <aside
          ref={sidebarRef}
          id="separator-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <SideBar section={section} />
        </aside>
      </div>

      <div className="sm:ml-64">
        {/* <Header appear={false} title={"All Users"} /> */}
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
            </div>

            {/* Table of items */}
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
                      Status
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
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-10">
                        <div className="flex flex-col items-center justify-center text-gray-500 text-sm">
                          <div className="w-8 h-8 border-4 border-gray-300 border-t-[#22405c] rounded-full animate-spin mb-2"></div>
                          Loading...
                        </div>
                      </td>
                    </tr>
                  ) : withdrawals.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-10 text-sm text-gray-500"
                      >
                        No deposit requests found.
                      </td>
                    </tr>
                  ) : (
                    withdrawals.map((deposit, index) => (
                      <tr
                        key={index}
                        className="odd:bg-[#F6F1DE] even:bg-white border-b border-gray-200 text-center"
                      >
                        <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                          {deposit.user_id?.fname || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                          {deposit.user_id?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                          ${deposit.amount?.toFixed(2) || "0.00"}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                          {deposit.paymentMethod || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                          {deposit.status || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#5E5E5E]">
                          <div
                            className="flex justify-center items-center cursor-pointer"
                            onClick={() => handleImageClick(deposit.screenshot)}
                          >
                            <Image
                              src={deposit.image || "/transcript.webp"}
                              alt="Uploaded"
                              width={40}
                              height={30}
                            />
                          </div>
                          {isZoomed && (
                            <div
                              className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
                              onClick={closeModal}
                            >
                              <Image
                                src={deposit.screenshot || "/transcript.webp"}
                                alt="Zoomed image"
                                width={250}
                                height={250}
                                className="rounded shadow-lg transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-6 flex justify-center items-center gap-2">
                          {deposit.status === "pending" ? (
                            <>
                              <button
                                className="text-gray-800 hover:text-blue-800 text-lg"
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are you sure?",
                                    text: "Do you want to reject this deposit request?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#DC2626",
                                    cancelButtonColor: "#6B7280",
                                    confirmButtonText: "Yes, Reject",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      handleDepositAction(deposit, "rejected");
                                    }
                                  });
                                }}
                              >
                                ❌
                              </button>
                              <button
                                className="text-green-600 hover:text-green-800 text-lg"
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are you sure?",
                                    text: "Do you want to approve this deposit request?",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#0D4715",
                                    cancelButtonColor: "#6B7280",
                                    confirmButtonText: "Yes, Approve",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      handleDepositAction(deposit, "accepted");
                                    }
                                  });
                                }}
                              >
                                ✅
                              </button>
                            </>
                          ) : (
                            <span className="text-gray-400 text-sm">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {totalWithdrawals > pageSize && (
              <Pagination
                totalItems={totalWithdrawals}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
