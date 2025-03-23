"use client";
import { useState } from "react";

import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    if (!formData.email || !formData.password) {
      toast.warning("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/signin", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 && response.data.success) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);

        toast.success("Login successful!");
        setLoading(false);
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
    }
  };

  return (
    <div className="relative">
      <div className="font-calibri relative z-10 ">
        <div className="bg-gray-100">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 min-h-screen">
            <div
              style={{ backgroundImage: "url('/reg.jpg')" }}
              className="flex relative justify-center object-cover bg-cover min-h-scree "
            >
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 p-2 gap-4">
                <h1 className="text-[32px] text-white font-bold">
                  Daimond Galaxy
                </h1>
                <p className="text-center text-white text-sm">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
                <button className="bg-[#22405c] p-2 text-white w-[200px] rounded-[50px] font-bold text-sm">
                  <Link href="/auth/signup">Register Now</Link>
                </button>
              </div>
            </div>
            <div className="mx-auto flex justify-center items-center">
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
                          required
                          className="bg-gray-50 w-[400px] text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="email"
                        />
                      </div>
                    </div>

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
                          className="bg-gray-50 w-[400px] text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
