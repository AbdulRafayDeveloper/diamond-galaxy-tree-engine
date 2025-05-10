"use client";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const EducationTable = ({ products }) => {
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
                        <th className="px-6 py-3">Link</th>
                        <th className="px-6 py-3">Description</th>
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
                            <td className="px-6 py-4">
                                <Link href={`${product.link}`} target="_blank">
                                    <button
                                        className="bg-[#22405c] text-white px-4 py-2 rounded"
                                    >
                                        Play
                                    </button></Link>
                            </td>
                            <td className="px-6 py-4">{product.description}</td>
                            <td>
                                <div className="flex justify-center items-center text-center gap-2">
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                    //   onClick={DeleteRecorde}
                                    >
                                        {/* Delete Icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-5" stroke="#22405c" fill="#22405c">
                                            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg>
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                    //   onClick={DeleteRecorde}
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
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EducationTable;
