"use client";
import Header from "@/app/admin/components/header/page";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
      title: "Withdraw",
      counterValue: "12",
    },
    {
      id: "02",
      title: "Deposit",
      counterValue: "03",
    },
    {
      id: "03",
      title: "Pending",
      counterValue: "09",
    },
    {
      id: "04",
      title: "Transections",
      counterValue: "12",
    },
    {
      id: "05",
      title: "Pending Invite",
      counterValue: "03",
    },
    {
      id: "06",
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
      <div className="p-2 w-full">
        <div className="flex items-center justify-between">
          {/* Mobile: Show sidebar toggle */}
          <button
            ref={buttonRef}
            onClick={handleSidebarToggle}
            aria-controls="separator-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
              />
            </svg>
          </button>

          {/* Title */}
          <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64">
            Welcome Shahzaib!
          </p>

          {/* Header component */}
          <div className="ml-auto">
            <Header appear={true} />
          </div>
        </div>
        <aside
          ref={sidebarRef}
          id="separator-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <SideBar section={section} />
        </aside>
      </div>
      <div className="sm:ml-64">
        {/* <Header appear={true} title={"Welcome Jack!"} /> */}
        <div className="p-3 bg-white">
          <div className="mx-auto bg-white  ">
            <div className="grid gap-4 justify-center items-center text-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {cardData.map((el, id) => (
                <div key={id} className="flex justify-center gap-5">
                  <div className="flex flex-col justify-center items-center bg-[#22405c] text-white rounded-xl p-4 w-full min-w-[240px] h-[156px]">
                    <p className="text-[18px]">{el.title}</p>
                    <h1 className="text-5xl mt-3">{el.counterValue}</h1>
                  </div>
                </div>
              ))}
            </div>
            {/* Table of items */}
            {/* <Table products={products} /> */}

            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
