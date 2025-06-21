"use client";
import Header from "../components/header/page";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [eduData, setEduData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activated, setActivated] = useState(true);

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

  useEffect(() => {
    const getEducationData = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const response = await axios.get("/api/frontend/education", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("response: ", response);

        const { educations } = response.data.data;
        const isActivated = educations && educations.length > 0;

        setEduData(educations);
        setActivated(isActivated);
      } catch (err) {
        if (err.response?.data?.data?.educations?.length === 0) {
          setActivated(true); // activated but no data
          setEduData([]);
        } else {
          setActivated(false); // Not activated at all
          setEduData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    getEducationData();
  }, []);

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
            <span className="sr-only">Open sidebar</span>
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
            Education
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
          aria-label="Sidebar"
        >
          <SideBar section={section} />
        </aside>
      </div>

      <div className="md:ml-64 min-h-[200px] flex items-center justify-center">
        {loading ? (
          <p className="text-center text-lg font-semibold">Loading...</p>
        ) : !activated ? (
          <p className="text-center text-lg font-semibold text-red-600">
            Your account is not activated yet.
          </p>
        ) : eduData.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-600">
            No education entries available yet.
          </p>
        ) : (
          <div className="w-full p-2">
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
              {eduData.map((el, idx) => (
                <div
                  key={idx}
                  className="p-2 md:p-4 shadow-xl md:text-md text-sm bg-[#F6F1DE] gap-3"
                >
                  <div
                    key={idx}
                    className="p-2 md:p-4 shadow-xl md:text-md text-sm bg-[#F6F1DE] gap-3"
                  >
                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div className="font-bold">Name</div>
                      <div className="text-[13px] truncate" title={el.name}>
                        {el.name.length > 40
                          ? el.name.substring(0, 40) + "..."
                          : el.name}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div className="font-bold">File</div>
                      <div className="flex justify-end items-end">
                        <Link
                          href={el.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-[#22405c] text-white rounded-md text-[13px]"
                        >
                          Play
                        </Link>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 bg-white shadow-md p-2 mb-1">
                      <div className="font-bold">Description</div>
                      <div
                        className="flex justify-end items-end text-[13px] text-right truncate"
                        title={el.description}
                      >
                        {el.description.length > 60
                          ? el.description.substring(0, 60) + "..."
                          : el.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
