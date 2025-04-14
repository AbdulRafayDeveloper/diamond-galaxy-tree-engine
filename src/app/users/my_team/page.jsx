"use client";
import { id } from "date-fns/locale";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";

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

  const section = "My Team";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const levelsData=[
    {
        id: "01",
        level:"Level 1",
        discription:"0 Team Members"
    },
    {
        id: "02",
        level:"Level 2",
        discription:"0 Team Members"
    },
    {
        id: "03",
        level:"Level 3",
        discription:"0 Team Members"
    },
    {
        id: "04",
        level:"Level 4",
        discription:"0 Team Members"
    },
    {
        id: "05",
        level:"Level 5",
        discription:"0 Team Members"
    },
    {
        id: "06",
        level:"Level 6",
        discription:"0 Team Members"
    },
    {
        id: "07",
        level:"Level 7",
        discription:"0 Team Members"
    },

  ]

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
            className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0`}
            aria-label="Sidebar"
          >
            <SideBar section={section} />
          </aside>
        </div>
        <div className=" flex items-center md:mt-2  px-1 sm:px-6 lg:px-8 md:ml-56">
          <p className="text-[12px]  md:text-2xl md:font-semibold ml-3">
            My Team
          </p>
        </div>
        <div className="flex justify-end md:ml-[750px]">
          <Header appear={true} />
        </div>
      </div>

      <div className="md:ml-64">
        <div className="bg-white">
          <div className="md:p-4 p-2">
            <div className="bg-[#F6F1DE]  p-2 rounded-md">
                <div className="flex justify-center items-center text-center mt-4">
                    <p className="text-3xl font-thick text-md">User Levels</p>
                </div>
                <div className="mt-5">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 p-4  gap-5">
                        {
                            levelsData.map((el,idx)=>(
                                <div key={idx} className="bg-[#22405c] text-white p-2 rounded-md">
                                    <h1 className="text-lg font-bold">{el.level}</h1>
                                    <p className="text-sm ">{el.discription}</p>
                                </div> 
                            ))
                        }
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
