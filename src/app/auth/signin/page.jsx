"use client";
import { useState } from "react";

import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };
  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    let newError = {};
    setLoading(true);

    if (!formData.email) newError.email = "Email is required.";
    else if (!validateEmail(formData.email))
      newError.email = "Invalid email format.";

    if (!formData.password) newError.password = "Password is required.";
    else if (!validatePassword(formData.password))
      newError.password =
        "Password must 8+ chars, 1 uppercase, 1 number, 1 special char.";

    if (Object.keys(newError).length > 0) {
      setErrors(newError);
      return;
    }

    try {
      const response = await axios.post("/api/signin", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 && response.data.success) {
        const { token, user } = response.data;

        Cookies.set("token", token, { expires: 7 });

        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/users/dashboard");
        }, 2000);
      } else {
        setLoading(false);
        throw new Error("Unexpected response");
      }
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong. Please check your credentials.";
      setLoading(false);
      toast.error(message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="font-calibri relative z-10 ">
        <div className="bg-gray-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 min-h-screen">
            <div
              style={{ backgroundImage: "url('/reg.jpg')" }}
              className="flex relative justify-center object-cover bg-cover min-h-screen "
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
                  commissions by selling products and recruiting others.
                </p>
                <button className="bg-[#22405c] p-2 text-white w-[200px] rounded-[50px] font-bold text-sm">
                  <Link href="/auth/signup">Register Now</Link>
                </button>
              </div>
            </div>
            {/* <div className="mx-auto flex justify-center items-center">
              <form>
                <div className="p-3 m-4">
                  <div className="flex justify-center items-center text-center">
                    <h3 className="text-[#22405c] font-calibri text-3xl font-extrabold mb-6 text-center">
                      Login<br></br>
                      <span className="text-sm text-center">
                        Continue to your account
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-4 ">
                    <div className="flex flex-col">
                      <div className="flex gap-4">
                        <div className="relative">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5"
                          >
                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                          </svg>
                          <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                            className="bg-gray-50 w-[400px] text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-blue-800 focus:bg-transparent"
                            placeholder="email"
                          />
                        </div>
                      </div>
                      <span className="text-sm text-red-500">
                        {errors.email}{" "}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <div className="flex  gap-4">
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
                            autoComplete="current-password"
                            className="bg-gray-50 w-[400px] text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-blue-800 focus:bg-transparent"
                            placeholder="password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? "👁️" : "👁‍🗨"}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-red-500 w-[400px]">
                        {errors.password}
                      </p>
                    </div>
                  </div>

                  <div className="!mt-8">
                    <button
                      // type="submit"
                      className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded bg-[#22405c] text-white focus:outline-none ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      } `}
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                  <p className="text-sm mt-3 text-gray-800 ">
                    If you don't have an account?{" "}
                    <a
                      href="/auth/signup"
                      className="text-[#22405c] font-semibold hover:underline ml-1"
                    >
                      Register here
                    </a>
                  </p>
                </div>
              </form>
              <ToastContainer position="top-right" autoClose={3000} />
            </div> */}
            <div className="flex justify-center items-center min-h-screen px-4">
              <form className="w-full max-w-md  p-6 rounded-lg">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-[#22405c] font-calibri text-3xl font-extrabold">
                    Login
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Continue to your account</p>
                </div>

                {/* Email Field */}
                <div className="mb-4 relative">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="w-full pl-9 pr-4 py-3.5 text-sm text-gray-800 rounded-md bg-gray-50 outline-blue-800 focus:bg-transparent"
                    placeholder="Email"
                  />
                  <span className="text-sm text-red-500">{errors.email}</span>
                </div>

                {/* Password Field */}
                <div className="mb-4 relative">
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
                    autoComplete="current-password"
                    className="w-full pl-9 pr-10 py-3.5 text-sm text-gray-800 rounded-md bg-gray-50 outline-blue-800 focus:bg-transparent"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?(
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="size-5 fill-gray-400 ">
                          <path d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9l0 63.3c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2l0-63.3c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                       ): (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-5 fill-gray-400 ">
                          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z"/></svg>
                      )}
                  </button>
                  <p className="text-sm text-red-500">{errors.password}</p>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                  className={`w-full shadow-xl py-2  text-sm font-semibold rounded bg-[#22405c] text-white focus:outline-none ${loading
                    ? "cursor-not-allowed bg-[#22405c] "
                    : "hover: bg-[#22405c]"
                    }`}
                  disabled={loading}
                  onClick={handleSubmit}
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
                          Login
                        </p>
                      </>
                    )}

                  </div>
                </button>
                </div>

                {/* Register Link */}
                <p className="text-sm mt-4 text-gray-800 text-center">
                  Don't have an account?{" "}
                  <a
                    href="/auth/signup"
                    className="text-[#22405c] font-semibold hover:underline"
                  >
                    Register here
                  </a>
                </p>
              </form>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
