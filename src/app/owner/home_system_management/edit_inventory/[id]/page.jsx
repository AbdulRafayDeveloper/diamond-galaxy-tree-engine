"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/app/owner/components/sidebar/SideBar";
import Header from "@/app/owner/components/header/Header";
import Link from "next/link";

export default function ApplianceForm() {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null); // Ref for toggle button
  const dropdownRef=useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isopen,setIsOpen]=useState(false);
  const [select,setSelect]=useState("Dishwasher 1");
  const [searchItem,setSearchItem]=useState("");

  const [formData, setFormData] = useState({
    roomNo:"",
    propertyColor: "#2563eb",
    brand:"",
    date:"",
    contractorType:"",
    additionalNotes: "",
    image: null,
  });

  const options = [
    "Dishwasher 1",
    "Dishwasher 2",
    "Dryer",
    "Microwave",
    "Oven",
    "Refrigerator 1",
    "Refrigerator 2",
    "Stove",
    "Washer",
    "Stand Alone Freezer",
    "Three Free Fields",
    "Air Ducts",
    "CO2 Detector",
    "Dryer Vent",
    "Exterior (Powerwashed)",
    "Garage Door Opener 1",
    "Garage Door Opener 2",
    "Garage Door Opener 3",
    "Garbage Disposal",
    "Gas Fireplace Logs",
    "Gutters",
    "HVAC 1 (filter size field)",
    "HVAC 2 (filter size field)",
    "HVAC 3 (filter size field)",
    "Jacuzzi",
    "Pool",
    "Roof",
    "Sauna",
    "Security System",
    "Smart Door Lock 1",
    "Smart Door Lock 2",
    "Smoke Detector (1-10)",
    "Thermostat 1",
    "Thermostat 2",
    "Thermostat 3",
    "Trash Compactor",
    "Water Heater",
    "Whole House Filtration System",
    "Windows",
    "Wood Burning Fireplace/Chimney",
    "Yard Sprinkler System",
    "Yard/ Garden",
    "Three Free Fields"
  ];
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handleSelect = (option) => {
    setSelect(option);
    setIsOpen(false);
  };


  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <Sidebar section="Home System Management" />
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 md:ml-64 sm:ml-0 flex flex-col flex-grow h-screen overflow-hidden">
        {/* Header */}
        <Header
          title={"Edit Home Inventory"}
          toggleSidebar={toggleSidebar}
          buttonRef={buttonRef}
        />

        {/* Scrollable Content Area */}
        <main className="lg:p-6 sm:p-0 bg-gray-100 flex-grow overflow-y-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Section
              title="Inventory Detail"
              description="Add your Inventory relevant detail"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="lg:text-sm md:text-sm font-medium text-gray-700 sm:text-xs pb-1">
                    Room No
                  </label>
                  <input
                    type="number"
                    name="roomNo"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-lg required"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="lg:text-sm md:text-sm font-medium text-gray-700 sm:text-xs pb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-lg required"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="lg:text-sm md:text-sm font-medium text-gray-700 sm:text-xs pb-1">
                    Date Completed
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-lg required"
                  />
                </div>
                <div className="relative flex flex-col w-full" ref={dropdownRef}>
                <label className="text-sm font-medium text-gray-700">Contractor Name </label>
                <button
                  className="flex items-center justify-between p-2.5 mt-1 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white"
                  onClick={() => setIsOpen(!isopen)}
                  
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
                <div className="flex flex-col gap-5">
                  <label className="lg:text-sm md:text-sm font-medium text-gray-700 sm:text-xs pb-1">
                    Set Color
                  </label>
                  <input
                    type="color"
                    name="propertyColor"
                    value={formData.propertyColor}
                    onChange={handleChange}
                    className="p-2 w-20 h-8 border border-gray-300 rounded-lg required"
                  />
                </div>
                {/* {renderInput("Systen Name", "systemName", true)}
                {renderInput("Model Number", "modelNumber")}
                {renderInput("Brand", "brand")}
                {renderInput("System Type", "systemType", true)}
                {renderInput("Serial Number", "serialNumber")}
                {renderInput("Maintenance Status", "maintenanceStatus")} */}
              </div>

              {/* <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <div
                  className="mt-2 border-dashed border-2 border-gray-300 p-6 text-center text-gray-500 cursor-pointer"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                >
                  {formData.image ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Uploaded"
                        className="max-h-40 object-contain mb-2"
                      />
                      <button
                        type="button"
                        className="text-red-500 underline text-sm"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, image: null }))
                        }
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <>
                      <p>
                        Drag and drop an image here, or click to select a file
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="fileUpload"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="fileUpload"
                        className="cursor-pointer text-blue-500 underline"
                      >
                        Browse Files
                      </label>
                    </>
                  )}
                </div>
              </div> */}
            </Section>

            {/* Other Sections */}
            {/* {renderCompanySections()} */}

            {/* Additional Notes */}
            <Section
              title="Additional Notes"
              description="Add more detail about inventory"
            >
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
                onClick={() => {
                  console.log("Cancelled");
                  // Optional: Clear form or do other logic if needed
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className="px-4 py-2 bg-[#FF9202] hover:bg-[#ed8701] text-white rounded-lg"
                onClick={(e) => {
                  e.preventDefault(); // Prevent any accidental form submission
                  console.log("Form Data:", formData); // Log the complete form data
                }}
              >
                Save
              </button>
              {/* <Link
                href="/owner/home_system_management/home"
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Save
              </Link> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // function renderInput(label, name, required = false) {
  //   return (
  //     <div className="flex flex-col">
  //       <label className="lg:text-sm md:text-sm font-medium text-gray-700 sm:text-xs pb-1">
  //         {label} {required && <span className="text-red-500">*</span>}
  //       </label>
  //       <input
  //         type="text"
  //         name={name}
  //         value={formData[name]}
  //         onChange={handleChange}
  //         className="p-2 border border-gray-300 rounded-lg"
  //       />
  //     </div>
  //   );
  // }

  // function renderCompanySections() {
  //   return (
  //     <>
  //       <Section
  //         title="Purchased From"
  //         description="Add your system relevant detail"
  //       >
  //         {renderCompanySection("purchasedFrom")}
  //       </Section>
  //       <Section
  //         title="Installed by"
  //         description="Add your system relevant detail"
  //       >
  //         {renderCompanySection("installedBy", true)}
  //       </Section>
  //       <Section
  //         title="Purchased by"
  //         description="Add your system relevant detail"
  //       >
  //         {renderCompanySection("purchasedBy")}
  //       </Section>
  //     </>
  //   );
  // }

  function renderCompanySection(section, hasContractor = false) {
    const fields = [
      { label: "Company Name", name: "companyName" },
      { label: "Contact Name", name: "contactName" },
      { label: "Phone No", name: "phone" },
      ...(hasContractor
        ? [{ label: "Select Contractor", name: "contractor" }]
        : []),
      { label: "Email", name: "email" },
      {
        label: hasContractor ? "Last Serviced" : "Warranty Expires",
        name: "warrantyExpires",
      },
      { label: "Purchase Date", name: "purchaseDate" },
      { label: "Company Website", name: "website" },
      ...(hasContractor
        ? [{ label: "Installation Date", name: "installationDate" }]
        : []),
    ];

    return (
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.name.includes("Date") ? "date" : "text"}
              name={field.name}
              value={formData[section][field.name] || ""}
              onChange={(e) => handleNestedChange(section, e)}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}
      </div>
    );
  }
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
