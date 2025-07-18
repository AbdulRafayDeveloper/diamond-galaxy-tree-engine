"use client";
import { id } from "date-fns/locale";
import Header from "../components/header/page";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Data = [
  {
    id: 1,
    name: "Silver",
    lotteryPrice: "$0.00",
    winningPrice: "Big Prize",
    date: "1-05-2025",
  },
  {
    id: 2,
    name: "Gold",
    lotteryPrice: "$0.00",
    winningPrice: "Big Prize",
    date: "11-06-2024",
  },
  {
    id: 3,
    name: "Diamond",
    lotteryPrice: "$0.00",
    winningPrice: "Big Prize",
    date: "21-03-2025",
  },
  {
    id: 4,
    name: "Star",
    lotteryPrice: "$0.00",
    winningPrice: "Big Prize",
    date: "20-02-2024",
  },
  {
    id: 5,
    name: "Royal",
    lotteryPrice: "$0.00",
    winningPrice: "Big Prize",
    date: "21-02-2025",
  },
];

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

  const section = "Lucky Draw";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [drawData, setDrawData] = useState([]);
  const [activeDraws, setActiveDraws] = useState({});

  const isCardActive = (name) => {
    return activeDraws[`is_${name.toLowerCase()}`] === true;
  };

  useEffect(() => {
    const fetchLuckyDraws = async () => {
      try {
        const res = await axios.get("/api/admin/lucky-draw", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setDrawData(res.data.data.draws || []);
        setActiveDraws(res.data.data.activeDraws || {});
      } catch (err) {
        console.error("Failed to fetch lucky draw data", err);
      }
    };
    fetchLuckyDraws();
  }, []);

  const getDrawInfoByType = (typeName) => {
    return drawData.find(
      (d) => d.type?.toLowerCase() === typeName.toLowerCase()
    );
  };

  const handleBuyDraw = async (type) => {
    const confirmation = await Swal.fire({
      title: `Buy ${type} Lucky Draw?`,
      text: "Are you sure you want to purchase this lucky draw?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22405c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, buy it!",
    });

    if (!confirmation.isConfirmed) return;

    try {
      const res = await axios.put(
        "/api/admin/lucky-draw",
        { type },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log("res for purchase: ", res);
      console.log("res for purchase: ", res.data);
      console.log("res for purchase: ", res.data.status);

      console.log(res);
      if (res.data.status == 200) {
        console.log("Purchase successful");
        toast.success("Successfully applied for lucky draw");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error("Purchase failed:", res.data.message);
        toast.error(res.data.message || "Purchase failed");
      }
    } catch (error) {
      console.error("Error during purchase:", error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: error?.response?.data?.message || "Purchase failed",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
              Lucky Draw
            </p>

            {/* Header component */}
            <div className="ml-auto">
              <Header appear={true} />
            </div>
          </div>
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
        {/* body part */}
        <div className="md:ml-64">
          <div className="p-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {Data.map((el, idx) => {
                const draw = getDrawInfoByType(el.name);
                if (!draw) return null; // Skip if draw not found

                return (
                  <div
                    key={idx}
                    className="p-4 bg-[#F6F1DE] shadow-md rounded-lg border w-full flex flex-col"
                  >
                    <div className="flex flex-row justify-between ">
                      <div>
                        <h1 className="text-xl font-bold mb-4 text-center sm:text-left">
                          {el.name}
                        </h1>
                      </div>
                      <div>
                        <button
                          disabled={isCardActive(el.name)}
                          className={`p-2 rounded-md w-[80px] font-bold ${isCardActive(el.name)
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-[#22405c] text-white"
                            }`}
                          onClick={() =>
                            !isCardActive(el.name) &&
                            handleBuyDraw(el.name.toLowerCase())
                          }
                        >
                          {isCardActive(el.name) ? "Bought" : "Buy"}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 text-sm sm:text-base">
                      {/* Lucky Draw Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold text-[#22405c]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            className="size-4 "
                            stroke="currentColor"
                            fill="currentColor"
                          >
                            <path d="M163.9 136.9c-29.4-29.8-29.4-78.2 0-108s77-29.8 106.4 0l17.7 18 17.7-18c29.4-29.8 77-29.8 106.4 0s29.4 78.2 0 108L310.5 240.1c-6.2 6.3-14.3 9.4-22.5 9.4s-16.3-3.1-22.5-9.4L163.9 136.9zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5L192 512 32 512c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l36.8 0 44.9-36c22.7-18.2 50.9-28 80-28l78.3 0 16 0 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l120.6 0 119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384c0 0 0 0 0 0l-.9 0c.3 0 .6 0 .9 0z" />
                          </svg>
                          Lucky Draw Price:
                        </div>
                        <div>{`$${draw.price}`}</div>
                      </div>

                      {/* Winning Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold text-[#22405c]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                            className="size-4 "
                            stroke="currentColor"
                            fill="currentColor"
                          >
                            <path d="M163.9 136.9c-29.4-29.8-29.4-78.2 0-108s77-29.8 106.4 0l17.7 18 17.7-18c29.4-29.8 77-29.8 106.4 0s29.4 78.2 0 108L310.5 240.1c-6.2 6.3-14.3 9.4-22.5 9.4s-16.3-3.1-22.5-9.4L163.9 136.9zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5L192 512 32 512c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l36.8 0 44.9-36c22.7-18.2 50.9-28 80-28l78.3 0 16 0 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l120.6 0 119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384c0 0 0 0 0 0l-.9 0c.3 0 .6 0 .9 0z" />
                          </svg>
                          Winning Price:
                        </div>
                        <div>{el.winningPrice}</div>
                      </div>

                      {/* Date of Announcement */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-semibold text-[#22405c]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="#5CB338"
                            stroke="bg-green-600"
                            className="size-5"
                          >
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                          </svg>
                          Date of Announcement:
                        </div>
                        <div>{new Date(draw.drawDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
