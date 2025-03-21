"use client";
import Header from "@/app/owner/components/header/Header";
import Table from "@/app/owner/components/itemTable/Table";
import SideBar from "@/app/owner/components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import Pagination from "../components/pagination/page";
import Link from "next/link";

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
];

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [currentView, setCurrentView] = useState("week");

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
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
      !buttonRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  const products = [
    {
      name: "Apple MacBook Pro 17",
      image: "/icons/image_1.png",
      status: "Good",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
    {
      name: "Microsoft Surface Pro",
      image: "/icons/image_2.png",
      status: "Upcoming Maintenance",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
    {
      name: "Magic Mouse 2",
      image: "/icons/image_3.png",
      status: "Urgent Repair",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
    {
      name: "Google Pixel Phone",
      image: "/icons/image_4.png",
      status: "Upcoming Maintenance",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
    {
      name: "Apple Watch 5",
      image: "/icons/image_5.png",
      status: "Urgent Repair",
      service: "06/Sep/2024",
      date: "15/may/2024",
      warranty: "1 Year",
    },
  ];

  const section = "Dashboard";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
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
        <SideBar section={section} />
      </aside>

      <div className="sm:ml-64">
        <Header appear={true} title={"Welcome Hassan!"} />
        <div className=" p-6 bg-white">
          <div className="mx-auto bg-white  ">
            <div className="flex flex-col lg:flex-row gap-1 w-full pt-6 lg:h-[508px] md:h-screen">
              {/* Left Column (Smaller) */}
              <div className="w-full lg:w-1/3 bg-white rounded-lg pr-6  relative flex flex-col justify-between h-full ">
                <div className="bg-[#F9F9F9] rounded-lg lg:h-[500px] pb-6">
                  {" "}
                  <div className="w-56 h-48 rounded-2xl overflow-hidden mx-auto relative mt-4">
                    <img
                      src="/Rectangle 5185.png"
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Property Details */}
                  <div className="mt-4 flex-grow px-4">
                    <h3 className="text-2xl text-center font-bold text-[#4D4D4D]">
                      St Gamer Property
                    </h3>

                    {/* Two Columns Layout */}
                    <div className="grid grid-cols-2 gap-8 mt-4 text-sm">
                      {/* Left Column */}
                      <div className="flex flex-col justify-start space-y-3">
                        <div>
                          <p className="font-semibold text-xs">Address:</p>
                          <p className="text-xs">
                            111 W Main St Gamer, NC 27529
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-xs">Square Foot:</p>
                          <p className="text-xs">1857</p>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col justify-start space-y-3">
                        <div>
                          <p className="font-semibold text-xs">
                            Purchase Date:
                          </p>
                          <p className="text-xs">2/22/2022</p>
                        </div>
                        <div>
                          <p className="font-semibold text-xs pt-4">
                            Year Built:
                          </p>
                          <p className="text-xs">2001</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button - separate from the background section */}
                <div className="mt-4">
                  <Link href="#">
                    <button className="w-full bg-[#F9F9F9] py-2 rounded-lg text-gray-600 font-normal text-sm hover:bg-[#cdcccc] hover:text-white">
                      View Detail
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Column (Larger) */}
              <div className="w-full lg:flex-1 bg-[#F9F9F9] p-4 rounded-2xl lg:h-[490px] md:h-screen sm:h-screen">
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
            </div>

            {/* Table of items */}
            <Table products={products} />
            
            <Pagination/>
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
