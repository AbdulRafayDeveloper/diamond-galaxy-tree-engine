"use client";
import { id } from "date-fns/locale";
import Header from "@/app/admin/components/header/Header";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    price: "",
    commission: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const section = "Activate Users";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const data = async () => {
      try {
        const response = await axios.get("/api/admin/activate-commission");
        console.log("response: ", response);
        setFormData(response.data.data);
      } catch (e) {}
    };
    data();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      const response = await axios.put(
        "/api/admin/activate-commission",
        {
          price: Number(formData.price),
          commission: Number(formData.commission),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status == 200) {
        console.log("Successfully updated:", response.data);
        toast.success("Commission settings updated successfully.");

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Error updating commission:", error);
      alert("Failed to update commission settings.");
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
          <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64 p-5">
            Add Amount
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
          <div className="p-3 md:w-[500px] lg:w-[600px] sm:[400px] w-[310px] min-h-[300px] bg-[#F6F1DE] p-3 rounded-md shadow-md ">
            <div className="flex flex-col jutify-center items-center gap-5  p-8 ">
              <div className="flex flex-col justify-center items-center border-b-2 border-gray-400 gap-3 pb-2">
                <h1 className="text-xl mb-4 font-bold text-center">
                  Add the Amount for user Activation
                </h1>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData?.price || "0"}
                  id=""
                  placeholder="Enter the price"
                  className="min-w-[250px] p-1 outline-none rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="">Company Commission:</label>
                <input
                  type="number"
                  name="commission"
                  value={formData?.commission || "0"}
                  id=""
                  placeholder="Enter the Commission price"
                  className="min-w-[250px] p-1 outline-none rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  className="p-1 w-full text-white bg-[#22405c] rounded-lg min-w-[250px]"
                  onClick={handleSubmit}
                >
                  Submit
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
