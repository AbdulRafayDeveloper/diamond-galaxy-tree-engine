"use client";
import { id } from "date-fns/locale";
import Header from "@/app/admin/components/header/page";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchEducation = async () => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(`/api/admin/education/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status === 200) {
        const data = res.data.data;
        setFormData({
          name: data.name || "",
          url: data.url || "",
          description: data.description || "",
        });
      } else {
        toast.error("Failed to fetch course.");
      }
    } catch (error) {
      toast.error("Error fetching course.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (id) fetchEducation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("token");
      const res = await axios.put(
        `/api/admin/education/${id}`,
        {
          name: formData.name,
          url: formData.url,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.status === 200) {
        toast.success("Course updated successfully!");
        setTimeout(() => router.push("/admin/education"), 1500);
      } else {
        toast.error("Update failed.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
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

  const section = "Education";

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
          <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64 p-5">
            Add Course
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
          <div className="p-3 md:w-[500px] lg:w-[600px] sm:[400px] w-[310px] min-h-[400px] bg-[#F6F1DE] p-3 rounded-md shadow-md ">
            <div className="flex flex-col jutify-center items-center gap-5  p-8 ">
              <div className="flex flex-col justify-center items-center border-b-2 border-gray-400 gap-3 pb-2">
                <h1 className="text-xl mb-4 font-bold text-center">
                  Add the Courses for Education
                </h1>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="">Name :</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  id=""
                  placeholder="Enter the name"
                  className="min-w-[250px] p-1 outline-none rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="">Link :</label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  id=""
                  placeholder="Enter the url"
                  className="min-w-[250px] p-1 outline-none rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="">Description :</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  id=""
                  placeholder="Enter the description"
                  className="min-w-[250px] p-1 outline-none rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button
                  className={`p-1 w-full text-white rounded-lg min-w-[250px] ${
                    loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#22405c]"
                  }`}
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
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
