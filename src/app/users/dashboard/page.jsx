"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/app/users/components/header/page";
import SideBar from "@/app/users/components/sidebar/SideBar";
import Link from "next/link";
import Carousel from "../components/carousel/page";
import Card from "../components/cards/page";
import WithDraw from "../components/with-draw/page";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import RevenueGraph from "../components/revenue-graph/page";
const revenueData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 2100 },
  { month: "Mar", revenue: 800 },
  { month: "Apr", revenue: 1600 },
  { month: "May", revenue: 2500 },
  { month: "Jun", revenue: 3000 },
  { month: "Jul", revenue: 2000 },
  { month: "Aug", revenue: 2200 },
  { month: "Sep", revenue: 1900 },
  { month: "Oct", revenue: 2800 },
  { month: "Nov", revenue: 3200 },
  { month: "Dec", revenue: 4000 },
];

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState("");

  const link = "https://www.diamondGalaxy.io";
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.referenceUrl);
      toast.success("Referral link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");

        const response = await axios.get("/api/frontend/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.data;
        setData(userData);
        setLoading(false);
        console.log(userData);
      } catch (e) {
        console.error("Failed to fetch user:", e);
      } finally {
        setLoading(false);
      }
    };

    getData();
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
          <p className="text-[12px] md:text-xl md:font-semibold ml-3 md:ml-64 lg:ml-64">
            Diamond Galaxy
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

      {loading ? (
        <p>Loading user...</p>
      ) : (
        <div className="md:ml-64">
          <div className="bg-white">
            <div className="bg-white p-4">
              <div className="w-full bg-white shadow-xl border border-[#22405c] p-4 justify-center rounded-md">
                <div className="flex flex-col lg:flex-row items-center lg:items-start text-[#22405c] gap-4 lg:gap-10 p-4">
                  {/* Image */}
                  <div className="w-full lg:w-auto flex justify-center lg:justify-start">
                    <img
                      className="w-[70px] h-[55px] rounded-full object-cover"
                      src="/logoImg.avif"
                      alt="Rounded avatar"
                    />
                  </div>
                  {/* Info Section */}
                  <div className="flex flex-wrap w-full gap-4 text-center lg:text-left justify-center lg:justify-start">
                    {/* Block 1 */}
                    <div className="w-full md:w-1/2 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                      <p className="text-[13px] lg:text-base font-medium">
                        Member Name:{" "}
                        <span className="font-normal">{data?.fname || ""}</span>
                      </p>
                      <p className="text-[13px] lg:text-base font-medium">
                        Member Grade:{" "}
                        <span className="font-normal">{data?.grade || ""}</span>
                      </p>
                    </div>
                    {/* Block 2 */}
                    <div className="w-full md:w-1/2 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                      <p className="text-[13px] lg:text-base font-medium">
                        Country Name:{" "}
                        <span className="font-normal">{data?.country}</span>
                      </p>
                      <p className="text-[13px] lg:text-base font-medium">
                        Referred By:{" "}
                        <span className="font-normal">
                          {data?.referrerId?.fname || "NA"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[#22405c] font-bold">Personal Link</p>
                <div
                  onClick={handleCopy}
                  className="cursor-pointer w-full p-2 rounded-md bg-[#22405c] flex items-center justify-between text-white hover:bg-[#2a4e6d] transition-colors"
                >
                  <span className="underline underline-offset-2 ml-2 text-sm break-all whitespace-normal overflow-hidden">
                    {data?.referenceUrl}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="size-5 fill-white mt-1 text-left flex items-end"
                  >
                    <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <RevenueGraph data={revenueData} />
              </div>
              <div className=" mt-4">
                <Carousel />
              </div>
              <div>
                <Card />
              </div>
              <div className="conatiner mt-5">
                <div className="bg-[#F6F1DE] p-3">
                  <div className="bg-[#22405c] p-3 rounded-md">
                    <h1 className="text-xl text-white">Deposit</h1>
                  </div>
                  <div className="flex flex-row justify-between gap-4 p-4">
                    <div>
                      <p>Submitted</p>
                      <p>$0.00</p>
                    </div>
                    <div>
                      <p>Pending</p>
                      <p>$0.00</p>
                    </div>
                    <div>
                      <p>Rejected</p>
                      <p>$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <WithDraw />
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Page;
