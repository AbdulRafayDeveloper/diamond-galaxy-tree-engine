"use client";
import Header from "../components/header/page";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);

  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const section = "Salary";

  const fetchSalary = async () => {
    try {
      const token = Cookies.get("token");

      const res = await axios.get(`/api/frontend/salary`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.data?.salary !== undefined) {
        setSalary(res.data.data.salary);
      }
    } catch (error) {
      console.error("Failed to fetch salary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    fetchSalary();
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  return (
    <div className="overflow-y-auto scrollbar-hidden">
      <div className="p-2 w-full">
        <div className="flex items-center justify-between">
          <button
            ref={buttonRef}
            onClick={handleSidebarToggle}
            aria-controls="separator-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>

          <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64">
            My Salary
          </p>

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
        >
          <SideBar section={section} />
        </aside>
      </div>

      {/* body part */}
      <div className="md:ml-64">
        <div className="flex justify-center items-center h-[500px] p-2">
          <div className="p-3 w-[310px] sm:w-[430px] md:w-[500px] lg:w-[600px] bg-[#22405c] rounded-md shadow-md">
            <div className="flex flex-col justify-center items-center text-center gap-5 p-8">
              <h1 className="text-4xl text-white font-bold text-center">
                Your Salary
              </h1>
              {loading ? (
                <p className="text-white text-xl">Loading...</p>
              ) : salary !== null ? (
                <h2 className="text-5xl text-white font-bold">
                  ${salary.toFixed(2)}
                </h2>
              ) : (
                <h2 className="text-white text-lg italic">
                  Salary not set yet
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
