"use client";
import Header from "@/app/owner/components/header/Header";
import SideBar from "@/app/owner/components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Link from "next/link";
import Pagination from "../../components/pagination/page";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "House Paint",
    start: new Date(2024, 7, 21, 13, 0),
    end: new Date(2024, 7, 21, 15, 0),
  },
  {
    title: "Furniture Polish",
    start: new Date(2024, 7, 22, 8, 0),
    end: new Date(2024, 7, 22, 10, 0),
  },
  {
    title: "Electricity Work",
    start: new Date(2024, 7, 24, 10, 0),
    end: new Date(2024, 7, 24, 12, 0),
  },
  {
    title: "Furniture Polish",
    start: new Date(2024, 7, 22, 8, 0),
    end: new Date(2024, 7, 22, 10, 0),
  },
];

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("Home");

  const handleChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [currentView, setCurrentView] = useState("week");

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const eventDates = events.map((event) => {
    const date = event.start;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  });

  const modifiers = {
    event: eventDates,
  };
  const handleViewChange = (view) => {
    setCurrentView(view);
    console.log("View changed to:", view);
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
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const formatTime = (date) => {
    return format(date, "hh:mm a");
  };
  const section = "Maintenance Scheduling";

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="overflow-y-auto scrollbar-hidden">
      <button
        ref={buttonRef}
        onClick={handleSidebarToggle}
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <SideBar section={section} />
      </aside>

      <div className="lg:ml-64 md:ml-0 sm:ml-0">
        <Header
          appear={false}
          title={"Maintenance Scheduling"}
          toggleSidebar={toggleSidebar}
          buttonRef={buttonRef}
        />
        <div className="p-6 bg-white">
          <div className="mx-auto bg-white">
            <div className="flex flex-wrap justify-end gap-4 sm:gap-6 items-center">
              {/* Filter Label */}
              <div>
                <span className="text-sm sm:text-base font-medium text-gray-700">
                  Filter By
                </span>
              </div>
              {/* Dropdown Button */}
              <div className="relative inline-block">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  ref={dropdownRef}
                  className="text-gray-400 bg-[#FBFAFA] font-medium rounded-[100px] text-sm px-4 py-2 sm:px-5 sm:py-2.5 flex items-center "
                  type="button"
                >
                  {selectedOption}
                  <svg
                    className="w-3 h-3 ml-2"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg z-50 ">
                    <ul className="py-2 text-sm text-gray-700 ">
                      {["Dashboard", "Setting", "Earnings", "Sign Out"].map(
                        (option) => (
                          <li
                            key={option}
                            className="block px-4 py-2 hover:bg-gray-100 "
                          >
                            <button onClick={() => handleChange(option)}>
                              {option}
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
              {/* Add Property Button */}
              <div>
                <Link
                  href="/owner/maintenance_scheduling/add_scheduling"
                  className="bg-[#FF9100] text-white px-4 py-2 text-sm rounded-md hover:bg-[#e07d00] shadow-lg flex items-center"
                >
                  <img
                    src="/icons/material-symbols_add.png"
                    className="w-5 h-5 mr-1"
                    alt="Add"
                  />
                  <span className="hidden sm:inline">Add Property</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row gap-4 w-full pt-1 mt-6">
              {/* Left Column (Calendar) */}
              <div className="relative w-full md:w-2/3 lg:w-2/3 bg-[#F9F9F9] p-4 rounded-2xl h-[500px] md:h-[calc(100vh-100px)] lg:h-[calc(100vh-100px)]">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  views={["day", "week", "month"]}
                  date={currentDate}
                  view={currentView}
                  onNavigate={handleNavigate}
                  onView={handleViewChange}
                  style={{ height: "100%" }}
                />
              </div>

              {/* Right Column (DayPicker & Upcoming Tasks) */}
              <div className="w-full md:w-1/3 lg:w-1/3 flex flex-col gap-4">
                {/* Calendar (DayPicker) */}
                {/* <div className="p-4 bg-white rounded-lg shadow-lg">
                  <DayPicker
                    className="text-gray-800"
                    modifiers={modifiers}
                    modifiersClassNames={{
                      selected: "bg-red-500 text-white rounded-full",
                      today: "bg-blue-200",
                      event:
                        "relative after:content-[''] after:w-2 after:h-2 after:bg-red-500 after:rounded-full after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2",
                    }}
                  />
                </div> */}

                {/* Upcoming Tasks List */}
                <div className="bg-white shadow-lg rounded-lg p-4 w-full overflow-y-auto">
                  <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
                  <div className="space-y-4">
                    {events.map((event, index) => {
                      const day = format(event.start, "dd");
                      const month = format(event.start, "MMM");
                      const dayOfWeek = format(event.start, "EEE");
                      const startTime = formatTime(event.start);
                      const endTime = formatTime(event.end);

                      return (
                        <div key={index} className="flex space-x-4 flex-col">
                          {/* Date Badge */}
                          <div className="flex flex-row items-center justify-between bg-red-100 text-[#232323] rounded-full w-full h-6 pr-4 pl-4 mb-2">
                            <span className="text-sm font-medium">
                              {day} {month}
                            </span>
                            <span className="text-xs font-medium">
                              {dayOfWeek}
                            </span>
                          </div>

                          {/* Event Details */}
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">
                              {event.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {startTime} - {endTime}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <Pagination/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
