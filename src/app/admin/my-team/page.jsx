"use client";
import Header from "@/app/admin/components/header/page";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
const levelConfigs = {
  activated: {
    label: "Activated Levels",
    fields: 7,
    hasCompany: true,
    placeholder: "%",
  },
  slot: {
    label: "Slots Levels",
    fields: 7,
    hasCompany: true,
    placeholder: "%",
  },
  registration: {
    label: "Registration Levels",
    fields: 2,
    hasCompany: true,
    placeholder: "%",
  },
};

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [activeTab, setActiveTab] = useState("activated");
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const section = "My Team";
  const handleClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const fetchLevelConfigs = async (tab) => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get("/api/my-team", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched data", res);

      const data = res.data.data?.[tab];
      if (data) {
        const updatedForm = {};
        Object.entries(data).forEach(([key, value]) => {
          const levelMatch = key.match(/^level(\d+)$/);
          if (levelMatch) {
            updatedForm[`${tab}-level-${levelMatch[1]}`] = value;
          } else {
            updatedForm[`${tab}-${key}`] = value;
          }
        });
        setFormData(updatedForm);
      }
    } catch (err) {
      toast.error("Failed to load latest level config.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("entered");

    const { fields, hasCompany } = levelConfigs[activeTab];
    let total = 0;
    const errors = [];

    for (let i = 1; i <= fields; i++) {
      const key = `${activeTab}-level-${i}`;
      const value = parseFloat(formData[key]) || 0;

      if (value < 0 || value > 100) {
        errors.push(`Level ${i} must be between 0 and 100.`);
      }

      total += value;
    }

    if (hasCompany) {
      const companyKey = `${activeTab}-companyPercentage`;
      const value = parseFloat(formData[companyKey]) || 0;

      if (value < 0 || value > 100) {
        errors.push(`Company Percentage must be between 0 and 100.`);
      }

      total += value;
    }

    if (total !== 100) {
      errors.push(
        `The total percentage for "${levelConfigs[activeTab].label}" must be exactly 100%. Current total: ${total}%`
      );
    }

    if (errors.length > 0) {
      errors.forEach((msg) => toast.error(msg));
      return;
    }

    try {
      const payload = {};
      for (let i = 1; i <= fields; i++) {
        const key = `${activeTab}-level-${i}`;
        const value = parseFloat(formData[key]) || 0;
        payload[`level${i}`] = value;
      }

      if (hasCompany) {
        const companyKey = `${activeTab}-companyPercentage`;
        const value = parseFloat(formData[companyKey]) || 0;
        payload["companyPercentage"] = value;
      }

      const token = Cookies.get("token");

      const res = await axios.put(`/api/my-team?type=${activeTab}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status === 200) {
        toast.success(res.data.message || "Saved successfully!");
        setTimeout(() => {
          fetchLevelConfigs(activeTab);
        }, 2000);
      }
    } catch (err) {
      const errors = err?.response?.data?.data?.errors || [
        err?.response?.data?.message,
      ];
      errors.forEach((msg) => toast.error(msg));
    }
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetchLevelConfigs(activeTab);
  }, [activeTab]);

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
            My Team
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

      <div className="sm:ml-64 p-6 max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-4 w-full mb-6">
          {Object.entries(levelConfigs).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setFormData({});
                fetchLevelConfigs(key);
              }}
              className={`px-4 py-2 text-sm rounded-lg font-medium ${activeTab === key
                  ? "bg-[#22405c]  text-white"
                  : "bg-[#F6F1DE] text-gray-700"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Dynamic Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#F6F1DE] p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">
            {levelConfigs[activeTab].label} Settings
          </h2>
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: levelConfigs[activeTab].fields }).map(
              (_, i) => {
                const name = `${activeTab}-level-${i + 1}`;
                return (
                  <div key={i}>
                    <label
                      htmlFor={name}
                      className="block text-sm font-medium mb-1"
                    >
                      {`Level ${i + 1}`}
                      {/* Level {i + 1} {levelConfigs[activeTab].placeholder} */}
                      {/* Level {levelConfigs[activeTab].fields - i} {levelConfigs[activeTab].placeholder} */}
                    </label>
                    <input
                      type="number"
                      name={name}
                      id={name}
                      value={formData[name] !== undefined ? formData[name] : ""}
                      onChange={handleChange}
                      placeholder={`Enter ${levelConfigs[activeTab].placeholder}`}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#22405c]"
                    />
                  </div>
                );
              }
            )}

            {levelConfigs[activeTab].hasCompany && (
              <div>
                <label
                  htmlFor={`${activeTab}-companyPercentage`}
                  className="block text-sm font-medium mb-1"
                >
                  Company Percentage {levelConfigs[activeTab].placeholder}
                </label>
                <input
                  type="number"
                  name={`${activeTab}-companyPercentage`}
                  id={`${activeTab}-companyPercentage`}
                  value={formData[`${activeTab}-companyPercentage`] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${levelConfigs[activeTab].placeholder}`}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#22405c]"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-[#22405c]  text-white rounded-lg"
          >
            Save {levelConfigs[activeTab].label}
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Page;
