"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/app/admin/components/header/Header";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import Pagination from "../components/pagination/Pagination";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);

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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const fetchUsers = async (search = "", pageNumber = 1) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("/api/admin/activated", {
        params: { search, pageNumber, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status === 200) {
        const data = response.data.data;
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setCurrentPage(data.pageNumber);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  const handleDeactivate = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to deactivate this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Deactivate",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = Cookies.get("token");
          const response = await axios.put(
            `/api/admin/activated/${userId}`,
            null,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.status === 200) {
            Swal.fire(
              "Deactivated!",
              "The user has been deactivated.",
              "success"
            );
            fetchUsers(searchTerm, currentPage);
          } else {
            Swal.fire(
              "Error",
              response.data.message || "Something went wrong",
              "error"
            );
          }
        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data?.message || error.message,
            "error"
          );
        }
      }
    });
  };

  const section = "Activate Users";
  return (
    <div className="overflow-y-auto scrollbar-hidden">
      <div className="p-2 w-full">
        <div className="flex items-center justify-between">
          <button
            ref={buttonRef}
            onClick={handleSidebarToggle}
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
            </svg>
          </button>
          <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64 p-5">
            Activate Users
          </p>
          <div className="ml-auto">
            <Header appear={true} />
          </div>
        </div>
        <aside
          ref={sidebarRef}
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          <SideBar section={section} />
        </aside>
      </div>

      <div className="sm:ml-64 p-6 bg-white">
        <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-[5px] w-full border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#FF9100] text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" />
            </svg>
          </div>
          <Link href="/admin/activated-users/add-activate">
            <button className="p-2 bg-[#22405c] text-white rounded-md w-[80px]">
              ➕ Add
            </button>
          </Link>
        </div>

        <div className="relative overflow-x-auto scrollbar-none pt-12">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-center text-base text-gray-700 font-light bg-white">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Balance</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-10">
                    <div className="flex flex-col items-center justify-center text-gray-500 text-sm">
                      <div className="w-8 h-8 border-4 border-gray-300 border-t-[#22405c] rounded-full animate-spin mb-2"></div>
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={index}
                    className="odd:bg-[#F6F1DE] even:bg-white border-b text-center"
                  >
                    <td className="px-6 py-4">
                      {user.fname + " " + user.lname}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.accountBalance.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-[#22405c] text-white px-4 py-2 rounded"
                        onClick={() => handleDeactivate(user._id)}
                      >
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalUsers > pageSize && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalUsers / pageSize)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
