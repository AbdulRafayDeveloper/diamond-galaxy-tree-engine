"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) return "Invalid email format";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(password))
      return "Password must contain at least one special character";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let tempErrors = { ...errors };

    if (name === "email") {
      tempErrors.email = validateEmail(value);
    }
    if (name === "password") {
      tempErrors.password = validatePassword(value);
    }

    setErrors(tempErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    setErrors(tempErrors);

    if (!tempErrors.email && !tempErrors.password) {
      console.log("Form Submitted", formData);

      router.push("/auth/add_packages");
    }
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="lg:text-[70px] text-[#00288E] font-bold text-[60px] sm:text-[60px]">
          Sign in
        </h1>
        <p className="lg:text-[25px] text-[20px] text-black font-normal lg:pb-2">
          to get started
        </p>
        <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6 lg:space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="relative w-full flex flex-col">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="email"
                    id="username"
                    className="bg-[#F3F3F3] text-gray-900 text-xs placeholder-gray-400 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-12"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative w-full flex flex-col">
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="bg-[#F3F3F3] text-gray-900 text-xs placeholder-gray-400 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-12"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  {/* eye icon image */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? "👁️" : "👁‍🗨"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
                <div className="text-right mt-1">
                  <Link href="#" className="text-[12px] text-[#A0A0A0CC]">
                    Forget password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white border bg-primary-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#FB9105]"
              >
                Login
              </button>

              <p className="text-sm font-light text-gray-500 mt-4">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-[14px] font-semibold text-[#A0A0A0CC]">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
