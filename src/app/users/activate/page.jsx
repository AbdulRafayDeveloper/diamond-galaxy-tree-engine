"use client";
import { id } from "date-fns/locale";
import Header from "../components/header/page";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const section = "Activate";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [data, setData] = useState([]);
  const [commission, setCommission] = useState(0);
  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get("/api/admin/activate-commission");
        console.log("response of api is: ", response);
        setData(response.data.data);
        const { price, commission } = response?.data?.data || {};

        if (price && commission) {
          const percentage = ((commission * price) / 100).toFixed(2);
          setCommission(percentage);
        } else {
          console.log("Price or commission is missing in the response");
        }
      } catch (e) {
        console.error("Error fetching commission data", e);
      }
    };
    data();
  }, []);

  const handleRegister = async () => {
    try {
      const res = await axios.get("/api/activation", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      if (res.data?.status === 200) {
        toast.success(res.data.message || "Activated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.message || "Failed to activate. Please try again."
      );
    }
  };

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
            Activation
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
      {/* body part */}
      <div className="md:ml-64">
        <div className="flex justify-center items-center items-center min-h-[500px] p-2 ">
          <div className="p-3 md:w-[500px] lg:w-[600px] sm:[400px] w-[310px] h-[300px] bg-[#F6F1DE] p-3 rounded-md shadow-md ">
            <div className="flex flex-col jutify-center items-center gap-5  p-8 ">
              <div className="flex flex-col items-center border-b border-gray-400 gap-3">
                <h1 className="text-xl">Account Activation</h1>
                <p className="text-lg">${data?.price}</p>
              </div>
              <div className="flex flex-row gap-4 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#5CB338"
                  stroke="bg-green-600"
                  className="size-5"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
                <p className="text-[12px] md:text-md lg:text-md xl:text-md">
                  Tree Commission : {commission ?? ""}
                </p>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  cl
                  assName="size-5"
                  fill="black"
                  stroke="currentColor"
                >
                  <path d="M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                </svg>*/}
              </div>
              <div>
                <button
                  className="p-1 text-white bg-[#22405c] rounded-lg w-[300px]"
                  onClick={handleRegister}
                >
                  Activate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Page;
