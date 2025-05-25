"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtVerify } from "jose";

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(() => searchParams.get("token") || "");
  console.log("Token:", token);
  const JWT_SECRET = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_FORGET_PASSWORD_TOKEN
  );
  console.log("JWT_SECRET:", JWT_SECRET);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [otpExpired, setOtpExpired] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const getEmailFromToken = async () => {
      try {
        console.log("Token:", token);
        console.log("JWT_SECRET:", JWT_SECRET);
        const { payload } = await jwtVerify(token, JWT_SECRET);
        console.log("payload:", payload);
        setEmail(payload.email);
        console.log("Email from token:", payload.email);
      } catch (err) {
        console.log("JWT Verify error:", err);
        toast.error("Invalid or expired token.");
      }
    };
    if (token) getEmailFromToken();
  }, [token]);

  useEffect(() => {
    if (timer === 0) {
      setOtpExpired(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 120) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      // console.log("Token:", token);
      // console.log("JWT_SECRET:", JWT_SECRET);
      // const { payload } = await jwtVerify(token, JWT_SECRET);
      // console.log("payload:", payload);
      // email = payload.email;
      console.log("Email from token:", email);

      if (!email) {
        toast.error("Email is required.");
        return;
      }

      // setLoading(true);

      const response = await axios.post(`/api/resend-otp`, { email });

      if (response.data.status !== 200) {
        setLoading(false);
        console.log("response.data.message:", response.data.message);
        toast.error(
          response.data.message || "Failed to resend OTP. Please try again."
        );
        return;
      }

      const newToken = response.data.data;
      setToken(newToken);
      router.replace(`/auth/forget-password/verify-otp?token=${newToken}`, {
        scroll: false,
      });

      toast.success(response.data.message || "OTP resent successfully!");
      setTimer(120);
      setOtpExpired(false);
      setOtp(["", "", "", "", "", ""]);
      // setLoading(false);
    } catch (err) {
      // setLoading(false);
      toast.error(err.response?.data?.message || "Failed to resend OTP.");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `/api/verify-otp`,
        { userOtp: enteredOtp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response.status:", response.data.status);

      if (response.data.status !== 200) {
        setLoading(false);
        console.log("response.data.message:", response.data);
        toast.error(
          response.data.message || "Invalid OTP or expired. Please try again."
        );
        return;
      }

      console.log("response:", response);
      console.log("response.data:", response.data);
      console.log("response.data.data:", response.data.data);
      console.log("response.status:", response.data.status);

      const otpVerifiedToken = response.data.data;
      console.log("otpVerifiedToken:", otpVerifiedToken);
      toast.success(response.data.message || "OTP verified! Redirecting...");

      setTimeout(() => {
        router.push(`/auth/new-password?token=${otpVerifiedToken}`);
      }, 2000);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response?.data?.message ||
          "Invalid OTP or expired. Please try again."
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 w-full h-full bg-cover bg-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md bg-opacity-50">
          <div className="text-center">
            <h1 className="text-[#22405c] font-bold text-4xl sm:text-5xl lg:text-6xl">
              Verify OTP
            </h1>
            <p className="text-black font-normal text-base sm:text-lg lg:text-xl lg:pb-2 pt-6">
              An OTP has been sent to your email. Please enter the 6-digit code
              below.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col items-center"
          >
            <div className="flex space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  className="lg:w-12 lg:h-12 md:w-12 md:h-12 w-8 h-8 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FB9105] bg-gray-50"
                />
              ))}
            </div>

            {/* <div className="my-4 text-sm text-gray-600 text-center">
              {otpExpired ? (
                <span className="text-red-500 font-medium">OTP expired!</span>
              ) : (
                <>
                  OTP expires in{" "}
                  <span className="font-semibold text-[#FB9105]">{timer}s</span>
                </>
              )}
            </div> */}

            <button
              type="submit"
              className={`w-full my-8 text-white border bg-[#22405c] hover:bg-[#22405c]  font-medium rounded-lg text-sm px-5 py-2.5 text-center  ${
                otpExpired ? "bg-gray-400 cursor-not-allowed" : "bg-[#22405c]"
              } ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#22405c]"}`}
              disabled={otpExpired}
            >
              {loading ? (
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-sm">Please Wait </span>
                  <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
            {otpExpired ? (
              <div className="my-0 w-full flex justify-end">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-[#22405c] hover:text-[#22405c] hover:underline text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Resend OTP
                </button>
              </div>
            ) : (
              <div className="my-2 w-full flex justify-end">
                Resend OTP in{" "}
                <span className="font-semibold text-[#22405c] pl-1">
                  {timer}s
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyOtpPage;
