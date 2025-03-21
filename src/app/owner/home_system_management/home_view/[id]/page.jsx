"use client";

import Header from "@/app/owner/components/header/Header";
import SideBar from "@/app/owner/components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Sample properties data
const properties = [
  {
    id: 0,
    name: "Jacuzzi",
    // color: "#00288e",
    imageUrl: "/jacuzzi.png",
    // address: "111 W Main St Gamer, NC 27529",
    // purchase_date: "19 Feb, 2021",
    // year: "2001",
    // squre_foot: "1857",
    lastService: "06/Sep/2024"
  },
  // {
  //   id: 1,
  //   name: "Oakwood Estate",
  //   color: "#6A64F1",
  //   imageUrl: "/Rectangle 5185.png",
  //   address: "111 W Main St Gamer, NC 27529",
  //   purchase_date: "19 Feb, 2021",
  //   year: "2001",
  //   squre_foot: "1857",
  // },
];

// Sample products data
const products = [
  {
    serialNo: "12HUYEA",
    brand: "LG",
    modal: "B2T",
    purchaseDate: "2/22/2024",
    warranty: "2/22/2029",
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
        <SideBar section="Home System Management" />
      </aside>

      {/* Main Content */}
      <div className="sm:ml-64">
        <Header title="View Details" />
        <div className="p-6 bg-white">
          <div className="mx-auto bg-white">
            <div className="flex flex-col lg:flex-row w-full pt-6 gap-2">
              {/* Left Column - Property Image */}
              <div className="w-full lg:w-1/3 bg-white rounded-lg p-2 flex flex-col items-center lg:items-start">
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-full h-52 overflow-hidden">
                  <img
                    src={property.imageUrl}
                    alt="Property"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>


              {/* Right Column - Property Details */}
              <div className="gap-6 pt-4">
                <h2 className="text-2xl font-bold text-[#393939] pb-4">
                  {property.name}
                </h2>
                <p className="text-lg">last serviced: {property.lastService}</p>
                <div className="flex flex-row gap-4">
                  <button className="mt-2 w-fit px-4 py-2 text-sm font-medium text-gray-700 bg-[#FFFF02] rounded-lg flex items-center gap-2">
                    <span className="font-bold text-sm">Upcomming Maintenance</span>
                  </button>
                  <button className="mt-2 w-fit px-4 py-2 text-sm font-medium text-gray-700 bg-[#F4F4F4] rounded-lg flex items-center gap-2">
                    <span className="text-sm">09/Sep/2025</span>
                    <img src="/icons/time.png" alt="Clock Icon" />
                  </button>
                </div>

                {/* Color Theme */}
                {/* <div className="flex flex-col justify-between gap-2">
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
                </div> */}


              </div>
              <div>
                {/* Edit Button */}
                <button className="mt-2 w-fit px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg flex items-center gap-2 hover:bg-gray-200">
                  <Link href={`/owner/home_system_management/edit_inventory/${property.id}`} className="flex flex-row gap-2">
                    <img
                      src="/icons/ic_round-edit.png"
                      className="w-4 h-4"
                      alt="edit"
                    />
                    <span> Edit</span>
                  </Link>
                </button>
              </div>
            </div>


            {/* Products Table */}
            <div className="flex flex-wrap items-center justify-between mt-3 px-4">
              {/* Title Section */}
              <h2 className="text-sm font-semibold text-gray-800">
                Purchase & Warranty
              </h2>

              {/* Edit Button */}
              {/* <button className="mt-2 md:mt-0 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg flex items-center gap-2 hover:bg-gray-200">
                <img src="/icons/ic_round-edit.png" className="w-4 h-4" alt="Edit" />
                <span>Edit</span>
              </button> */}
            </div>

            {/* Table Section */}
            <table className="w-full text-sm text-gray-500 mt-4">
              {/* Table Head */}
              <thead className="text-center text-base text-gray-700 font-light bg-white">
                <tr>
                  {["Serial No", "Brand", "Model", "Purchase Date", "Warranty Expiry"].map((header) => (
                    <th key={header} className="px-2 py-2 font-normal font-Poppins text-black whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                    {
                      products.map((product, index) => (
                        <tr key={index} className="bg-white text-center">
                          <td className="px-2 py-2 font-medium text-gray-900">{product.serialNo}</td>
                          <td className="px-2 py-2">{product.brand}</td>
                          <td className="px-2 py-2 text-sm text-[#5E5E5E]">{product.modal}</td>
                          <td className="px-2 py-2 text-sm text-[#5E5E5E]">{product.purchaseDate}</td>
                          <td className="px-2 py-2">{product.warranty}</td>

                        </tr>
                      ))
                    }
                  </tbody>
            </table >
            <div className="mt-7">
              <div className="flex flex-wrap items-center justify-between mt-3 px-4">
                {/* Title Section */}
                <h2 className="text-md font-bold text-gray-800">
                  Additional Notes:
                </h2>

                {/* Edit Button */}
                {/* <button className="mt-2 md:mt-0 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg flex items-center gap-2 hover:bg-gray-200">
                      <img src="/icons/ic_round-edit.png" className="w-4 h-4" alt="Edit" />
                      <span>Edit</span>
                    </button> */}
              </div>
              {/* text */}
              <div className="mt-5 bg-[#F4F4F4] rounded-lg">
                <p className="p-5 text-sm">
                  This LG Front Load Washing Machine was purchased from Best Buy in March 2023 and requires HE (High Efficiency) detergent only to prevent residue buildup. For maintenance, the filter and drum should be cleaned monthly using a vinegar solution. The warranty is valid until March 2026, and any repairs should be directed to LG support. Occasionally, the machine vibrates excessively, which may be resolved by adjusting the leveling feet. A contractor, ABC Appliance Repairs (John - +123 456 7890), is assigned for servicing if needed.
                </p>
              </div>
            </div>
          </div >
        </div >
      </div >
    </div >
  );
};

export default Page;
