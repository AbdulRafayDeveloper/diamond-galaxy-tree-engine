"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    referrerCode: "",
    phoneNo: "",
    country: "Pakistan",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const fullPhone = "+" + formData.phoneNo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newErrors = {};
    setErrors({}); // Reset errors before new validation

    // Regular Expressions for validation
    const nameRegex = /^[A-Za-z]{2,}$/;
    const usernameRegex = /^[^\s]{3,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Validations

    if (!formData.phoneNo) {
      newErrors.phoneNo = "Phone number is required!";
    } else if (!isValidPhoneNumber(fullPhone)) {
      newErrors.phoneNo = "Invalid phone number.";
    }

    if (!formData.fname) {
      newErrors.fname = "First name is required!";
    } else if (formData.fname.length < 3) {
      newErrors.fname = "First Name must be at least 3 characters.";
    } else if (formData.fname.length > 10) {
      newErrors.fname = "First Name must only be 10 characters long";
    } else if (/\d/.test(formData.fname)) {
      newErrors.fname = "First Name must not contain numbers.";
    } else if (!/^[A-Za-z]+$/.test(formData.fname)) {
      newErrors.fname =
        "First Name must only contain letters (no spaces or symbols).";
    }

    if (!formData.lname) {
      newErrors.lname = "Last name is required!";
    } else if (formData.lname.length < 3) {
      newErrors.lname = "Last Name must be at least 3 characters .";
    } else if (formData.lname.length > 10) {
      newErrors.lname = "Last Name must only be 10 characters long.";
    } else if (/\d/.test(formData.lname)) {
      newErrors.lname = "Last Name must not contain numbers.";
    } else if (!/^[A-Za-z]+$/.test(formData.lname)) {
      newErrors.lname =
        "Last Name must only contain letters (no spaces or symbols).";
    }

    if (!formData.username) {
      newErrors.username = "Username is required!";
    } else if (formData.username.length > 15) {
      newErrors.username = "Username must only be 15 characters long.";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (/\s/.test(formData.username)) {
      newErrors.username = "Username must not contain any spaces.";
    }

    if (!formData.email) newErrors.email = "Email is required!";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format.";

    if (!formData.country) newErrors.country = "Please select a country.";

    if (!formData.password) {
      newErrors.password = "Password is required!";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters .";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must include at least one uppercase letter.";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must include at least one number.";
    } else if (!/[\W_]/.test(formData.password)) {
      newErrors.password =
        "Password must include at least one special character.";
    }

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required!";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    // If any errors exist, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log(formData);
      const response = await axios.post("../api/signup", formData);

      if (response.status === 200 && response.data.success) {
        toast.success("Account created successfully!");
        setFormData({
          fname: "",
          lname: "",
          referrerCode: "",
          phoneNo: "",
          country: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      } else {
        toast.error(response.data.message || "Signup failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <ToastContainer />
      <div className="font-calibri relative z-10">
        <div className="bg-gray-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 min-h-screen">
            <div
              style={{ backgroundImage: "url('/reg.jpg')" }}
              className="flex relative justify-center object-cover bg-cover min-h-screen"
            >
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 p-2 gap-4">
                <h1 className="text-[32px] text-white font-bold">
                  Diamond Galaxy
                </h1>
                <p className="text-center text-white text-sm">
                  Multi-Level Marketing (MLM) is a business strategy where
                  individuals earn income not only through direct sales of
                  products or services but also by recruiting others to join the
                  business. Each new recruit, known as a downline, can also earn
                  commissions by selling products and recruiting others. This
                  creates a hierarchical structure where earnings are based on
                  both personal sales and the sales made by recruited
                  individuals. While MLM can offer financial opportunities, it
                  often faces criticism for being similar to pyramid schemes,
                  where the focus may be more on recruitment than product sales,
                  leading to potential legal and ethical concerns. Successful
                  MLM businesses typically have strong, high-demand products and
                  an ethical structure that emphasizes sales over recruitment.
                </p>
                <Link
                  href="/auth/signin"
                  className="bg-[#22405c] p-2 text-white w-[200px] rounded-[50px] font-bold text-sm text-center"
                >
                  Login Now
                </Link>
              </div>
            </div>
            <div className="mx-auto flex justify-center">
              <form onSubmit={handleSubmit} className="p-3 m-4 w-full max-w-xl">
                <h3 className="text-[#22405c] font-calibri text-3xl font-extrabold mb-6 text-center">
                  Register
                  <br />
                  <span className="text-sm">
                    Create new account to continue
                  </span>
                </h3>

                <div className="space-y-5 ">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400  w-5 h-4"
                        >
                          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                        </svg>
                        <input
                          name="fname"
                          type="text"
                          value={formData.fname}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-blue-800 focus:bg-transparent"
                          placeholder="First name"
                        />
                      </div>
                      {errors.fname && (
                        <p className="text-red-500 text-xs">{errors.fname}</p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400  w-5 h-4"
                        >
                          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                        </svg>
                        <input
                          name="lname"
                          type="text"
                          value={formData.lname}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-blue-800 focus:bg-transparent"
                          placeholder="Last name"
                        />
                      </div>
                      {errors.lname && (
                        <p className="text-red-500 text-xs">{errors.lname}</p>
                      )}
                    </div>
                  </div>

                  {/* Username & Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400  w-5 h-4"
                        >
                          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                        </svg>
                        <input
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-blue-800 focus:bg-transparent"
                          placeholder="username"
                        />
                      </div>
                      {errors.username && (
                        <p className="text-red-500 text-xs">
                          {errors.username}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400  w-5 h-4"
                        >
                          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                        </svg>

                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-blue-800 focus:bg-transparent"
                          placeholder="email"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone & Country */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <PhoneInput
                        country={"pk"}
                        value={formData.phoneNo}
                        onChange={(phone, countryData) =>
                          setFormData((prev) => ({
                            ...prev,
                            phoneNo: phone,
                            country: countryData.name,
                          }))
                        }
                        inputProps={{
                          name: "phoneNo",
                          required: true,
                        }}
                        inputClass="!w-full !text-sm !pl-12 !py-6 !rounded-md !bg-gray-50 !text-gray-800 !outline-blue-800 !border-none"
                        containerClass="relative"
                      />

                      {errors.phoneNo && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phoneNo}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400  w-5 h-4"
                        >
                          <path d="M57.7 193l9.4 16.4c8.3 14.5 21.9 25.2 38 29.8L163 255.7c17.2 4.9 29 20.6 29 38.5l0 39.9c0 11 6.2 21 16 25.9s16 14.9 16 25.9l0 39c0 15.6 14.9 26.9 29.9 22.6c16.1-4.6 28.6-17.5 32.7-33.8l2.8-11.2c4.2-16.9 15.2-31.4 30.3-40l8.1-4.6c15-8.5 24.2-24.5 24.2-41.7l0-8.3c0-12.7-5.1-24.9-14.1-33.9l-3.9-3.9c-9-9-21.2-14.1-33.9-14.1L257 256c-11.1 0-22.1-2.9-31.8-8.4l-34.5-19.7c-4.3-2.5-7.6-6.5-9.2-11.2c-3.2-9.6 1.1-20 10.2-24.5l5.9-3c6.6-3.3 14.3-3.9 21.3-1.5l23.2 7.7c8.2 2.7 17.2-.4 21.9-7.5c4.7-7 4.2-16.3-1.2-22.8l-13.6-16.3c-10-12-9.9-29.5 .3-41.3l15.7-18.3c8.8-10.3 10.2-25 3.5-36.7l-2.4-4.2c-3.5-.2-6.9-.3-10.4-.3C163.1 48 84.4 108.9 57.7 193zM464 256c0-36.8-9.6-71.4-26.4-101.5L412 164.8c-15.7 6.3-23.8 23.8-18.5 39.8l16.9 50.7c3.5 10.4 12 18.3 22.6 20.9l29.1 7.3c1.2-9 1.8-18.2 1.8-27.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                        </svg>

                        <input
                          name="country"
                          type="text"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          disabled
                          className="bg-gray-50 w-full text-sm text-gray-500 px-4 py-3.5 pl-9 rounded-md outline-blue-800 focus:bg-transparent "
                          placeholder="Country"
                        />
                      </div>
                      {errors.country && (
                        <p className="text-red-500 text-xs">{errors.country}</p>
                      )}
                    </div>
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="absolute left-3 top-1/2 tranform -translate-y-1/2 fill-gray-400 w-4 h-5"
                        >
                          <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                        </svg>
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-blue-800 focus:bg-transparent"
                          placeholder="password"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="size-5 fill-gray-400 ">
                          <path d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9l0 63.3c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2l0-63.3c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                       ): (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-5 fill-gray-400 ">
                          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z"/></svg>
                      )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-xs">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="absolute left-3 top-1/2 tranform -translate-y-1/2 fill-gray-400 w-4 h-5"
                        >
                          <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                        </svg>
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-8 rounded-md outline-blue-800 focus:bg-transparent"
                          placeholder="Confirm Password"
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-5 "
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="size-5 fill-gray-400 ">
                          <path d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9l0 63.3c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2l0-63.3c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                       ): (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-5 fill-gray-400 ">
                          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z"/></svg>
                      )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Referral Code */}
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      fill="currentColor"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400  w-5 h-4"
                    >
                      <path d="M181.3 32.4c17.4 2.9 29.2 19.4 26.3 36.8L197.8 128l95.1 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3s29.2 19.4 26.3 36.8L357.8 128l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0L325.8 320l58.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-68.9 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8l9.8-58.7-95.1 0-11.5 69.3c-2.9 17.4-19.4 29.2-36.8 26.3s-29.2-19.4-26.3-36.8L90.2 384 32 384c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 21.3-128L64 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 11.5-69.3c2.9-17.4 19.4-29.2 36.8-26.3zM187.1 192L165.8 320l95.1 0 21.3-128-95.1 0z" />
                    </svg>
                    <input
                      name="referrerCode"
                      type="text"
                      value={formData.referrerCode}
                      onChange={handleChange}
                      // required
                      className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-blue-800 focus:bg-transparent"
                      placeholder="Referrer Code (optional)"
                    />
                  </div>

                  {/* Submit Button */}
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

                        <p className="text-white text-lg font-semibold">Please wait</p>
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
                          Register
                        </p>
                      </>
                    )}

                  </div>
                  </button>
                  <p className="text-sm mt-3 text-gray-800 ">
                    Already have an account?{" "}
                    <a
                      href="/auth/signin"
                      className="text-[#22405c] font-semibold hover:underline ml-1"
                    >
                      Login here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
