"use client";
import Header from "../components/header/page";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

const eduData=[
    {
        id:1,
        name: "How to earn from youtube (Urdu/ Hindi)",
        url:"https://youtube.com/shorts/UvM8OUlZ2xA?si=7CbmUcqiDBjuBQGE",
        description:"In this video you Learn about detail how to earn money without investment",
        date:"20-02-2025 08:05 PM",
    },
    {
        id:2,
        name: "How to earn from youtube (Urdu/ Hindi)",
        url:"https://youtube.com/shorts/UvM8OUlZ2xA?si=7CbmUcqiDBjuBQGE",
        description:"In this video you Learn about detail how to earn money without investment",
        date:"20-02-2025 08:05 PM",
    },
];

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [refData, setData] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const section = "Education";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         setLoading(true);
//         const token = Cookies.get("token");

//         const response = await axios.get("/api/frontend/references", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const userData = response.data.data;
//         setData(userData);
//         setLoading(false);
//         console.log(userData);
//       } catch (e) {
//         setLoading(false);
//         console.error("Failed to fetch user:", e);
//       } finally {
//       }
//     };

//     getData();
//   }, []);

//   const maskEmail = (email) => {
//     const [first, domain] = email.split("@"); // Split the email
//     const masked = first.charAt(0) + "*".repeat(first.length - 1); // Mask the username
//     return `${masked}@${domain}`;
//   };

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
            Education
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

      <div className="md:ml-64">
        <div className="bg-white">
          <div className="p-2">
            <div className="grid lg:grid-cols-2 grid-cols-1  gap-5">
              {
                eduData.map((el,idx)=>(
                    <div
                    key={idx}
                    className="p-2 md:p-4 shadow-xl md:text-md text-sm bg-[#F6F1DE] gap-3"
                  >
                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div className="font-bold">Name</div>
                      <div className="text-[13px]">{el.name}</div>
                    </div>
                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div className="font-bold">File</div>
                      <div className="flex justify-end items-end">
                        <button className="px-3 py-1 bg-[#22405c] text-white rounded-md">
                            <Link href={el.url} className="text-[13px]" >
                                Play
                            </Link>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div className="font-bold">Description</div>
                      <div className="flex justify-end items-end text-[13px]">{el.description}</div>
                    </div>
                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div className="font-bold">Date</div>
                      <div className="flex justify-end items-end text-[13px]">{el.date}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
