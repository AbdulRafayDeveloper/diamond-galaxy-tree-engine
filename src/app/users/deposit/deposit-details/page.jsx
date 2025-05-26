"use client";
import Header from "../../components/header/page";
import SideBar from "../../components/sidebar/SideBar";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});

  const searchParams = useSearchParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const encoded = searchParams.get("data");
    if (encoded) {
      try {
        const parsed = JSON.parse(decodeURIComponent(encoded));
        setFormData(parsed);
      } catch (err) {
        console.log("Invalid data received", err);
      }
    }
  }, [searchParams]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        "0x94c7eDf20A6B16B0F8870DFc4DCe9730F5A8C9bf"
      );
      toast.success("Referral link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link.");
    }
  };
  const [imagePreview, setImagePreview] = useState(null);

  /* const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (jpg, png, jpeg, webp)");
    }
  };*/

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file (jpg, png, jpeg, webp)");
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

  const section = "Deposit";

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const amount = "0.00";

  const handleSubmit = async () => {
    if (
      !formData ||
      !formData.Amount ||
      !formData.paymentMethod ||
      !selectedImage
    ) {
      setErrors({
        form: !formData ? "Missing form data." : undefined,
        image: !selectedImage ? "Image is required." : undefined,
      });
      toast.error("Please complete the form and upload an image.");
      return;
    }

    try {
      const form = new FormData();

      form.append("amount", parseFloat(formData.Amount));
      form.append("paymentMethod", formData.paymentMethod);
      form.append("image", selectedImage);

      const token = Cookies.get("token");
      console.log("token: ", token);
      const res = await axios.post("/api/frontend/depositors", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status == 200) {
        toast.success(
          `Your deposit request of $${formData.Amount} through ${formData.paymentMethod} has been submitted successfully.`
        );
        setTimeout(() => {
          router.push("/users/dashboard");
        }, 2000);
      } else {
        toast.error(res.data.message || "Submission failed.");
      }
    } catch (error) {
      toast.error("Error submitting deposit.");
      console.log("Submit error:", error);
    }
  };

  console.log(formData);

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
            Deposit Details
          </p>

          {/* Header component */}
          <div className="ml-auto">
            <Header appear={true} />
          </div>
        </div>
        <aside
          ref={sidebarRef}
          id="separator-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <SideBar section={section} />
        </aside>
      </div>
      {/* body part */}
      <div className="md:ml-64">
        <div className="bg-white">
          <div className="p-2">
            <div className="p-4 mt-5 flex flex-col justify-center items-center bg-[#F6F1DE] rounded-md max-h-screen">
              <div className="flex justify-center items-center text-center">
                <h1 className="text-lg font-thick mt-4">Payment Preview</h1>
              </div>
              <div className="mt-5 w-[220px] flex justify-center text-center items-center">
                <p className="text-[10px] sm:text-[12px] md:text-md lg:text-lg">
                  Please send exactly {amount} USDT to{" "}
                  <Link
                    href="0x94c7eDf20A6B16B0F8870DFc4DCe9730F5A8C9bf"
                    className="text-blue-600"
                  >
                    0x94c7eDf20A6B16B0F8870DFc4DCe9730F5A8C9bf
                  </Link>
                </p>
                <button onClick={handleCopy}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="size-7 fill-[#22405c] mt-4 ml-2 text-left flex items-end"
                  >
                    <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center justify-center p-4 gap-4">
                <label className="cursor-pointer bg-[#22405c] text-white font-semibold py-2 px-4 rounded">
                  Upload Transcript
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Uploaded"
                    className="w-[300px] h-auto rounded shadow"
                  />
                )}
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}

                <button
                  onClick={handleSubmit}
                  className="mt-4 bg-[#22405c] text-white font-semibold py-2 px-6 rounded"
                >
                  Submit Deposit
                </button>
              </div>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
