"use client";
import { id } from "date-fns/locale";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";

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

  const Data=[
    {
        id:1,
        name:"Balance Transfer",
        time:"Jan 20 2025 1:58: pm",
        address:"#GYYIOIREREDCJKI",
        amount:"0.00 USD",
        balance:"0.00 USD",
        details:"Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
        id:2,
        name:"Withdraw",
        time:"Jan 20 2025 8:58: pm",
        address:"aMYYIOIREREDCJKI",
        amount:"0.00 USD",
        balance:"0.00 USD",
        details:"Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
        id:3,
        name:"Withdraw",
        time:"Jan 20 2025 10:58: pm",
        address:"aMYYIOIREREDCJKI",
        amount:"0.00 USD",
        balance:"0.00 USD",
        details:"Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
        id:4,
        name:"Balance Reward",
        time:"Jan 20 2025 2:58: pm",
        address:"aMYYIOIREREDCJKI",
        amount:"0.00 USD",
        balance:"0.00 USD",
        details:"Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
        id:5,
        name:"Balance Reward",
        time:"Jan 20 2025 7:8: am",
        address:"aMYYIOIREREDCJKI",
        amount:"0.00 USD",
        balance:"0.00 USD",
        details:"Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
        id:6,
        name:"Withdraw",
        time:"Jan 20 2025 8:58: pm",
        address:"aMYYIOIREREDCJKI",
        amount:"0.00 USD",
        balance:"0.00 USD",
        details:"Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
        id:7,
        name:"Withdraw",
        time:"Jan 20 2025 10:58: pm",
        address:"aMYYIOIREREDCJKI",
        amount:"0.00 USD",
        balance:"0.00 USD",
        details:"Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
    {
        id:8,
        name:"Salary",
        time:"Jan 20 2025 10:58: pm",
        address:"aMYYIOIREREDCJKI",
        amount:"0.00 USD",
        balance:"0.00 USD",
        details:"Dear Leader Congrats to win Monthly Leadership Gifting be Enoy with grow more network regards CEO marquis dawait",
    },
  ]


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
            {
            Data.map((el) => (
              <div key={el.id} className="flex flex-col bg-[#F6F1DE] rounded-md shadow-md p-2 text-sm text-gray-800">
                <div
                  className="grid grid-cols-2 cursor-pointer "
                  onClick={() => handleToggle(el.id)}
                >
                  <div className="flex flex-row gap-2">
                    <div className="mt-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-3" fill="black" stroke="black"> 
                        <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-md font-bold">{el.name}</h1>
                      <p className="text-[12px]">{el.time}</p>
                      <p className="text-[12px]">{el.address}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="font-bold">{el.amount}</h1>
                    <p className="text-[12px]">Balance: {el.balance}</p>
                  </div>
                </div>

                {/* Conditionally show details below the selected box */}
                {expandedId === el.id && (
                  <div className="p-6 bg-white">
                    <table className="w-full ">
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="py-1 pr-4"><strong>Charge:</strong></td>
                        <td className="py-1"><p>{el.amount}</p></td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="py-1 pr-4"><strong>Post Balance:</strong></td>
                        <td className="py-1"><p>{el.balance}</p></td>
                      </tr>
                      <tr >
                        <td className="py-1 pr-4"><strong>Details:</strong></td>
                        <td className="py-1"><p>{el.details}</p></td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                
                )}
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
