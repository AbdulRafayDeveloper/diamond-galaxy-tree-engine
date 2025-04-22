"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCallback } from "react";

const Page = ({ appear, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isDropdownAppear, setIsDropdownAppear] = useState(false);
  const dropdownRef = useRef(null);



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

  return (
    <>
      <header>
        <nav className="border-gray-200 px-4 lg:px-6 py-2">
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center lg:order-2 order-2 space-x-4">
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
                            fill="black"
                            stroke="black"
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
                        <Link href="/users/update_password" className="flex items-center gap-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            fill="black"
                            stroke="black"
                            className="size-3"
                          >
                            <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                          </svg>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-800">Update Password</span>
                          </div>
                        </Link>
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

export default Page;
