"use client";
import { id } from "date-fns/locale";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData,setFormData]=useState({
    address:""
  });
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({
        ...prev,
        [name]: value,
    }))
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(formData);
  }
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

  const section = "Rewards";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
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
            My Rewards
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
                <div className="flex flex-col justify-center items-center border-b-2 border-gray-400 gap-3 pb-2">
                    <h1 className="text-xl mb-4 font-bold text-center">Qualified for Reward</h1>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Address:</label>
                    <input type="text" name="address" value={formData.address}
                        id="" placeholder="Enter the address" className="min-w-[250px] p-1 outline-none rounded-md"
                        onChange={handleChange} />
                </div>
                <div>
                    <button className="p-1 w-full text-white bg-[#22405c] rounded-lg min-w-[250px]" onClick={handleSubmit} > 
                        Submit
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
