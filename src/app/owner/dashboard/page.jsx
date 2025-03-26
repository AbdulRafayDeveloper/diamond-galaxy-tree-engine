"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/app/owner/components/header/Header";
import SideBar from "@/app/owner/components/sidebar/SideBar";
import Link from "next/link";
import Carousel from "../components/carousel/page";
import Card from "../components/cards/page";
import Deposit from '../components/deposits/page';




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
        
        <div className="bg-white">
          <div className="bg-white p-4">
          <div className="w-full bg-white shadow-xl border border-[#22405c] p-4 justify-center rounded-md">
              <div className="flex flex-row text-[#22405c]  gap-6 justify-between">
                 <div>
                    <img
                      className="w-[70px] h-[55px] rounded-[300px] object-cover"
                      src="/logoImg.avif"
                      alt="Rounded avatar"
                    />
                  </div>
                  <div  className="flex flex-row md:text-md text-sm gap-4 justify-center item-center text-center mt-5">
                    <p className="text-[9px] md:text-lg">Refered By : Rafy</p>
                    <p className="text-[9px] md:text-lg">Senior Username : Rafy </p>
                  </div>
                  <div className="flex flex-row md:text-md text-sm gap-4 justify-center item-center text-center mt-5">
                    <p className="text-[9px] md:text-lg">Member Name : Ali</p>
                    <p className="text-[9px] md:text-lg">Member Grade : Top Level</p>
                  </div>
              </div>
                  
                  <p className="mt-4 text-[#22405c] font-bold">Personal Link</p>
                  <Link
                      href="https://www.diamondGalaxy.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-2 rounded-md bg-[#22405c] flex items-center justify-between text-white hover:bg-[#2a4e6d] transition-colors"
                    >
                      <span className="underline underline-offset-2 ml-2">www.diamondGalaxy.io</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="size-5 fill-white mt-1 text-left flex items-end">
                        <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/>
                      </svg>
                    </Link>
              </div>
              <div className=" mt-4">
                <Carousel />
              </div>
              <div>
                <Card/>
              </div>
              <div>
                <Deposit/>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
