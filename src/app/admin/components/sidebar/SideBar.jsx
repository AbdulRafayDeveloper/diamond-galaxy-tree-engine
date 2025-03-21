"use client";
import Link from "next/link";

const SideBar = ({ section }) => {
  console.log(section);
  return (
    <div className="h-full py-4 overflow-y-auto bg-[#00288E] scrollbar-hidden">
      <ul className=" font-medium">
        <li className="flex justify-center pb-6">
          <Link href="../owner/dashboard">
            <img src="/icons/icon.png" className="w-52 h-24" alt="no image" />
          </Link>
        </li>
        <li
          className={`pt-2 pb-2  hover:bg-[#FF9100] flex items-center ${section === "Dashboard" ? "bg-[#FF9100]" : "hover:bg-[#FF9100]"
            }`}
        >
          <Link
            href="/admin/dashboard"
            className={`flex items-center p-2 text-white group ${section === "Dashboard" ? "bg-[#FF9100]" : "hover:bg-[#FF9100]"
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <img
                src="/icons/mage_dashboard-fill.png"
                alt=""
                className="w-6 h-6 flex-shrink-0"
              />
              <span className="ms-3 font-normal text-sm">
                Dashboard
                <br />
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 pt-2 hover:bg-[#FF9100] ${section === "Properties"
              ? "bg-[#FF9100]"
              : "hover:bg-[#FF9100]"
            }`}
        >
          <Link
            href="/admin/properties"
            className={`flex items-center p-2 text-white group ${section === "Propeties"
                ? "bg-[#FF9100]"
                : "hover:bg-[#FF9100]"
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <img
                src="/icons/ix_user-management.png"
                alt=""
                className="w-6 h-6 flex-shrink-0"
              />
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Propertiies
              </span>
            </div>
          </Link>
        </li>


        <li
          className={`pb-2 pt-2 hover:bg-[#FF9100] ${section === "Users"
              ? "bg-[#FF9100]"
              : "hover:bg-[#FF9100]"
            }`}
        >
          <a
            href="/admin/users"
            className={`flex items-center p-2 text-white group ${section === "Users"
                ? "bg-[#FF9100]"
                : "hover:bg-[#FF9100]"
              }`}
          >
            <div className="flex flex-row pl-11 justify-center items-center">
              <img
                src="/icons/fluent-mdl2_contact.png"
                className="w-4 h-4 flex-shrink-0"
                alt=""
              />
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Users
              </span>
            </div>
          </a>
        </li>
      </ul>
      {/* <hr className="border-t border-white w-48 mx-auto mt-4 h-[0.5px]" />

      <ul className="pt-4 space-y-2 font-medium">
        <li>
          <a
            href="/admin/profile_settings"
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
          className={`pt-2 pb-2  hover:bg-[#FF9100] flex items-center ${section === "Settings" ? "bg-[#FF9100]" : "hover:bg-[#FF9100]"
            }`}
        >
          <a
            href="#"
            className={`flex items-center p-2 text-gray-900 transition duration-75 group ${section === "Settings" ? "bg-[#FF9100]" : "hover:bg-[#FF9100]"
              }`}
          >
            <div className="flex flex-row pl-11 justify-center items-center">
              <img
                src="/icons/ep_setting.png"
                alt=""
                className="w-5 h-5 flex-shrink-0"
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
