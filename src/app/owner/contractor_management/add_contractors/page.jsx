"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/app/owner/components/sidebar/SideBar";
import Header from "@/app/owner/components/header/Header";
import Link from "next/link";

export default function ApplianceForm() {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef=useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isopen,setIsOpen]=useState(false);
  const [searchItem,setSearchItem]=useState("");
  const [select,setSelect]=useState("Insurance Agent");
  const [formData, setFormData] = useState({
    contractorType: "",
    companyName: "",
    phoneNo: "",
    companyWebsite: "",
    additionalNotes: "",
    email:"",
    account:""
  });
  const initialData={
    contractorType: "",
    companyName: "",
    phoneNo: "",
    companyWebsite: "",
    additionalNotes: "",
    email:"",
    account:""
  };

 const resetData=()=>{
  setFormData(initialData);
 }

  // Function to handle sidebar toggle
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const options = [
    "Insurance Agent",
    "Mortgage Company",
    "Real Estate Agent",
    "Electrician",
    "Handyman",
    "House Cleaner",
    "HVAC Company",
    "Pest Control",
    "Plumber",
    "Pool Maintenence",
    "Power Washer",
    "Window Washer",
    "Yard Maintenace",
    "Cable Company",
    "Electric Company",
    "Gas Company",
    "Internet Company",
    "Recycling Service",
    "Trash Service",
    "Three Free Fields"
  ];
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchItem.toLowerCase())
  );
  const handleSelect = (option) => {
    setSelect(option);
    setIsOpen(false);
  };
  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

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
        <Sidebar section="Contractor Management" />
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 md:ml-64 sm:ml-0 flex flex-col flex-grow h-screen overflow-hidden">
        {/* Header */}
        <Header title={"Contractor Management"} toggleSidebar={handleSidebarToggle} buttonRef={buttonRef} />

        {/* Scrollable Content Area */}
        <main className="lg:p-6 sm:p-0 bg-gray-100 flex-grow overflow-y-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Section title="Add Contractor">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative flex flex-col w-full" >
                <label className="text-sm font-medium text-gray-700">Contractor Type </label>
                <button
                  
                  className="flex items-center justify-between p-2.5 mt-1 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white"
                  onClick={() => setIsOpen(!isopen)}
                  ref={dropdownRef}
                >
                  {select}
                  <svg
                    className="w-2.5 h-2.5 transition-transform duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    style={{ transform: isopen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path
                      stroke="gray"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {isopen && (
                  <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                    <input
                      type="text"
                      className="w-full p-2 border-b border-gray-300 focus:outline-none"
                      placeholder="Search..."
                      value={searchItem}
                      onChange={(e) => setSearchItem(e.target.value)}
                      autoFocus
                    />
                    <ul className="py-2 max-h-40 overflow-auto">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                          <li
                            key={index}
                            className="cursor-pointer p-2 hover:bg-gray-200"
                            onClick={() => handleSelect(option)}
                          >
                            {option}
                          </li>
                        ))
                      ) : (
                        <li className="p-2 text-gray-500">No results found</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
                {renderInput("Company Name", "companyName", true)}
                {renderInput("Phone No", "phoneNo")}
                {renderInput("Company Website", "companyWebsite")}
                {renderInput("Contractor Email", "email")}
                {renderInput("Account", "account")}
              </div>
            </Section>

            {/* Additional Notes */}
            <Section title="Additional Notes">
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="4"
                placeholder="Type here"
              />
            </Section>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={resetData}
              >
                Cancel
              </button>

              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={(e) => {
                  e.preventDefault(); // Prevent any accidental form submission
                  console.log("Form Data:", formData); // Log the complete form data
                }}
              >
                Save
              </button>
              {/* <Link href="/owner/contractor_management/view_contractors" className="px-4 py-2 bg-red-500 text-white rounded-lg">
                Save
              </Link> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  function renderInput(label, name, required = false) {
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
