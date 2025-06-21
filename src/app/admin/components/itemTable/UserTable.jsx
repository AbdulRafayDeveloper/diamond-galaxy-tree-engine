"use client";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Pagination from "../pagination/Pagination";

const UsersTable = () => {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRefs = useRef([]);
  const dropdownRefsSlot = useRef([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOptionsSlots, setSelectedOptionsSlots] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState("");
  const descriptionOptions = [
    "Company Bonus",
    "Performance Reward",
    "Referral Bonus",
    "Festival Bonus",
    "Salary",
  ];

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [openDropdownIndexSlots, setOpenDropdownIndexSlots] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isSalaryOpen, setIsOpenSalary] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [salary, setSalary] = useState();

  const openModal = async (userId) => {
    setCurrentUserId(userId);
    setIsOpen(true);

    try {
      const token = Cookies.get("token");
      const res = await axios.get(`/api/admin/fix-salary/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status === 200 && res.data.data.salary) {
        setSalary(res.data.data.salary);
      } else {
        setSalary("");
      }
    } catch (err) {
      setSalary("");
    }
  };

  const openSalaryModal = async (userId) => {
    setCurrentUserId(userId);
    setIsOpenSalary(true);

    try {
      const token = Cookies.get("token");
      const res = await axios.get(`/api/admin/fix-salary/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.status === 200 && res.data.data.salary) {
        setSalary(res.data.data.salary);
      } else {
        setSalary("");
      }
    } catch (err) {
      setSalary("");
    }
  };

  const handleSetSalary = async () => {
    if (!salary || isNaN(salary)) {
      Swal.fire("Error", "Please enter a valid salary amount", "error");
      return;
    }

    try {
      const token = Cookies.get("token");
      const res = await axios.put(
        `/api/admin/fix-salary/${currentUserId}`,
        { salary },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.status === 200) {
        Swal.fire("Success", "Salary updated successfully", "success");
        setIsOpenSalary(false);
        setSalary("");
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // API Fetch
  const fetchData = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const res = await axios.get("/api/admin/users", {
        params: {
          pageNumber: currentPage,
          pageSize,
          search: searchTerm,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.status === 200) {
        const usersData = res.data.data.users.map((u) => ({
          id: u._id,
          name: `${u.fname} ${u.lname}`,
          propertyAddress: u.email,
          date: new Date(u.createdAt).toLocaleDateString(),
          salary: 0,
          grade: u.grade || "Gold",
        }));

        setUsers(usersData);
        setSelectedOptions(usersData.map((u) => u.grade || "Gold"));
        setSelectedOptionsSlots(usersData.map(() => "Slot1"));

        setTotalUsers(res.data.data.totalUsers);
      } else {
        Swal.fire("Error", res.data.message, "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm]);

  const handleSelectGrade = async (option, index) => {
    const updated = [...selectedOptions];
    updated[index] = option;
    setSelectedOptions(updated);
    setOpenDropdownIndex(null);

    const userId = users[index].id;

    try {
      const token = Cookies.get("token");
      const res = await axios.put(
        `/api/admin/users/${userId}`,
        { grade: option },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status === 200) {
        Swal.fire("Success!", "Grade updated successfully.", "success");
      } else {
        Swal.fire("Error!", res.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };

  const handleSelectSlot = (option, index) => {
    const updated = [...selectedOptionsSlots];
    updated[index] = option;
    setSelectedOptionsSlots(updated);
    setOpenDropdownIndexSlots(null);
  };

  const handleClickOutside = (event) => {
    const clickedInsideGrade = dropdownRefs.current.some(
      (ref) => ref && ref.contains(event.target)
    );
    const clickedInsideSlot = dropdownRefsSlot.current.some(
      (ref) => ref && ref.contains(event.target)
    );

    if (!clickedInsideGrade) {
      setOpenDropdownIndex(null);
    }

    if (!clickedInsideSlot) {
      setOpenDropdownIndexSlots(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setAmount("");
  };

  const closeSalary = () => {
    setIsOpenSalary(false);
  };

  const handleUnregister = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to register this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Register",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Registered!", "The user has been registered.", "success");
      }
    });
  };

  const handleDeactivate = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to activate this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Activate",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Activated!", "The user has been activated.", "success");
      }
    });
  };

  const DeleteRecord = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Record has been deleted.", "success");
      }
    });
  };

  const ResetPassword = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reset this password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Reset",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Reset!", "Reset password successfully", "success");
      }
    });
  };

  const handleSubmit = async () => {
    if (!amount || !selectedDescription) {
      Swal.fire("Error", "Please enter amount and description", "error");
      return;
    }

    try {
      const token = Cookies.get("token");
      const res = await axios.put(
        `/api/monthly-gift/${currentUserId}`,
        { amount, message: selectedDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status === 200) {
        Swal.fire("Success!", "Deposit applied successfully.", "success");
        fetchData();
      } else {
        Swal.fire("Error!", res.data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <div className="flex justify-end p-4 sticky top-0 bg-white z-10">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchTerm(e.target.value);
          }}
          className="pl-10 pr-4 py-[5px] border border-gray-300 rounded-full"
        />
      </div>

      <div className="relative overflow-x-auto scrollbar-none ">
        {/* Table */}
        <table className="w-full text-sm text-left text-gray-500 p-3">
          <thead className="text-center text-base text-gray-700 font-light bg-white">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Grades</th>
              <th className="px-6 py-3">Fix Salary</th>
              <th className="px-6 py-3">Salary</th>
              {/*<th className="px-6 py-3">Salary Deposit</th>*/}
              <th className="px-6 py-3">Deposit</th>
              <th className="px-6 py-3">Reward Deposit</th>
              <th className="px-6 py-3">Reg. Status</th>
              <th className="px-6 py-3">Act. Status</th>
              <th className="px-6 py-3">Slots</th>
              <th className="px-6 py-3">Monthly Gift Deposit</th>
              <th className="px-6 py-3">Actions</th>
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
                <td colSpan="13" className="text-center py-10">
                  No records found.
                </td>
              </tr>
            ) : (
              users.map((product, index) => (
                <tr
                  key={index}
                  className="odd:bg-[#F6F1DE] even:bg-white border-b text-center"
                >
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.propertyAddress}</td>
                  <td className="px-6 py-4">{product.date}</td>

                  {/* Grades Dropdown */}
                  <td className="px-6 py-4">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenDropdownIndex(index)}
                        className="flex items-center justify-between text-black font-medium rounded-full text-sm px-3 py-1 border border-gray-300 w-40"
                        type="button"
                        ref={(el) => (dropdownRefs.current[index] = el)}
                      >
                        <span className="text-[#777777] truncate w-24">
                          {selectedOptions[index]}
                        </span>
                        <svg
                          className="w-2.5 h-2.5 ml-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#777777"
                          viewBox="0 0 10 6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>

                      {openDropdownIndex === index && (
                        <div className="absolute z-10 bg-white border rounded-lg shadow-sm mt-2 w-40">
                          <ul className="py-2 text-sm text-gray-700">
                            {[
                              "Gold Grade",
                              "Silver Grade",
                              "Diamond Grade",
                              "Royal Grade",
                              "Star Grade",
                              "Member",
                            ].map((option) => (
                              <li key={option}>
                                <button
                                  onClick={() =>
                                    handleSelectGrade(option, index)
                                  }
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                  {option}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>

                  <td>
                    <button
                      className="bg-[#22405c] text-white px-4 py-2 rounded"
                      onClick={() => openSalaryModal(product.id)}
                    >
                      Fix
                    </button>
                  </td>

                  {/* -------- KEEP REST OF YOUR EXISTING COLUMNS HERE -------- */}
                  <td className="px-6 py-4">{product.salary}</td>

                  {/* Salary Deposit */}
                  {/*<td className="px-6 py-4 ">
                    <button
                      className="bg-[#22405c] text-white px-4 py-2 rounded"
                      onClick={openModal}
                    >
                      Add
                    </button>
                  </td>*/}

                  {/* Deposit */}
                  <td className="px-6 py-4 ">
                    <td className="px-6 py-4 ">
                      <button
                        className="bg-[#22405c] text-white px-4 py-2 rounded"
                        onClick={() => openModal(product.id)}
                      >
                        Add
                      </button>
                    </td>

                    {isOpen && (
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

                        <h2 className="text-xl font-semibold mb-4 text-center">
                          Select Description
                        </h2>
                        <select
                          value={selectedDescription}
                          onChange={(e) =>
                            setSelectedDescription(e.target.value)
                          }
                          className="w-full border border-gray-300 p-2 rounded mb-4"
                        >
                          <option value="">Select</option>
                          {descriptionOptions.map((desc) => (
                            <option key={desc} value={desc}>
                              {desc}
                            </option>
                          ))}
                        </select>

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
                    )}
                  </td>

                  {/* Reward Deposit */}
                  <td className="px-6 py-4 ">
                    <button className="bg-[#22405c] text-white px-4 py-2 rounded">
                      Add
                    </button>
                    {isOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                          <h2 className="text-xl font-semibold mb-4 text-center">
                            Enter Amount
                          </h2>
                          <input
                            type="number"
                            name="amount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded mb-4"
                          />
                          <h2 className="text-xl font-semibold mb-4 text-center">
                            Enter Description
                          </h2>
                          <input
                            type="text"
                            placeholder="Enter Description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                  </td>

                  {/* Registration Status */}
                  <td className="px-6 py-4">
                    <button
                      className="bg-[#22405c] text-white px-4 py-2 rounded"
                      onClick={handleUnregister}
                    >
                      Unregister
                    </button>
                  </td>

                  {/* Activation Status */}
                  <td className="px-6 py-4">
                    <button
                      className="bg-[#22405c] text-white px-4 py-2 rounded"
                      onClick={handleDeactivate}
                    >
                      InActive
                    </button>
                  </td>

                  {/* Slots */}
                  <td className="px-6 py-4 ">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenDropdownIndexSlots(index)}
                        className="flex items-center justify-between text-black font-medium rounded-full text-sm px-3 py-1 border border-gray-300 w-40"
                        type="button"
                        ref={(el) => (dropdownRefsSlot.current[index] = el)}
                      >
                        <span className="text-[#777777] truncate w-24">
                          {selectedOptionsSlots[index]}
                        </span>
                        <svg
                          className="w-2.5 h-2.5 ml-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#777777"
                          viewBox="0 0 10 6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>

                      {openDropdownIndexSlots === index && (
                        <div className="absolute z-10 bg-white border rounded-lg shadow-sm mt-2 w-40">
                          <ul className="py-2 text-sm text-gray-700">
                            {[
                              "Slot1",
                              "Slot2",
                              "Slot3",
                              "Slot4",
                              "Slot5",
                              "Slot6",
                              "Slot7",
                              "Slot8",
                              "Slot9",
                              "Slot10",
                              "Slot11",
                            ].map((option) => (
                              <li key={option}>
                                <button
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Are you sure?",
                                      text: "Do you want to change the slot?",
                                      icon: "warning",
                                      showCancelButton: true,
                                      confirmButtonColor: "#3085d6",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "Yes, change it!",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleSelectSlot(option, index);
                                        Swal.fire(
                                          "Changed!",
                                          "The slot has been updated.",
                                          "success"
                                        );
                                      }
                                    });
                                  }}
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                  {option}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Monthly Gift */}
                  <td className="px-6 py-4 ">
                    <button
                      className="bg-[#22405c] text-white px-4 py-2 rounded"
                      onClick={() => openModal(product.id)}
                    >
                      Add
                    </button>
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
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      className="text-gray-800 hover:text-blue-800"
                      onClick={ResetPassword}
                    >
                      🔏
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={DeleteRecord}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M14.5 5.79L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Single Global Modal */}
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

              <h2 className="text-xl font-semibold mb-4 text-center">
                Select Description
              </h2>
              <select
                value={selectedDescription}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedDescription(value);
                  if (value === "Salary") {
                    setAmount(salary || "");
                  }
                }}
                className="w-full border border-gray-300 p-2 rounded mb-4"
              >
                <option value="">Select</option>
                {descriptionOptions.map((desc) => (
                  <option key={desc} value={desc}>
                    {desc}
                  </option>
                ))}
              </select>

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
        {isSalaryOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Set Fixed Salary
              </h2>
              <input
                type="number"
                placeholder="Enter salary amount"
                name="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mb-4"
              />

              <div className="flex justify-end gap-2">
                <button
                  className="bg-[#F6F1DE] px-4 py-2 rounded"
                  onClick={closeSalary}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#22405c] text-white px-4 py-2 rounded"
                  onClick={handleSetSalary}
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
      </div>
      {totalUsers > pageSize && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalUsers / pageSize)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </>
  );
};

export default UsersTable;
