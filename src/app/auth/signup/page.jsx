"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    referralCode: "",
    phoneNo: "",
    country: "",
    username: "",
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
    if (formData.password !== formData.confirmPassword) {
      toast.warning("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (
      !formData.fname ||
      !formData.lname ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.phoneNo ||
      !formData.country
    ) {
      toast.warning("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("../api/signup", {
        firstName: formData.fname,
        lastName: formData.lname,
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNo,
        country: formData.country,
        password: formData.password,
        referralCode: formData.referralCode || "",
      });

      if (response.status === 200 && response.data.success) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);

        toast.success("Registration successful!");
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
                  Login Now
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center px-4">
              <form className="w-full max-w-3xl">
                <div className="p-3 m-4">
                  <div className="flex justify-center items-center text-center">
                    <h3 className="text-[#22405c] font-calibri text-3xl font-extrabold mb-6 text-center">
                      Register<br></br>
                      <span className="text-sm text-center">
                        Create new account to continue
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="First name"
                        />
                      </div>
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
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-5 h-6"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <input
                          name="username"
                          type="text"
                          value={formData.username}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="username"
                        />
                      </div>
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
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-8 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="email"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <input
                          name="referralCode"
                          type="number"
                          value={formData.referralCode}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="referral code"
                        />
                      </div>
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="absolute left-3 top-1/2 tranform -translate-y-1/2 fill-gray-400 w-4 h-5"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <input
                          name="phoneNo"
                          type="number"
                          value={formData.phoneNo}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-8 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="phone number"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
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
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-8 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="Confirm Password"
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-5 "
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? "👁️" : "👁‍🗨"}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="absolute left-3 top-1/2 tranform -translate-y-1/2 fill-gray-400 w-5 h-6"
                        >
                          <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
                          <path
                            fill-rule="evenodd"
                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
                            clip-rule="evenodd"
                          />
                        </svg>

                        <input
                          name="country"
                          type="text"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                          placeholder="country"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="!mt-8">
                    <button
                      // type="submit"
                      className={`w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded bg-[#22405c] text-white focus:outline-none ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={handleSubmit}
                    >
                      Register
                    </button>
                  </div>
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
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
