"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/app/owner/components/header/Header";
import SideBar from "@/app/owner/components/sidebar/SideBar";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("#2563eb");
  const [selectedImage, setSelectedImage] = useState(null);

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
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedImage(imageUrl);
  //   }
  // };

  // Single useState to manage all form fields
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyImage: null,
    address: "",
    phone: "",
    purchaseDate: "",
    yearBuilt: "",
    squareFeet: "",
    propertyPrice: "",
    interestRate: "",
    propertyColor: "#2563eb",
  });

  const initialFormState = {
    propertyName: "",
    propertyImage: null,
    address: "",
    purchaseDate: "",
    phone: "",
    yearBuilt: "",
    squareFeet: "",
    propertyPrice: "",
    interestRate: "",
  };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // Handle Input Changes Dynamically
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleFormAction = (action, event) => {
  //   event.preventDefault();
  //   if (action === "save") {
  //     console.log("Saving Data:", formData);
  //   } else if (action === "cancel") {
  //     setFormData(initialFormState);
  //   }
  // };
  // validation

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.propertyName.trim()) {
      newErrors.propertyName = "Property name is required.";
    } else if (formData.propertyName.length < 3) {
      newErrors.propertyName = "Property name must be at least 3 characters.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = "Purchase date is required.";
    }

    if (!formData.yearBuilt.trim()) {
      newErrors.yearBuilt = "Year built is required.";
    } else if (!/^\d{4}$/.test(formData.yearBuilt)) {
      newErrors.yearBuilt = "Year built must be a 4-digit number.";
    }

    if (!formData.squareFeet.trim()) {
      newErrors.squareFeet = "Square feet is required.";
    } else if (isNaN(formData.squareFeet) || formData.squareFeet <= 0) {
      newErrors.squareFeet = "Square feet must be a valid positive number.";
    }

    if (!formData.propertyPrice.trim()) {
      newErrors.propertyPrice = "Property price is required.";
    } else if (isNaN(formData.propertyPrice) || formData.propertyPrice <= 0) {
      newErrors.propertyPrice = "Property price must be a valid number.";
    }

    if (!formData.interestRate.trim()) {
      newErrors.interestRate = "Interest rate is required.";
    } else if (
      isNaN(formData.interestRate) ||
      formData.interestRate < 0 ||
      formData.interestRate > 100
    ) {
      newErrors.interestRate = "Interest rate must be between 0 and 100.";
    }

    if (!formData.propertyImage) {
      newErrors.propertyImage = "Property image is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        propertyImage: file,
      }));
    }
  };

  const handleFormAction = (event) => {
    // event.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted Successfully:", formData);
    } else {
      console.log("Validation Failed:", errors);
    }
  };
  return (
    <div className="overflow-y-auto scrollbar-hidden">
      {/* <button
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
        <SideBar section="Multi-Property Management" />
      </aside> */}

      <div className="">
        {/* <Header appear={false} title={"Add Property"} /> */}
        <div className="flex items-center justify-center p-6">
          <div className="mx-auto w-full bg-white flex flex-col md:flex-row  pt-4">
            {/* Larger Column */}
            <div className="flex-1 p-6 bg-[#F8F8F8] rounded-md">
              <form>
                <h1 className="text-2xl pb-6">Property Details</h1>

                <div className="mb-5 flex items-center gap-4">
                  <label
                    htmlFor="propertyColor"
                    className="text-sm font-medium w-32"
                  >
                    Set Color Theme
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      name="propertyColor"
                      id="propertyColor"
                      value={formData.propertyColor}
                      onChange={handleInputChange}
                      className="w-7 h-7 cursor-pointer border rounded-md"
                    />
                    <span className="text-sm text-gray-700 border rounded-sm px-2 border-[#A3A3A3]">
                      {formData.propertyColor}
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="propertyName"
                    className="block text-sm font-medium pb-2"
                  >
                    Property Name
                  </label>
                  <input
                    type="text"
                    name="propertyName"
                    id="propertyName"
                    value={formData.propertyName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] py-1 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {errors.propertyName && <p className="text-red-500 text-sm">{errors.propertyName}</p>}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="propertyImage"
                    className="block text-sm font-medium pb-2"
                  >
                    Property Image
                  </label>
                  <div className="flex items-center">
                    <label
                      htmlFor="propertyImage"
                      className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 p-4"
                    >
                      <div className="flex flex-col items-center justify-center pt-2 pb-3">
                        <img
                          src="/icons/mdi_image-add.png"
                          className="w-10 h-10"
                          alt=""
                        />
                        <p className="mb-1 text-xs text-center text-gray-500">
                          Upload or drag <br /> an image here
                        </p>
                      </div>
                      <input
                        id="propertyImage"
                        type="file"
                        className="hidden"
                        name="propertyImage"
                        onChange={handleImageUpload}
                      />
                    </label>

                  </div>
                  {errors.propertyImage && <p className="text-red-500 text-sm mt-4 text-inline">{errors.propertyImage}</p>}

                </div>

                <div className="mb-5">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium pb-2"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-[#e0e0e0] py-1 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div className="flex flex-row gap-4 justify-between">
                  <div className="flex flex-col">
                    <div className="mb-5">
                      <label
                        htmlFor="purchaseDate"
                        className="block text-sm font-medium pb-2"
                      >
                        Purchase Date
                      </label>
                      <DatePicker
                        selected={
                          formData.purchaseDate
                            ? new Date(formData.purchaseDate)
                            : null
                        }
                        onChange={(date) =>
                          handleInputChange({
                            target: { name: "purchaseDate", value: date },
                          })
                        }
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 pr-20 pl-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        dateFormat="yyyy-MM-dd"
                      />
                      {errors.purchaseDate && <p className="text-red-500 text-sm">{errors.purchaseDate}</p>}
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium pb-2"
                      >
                        Year of Built
                      </label>
                      <input
                        type="number"
                        name="yearBuilt"
                        id="yearBuilt"
                        onChange={handleInputChange}
                        value={formData.yearBuilt}
                        required
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {errors.yearBuilt && <p className="text-red-500 text-sm">{errors.yearBuilt}</p>}

                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium pb-2"
                      >
                        Square (Sqft)
                      </label>
                      <input
                        type="number"
                        name="squareFeet"
                        id="squareFeet"
                        value={formData.squareFeet}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {errors.squareFeet && <p className="text-red-500 text-sm">{errors.squareFeet}</p>}

                    </div>
                  </div>
                  <div>
                    <div className="mb-5">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium pb-2"
                      >
                        Property Price
                      </label>
                      <input
                        type="number"
                        name="propertyPrice"
                        id="propertyPrice"
                        value={formData.propertyPrice}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-[#e0e0e0] bg-white pr-20 pl-4 py-1 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md text-left"
                      />
                      {errors.propertyPrice && <p className="text-red-500 text-sm">{errors.propertyPrice}</p>}

                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium pb-2"
                      >
                        Interest Rate
                      </label>
                      <input
                        type="number"
                        name="interestRate"
                        id="interestRate"
                        value={formData.interestRate}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 pr-4 pl-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                      {errors.interestRate && <p className="text-red-500 text-sm">{errors.interestRate}</p>}

                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-end gap-4">
                  <button
                    type="button"
                    className="hover:shadow-form rounded-md bg-[#CACACA] py-2 px-4 text-center text-sm font-semibold text-white outline-none"
                    onClick={(e) => handleFormAction("cancel", e)}
                  >
                    Cancel
                  </button>
                  <Link
                    href="/owner/dashboard"
                    className="hover:shadow-form rounded-md bg-[#FF9202] py-2 px-4 text-center text-sm font-semibold text-white outline-none"
                    onClick={(e) => handleFormAction("save", e)}
                  >
                    Save
                  </Link>
                  {/* <Link
                    href="/owner/multi-property/property-management"
                    className="hover:shadow-form rounded-md bg-[#FF9202] py-2 px-4 text-center text-sm font-semibold text-white outline-none"
                  >
                    Save
                  </Link> */}
                </div>
              </form>
            </div>

            {/* Right Column (Image Preview) */}
            <div className="w-full md:w-1/3 rounded-lg flex justify-center pl-6 pr-6">
              {selectedImage ? (
                <div className="flex flex-col w-full">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="max-w-full max-h-60 object-contain rounded-lg"
                  />
                  <p className="text-black text-xs mt-2 text-center">Preview</p>
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  <p className="text-gray-400 text-sm h-60 w-full rounded-lg bg-[#ECECEC]"></p>
                  <p className="text-black text-xs mt-2 text-center">Preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
