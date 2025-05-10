"use client";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";

const QualifiedTable = ({ products }) => {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRefs = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);


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

  const filteredProperties = products.filter((property) =>
    property.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");

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

  return (
    <div className="relative overflow-x-auto scrollbar-none pt-12">
      <table className="w-full text-sm text-left text-gray-500 p-3">
        <thead className="text-center text-base text-gray-700 font-light bg-white">
          <tr>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Address</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProperties.map((product, index) => (
            <tr
              key={index}
              className="odd:bg-[#F6F1DE] even:bg-white border-b text-center"
            >
              <td className="px-6 py-4">{product.username}</td>
              <td className="px-6 py-4">{product.email}</td>
              <td className="px-6 py-4">{product.address}</td>
              
              <td className="px-6 py-4">
                <button
                  className="bg-[#22405c] text-white px-4 py-2 rounded"
                  onClick={openModal}
                >
                  Desposit
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
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QualifiedTable;
