"use client";

import Header from "@/app/owner/components/header/Header";
import Table from "@/app/owner/components/itemTable/Table";
import SideBar from "@/app/owner/components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import { use } from "react"; // ✅ Required to unwrap params in Next.js 14+
import { useRouter } from "next/navigation"; // Optional if you want to redirect on invalid property
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import Link from "next/link";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Sample properties data
const properties = [
  {
    id: 1,
    name: "St Gamer Property",
    color: "#00288e",
    imageUrl: "/Rectangle 5185.png",
    address: "111 W Main St Gamer, NC 27529",
    purchase_date: "19 Feb, 2021",
    year: "2001",
    squre_foot: "1857",
  },
  {
    id: 2,
    name: "Oakwood Estate",
    color: "#6A64F1",
    imageUrl: "/Rectangle 5185.png",
    address: "111 W Main St Gamer, NC 27529",
    purchase_date: "19 Feb, 2021",
    year: "2001",
    squre_foot: "1857",
  },
];

// Sample products data
const products = [
  {
    name: "Apple MacBook Pro 17",
    image: "/icons/image_1.png",
    status: "No Maintenance Needed",
    service: "06/Sep/2024",
    date: "15/may/2024",
    warranty: "1 Year",
  },
];

const Page = ({ params: paramsPromise }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter(); // Optional for redirects on invalid property

  const section = "Multi-Property Management";

  // ✅ Unwrap params using use()
  const params = use(paramsPromise);
  const propertyId = parseInt(params.id); // Ensure it's a number

  // Find the matching property
  const property = properties.find((p) => p.id === propertyId);

  useEffect(() => {
    if (!property) {
      console.warn("Property not found!");
      // Optional: Redirect to 404 or error page
      // router.push("/404");
    }
  }, [property]);

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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (!property) {
    return (
      <div className="p-6">
        <p className="text-red-500 font-bold">Property not found!</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto scrollbar-hidden">
      {/* Sidebar Toggle Button */}
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

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <SideBar section={section} />
      </aside>

      {/* Main Content */}
      <div className="sm:ml-64">
        <Header title={section} />
        <div className="p-6 bg-white">
          <div className="mx-auto bg-white">
            <div className="flex flex-col lg:flex-row w-full pt-6 lg:justify-center sm:justify-center md:justify-center gap-6">
              {/* Left Column - Property Image */}
              <div className="w-full lg:w-1/3 bg-white rounded-lg p-2 flex flex-col items-center lg:items-start ">
                <div className="lg:w-full sm:w-56 md:w-56 h-52 overflow-hidden">
                  <img
                    src={property.imageUrl}
                    alt="Property"
                    className="w-full h-full object-fill"
                  />
                </div>
              </div>

              {/* Right Column - Property Details */}
              <div className="flex flex-col gap-2  justify-center">
                <h2 className="text-2xl font-bold text-[#393939] ">
                  {property.name}
                </h2>

                {/* Color Theme */}
                <div className="flex flex-col justify-between gap-2">
                  <span className="text-normal font-medium text-gray-700">
                    Color theme
                  </span>
                  <div className="flex flex-row items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md  "
                      style={{ backgroundColor: property.color }}
                    ></div>
                    <input
                      type="text"
                      value={property.color}
                      readOnly
                      className=" rounded-md text-sm px-2 py-1 text-gray-600 "
                    />
                  </div>
                </div>

                {/* Edit Button */}
                <button className="mt-2 w-fit px-4 p-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg flex items-center gap-2 hover:bg-gray-200">
                  <Link href={`/owner/multi-property/edit_property/${property.id}`} className="flex flex-row gap-2">
                    <img
                      src="/icons/ic_round-edit.png"
                      className="w-4 h-4"
                      alt="edit"
                    />
                   <span> Edit Property</span>
                  </Link>
                </button>
              </div>
            </div>
            <div className="w-full pt-6 px-4 md:px-12">
              <p className="text-lg mb-4">Property Details:</p>

              {/* Responsive grid container */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Address */}
                <div className="flex flex-col items-start">
                  <p className="text-normal font-semibold">Address:</p>
                  <p className="text-sm">{property.address}</p>
                </div>

                {/* Purchase Date */}
                <div className="flex flex-col items-start">
                  <p className="text-normal font-semibold">Purchase Date:</p>
                  <p className="text-sm">{property.purchase_date}</p>
                </div>

                {/* Year Built */}
                <div className="flex flex-col items-start">
                  <p className="text-normal font-semibold">Year Built:</p>
                  <p className="text-sm">{property.year}</p>
                </div>

                {/* Square Foot */}
                <div className="flex flex-col items-start">
                  <p className="text-normal font-semibold">Square Foot:</p>
                  <p className="text-sm">{property.squre_foot}</p>
                </div>
              </div>
            </div>

            {/* Products Table */}
            {/* <Table products={products} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
