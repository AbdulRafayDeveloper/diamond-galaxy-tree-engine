"use client";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SideBar = ({ section }) => {
  const router = useRouter();
  console.log(section);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        router.push("/auth/signin");
      }
    });
  };
  return (
    <div className="h-full py-4 overflow-y-auto bg-[#22405c] scrollbar">
      <ul className=" font-medium">
        <li className="flex justify-center pb-6 flex flex-col text-white justify-center items-center">
          <Link href="/users/dashboard">
            <img
              src="/logo.jpg"
              className="w-24 h-24 rounded-[300px]"
              alt="no image"
            />
          </Link>
        </li>
        <Link
          href="/admin/dashboard"
          className={`flex items-center  p-2 text-white group ${section === "Dashboard" ? "bg-[#F6F1DE] text-black" : "hover:bg-[#F6F1DE] hover:text-black"
            }`}
        >
          <li
            className={`pt-2 pb-2 flex items-center cursor-pointer ${section === "Dashboard" ? "bg-[#F6F1DE] text-black" : "hover:bg-[#F6F1DE] hover:text-black"
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <img
                src="/icons/mage_dashboard-fill.png"
                alt=""
                className="w-4 h-4 flex-shrink-0 bg-black"
              />
              <span className="ms-3 font-normal text-sm">
              Dashboard
                <br />
              </span>
            </div>
          </li>
        </Link>
        <li
          className={`pb-2 text-white ${section === "Users"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/admin/users"
            className={`flex items-center p-2  group ${section === "Users"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div
              className="flex flex-row pl-10 justify-center items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                fill="currentColor"
                stroke="currentColor"
                className="size-4 "
              >
                <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal text-sm">
                Users
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Desposit Request"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/admin/deposit_request"
            className={`flex items-center p-2  group ${section === "Desposit Request"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div
              className="flex flex-row pl-10 justify-center items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                fill="currentColor"
                stroke="currentColor"
                className="size-4 "
              >
                <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64l241.9 0c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5 608 384c0 35.3-28.7 64-64 64l-241.9 0c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5 32 128c0-35.3 28.7-64 64-64zm64 64l-64 0 0 64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64l64 0 0-64zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal text-sm">
              Desposit Request
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2  text-white ${section === "Lucky Draw"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/admin/lucky_draw"
            className={`flex items-center p-2  group ${section === "Lucky Draw"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
                stroke="currentColor"
                className="size-4 "
              >
                <path d="M216.6 49.9C205.1 38.5 189.5 32 173.3 32C139.4 32 112 59.4 112 93.3l0 4.9c0 12 3.3 23.7 9.4 34l18.8 31.3c1.1 1.8 1.2 3.1 1 4.2c-.2 1.2-.8 2.5-2 3.6s-2.4 1.8-3.6 2c-1 .2-2.4 .1-4.2-1l-31.3-18.8c-10.3-6.2-22-9.4-34-9.4l-4.9 0C27.4 144 0 171.4 0 205.3c0 16.2 6.5 31.8 17.9 43.3l1.2 1.2c3.4 3.4 3.4 9 0 12.4l-1.2 1.2C6.5 274.9 0 290.5 0 306.7C0 340.6 27.4 368 61.3 368l4.9 0c12 0 23.7-3.3 34-9.4l31.3-18.8c1.8-1.1 3.1-1.2 4.2-1c1.2 .2 2.5 .8 3.6 2s1.8 2.4 2 3.6c.2 1 .1 2.4-1 4.2l-18.8 31.3c-6.2 10.3-9.4 22-9.4 34l0 4.9c0 33.8 27.4 61.3 61.3 61.3c16.2 0 31.8-6.5 43.3-17.9l1.2-1.2c3.4-3.4 9-3.4 12.4 0l1.2 1.2c11.5 11.5 27.1 17.9 43.3 17.9c33.8 0 61.3-27.4 61.3-61.3l0-4.9c0-12-3.3-23.7-9.4-34l-18.8-31.3c-1.1-1.8-1.2-3.1-1-4.2c.2-1.2 .8-2.5 2-3.6s2.4-1.8 3.6-2c1-.2 2.4-.1 4.2 1l31.3 18.8c10.3 6.2 22 9.4 34 9.4l4.9 0c33.8 0 61.3-27.4 61.3-61.3c0-16.2-6.5-31.8-17.9-43.3l-1.2-1.2c-3.4-3.4-3.4-9 0-12.4l1.2-1.2c11.5-11.5 17.9-27.1 17.9-43.3c0-33.8-27.4-61.3-61.3-61.3l-4.9 0c-12 0-23.7 3.3-34 9.4l-31.3 18.8c-1.8 1.1-3.1 1.2-4.2 1c-1.2-.2-2.5-.8-3.6-2s-1.8-2.4-2-3.6c-.2-1-.1-2.4 1-4.2l18.8-31.3c6.2-10.3 9.4-22 9.4-34l0-4.9C336 59.4 308.6 32 274.7 32c-16.2 0-31.8 6.5-43.3 17.9l-1.2 1.2c-3.4 3.4-9 3.4-12.4 0l-1.2-1.2z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Lucky Draw
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Register Users"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black"
            }`}
        >
          <Link
            href="/admin/register_users"
            className={`flex items-center p-2 group ${section === "Register Users"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black"
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                stroke="currentColor"
                fill="currentColor"
                className="size-4 "
              >
                <path d="M0 96l576 0c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96zm0 32L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-288L0 128zM64 405.3c0-29.5 23.9-53.3 53.3-53.3l117.3 0c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7L74.7 416c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z" />
              </svg>

              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Registration Users
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Activate Users"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/admin/activated_users"
            className={`flex items-center p-2  group ${section === "Activate Users"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="size-4 "
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Activate Users
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Slots"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/admin/slots"
            className={`flex items-center p-2  group ${section === "Slots"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="size-4 "
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Slots
              </span>
            </div>
          </Link>
        </li>
        {/* MOnthly Gifts */}
        <li
          className={`pb-2 text-white ${section === "Monthly Gifts"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/admin/monthly-gift"
            className={`flex items-center p-2  group ${section === "Monthly Gifts"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="size-4 "
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Monthly Gifts
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Qualified for Rewards"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/admin/qualifiedRewards"
            className={`flex items-center p-2  group ${section === "Qualified for Rewards"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="size-4 "
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Qualified for Rewards
              </span>
            </div>
          </Link>
        </li>
        {/*  */}
        <li
          className={`pb-2 text-white ${section === "Grades"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/admin/grades"
            className={`flex items-center p-2  group ${section === "Grades"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="size-4 "
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Grades
              </span>
            </div>
          </Link>
        </li>
        {/* Education */}
        <li
          className={`pb-2 text-white ${section === "Education"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/admin/education"
            className={`flex items-center p-2  group ${section === "Education"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="size-4 "
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Education
              </span>
            </div>
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default SideBar;
