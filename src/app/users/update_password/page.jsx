"use client";
import Header from "../components/header/page";
import SideBar from "../components/sidebar/SideBar";
import { useState, useRef, useEffect, useRouter } from "react";
import Swal from 'sweetalert2'

const Page = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const buttonRef = useRef(null);
    const [errors, setErrors] = useState({})

    //   const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        username: "Fatima",
        email: "email1@gmail.com",
        phoneNo: "+92 3027678789",
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
        if (formData.fname === "" || (formData.fname).length < 4) {
            newError.fname = "Please enter the character greater then 4"
            // return
        }
        if (formData.lname === "" || (formData.lname).length < 4) {
            newError.lname = "Please enter the character greater then 4"
            // return
        }
        if (Object.keys(newError).length > 0) {
            setErrors(newError);
            return;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        // Simulating successful password update (replace with API call later)
        setTimeout(() => {
            setLoading(false);
            Swal.fire({
                icon: "success",
                title: "Password Updated!",
                text: "Your password has been successfully updated.",
            }).then(() => {
                // router.push("/");
                console.log("go to dashboard!");
            });
        }, 1500);
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

    const section = "Change Password";

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

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
                    <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64">
                        Update Password
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
            {/* body part */}
            <div className="md:ml-64">
                <div className="bg-white">
                    <div className="p-3 bg-[#F6F1DE]">
                        <div className="min-h-[500px] flex flex-col items-center justify-center">
                            <div className="flex flex-col justify-center items-center">
                                <form
                                    onSubmit={handleSubmit}
                                    className="lg:w-[700px] w-full"
                                >
                                    <div className="space-y-4">
                                        <div className="flex flex-col items-center space-y-2">

                                            {/* Profile Picture Container */}
                                            <div className="relative w-24 h-24">
                                                <img
                                                    src={image || "/icons/user.png"}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover rounded-full border bg-[#22405c]  p-2"
                                                />

                                                {/* Camera Icon (Overlay) */}
                                                <label htmlFor="imageUpload" className="absolute bottom-0 right-0  bg-[#F6F1DE] border border-gray-500 p-1 rounded-full cursor-pointer">
                                                    <img src="/icons/camera.png" alt="Upload" className="w-6 h-6 " />
                                                </label>

                                                {/* Hidden File Input */}
                                                <input
                                                    type="file"
                                                    id="imageUpload"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <input
                                                name="fname"
                                                type="text"
                                                value={formData.fname}
                                                onChange={handleChange}
                                                required
                                                className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                                                placeholder="First Name"
                                            />
                                            {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
                                        </div>
                                        <div>
                                            <input
                                                name="lname"
                                                type="text"
                                                value={formData.lname}
                                                onChange={handleChange}
                                                required
                                                className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                                                placeholder="Last name"
                                            />
                                            {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
                                        </div>
                                        <div>
                                            <input
                                                name="username"
                                                type="text"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                                className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                                                placeholder="Username"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                                                placeholder="Email"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <input
                                                name="phoneNo"
                                                type="text"
                                                value={formData.phoneNo}
                                                onChange={handleChange}
                                                required
                                                className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                                                placeholder="Phone Number"
                                                disabled
                                            />
                                        </div>

                                    </div>

                                    <div className="!mt-8">
                                        <button
                                            type="submit"
                                            className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded bg-[#22405c] text-white focus:outline-none"
                                            disabled={loading}
                                        >
                                            {loading ? "Updating..." : "Update Password"}
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
