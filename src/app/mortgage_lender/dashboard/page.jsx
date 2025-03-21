"use client";
import Header from "@/app/mortgage_lender/mortage_components/header/Header";
import Table from "@/app/mortgage_lender/mortage_components/itemTable/Table";
import SideBar from "@/app/mortgage_lender/mortage_components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";

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

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

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

  const products = [
    {
      name: "Johnathan Smith",
      propertyAddress: "111 W Main St Gamer, NC 27529",
      status: "Active",
      date: "15/may/2024",
    },
    {
      name: "Johnathan Smith",
      propertyAddress: "111 W Main St Gamer, NC 27529",
      status: "Pending",
      date: "15/may/2024",
    },
    {
      name: "Johnathan Smith",
      propertyAddress: "111 W Main St Gamer, NC 27529",
      status: "Expire",
      date: "15/may/2024",
    },
    {
      name: "Johnathan Smith",
      propertyAddress: "111 W Main St Gamer, NC 27529",
      status: "Active",
      date: "15/may/2024",
    },
    {
      name: "Johnathan Smith",
      propertyAddress: "111 W Main St Gamer, NC 27529",
      status: "Active",
      date: "15/may/2024",
    },
  ];

  const cardData = [
    {
      id: "01",
      title: "Gifted Homeowner",
      counterValue: "12",
    },
    {
      id: "02",
      title: "Pending Invite",
      counterValue: "03",
    },
    {
      id: "03",
      title: "Accept Invite",
      counterValue: "09",
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
        <Header appear={true} title={"Welcome Jack!"} />
        <div className=" p-6 bg-white">
          <div className="mx-auto bg-white  ">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 grid-cols-1 justify-center items-center text-center">
              {cardData.map((el, id) => (
                <div key={id}>
                  <div className="flex flex-col w-[300px] h-[156px] justify-center items-center text-center bg-[#F5F5F5] rounded-xl ">
                    <p className=" text-[18px] text-[#716E6D]">{el.title}</p>
                    <h1 className="text-5xl mt-3">{el.counterValue}</h1>
                  </div>
                </div>
              ))}
            </div>
            {/* Table of items */}
            <Table products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
