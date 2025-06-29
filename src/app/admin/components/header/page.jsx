"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
const Page = ({ appear, title }) => {
  const [isOpenAvatar, setIsOpenAvatar] = useState(false);
  const [isDropdownAppear, setIsDropdownAppear] = useState(false);
  const dropdownRef = useRef(null);
  const [form, setform] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    setIsDropdownAppear(appear);
  }, [appear]);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpenAvatar(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/api/admin/admin-settings", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        const user = res.data?.data;

        if (res.data.status === 200 && user) {
          if (user.image) {
            setImage(user.image);
            setform({
              name: user.lname,
              email: user.email,
            });
          }
        } else {
          console.error("User data not found");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <header>
        <nav className="border-gray-200 px-4 lg:px-6 py-2">
          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center lg:order-2 order-2 space-x-4">
              {/* Avatar Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpenAvatar(!isOpenAvatar)}
                  className="flex flex-row justify-center items-center focus:outline-none"
                >
                  <Image
                    className="w-10 h-10 rounded-[400px] object-cover"
                    src={image || "/placeholder.png"}
                    alt="Profile"
                    width={150}
                    height={150}
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
                      <li className="px-4 py-2  cursor-pointer border-b">
                        <div className="flex items-center gap-x-2">
                          <Image
                            className="w-10 h-10 rounded-[400px] object-cover"
                            src={image || "/placeholder.png"}
                            alt="Profile"
                            width={150}
                            height={150}
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800">
                              {form?.name || "Admin"}
                            </span>
                            <span className="text-xs text-[#999999] truncate max-w-[100px] inline-block">
                              {form?.email || "N/A"}
                            </span>
                          </div>
                        </div>
                      </li>

                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link
                          href="/admin/profile-settings"
                          className="flex items-center gap-x-2"
                        >
                          <img
                            src="/icons/person.png"
                            className="size-3"
                            alt="Profile"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-800">
                              Profile
                            </span>
                          </div>
                        </Link>
                      </li>

                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <Link
                          href="/admin/update-password"
                          className="flex items-center gap-x-2"
                        >
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
                            <span className="text-xs text-gray-800">
                              Update Password
                            </span>
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
