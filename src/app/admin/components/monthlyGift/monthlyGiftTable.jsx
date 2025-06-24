"use client";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import Pagination from "../pagination/Pagination";
import axios from "axios";
import Cookies from "js-cookie";

const MonthlyGiftTable = () => {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRefs = useRef([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");

      const response = await axios.get("/api/monthly-gift", {
        params: {
          pageNumber: currentPage,
          pageSize,
          search: searchTerm,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === 200) {
        setUsers(response.data.data.users);
        setTotalUsers(response.data.data.totalUsers);
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to fetch data",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm]);

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setAmount("");
    setSelectedUserId(null);
  };

  const handleSubmit = async () => {
    if (!amount) {
      Swal.fire("Validation Error", "Please enter an amount.", "warning");
      return;
    }

    try {
      const token = Cookies.get("token");

      const response = await axios.put(
        `/api/monthly-gift/${selectedUserId}`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        Swal.fire("Success", "Amount deposited successfully!", "success");
        closeModal();
        fetchData();
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to deposit amount",
        "error"
      );
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mb-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setCurrentPage(1);
              setSearchTerm(e.target.value);
            }}
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

      <div className="relative overflow-x-auto scrollbar-none pt-6">
        <table className="w-full text-sm text-left text-gray-500 p-3">
          <thead className="text-center text-base text-gray-700 font-light bg-white">
            <tr>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Monthly Gift</th>
              <th className="px-6 py-3">Action</th>
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
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-10">
                  No records found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="odd:bg-[#F6F1DE] even:bg-white border-b text-center"
                >
                  <td className="px-6 py-4">
                    {user.fname} {user.lname}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.monthly_gift}</td>

                  <td className="px-6 py-4">
                    <button
                      className="bg-[#22405c] text-white px-4 py-2 rounded"
                      onClick={() => openModal(user._id)}
                    >
                      Deposit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalUsers > pageSize && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalUsers / pageSize)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Enter Amount
            </h2>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-[#F6F1DE] px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-[#22405c] text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyGiftTable;
