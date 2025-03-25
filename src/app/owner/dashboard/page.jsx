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
import Carousel from "../components/carousel/page";

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
      <div className="grid grid-cols-3 md:flex  p-2">
        <div>
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
        </div>
        <div className=" flex items-center md:mt-5  px-2 sm:px-6 lg:px-8 md:ml-56">
            <p className="text-[12px]  md:text-2xl md:font-semibold">Diamond Galaxy</p>
        </div>
        <div className="flex justify-end md:ml-[730px]">
            <Header appear={true} />
        </div>
      </div>

      <div className="md:ml-64">
        
        <div className=" p-6 bg-white">
          <div className="mx-auto bg-white flex justify-center items-center ">
            <div className="w-full bg-[#22405c] p-4 justify-center rounded-md">
                <div className="flex flex-row text-white  gap-6 justify-between">
                  <div>
                    <img
                      className="w-14 h-14 rounded-[400px] object-cover"
                      src="/logo.jpg"
                      alt="Rounded avatar"
                    />
                  </div>
                  <div className="text-sm md:text-md">
                    <p>Member Name : Ali</p>
                    <p>Member Grade : Top Level</p>
                  </div>
                  <div  className="text-sm md:text-md">
                    <p>Refered By : Rafy</p>
                    <p>Senior Username : Rafy </p>
                  </div>
                </div>
                <p className="mt-4 text-white font-bold">Personal Link</p>
                <button className="w-full p-1 bg-white text-blue rounded-md">
                  <Link href="#" className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="size-5 fill-gray-700 mt-1">
                    <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>
                    <p className="text-blue-500 underline text-left ml-4">www.diamondGalaxy.io</p>
                  </Link>
                </button>
            </div>


          </div>
          {/* carousel */}
            <div className="flex justify-center items-center mt-4">
            <Carousel />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;
