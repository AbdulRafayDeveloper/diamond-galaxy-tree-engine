"use client";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";

const UserTable = ({ products }) => {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRefs = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState(
    products.map(() => "Gold") // Default "Gold" for all rows
  );

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

  const handleDeactivate = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to deactivate this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Deactivate',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your API or function to unregister
        console.log('User Deactivated!');
        Swal.fire('Deactivated!', 'The user has been Deactivated.', 'success');
      }
    });
  };
  return (
    <div className="relative overflow-x-auto scrollbar-none pt-12">
      <table className="w-full text-sm text-left text-gray-500 p-3">
        <thead className="text-center text-base text-gray-700 font-light bg-white">
          <tr>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Email</th>
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
              
              <td className="px-6 py-4">
                <button
                  className="bg-[#22405c] text-white px-4 py-2 rounded"
                  onClick={handleDeactivate}
                >
                  Deactivate
                </button>
              </td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
