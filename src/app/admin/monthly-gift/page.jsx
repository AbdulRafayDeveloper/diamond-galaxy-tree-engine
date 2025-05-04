"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/app/admin/components/header/Header";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import Table from "@/app/admin/components/luckydrawTable/luckyDrawTable";
import Pagination from "../components/pagination/Pagination";
import Link from "next/link";
import Spinner from "../components/luckyDrawSpinner/Spinner";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
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
      username: "Ali",
      email: "abcd1234@gmail.com",
      lucky: "Gold",
    },
    {
        username: "Rafy",
        email: "abcd1234@gmail.com",
        lucky: "Diamond",
    },
    {
        username: "Abbas",
        email: "abcd1234@gmail.com",
        lucky: "Gold",
    },
    {
        username: "Qasim",
        email: "abcd1234@gmail.com",
        lucky: "Gold",
    },
    {
        username: "Hussnain",
        email: "abcd1234@gmail.com",
        lucky: "Silver",
    },
  ];

 
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
const section="Monthly Gifts"
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
          <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64 p-5">
          Monthly Gifts
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
        {/* <Header appear={false} title={"All Users"} /> */}
        <Spinner/>
      </div>
    </div>
  );
};

export default Page;
