"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/app/mortgage_lender/mortage_components/sidebar/SideBar";
import Header from "@/app/mortgage_lender/mortage_components/header/Header";
import Link from "next/link";

export default function Homedetail() {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Card");

  const [formData, setFormData] = useState({
    homeownerName: "",
    email: "",
    phoneNo: "",
    propertyAddress: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    country: "United States",
    postalCode: "",
  });
  const [activeTab, setActiveTab] = useState(1); // Default to Homeowner Details Tab

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [isFormFilled, setIsFormFilled] = useState(false); // Track form completion

  const handleSave = () => {
    // Check if all required fields are filled
    if (
      formData.homeownerName.trim() &&
      formData.email.trim() &&
      formData.phoneNo.trim() &&
      formData.propertyAddress.trim()
    ) {
      setIsFormFilled(true); // Enable access to "Packages"
      setActiveTab(2); // Move to Packages tab after saving
    } else {
      alert("Please fill out all Homeowner Details before proceeding.");
    }
  };

  const handleTabChange = (tabId) => {
    if (tabId === 2 && !isFormFilled) {
      alert(
        "Please fill out the Homeowner Details and click Save before proceeding to Packages."
      );
      return;
    }
    if (tabId === 3 && !selectedPackage) {
      alert("Please select a package before proceeding to Payments.");
      return;
    }
    setActiveTab(tabId);
  };
  const handleBuyNow = () => {
    if (selectedPackage) {
      setActiveTab(3);
    } else {
      alert("Please select a package before proceeding to payment.");
    }
  };
  const isFormValid = () => {
    return (
      formData.cardNumber &&
      formData.expiry &&
      formData.cvc &&
      formData.postalCode
    );
  };

  const tabs = [
    { id: 1, label: "Homeowner Details" },
    { id: 2, label: "Packages" },
    { id: 3, label: "Payments" },
  ];

  const packagesDetail = [
    {
      id: "01",
      name: "Basic",
      dollar: "5$",
      property: "1 property included",
      time: "One time payment",
    },
    {
      id: "02",
      name: "Standard",
      dollar: "15$",
      property: "1 property included",
      time: "One time payment",
    },
    {
      id: "03",
      name: "Premium",
      dollar: "40$",
      property: "1 property included",
      time: "One time payment",
    },
  ];

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
        <Sidebar section="Payment & Subscriptions" />
      </aside>

      <div className="lg:ml-64 md:ml-64 sm:ml-0 flex flex-col flex-grow h-screen overflow-hidden">
        <Header
          title={"Add Homeowner"}
          toggleSidebar={handleSidebarToggle}
          buttonRef={buttonRef}
        />

        <main className="lg:p-6 sm:p-0 bg-gray-100 flex-grow overflow-y-auto">
          <div className="">
            <div className="m-4 p-4">
              <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500">
                {tabs.map((tab) => (
                  <li key={tab.id} className="me-2">
                    <button
                      onClick={() => handleTabChange(tab.id)}
                      className={`inline-block px-4 py-3 rounded-lg ${activeTab === tab.id
                          ? "text-white bg-[#FF9202]"
                          : "bg-gray-300"
                        } ${tab.id === 2 && !isFormFilled
                          ? "cursor-not-allowed opacity-50"
                          : ""
                        }`}
                      disabled={
                        (tab.id === 2 && !isFormFilled) ||
                        (tab.id === 3 && !selectedPackage)
                      } // Disable "Packages" tab before form completion
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {activeTab === 1 && (
            <div className="m-6">
              <div className="bg-white shadow-md rounded-lg p-6">
                <Section title="Add Homeowner Details">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full">
                        {renderInput("Homeowner Name", "homeownerName", true)}
                      </div>
                      <div className="w-full">
                        {renderInput("Email Address", "email", true)}
                      </div>
                    </div>
                    <div className="grid grid-cols-1">
                      <div className="mt-2">
                        {renderInput("Phone No", "phoneNo")}
                      </div>
                      <div className="mt-4">
                        {renderInput("Property Address", "propertyAddress")}
                      </div>
                    </div>
                  </div>
                </Section>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                    onClick={() => {
                      console.log("Cancelled");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-[#FF9100] text-white rounded-lg"
                    onClick={handleSave} // Call handleSave function instead of directly setting activeTab
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="flex justify-center">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-7 bg-gray-200 p-10 rounded-lg">
                {packagesDetail.map((el, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-5 rounded-lg justify-center text-center items-center gap-5 h-[450px] w-[300px]"
                  >
                    <button
                      className="text-[50px] font-bold mt-6"
                      onClick={() => setSelectedPackage(`${el.name}`)}
                    >
                      {el.name}
                    </button>
                    <h4 className="text-[40px] text-[#FF9202] font-bold mt-6">
                      {el.dollar}
                    </h4>
                    <p className="mt-6 flex text-center justify-center">
                      <img
                        src="/icons/home.png"
                        className="w-[24px] h-[24px]"
                        alt="property"
                      />
                      <span className="ml-2 text-center items-center">
                        {el.property}
                      </span>
                    </p>
                    <p className="mt-6 flex text-center justify-center">
                      <img
                        src="/icons/time.png"
                        className="w-[24px] h-[24px]"
                        alt="time"
                      />
                      <span className="ml-2">{el.time}</span>
                    </p>
                    <button
                      className="bg-[#FF9202] p-1 w-[150px] text-white text-lg rounded-lg mt-6"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="bg-white rounded-lg p-3">
              <div className="flex flex-col p-6 ">
                <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
                <div className="w-[200px] h-[100px] p-2">
                  <button
                    className={`px-4 py-2 rounded-lg border w-[200px] h-[100px] text-left bg-white ${paymentMethod === "card"
                        ? "border-blue-500 bg-white-100"
                        : "border-gray-300"
                      }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <img src="/icons/card.png" />
                    <p className="text-blue-600 font-bold">Card</p>
                  </button>
                </div>
                <div className="mb-5 mt-5 p-2">
                  <label className="block text-md font-bold">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    className="w-full border rounded-md p-2  w-full"
                    placeholder="1234 1234 1234 1234"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex space-x-6 mb-5 p-2">
                  <div className="mb-3 w-1/2">
                    <label className="block text-md font-bold">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      className="w-full border rounded-md p-2"
                      placeholder="MM/YY"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 w-1/2">
                    <label className="block text-md font-bold">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      className="w-full border rounded-md p-2"
                      placeholder="CVC"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 space-x-6">
                  <div className="mb-3">
                    <label className="block text-md font-bold">Country</label>
                    <select
                      name="country"
                      className="w-full border rounded-md p-2"
                      onChange={handleChange}
                      value={formData.country}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-md font-bold">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      className="w-full border rounded-md p-2"
                      placeholder="90210"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 mt-4">
                    <button className="px-4 py-2 border rounded-md text-gray-500 bg-gray-200">
                      Cancel
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${isFormValid()
                          ? "bg-[#FF9202] text-white"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      disabled={!isFormValid()}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );

  function renderInput(label, name, required = true) {
    return (
      <div className="flex flex-col">
        <label className="lg:text-sm md:text-sm font-medium text-gray-700 sm:text-xs pb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>
    );
  }

  function Section({ title, description, children }) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        {children}
      </div>
    );
  }
}
