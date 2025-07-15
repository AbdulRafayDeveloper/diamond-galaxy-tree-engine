"use client";

import { useState, useRef } from "react";
import Sidebar from "@/app/admin/components/sidebar/SideBar";
import Header from "@/app/admin/components/header/page";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Image from "next/image";

const page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [errors, setErrors] = useState({});

  //   const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    phoneNo: "",
    pic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newError = {};
    if (formData.fname === "" || formData.fname.length < 4) {
      newError.fname = "Please enter the character greater then 4";
      // return
    }
    if (formData.lname === "" || formData.lname.length < 4) {
      newError.lname = "Please enter the character greater then 4";
      // return
    }
    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      return;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    console.log("entered");
    try {
      const form = new FormData();
      form.append("fname", formData.fname);
      form.append("lname", formData.lname);
      form.append("username", formData.username);
      form.append("phoneNo", formData.phoneNo);

      if (imageFile) {
        form.append("image", imageFile);
      }

      const res = await axios.put("/api/admin/admin-settings", form, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const data = res.data;

      console.log(res);

      if (res.data.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been successfully updated.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: data?.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

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

  const section = "Change Profile";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

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
          setFormData({
            fname: user.fname || "",
            lname: user.lname || "",
            username: user.username || "",
            email: user.email || "",
            phoneNo: user.phoneNo || "",
            pic: user.image,
          });

          if (user.image) {
            setImage(user.image); // Show profile picture
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

  console.log(formData.pic);

  return (
    <div className="overflow-y-auto scrollbar-hidden h-screen">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <Sidebar section="Settings" />
      </aside>

      {/* Main Content */}
      <div className="flex flex-col lg:ml-64 md:ml-64 h-screen">
        {/* Header Row */}
        <div className="p-2 w-full flex items-center justify-between">
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
          <p className="text-[12px] md:text-xl md:font-semibold">
            Profile Setting
          </p>

          {/* Header Component */}
          <div className="ml-auto">
            <Header
              title="Profile Setting"
              toggleSidebar={handleSidebarToggle}
              buttonRef={buttonRef}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 bg-[#F6F1DE] flex items-center justify-center px-4">
          <div className=" p-6  w-full max-w-2xl">
            {/* Your <form> starts here */}
            <form onSubmit={handleSubmit} className="lg:w-[700px] w-full">
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-2">
                  {/* Profile Picture Container */}
                  <div className="relative w-24 h-24">
                    <Image
                      src={image || "/icons/user.png"}
                      alt="Profile"
                      width={250}
                      height={250}
                      className="w-full h-full object-cover rounded-full border bg-[#22405c]  p-2"
                    />

                    {/* Camera Icon (Overlay) */}
                    <label
                      htmlFor="imageUpload"
                      className="absolute bottom-0 right-0  bg-[#F6F1DE] border border-gray-500 p-1 rounded-full cursor-pointer"
                    >
                      <img
                        src="/icons/camera.png"
                        alt="Upload"
                        className="w-6 h-6 "
                      />
                    </label>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      id="imageUpload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      unoptimized
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute left-3 top-1/3 transition -translate-y-1/3 w-5 h-6 fill-gray-400"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                    </svg>
                    <input
                      name="fname"
                      type="text"
                      value={formData.fname}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 pl-10 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                      placeholder="First Name"
                    />
                  </div>
                  {errors.fname && (
                    <p className="text-red-500 text-sm">{errors.fname}</p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute left-3 top-1/3 transition -translate-y-1/3 w-5 h-6 fill-gray-400"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                    </svg>
                    <input
                      name="lname"
                      type="text"
                      value={formData.lname}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 pl-10 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                      placeholder="Last name"
                    />
                  </div>
                  {errors.lname && (
                    <p className="text-red-500 text-sm">{errors.lname}</p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute left-3 top-1/3 transition -translate-y-1/3 w-5 h-6 fill-gray-400"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                    </svg>
                    <input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 pl-10 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                      placeholder="Username"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="absolute left-3 top-1/3 transition -translate-y-1/3 w-5 h-6 fill-gray-400"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>

                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                      className="bg-gray-50 w-full pl-10 text-sm text-gray-400 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent cursor-not-allowed"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="absolute left-3 top-1/4 transition -translate-1/3 fill-gray-400 w-4 h-5"
                    >
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>

                    <input
                      name="phoneNo"
                      type="text"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 pl-10 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                      placeholder="Phone Number"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#22405c] w-full text-white p-2 rounded-md font-bold text-sm flex justify-center ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  } `}
                >
                  <div className="flex items-center justify-center space-x-4">
                    {loading ? (
                      <>
                        <p className="text-white text-lg font-semibold">
                          Please wait
                        </p>
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline size-4 text-white animate-spin "
                          viewBox="0 0 100 101"
                          fill="#7D0A0A"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051..."
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.39 38.4038 97.8624 35.9116 97.0079 33.5539..."
                            fill="CurrentColor"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        <p className="text-white text-lg font-semibold">
                          Update Profile
                        </p>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
