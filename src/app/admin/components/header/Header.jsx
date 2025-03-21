"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = ({ appear, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isDropdownAppear, setIsDropdownAppear] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  useEffect(() => {
    setIsDropdownAppear(appear);
  }, [appear]); // Updates state when appear prop changes

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

  console.log("drop down: ", isDropdownAppear);

  return (
    <>
      <header>
        <nav className="w-full border-gray-200 px-4 lg:px-6 py-2">
          <div className="flex justify-between items-center mx-auto max-w-screen-xl pt-2">
            <p
              className={`text-[#393939] lg:text-2xl text-[13px] ${title.includes("Welcome")
                  ? "font-bold text-2xl"
                  : "font-medium text-2xl"
                }`}
            >
              {title}
            </p>

            <div className="flex items-center lg:order-2 order-2 space-x-4">
              {/* Bell Icon with Red Dot 
              <div className="relative pl-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="black"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
                <button
                  onClick={toggleNotification}
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
                  className="flex flex-row justify-center items-center focus:outline-none"
                >
                  <img
                    className="w-8 h-9 rounded-full"
                    src="/person2.jpg"
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
                            className=" w-3 h-3"
                            alt="Profile"
                          />
                          <div className="flex flex-col">
                            <Link href="/admin/profile_settings">
                              <span className="text-xs  text-gray-800">
                                Profile Settings
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
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Logout
                      </li>
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
