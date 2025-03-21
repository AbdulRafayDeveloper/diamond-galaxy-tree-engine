"use client";
import Link from "next/link";

const SideBar = ({ section }) => {
  console.log(section);
  return (
    <div className="h-full py-4 overflow-y-auto bg-[#00288E] scrollbar-hidden">
      <ul className=" font-medium">
        <li className="flex justify-center pb-6">
          <Link href="/owner/dashboard">
            <img src="/icons/icon.png" className="w-52 h-24" alt="no image" />
          </Link>
        </li>
        <Link
            href="/owner/dashboard"
            className={`flex items-center p-2 text-white group ${section === "Dashboard" ? "bg-[#FF9100]" : "hover:bg-[#FF9100]"
              }`}
          >
        <li
          className={`pt-2 pb-2  hover:bg-[#FF9100] flex items-center cursor-pointer ${section === "Dashboard" ? "bg-[#FF9100]" : "hover:bg-[#FF9100]"
            }`}
        >
          
            <div className="flex flex-row pl-10 justify-center items-center">
              <img
                src="/icons/mage_dashboard-fill.png"
                alt=""
                className="w-4 h-4 flex-shrink-0"
              />
              <span className="ms-3 font-normal text-sm">
                Dashboard 
                <br />
              </span>
            </div>
          </li>
        </Link>
        <li
          className={`pb-2 hover:bg-[#FF9100] ${section === "Multi-Property Management"
            ? "bg-[#FF9100]"
            : "hover:bg-[#FF9100]"
            }`}
        >
          <Link
            href="/owner/multi-property/property-management"
            className={`flex items-center p-2 text-white group ${section === "Multi-Property Management"
              ? "bg-[#FF9100]"
              : "hover:bg-[#FF9100]"
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <img
                src="/icons/ix_user-management.png"
                alt=""
                className="w-4 h-4 flex-shrink-0"
              />
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Multi-Property
                <br />
                Management
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 hover:bg-[#FF9100] ${section === "Appliance Management"
            ? "bg-[#FF9100]"
            : "hover:bg-[#FF9100]"
            }`}
        >
          <Link
            href="/owner/appliance_management/appliance"
            className={`flex items-center p-2 text-white group ${section === "Appliance Management"
              ? "bg-[#FF9100]"
              : "hover:bg-[#FF9100]"
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <img
                src="/icons/hugeicons_property-new.png"
                alt=""
                className="w-4 h-4 flex-shrink-0"
              />
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Appliance
                <br />
                Management
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 hover:bg-[#FF9100] ${section === "Home System Management"
            ? "bg-[#FF9100]"
            : "hover:bg-[#FF9100]"
            }`}
        >
          <Link
            href="/owner/home_system_management/home
            "
            className={`flex items-center p-2 text-white group ${section === "Home System Management"
              ? "bg-[#FF9100]"
              : "hover:bg-[#FF9100]"
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                class="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Home
                <br />
                Inventory
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 hover:bg-[#FF9100] ${section === "Maintenance Scheduling"
            ? "bg-[#FF9100]"
            : "hover:bg-[#FF9100]"
            }`}
        >
          <a
            href="/owner/maintenance_scheduling/scheduling"
            className={`flex items-center p-2 text-white group ${section === "Maintenance Scheduling"
              ? "bg-[#FF9100]"
              : "hover:bg-[#FF9100]"
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <img
                src="/icons/material-symbols-light_schedule-outline.png"
                alt=""
                className="w-4 h-4 flex-shrink-0"
              />
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Maintenance
                <br />
                Scheduling
              </span>
            </div>
          </a>
        </li>
        <li
          className={`pb-2 hover:bg-[#FF9100] ${section === "Contractor Management"
            ? "bg-[#FF9100]"
            : "hover:bg-[#FF9100]"
            }`}
        >
          <a
            href="/owner/contractor_management/contractors"
            className={`flex items-center p-2 text-white group ${section === "Contractor Management"
                ? "bg-[#FF9100]"
                : "hover:bg-[#FF9100]"
              }`}
          >
            <div className="flex flex-row pl-11 justify-center items-center">
              <img
                src="/icons/fluent-mdl2_contact.png"
                className="w-3 h-3 flex-shrink-0"
                alt=""
              />
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Contractor
                <br />
                Management
              </span>
            </div>
          </a>
        </li>
      </ul>
      {/* <hr className="border-t border-white w-48 mx-auto mt-2 h-[0.5px]" />

      <ul className="pt-1 space-y-2 font-medium">
        <li>
          <a
            href="/owner/profile_settings"
            className="flex items-center p-2 text-gray-900 transition duration-75"
          >
            <div className="flex flex-row pl-6">
              <span className="ms-3 text-gray-400 font-normal text-sm">
                Settings
              </span>
            </div>
          </a>
        </li>
        <li
          className={`pt-1 pb-2  hover:bg-[#FF9100] flex items-center ${section === "Settings" ? "bg-[#FF9100]" : "hover:bg-[#FF9100]"
            }`}
        >
          <a
            href="/owner/profile_settings"
            className={`flex items-center p-2 text-gray-900 transition duration-75 group ${section === "Settings" ? "bg-[#FF9100]" : "hover:bg-[#FF9100]"
              }`}
          >
            <div className="flex flex-row pl-11 justify-center items-center">
              <img
                src="/icons/ep_setting.png"
                alt=""
                className="w-4 h-4 flex-shrink-0"
              />
              <span className="ms-3 text-white font-normal text-sm">
                Settings
              </span>
            </div>
          </a>
        </li>
      </ul> */}
    </div>
  );
};

export default SideBar;
