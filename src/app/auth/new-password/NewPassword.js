"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const NewPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let tempErrors = { ...errors };

    if (name === "newPassword") {
      tempErrors.newPassword = validatePassword(value);
    }
    if (name === "confirmNewPassword") {
      tempErrors.confirmNewPassword = validatePassword(value);
    }

    setErrors(tempErrors);
  };

  const validateForm = () => {
    const { newPassword, confirmNewPassword } = formData;

    if (!newPassword || !confirmNewPassword) {
      toast.error("All fields are required.");
      return false;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      toast.error(passwordError);
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm password do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    let tempErrors = {
      newPassword: validatePassword(formData.newPassword),
      confirmNewPassword: validatePassword(formData.confirmNewPassword),
    };

    setErrors(tempErrors);

    setLoading(true);

    try {
      const response = await axios.post(
        `/api/reset-password`,
        {
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response);
      console.log("Response Data:", response.data);
      console.log("Status:", response.status);
      console.log("Status:", response.data.status);
      if (response.data.status === 200) {
        // Cookies.remove("set_Email");
        toast.success(
          response.data.message || "Password updated successfully!"
        );
        setTimeout(() => {
          setLoading(false);
          router.push("/auth/signin");
        }, 2000);
      } else {
        toast.error(
          response.data?.message ||
            "Failed to update password. Please try again."
        );
        setLoading(false);
      }
    } catch (err) {
      toast.error(
        err.response.data.message || "Invalid OTP or expired. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 py-6 px-4">
        <div className="max-w-md w-full">
          <h3 className="text-[#22405c] text-center font-bold text-4xl sm:text-5xl lg:text-6xl mb-8">
            Update Password
          </h3>
          <p className="lg:text-[25px] text-[20px] text-black text-center font-normal lg:pb-2">
            A small change now keeps big threats away.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 rounded-lg shadow-lg"
          >
            <div className="space-y-3">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5"
                >
                  <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                </svg>
                <input
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  className="bg-[#F3F3F3] text-gray-900 text-xs px-12 placeholder-gray-400 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-12"
                  placeholder="New Password"
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 text-gray-400"
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                    </svg>
                  )}
                </button>
              </div>

              {errors.newPassword && (
                <p className="text-red-500 text-xs ">{errors.newPassword}</p>
              )}

              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5"
                >
                  <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                </svg>
                <input
                  name="confirmNewPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  required
                  className="bg-[#F3F3F3] text-gray-900 text-xs px-12 placeholder-gray-400 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-12"
                  placeholder="Confirm New Password"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5 text-gray-400"
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs ">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className={`w-full text-white border bg-[#22405c] hover:bg-[#22405c] font-medium rounded-lg text-sm px-5 py-2.5 text-center  ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#22405c]"
                }`}
                disabled={loading}
              >
                <div className="flex items-center justify-center space-x-2">
                  {loading ? (
                    <div className="flex justify-center items-center space-x-2">
                      <span className="text-sm">Please Wait </span>
                      <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="text-white size-4"
                      />
                      <p className="text-white text-sm font-normal">
                        Update Password
                      </p>
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
