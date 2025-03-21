"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/app/owner/components/sidebar/SideBar";
import Header from "@/app/owner/components/header/Header";
import Link from "next/link";
export default function SchedulingForm() {
  // const [selectedOption, setSelectedOption] = useState("");
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef=useRef(null);
  const homeDropdownRef=useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // home system 
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  const [selectHomeType,setSelectHomeType]=useState("Dryer");
  const [searchItemHome,setSearchItemHome]=useState("");
  // recurring
  const [isRecurringDropdownOpen, setIsRecurringDropdownOpen] = useState(false);
  const [selectRecurringType,setSelectRecurringType]=useState("Weekly");
  const [searchItemRecurring,setSearchItemRecurring]=useState("");
  const [formData, setFormData] = useState({
    // taskName: "",
    date: "",
    maintenanceType: "system-term",
    homeSystem: "",
    recurringType:"",
    reminder: "10-Days",
  });

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
      !dropdownRef.current.contains(event.target) &&
      homeDropdownRef.current &&
      !homeDropdownRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
      setIsHomeDropdownOpen(false);
      setIsRecurringDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const options=["Dishwasher 1",
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
    "Yard/ Garden","Three Free Fields" 
  ];
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchItemHome.toLowerCase())
  );
  const handleSelect=(option)=>{
    setSelectHomeType(option);
    setIsHomeDropdownOpen(false);
  }

  const RecurType=[
    "Weekly",
    "Monthly",
    "Quarterly",
    "Yearly"
  ];
  const filteredOptionsRec = RecurType.filter((option) =>
    option.toLowerCase().includes(searchItemRecurring.toLowerCase())
  );
  const handleRecType=(option)=>{
    setSelectRecurringType(option);
    setIsRecurringDropdownOpen(false);
  }
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const handleCancel=(e)=>{
    e.preventDefault();
    setFormData("");
  }

  return (
    <div className="overflow-y-auto scrollbar-hidden">
      {/* Sidebar Toggle Button */}
      <button
        ref={buttonRef}
        onClick={toggleSidebar}
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

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <Sidebar section="Maintenance Scheduling" />
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 md:ml-64 sm:ml-0 flex flex-col flex-grow h-screen overflow-hidden">
        {/* Header */}
        <Header title={"Maintenance Scheduling"} toggleSidebar={toggleSidebar} buttonRef={buttonRef} />

        {/* Scrollable Content Area */}
        <main className="lg:p-6 sm:p-4 bg-gray-100 flex-grow overflow-y-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Task Detail</h2>

            <form>
              {/* Task Name Input */}
              {/* <div className="flex flex-col mb-4">
                <label className="font-medium">Task Name</label>
                <input
                  name="taskName"
                  value={formData.taskName}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none mt-3"
                  type="text"
                  placeholder="Enter task name"
                />
              </div> */}

              {/* Date Input & Radio Buttons */}
              <div className="grid grid-cols-1 gap-6 mb-4">
                {/* Date Picker */}
                <div className="w-full">
                  <label className="font-medium">Maintenance Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-gray-400 p-2 rounded-lg w-full mt-3"
                  />
                </div>

                {/* Radio Buttons for Term Type */}
                {/* <div className="w-full">
                  <label className="font-medium">Maintenance Type</label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="maintenanceType"
                        value="system-term"
                        checked={formData.maintenanceType === "system-term"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">System Term</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="maintenanceType"
                        value="recurring"
                        checked={formData.maintenanceType === "recurring"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Recurring</span>
                    </label>
                  </div>
                </div> */}
              </div>


              {/* Dropdown Menu */}
              <div className="grid grid-cols-2 gap-5">
              <div className="relative mb-4" ref={homeDropdownRef}>
                <label>Home System</label>
                <button
                  className="text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center w-full mt-3"
                  type="button"
                  onClick={() => setIsHomeDropdownOpen(!isHomeDropdownOpen)}
                >
                  {selectHomeType}
                  <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 10 6" 
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
                  </svg>
                </button>

                {isHomeDropdownOpen && (
                  <div className="absolute top-18 left-0 w-full bg-white shadow-lg rounded-lg border border-gray-200 z-50" >
                  <input
                    type="text"
                    className="w-full p-2 border-b border-gray-300 focus:outline-none"
                    placeholder="Search..."
                    value={searchItemHome}
                    onChange={(e) => setSearchItemHome(e.target.value)}
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
              <div className="relative mb-4" ref={dropdownRef}>
                <label>Recommended Frequency</label>
                <button 
                  className="text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center w-full mt-3"
                  type="button"
                  onClick={() => setIsRecurringDropdownOpen(!isRecurringDropdownOpen)}
                  
                >
                  {selectRecurringType}
                  <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
                  </svg>
                </button>

                {isRecurringDropdownOpen && (
                  <div className="absolute top-18 left-0 w-full bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                  <input
                    type="text"
                    className="w-full p-2 border-b border-gray-300 focus:outline-none"
                    placeholder="Search..."
                    value={searchItemRecurring}
                    onChange={(e) => setSearchItemRecurring(e.target.value)}
                    autoFocus
                  />
                  <ul className="py-2 max-h-40 overflow-auto">
                    {filteredOptionsRec.length > 0 ? (
                      filteredOptionsRec.map((option, index) => (
                        <li
                          key={index}
                          className="cursor-pointer p-2 hover:bg-gray-200"
                          onClick={() => handleRecType(option)}
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
              {/* set reminders */}
              {/* <div className="flex flex-col gap-4 mt-2">
                <label>Set Reminders</label>
                <div className="flex flex-row gap-6">
                    <label className="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name="reminder"
                        value="10-days"
                        checked={formData.reminder === "10-days"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">10 Days</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name="reminder"
                        value="20-days"
                        checked={formData.reminder === "20-days"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">20 Days</span>
                    </label>

                    <label className="flex items-center cursor-pointer">
                    <input
                        type="radio"
                        name="reminder"
                        value="30-days"
                        checked={formData.reminder === "30-days"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">30 Days</span>
                    </label>
                </div>
                </div> */}
                </div>
                {/* <div className="mt-5">
                  <Section
                    title="Task Description "
                    >
                    <textarea
                        name="taskDescription"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        rows="4"
                        placeholder="Type here"
                    />
                    </Section>
                  </div> */}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded-lg"
                            onClick={handleCancel
                            }
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
                        {/* <Link
                            href="/owner/maintenance_scheduling/scheduling"
                            className="px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                            Save
                        </Link> */}
                    </div>
                </form>
            </div>
        </main>
      </div>
    </div>
  );
}  