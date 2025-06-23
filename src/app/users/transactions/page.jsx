"use client";
import { id } from "date-fns/locale";
import Header from "../components/header/page";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null); // instead of isOpen
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

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

  const section = "Transaction";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const Data = [
    {
      id: 1,
      name: "Balance Transfer",
      time: "Jan 20 2025 1:58: pm",
      address: "#GYYIOIREREDCJKI",
      amount: "0.00 USD",
      balance: "0.00 USD",
      details:
        "Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
      id: 2,
      name: "Withdraw",
      time: "Jan 20 2025 8:58: pm",
      address: "aMYYIOIREREDCJKI",
      amount: "0.00 USD",
      balance: "0.00 USD",
      details:
        "Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
      id: 3,
      name: "Withdraw",
      time: "Jan 20 2025 10:58: pm",
      address: "aMYYIOIREREDCJKI",
      amount: "0.00 USD",
      balance: "0.00 USD",
      details:
        "Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
      id: 4,
      name: "Balance Reward",
      time: "Jan 20 2025 2:58: pm",
      address: "aMYYIOIREREDCJKI",
      amount: "0.00 USD",
      balance: "0.00 USD",
      details:
        "Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
      id: 5,
      name: "Balance Reward",
      time: "Jan 20 2025 7:8: am",
      address: "aMYYIOIREREDCJKI",
      amount: "0.00 USD",
      balance: "0.00 USD",
      details:
        "Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
      id: 6,
      name: "Withdraw",
      time: "Jan 20 2025 8:58: pm",
      address: "aMYYIOIREREDCJKI",
      amount: "0.00 USD",
      balance: "0.00 USD",
      details:
        "Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
      id: 7,
      name: "Withdraw",
      time: "Jan 20 2025 10:58: pm",
      address: "aMYYIOIREREDCJKI",
      amount: "0.00 USD",
      balance: "0.00 USD",
      details:
        "Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
      id: 8,
      name: "Salary",
      time: "Jan 20 2025 10:58: pm",
      address: "aMYYIOIREREDCJKI",
      amount: "0.00 USD",
      balance: "0.00 USD",
      details:
        "Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
  ];

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/frontend/transactions", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setTransactions(res.data.data.transactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
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
            Transactions
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
        <div className="mt-6">
          <div className="container p-2">
            <div className="grid grid-cols-1 gap-4">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <svg
                    className="animate-spin h-8 w-8 text-[#22405c]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                </div>
              ) : (
                transactions.map((el, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-[#F6F1DE] rounded-md shadow-md p-2 text-sm text-gray-800"
                  >
                    <div
                      className="grid grid-cols-2 cursor-pointer "
                      onClick={() => handleToggle(index)}
                    >
                      <div className="flex flex-row gap-2">
                        <div className="mt-3">
                          {expandedId === index ? (
                            <Image
                              src="/icons/down.png"
                              width={20}
                              height={20}
                              alt="arrow down"
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              className="size-3"
                              fill="black"
                              stroke="black"
                            >
                              <path d="..." />
                            </svg>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <h1 className="text-md font-bold capitalize">
                            {el.type}
                          </h1>
                          <p className="text-[12px]">
                            {new Date(el.createdAt).toLocaleString()}
                          </p>
                          <p className="text-[12px]">
                            {el.senderId || "System"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <h1 className="font-bold">{el.amount} USD</h1>
                        <p className="text-[12px]">
                          Balance: {el.postbalance || "N/A"} USD
                        </p>
                      </div>
                    </div>

                    {expandedId === index && (
                      <div className="p-6 bg-white">
                        <table className="w-full">
                          <tbody>
                            <tr className="border-b border-gray-300">
                              <td className="py-1 pr-4">
                                <strong>Charge:</strong>
                              </td>
                              <td className="py-1">{el.amount} USD</td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="py-1 pr-4">
                                <strong>Post Balance:</strong>
                              </td>
                              <td className="py-1">
                                {el.postbalance || "N/A"} USD
                              </td>
                            </tr>
                            <tr>
                              <td className="py-1 pr-4">
                                <strong>Details:</strong>
                              </td>
                              <td className="py-1">{el.description}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
