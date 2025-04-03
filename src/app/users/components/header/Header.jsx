"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCallback } from "react";
const Header = ({ appear, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isDropdownAppear, setIsDropdownAppear] = useState(false);
  // const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  // const [selectOption, setSelectOpion] = useState("ST Gamer Propert");
  const dropdownRef = useRef(null);
  // const buttonRef = useRef(null);

  const handleChange = (option) => {
    setSelectOpion(option);
    setIsOpen(false);
  };



  useEffect(() => {
    setIsDropdownAppear(appear);
  }, [appear]); // Updates state when appear prop changes



const handleClickOutside = useCallback((event) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setIsOpen(false);
    setIsOpenAvatar(false);
  }
}, []);

useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [handleClickOutside]); 

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotification = () => {
    setIsNotification(!isNotification);
  };

  const notifications = [
    {
      id: 1,
      title: "Upcoming Maintenance",
      description: "Refrigerator Maintenance on 20 April",
      time: "9:42 AM",
      icon: "/icons/speaker.png",
      isRead: false, // to indicate unread notifications (for blue dot)
    },
    {
      id: 2,
      title: "Request Accept",
      description: "Michael confirmed your repair request",
      time: "9:30 AM",
      icon: "/icons/speaker.png",
      isRead: true,
    },
    {
      id: 3,
      title: "Upcoming Maintenance",
      description: "Refrigerator Maintenance on 20 April",
      time: "8:50 AM",
      icon: "/icons/speaker.png",
      isRead: true,
    },
  ];

  const Data = [
    {
      id: "01",
      name: "Dashboard",
      href: "/users/dashboard",
    },
    {
      id: "02",
      name: "Setting",
      href: "#",
    },
    {
      id: "03",
      name: "Earnings",
      href: "#",
    },
    {
      id: "04",
      name: "Sign Out",
      href: "/auth/signup",
    },
  ];
  console.log("drop down: ", isDropdownAppear);

  return (
    <>
      <header>
        <nav className="w-full border-gray-200 px-4 lg:px-6 py-2">
          <div className="flex justify-between items-center mx-auto max-w-screen-xl pt-2">
            {/* <p
              className={`text-[#393939] lg:text-3xl text-[20px] ${title.includes("Diamond")
                  ? "font-bold text-3xl"
                  : "font-medium text-3xl"
                }`}
            >
              {title}
            </p> */}

            <div className="flex items-center lg:order-2 order-2 space-x-4">
              {/* Conditional rendering of dropdown button */}

              {/* <div
                className={`relative  ${isDropdownAppear ? "inline-block" : "hidden"
                  }`}
              >
                <div className="flex flex-row gap-2 items-start">
                  <div className=" lg:flex flex-col hidden">
                    <p className="text-[#4D4D4D] text-lg font-semibold pb-3">
                      Select Property
                    </p>
                    <button
                      onClick={toggleDropdown}
                      ref={dropdownRef}
                      className="text-white bg-[#F5F5F5] font-medium rounded-lg text-sm px-6 py-2.5 text-center inline-flex items-center"
                      type="button"
                    >
                      <p className="text-[#777777]">{selectOption}</p>
                      <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#777777"
                        viewBox="0 0 10 6"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-48 absolute top-full left-0 border border-gray-200 mt-2">
                        <ul className="py-2 text-sm text-gray-700">
                          {Data.map((option, idx) => (
                            <li key={idx}>
                              <Link
                                href={`${option.href}`}
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                <button
                                  onClick={() => handleChange(option.name)}
                                >
                                  {option.name}
                                </button>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row bg-[#FBFAFA] p-2 rounded-lg shadow-sm hidden lg:flex">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 pl-4">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        John <span className="text-gray-500">(Realtor)</span>
                      </h3>
                      <div className="flex text-sm text-gray-600 space-x-4 mt-1">
                        <div>
                          <span className="font-medium text-xs">Email:</span>
                          <br />
                          <span className="text-xs">john102@gmail.com</span>
                        </div>
                        <div>
                          <span className="font-medium text-xs">Phone no:</span>
                          <br />
                          <span className="text-xs">971 1325789</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Bell Icon with Red Dot 
              <div className="relative pl-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="size-6"
                  onClick={toggleNotification}
                  ref={buttonRef}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
                <button
                  className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"
                ></button>
                 {isNotification && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-[999]">
                    <ul className="py-2 text-sm text-gray-700">
                      <li className="px-4 py-2 font-semibold">Notifications</li>
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-start gap-x-2"
                        >
                          <img
                            src={notification.icon}
                            className="w-4 h-4"
                            alt="Notification Icon bg-white"
                          />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-800">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {notification.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-[6px] text-[#A5ACB8]">
                              {notification.time}
                            </p>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-1"></span> // Unread indicator
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} 
              </div>*/}

              {/* Avatar Image */}
              <div className="relative">
                <button
                  onClick={() => setIsOpenAvatar(!isOpenAvatar)}
                  ref={dropdownRef}
                  className="flex flex-row justify-center items-center focus:outline-none"
                >
                  <img
                    className="w-10 h-10 rounded-[400px] object-cover"
                    src="/logo.jpg"
                    alt="Rounded avatar"
                  />
                  <svg
                    className="w-2.5 h-2.5 ms-3 transition-transform duration-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#777777"
                    viewBox="0 0 10 6"
                    style={{
                      transform: isOpenAvatar
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {isOpenAvatar && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-[999]">
                    <ul className="py-2 text-sm text-gray-700">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
                        <div className="flex items-center gap-x-2">
                          <img
                            src="/person2.jpg"
                            className="rounded-full w-8 h-8"
                            alt="Profile"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800">
                              John Doe
                            </span>
                            <span className="text-xs text-[#999999] truncate">
                              abc@gmail.com
                            </span>
                          </div>
                        </div>
                      </li>

                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center gap-x-2">
                          <img
                            src="/icons/person.png"
                            className="size-3"
                            fill="black" stroke="black"
                            alt="Profile"
                          />
                          <div className="flex flex-col">
                            <Link href="/users/profile_settings">
                              <span className="text-xs  text-gray-800">
                                Profile 
                              </span>
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center gap-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="black" stroke="black" className="size-3">
                            <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/>
                          </svg>
                          <div className="flex flex-col">
                            <Link href="/users/profile_settings">
                              <span className="text-xs  text-gray-800">
                                Update Password 
                              </span>
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center gap-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="black" stroke="black" className="size-3">
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                          </svg>
                          <div className="flex flex-col">
                            <Link href="/users/profile_settings">
                              <span className="text-xs  text-gray-800">
                                Logout 
                              </span>
                            </Link>
                          </div>
                        </div>
                      </li>
                      {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center gap-x-2">
                          <img
                            src="/icons/home.png"
                            className=" w-3 h-3"
                            alt="Profile"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs  text-gray-800">
                              My Properties
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <div className="flex items-center gap-x-2">
                          <img
                            src="/icons/money.png"
                            className=" w-3 h-3"
                            alt="Profile"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-800">
                              Billing and Subscription
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b">
                        <div className="flex items-center gap-x-2">
                          <img
                            src="/icons/time.png"
                            className=" w-3 h-3"
                            alt="Profile"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-800">
                              Maintenance Tasks
                            </span>
                          </div>
                        </div>
                      </li> */}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
