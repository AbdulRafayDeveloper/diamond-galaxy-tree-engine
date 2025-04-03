"use client";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [refData, setData] = useState({});
  const [loading, setLoading] = useState(false);
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

  const section = "My Refferal";

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

        const response = await axios.get("/api/frontend/references", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.data;
        setData(userData);
        setLoading(false);
        console.log(userData);
      } catch (e) {
        setLoading(false);
        console.error("Failed to fetch user:", e);
      } finally {
      }
    };

    getData();
  }, []);

  const maskEmail = (email) => {
    const [first, domain] = email.split("@"); // Split the email
    const masked = first.charAt(0) + "*".repeat(first.length - 1); // Mask the username
    return `${masked}@${domain}`;
  };
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
            My Refferals
          </p>
        </div>
        <div className="flex justify-end md:ml-[750px]">
          <Header appear={true} />
        </div>
      </div>

      <div className="md:ml-64">
        <div className="bg-white">
          <div className="md:p-4 p-2">
            <div className="grid md:grid-cols-2 grid-cols-1  gap-5">
              {loading ? (
                <div className="flex justify-center items-center col-span-2">
                  <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : Array.isArray(refData) && refData.length > 0 ? (
                refData.map((el, idx) => (
                  <div
                    key={idx}
                    className="p-2 md:p-4 shadow-xl md:text-md text-sm bg-[#F6F1DE] gap-3"
                  >
                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div>Username</div>
                      <div>{el.username}</div>
                    </div>
                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div>Name</div>
                      <div>
                        {el.fname} {el.lname}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div>Email</div>
                      <div>{maskEmail(el.email)}</div>
                    </div>
                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div>Join Date</div>
                      <div>{new Date(el.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm col-span-2">
                  No referrals found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
