"use client";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";

const UsersTable = ({ products }) => {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRefs = useRef([]);
  const dropdownRefsSlot = useRef([])
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [openDropdownIndexSlots, setOpenDropdownIndexSlots] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState(
    products.map(() => "Gold")
  );
  const [selectedOptionsSlots, setSelectedOptionsSlots] = useState(
    products.map(() => "Slot1")
  );


  const handleClickOutside = (event) => {
    const clickedInsideGradeDropdown = dropdownRefs.current.some(ref =>
      ref?.contains(event.target)
    );
    const clickedInsideSlotDropdown = dropdownRefsSlot.current.some(ref =>
      ref?.contains(event.target)
    );

    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      if (!clickedInsideGradeDropdown) {
        setOpenDropdownIndex(null);
      }
      if (!clickedInsideSlotDropdown) {
        setOpenDropdownIndexSlots(null);
      }
    }
  };


  const handleSelectGrade = (option, index) => {
    const updated = [...selectedOptions];
    updated[index] = option;
    setSelectedOptions(updated);
    setOpenDropdownIndex(null);
  };

  const handleSelectSlot = (option, index) => {
    const updated = [...selectedOptionsSlots];
    updated[index] = option;
    setSelectedOptionsSlots(updated);
    setOpenDropdownIndexSlots(null);
  };


  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  // 
  const toggleDropdownSlots = (index) => {
    setOpenDropdownIndexSlots(openDropdownIndexSlots === index ? null : index);
  };

  const DeleteRecorde = () => {
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

  // reset password
  const ResetPassword = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to Reset this password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Reset",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Reset!", "Reset Password Successfully", "success");
      }
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredProperties = products.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [description,setDescription]=useState("")

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setAmount(""); // Reset field on close
  };

  const handleSubmit = () => {
    if (!amount) return alert("Please enter an amount.");
    // Send `amount` to admin or handle logic here
    console.log("Deposited Amount:", amount);
    closeModal();
  };

  const handleUnregister = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to register this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Register',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your API or function to unregister
        console.log('User Register!');
        Swal.fire('Register!', 'The user has been Register.', 'success');
      }
    });
  };
  const handleDeactivate = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to Activate this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Activate',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your API or function to unregister
        console.log('User Activated!');
        Swal.fire('Activated!', 'The user has been Activated.', 'success');
      }
    });
  };
  return (
    <div className="relative overflow-x-auto scrollbar-none pt-12">
      <table className="w-full text-sm text-left text-gray-500 p-3">
        <thead className="text-center text-base text-gray-700 font-light bg-white">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Grades</th>
            <th className="px-6 py-3">Salary</th>
            <th className="px-6 py-3">Salary Deposit</th>
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
          {filteredProperties.map((product, index) => (
            <tr
              key={index}
              className="odd:bg-[#F6F1DE] even:bg-white border-b text-center"
            >
              <td className="px-6 py-4 ">{product.name}</td>
              <td className="px-6 py-4 ">{product.propertyAddress}</td>
              <td className="px-6 py-4 ">{product.date}</td>
              <td className="px-6 py-4 ">
                <div className="relative inline-block">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center justify-between text-black font-medium rounded-full text-sm px-3 py-1 border border-gray-300 w-40"
                    type="button"
                    ref={(el) => (dropdownRefs.current[index] = el)}
                  >
                    <span className="text-[#777777] truncate w-24">
                      {selectedOptions[index]}
                    </span>
                    <svg
                      className={`w-2.5 h-2.5 ml-2 transition-transform ${openDropdownIndex === index ? "rotate-180" : "rotate-0"
                        }`}
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
                        {["Gold", "Silver", "Diamond", "Coin", "Star"].map(
                          (option) => (
                            <li key={option}>
                              <button
                                onClick={() => handleSelectGrade(option, index)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                              >
                                {option}
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 ">{product.salary}</td>
              {/* salary deposit */}
              <td className="px-6 py-4 ">
                <button
                  className="bg-[#22405c] text-white px-4 py-2 rounded"
                  onClick={openModal}
                >
                  Add
                </button>

                {/* Modal */}
                {isOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                      <h2 className="text-xl font-semibold mb-4 text-center">Enter Amount</h2>
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
                          className="bg-[#22405c] text-white px-4 py-2 rounded "
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </td>
              {/*  */}
              <td className="px-6 py-4 ">
                <button
                  className="bg-[#22405c] text-white px-4 py-2 rounded"
                  onClick={openModal}
                >
                  Add
                </button>

                {/* Modal */}
                {isOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                      <h2 className="text-xl font-semibold mb-4 text-center">Enter Amount</h2>
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
                          className="bg-[#22405c] text-white px-4 py-2 rounded "
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </td>
              {/* reward deposit */}
              <td className="px-6 py-4 ">
                <button
                  className="bg-[#22405c] text-white px-4 py-2 rounded"
                  onClick={openModal}
                >
                  Add
                </button>

                {/* Modal */}
                {isOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                      <h2 className="text-xl font-semibold mb-4 text-center">Enter Amount</h2>
                      <input
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-4"
                      />
                      <h2 className="text-xl font-semibold mb-4 text-center">Enter Description</h2>
                      <input
                        type="text"
                        placeholder="Enter Descripion"
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
                          className="bg-[#22405c] text-white px-4 py-2 rounded "
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <button
                  className="bg-[#22405c] text-white px-4 py-2 rounded"
                  onClick={handleUnregister}
                >
                  Unregister
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  className="bg-[#22405c] text-white px-4 py-2 rounded"
                  onClick={handleDeactivate}
                >
                  InActive
                </button>
              </td>
              <td className="px-6 py-4 ">
                <div className="relative inline-block">
                  <button
                    onClick={() => toggleDropdownSlots(index)}
                    className="flex items-center justify-between text-black font-medium rounded-full text-sm px-3 py-1 border border-gray-300 w-40"
                    type="button"
                    ref={(el) => (dropdownRefsSlot.current[index] = el)}
                  >
                    <span className="text-[#777777] truncate w-24">
                      {selectedOptionsSlots[index]}
                    </span>
                    <svg
                      className={`w-2.5 h-2.5 ml-2 transition-transform ${openDropdownIndexSlots === index ? "rotate-180" : "rotate-0"
                        }`}
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
                        <ul className="py-2 text-sm text-gray-700">
                          {["Slot1", "Slot2", "Slot3", "Slot4", "Slot5", "Slot6", "Slot7", "Slot8", "Slot9", "Slot10", "Slot11"].map(
                            (option) => (
                              <li key={option}>
                                <button
                                  onClick={() => {
                                    Swal.fire({
                                      title: 'Are you sure?',
                                      text: "Do you want to change the slot?",
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Yes, change it!',
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleSelectSlot(option, index);
                                        Swal.fire('Changed!', 'The slot has been updated.', 'success');
                                      }
                                    });
                                  }}
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                >
                                  {option}
                                </button>
                              </li>
                            )
                          )}
                        </ul>

                      </ul>
                    </div>
                  )}
                </div>
              </td>
              {/* monthly gift deposit */}
              <td className="px-6 py-4 ">
                <button
                  className="bg-[#22405c] text-white px-4 py-2 rounded"
                  onClick={openModal}
                >
                  Add
                </button>

                {/* Modal */}
                {isOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                      <h2 className="text-xl font-semibold mb-4 text-center">Enter Amount</h2>
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
                          className="bg-[#22405c] text-white px-4 py-2 rounded "
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </td>
              <td className="px-6 py-4  flex justify-center gap-2">
                <button className="text-gray-800 hover:text-blue-800" onClick={ResetPassword}>
                  {/* View Icon */}
                  🔏
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={DeleteRecorde}
                >
                  {/* Delete Icon */}
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
  );
};

export default UsersTable;
