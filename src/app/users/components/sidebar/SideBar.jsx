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
          <p>Account Balance</p>
          <p className="text-md font-mono">0.00 USD</p>
          <div className="flex flex-row gap-4 mt-3">
            <Link href="/users/deposit">
              <button className="p-2 rounded-md text-sm text-black bg-[#F6F1DE]">
                Deposit
              </button>
            </Link>
           <Link href="/users/withdraw">
              <button className="p-2 rounded-md text-sm text-black bg-[#F6F1DE]">
                Withdraw
              </button>
           </Link>
          </div>
        </li>
        <Link
          href="/users/dashboard"
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
          className={`pb-2 text-white ${section === "Deposit"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/deposit"
            className={`flex items-center p-2 group ${section === "Deposit"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                fill="currentColor"
                stroke="currentColor"
                className="size-4 "
              >
                <path d="M535 41c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l64 64c4.5 4.5 7 10.6 7 17s-2.5 12.5-7 17l-64 64c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l23-23L384 112c-13.3 0-24-10.7-24-24s10.7-24 24-24l174.1 0L535 41zM105 377l-23 23L256 400c13.3 0 24 10.7 24 24s-10.7 24-24 24L81.9 448l23 23c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L7 441c-4.5-4.5-7-10.6-7-17s2.5-12.5 7-17l64-64c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM96 64l241.9 0c-3.7 7.2-5.9 15.3-5.9 24c0 28.7 23.3 52 52 52l117.4 0c-4 17 .6 35.5 13.8 48.8c20.3 20.3 53.2 20.3 73.5 0L608 169.5 608 384c0 35.3-28.7 64-64 64l-241.9 0c3.7-7.2 5.9-15.3 5.9-24c0-28.7-23.3-52-52-52l-117.4 0c4-17-.6-35.5-13.8-48.8c-20.3-20.3-53.2-20.3-73.5 0L32 342.5 32 128c0-35.3 28.7-64 64-64zm64 64l-64 0 0 64c35.3 0 64-28.7 64-64zM544 320c-35.3 0-64 28.7-64 64l64 0 0-64zM320 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Deposit
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
            href="/users/lucky_draw"
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
          className={`pb-2 text-white ${section === "Registration"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black"
            }`}
        >
          <Link
            href="/users/registration"
            className={`flex items-center p-2 group ${section === "Registration"
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
                Registration
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Activate"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/activate"
            className={`flex items-center p-2  group ${section === "Activate"
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
                Activate
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Slotes"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/slotes"
            className={`flex items-center p-2  group ${section === "Slotes"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
                stroke="currentColor"
                className="size-4 "
              >
                <path d="M96 80c0-26.5 21.5-48 48-48l288 0c26.5 0 48 21.5 48 48l0 304L96 384 96 80zm313 47c-9.4-9.4-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L409 161c9.4-9.4 9.4-24.6 0-33.9zM0 336c0-26.5 21.5-48 48-48l16 0 0 128 448 0 0-128 16 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48L48 480c-26.5 0-48-21.5-48-48l0-96z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Slotes
              </span>
            </div>
          </Link>
        </li>
        {/*  */}
        <li
          className={`pb-2 text-white ${section === "Monthly Gifts"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/monthly_gifts"
            className={`flex items-center p-2  group ${section === "Monthly Gifts"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="size-4 "
                stroke="currentColor"
                fill="currentColor"
              >
                <path d="M163.9 136.9c-29.4-29.8-29.4-78.2 0-108s77-29.8 106.4 0l17.7 18 17.7-18c29.4-29.8 77-29.8 106.4 0s29.4 78.2 0 108L310.5 240.1c-6.2 6.3-14.3 9.4-22.5 9.4s-16.3-3.1-22.5-9.4L163.9 136.9zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5L192 512 32 512c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l36.8 0 44.9-36c22.7-18.2 50.9-28 80-28l78.3 0 16 0 64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l120.6 0 119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384c0 0 0 0 0 0l-.9 0c.3 0 .6 0 .9 0z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Monthly Gifts
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Grades"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/grades"
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
                <path d="M470.7 9.4c3 3.1 5.3 6.6 6.9 10.3s2.4 7.8 2.4 12.2c0 0 0 .1 0 .1c0 0 0 0 0 0l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-18.7L310.6 214.6c-11.8 11.8-30.8 12.6-43.5 1.7L176 138.1 84.8 216.3c-13.4 11.5-33.6 9.9-45.1-3.5s-9.9-33.6 3.5-45.1l112-96c12-10.3 29.7-10.3 41.7 0l89.5 76.7L370.7 64 352 64c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0s0 0 0 0c8.8 0 16.8 3.6 22.6 9.3l.1 .1zM0 304c0-26.5 21.5-48 48-48l416 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 304zM48 416l0 48 48 0c0-26.5-21.5-48-48-48zM96 304l-48 0 0 48c26.5 0 48-21.5 48-48zM464 416c-26.5 0-48 21.5-48 48l48 0 0-48zM416 304c0 26.5 21.5 48 48 48l0-48-48 0zm-96 80a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Grades
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Rewards"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/rewards"
            className={`flex items-center p-2 group ${section === "Rewards"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="size-4 "
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M200.6 32C205 19.5 198.5 5.8 186 1.4S159.8 3.5 155.4 16L144.7 46.2l-9.9-29.8C130.6 3.8 117-3 104.4 1.2S85 19 89.2 31.6l8.3 25-27.4-20c-10.7-7.8-25.7-5.4-33.5 5.3s-5.4 25.7 5.3 33.5L70.2 96 48 96C21.5 96 0 117.5 0 144L0 464c0 26.5 21.5 48 48 48l152.6 0c-5.4-9.4-8.6-20.3-8.6-32l0-224c0-29.9 20.5-55 48.2-62c1.8-31 17.1-58.2 40.1-76.1C271.7 104.7 256.9 96 240 96l-22.2 0 28.3-20.6c10.7-7.8 13.1-22.8 5.3-33.5s-22.8-13.1-33.5-5.3L192.5 55.1 200.6 32zM363.5 185.5L393.1 224 344 224c-13.3 0-24-10.7-24-24c0-13.1 10.8-24 24.2-24c7.6 0 14.7 3.5 19.3 9.5zM272 200c0 8.4 1.4 16.5 4.1 24l-4.1 0c-26.5 0-48 21.5-48 48l0 80 192 0 0-96 32 0 0 96 192 0 0-80c0-26.5-21.5-48-48-48l-4.1 0c2.7-7.5 4.1-15.6 4.1-24c0-39.9-32.5-72-72.2-72c-22.4 0-43.6 10.4-57.3 28.2L432 195.8l-30.5-39.6c-13.7-17.8-35-28.2-57.3-28.2c-39.7 0-72.2 32.1-72.2 72zM224 464c0 26.5 21.5 48 48 48l144 0 0-128-192 0 0 80zm224 48l144 0c26.5 0 48-21.5 48-48l0-80-192 0 0 128zm96-312c0 13.3-10.7 24-24 24l-49.1 0 29.6-38.5c4.6-5.9 11.7-9.5 19.3-9.5c13.4 0 24.2 10.9 24.2 24z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Rewards
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "My Refferal"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/my_refferals"
            className={`flex items-center p-2 group ${section === "My Refferal"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="size-4 "
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M192 32c17.7 0 32 14.3 32 32l0 135.5 111.5-66.9c15.2-9.1 34.8-4.2 43.9 11s4.2 34.8-11 43.9L254.2 256l114.3 68.6c15.2 9.1 20.1 28.7 11 43.9s-28.7 20.1-43.9 11L224 312.5 224 448c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-135.5L48.5 379.4c-15.2 9.1-34.8 4.2-43.9-11s-4.2-34.8 11-43.9L129.8 256 15.5 187.4c-15.2-9.1-20.1-28.7-11-43.9s28.7-20.1 43.9-11L160 199.5 160 64c0-17.7 14.3-32 32-32z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                My Referral
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Education"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/education"
            className={`flex items-center p-2  group ${section === "Education"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="size-4 "
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-8 384l0-128 16 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-288 56 0 64 0 16 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-64 192 0 0 192-192 0 0-32-64 0 0 48c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48L368 0c-26.5 0-48 21.5-48 48l0 80-76.9 0-65.9 0c-33.7 0-64.9 17.7-82.3 46.6l-58.3 97c-9.1 15.1-4.2 34.8 10.9 43.9s34.8 4.2 43.9-10.9L120 256.9 120 480c0 17.7 14.3 32 32 32s32-14.3 32-32z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Education
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Salary"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/salary"
            className={`flex items-center p-2  group ${section === "Salary"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                stroke="currentColor"
                className="size-4 "
              >
                <path d="M320 96L192 96 144.6 24.9C137.5 14.2 145.1 0 157.9 0L354.1 0c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128l128 0c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96L96 512c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4c0 0 0 0 0 0s0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20l0 14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1c0 0 0 0 0 0s0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4l0 14.6c0 11 9 20 20 20s20-9 20-20l0-13.8c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15c0 0 0 0 0 0l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7l0-13.9z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Salary
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Transaction"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/transactions"
            className={`flex items-center p-2  group ${section === "Transaction"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
                stroke="currentColor"
                className="size-4 "
              >
                <path d="M488.1 6.2c-9.9-8.9-25-8.1-33.9 1.8s-8.1 25 1.8 33.9L489.5 72 86.5 72l33.5-30.2c9.9-8.9 10.7-24 1.8-33.9S97.8-2.7 87.9 6.2l-80 72C2.9 82.7 0 89.2 0 96s2.9 13.3 7.9 17.8l80 72c9.9 8.9 25 8.1 33.9-1.8s8.1-25-1.8-33.9L86.5 120l402.9 0-33.5 30.2c-9.9 8.9-10.7 24-1.8 33.9s24 10.7 33.9 1.8l80-72c5.1-4.6 7.9-11 7.9-17.8s-2.9-13.3-7.9-17.8l-80-72zM307.4 166.5c-11.5-8.7-27.3-8.7-38.8 0l-168 128c-6.6 5-11 12.5-12.3 20.7l-24 160c-1.4 9.2 1.3 18.6 7.4 25.6S86.7 512 96 512l144 0 16 0c17.7 0 32-14.3 32-32l0-118.1c0-5.5 4.4-9.9 9.9-9.9c3.7 0 7.2 2.1 8.8 5.5l68.4 136.8c5.4 10.8 16.5 17.7 28.6 17.7l60.2 0 16 0c9.3 0 18.2-4.1 24.2-11.1s8.8-16.4 7.4-25.6l-24-160c-1.2-8.2-5.6-15.7-12.3-20.7l-168-128z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Transaction
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "My Team"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/my_team"
            className={`flex items-center p-2  group ${section === "My Team"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                fill="currentColor"
                stroke="currentColor"
                className="size-4 "
              >
                <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                My Team
              </span>
            </div>
          </Link>
        </li>
        {/* <li
          className={`pb-2 text-white ${section === "Fingure Print"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <a
            href="#"
            className={`flex items-center p-2  group ${section === "Fingure Print"
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
                <path d="M48 256C48 141.1 141.1 48 256 48c63.1 0 119.6 28.1 157.8 72.5c8.6 10.1 23.8 11.2 33.8 2.6s11.2-23.8 2.6-33.8C403.3 34.6 333.7 0 256 0C114.6 0 0 114.6 0 256l0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40zm458.5-52.9c-2.7-13-15.5-21.3-28.4-18.5s-21.3 15.5-18.5 28.4c2.9 13.9 4.5 28.3 4.5 43.1l0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40c0-18.1-1.9-35.8-5.5-52.9zM256 80c-19 0-37.4 3-54.5 8.6c-15.2 5-18.7 23.7-8.3 35.9c7.1 8.3 18.8 10.8 29.4 7.9c10.6-2.9 21.8-4.4 33.4-4.4c70.7 0 128 57.3 128 128l0 24.9c0 25.2-1.5 50.3-4.4 75.3c-1.7 14.6 9.4 27.8 24.2 27.8c11.8 0 21.9-8.6 23.3-20.3c3.3-27.4 5-55 5-82.7l0-24.9c0-97.2-78.8-176-176-176zM150.7 148.7c-9.1-10.6-25.3-11.4-33.9-.4C93.7 178 80 215.4 80 256l0 24.9c0 24.2-2.6 48.4-7.8 71.9C68.8 368.4 80.1 384 96.1 384c10.5 0 19.9-7 22.2-17.3c6.4-28.1 9.7-56.8 9.7-85.8l0-24.9c0-27.2 8.5-52.4 22.9-73.1c7.2-10.4 8-24.6-.2-34.2zM256 160c-53 0-96 43-96 96l0 24.9c0 35.9-4.6 71.5-13.8 106.1c-3.8 14.3 6.7 29 21.5 29c9.5 0 17.9-6.2 20.4-15.4c10.5-39 15.9-79.2 15.9-119.7l0-24.9c0-28.7 23.3-52 52-52s52 23.3 52 52l0 24.9c0 36.3-3.5 72.4-10.4 107.9c-2.7 13.9 7.7 27.2 21.8 27.2c10.2 0 19-7 21-17c7.7-38.8 11.6-78.3 11.6-118.1l0-24.9c0-53-43-96-96-96zm24 96c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 24.9c0 59.9-11 119.3-32.5 175.2l-5.9 15.3c-4.8 12.4 1.4 26.3 13.8 31s26.3-1.4 31-13.8l5.9-15.3C267.9 411.9 280 346.7 280 280.9l0-24.9z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Fingure Print
              </span>
            </div>
          </a>
        </li> */}
        <li
          className={`pb-2 text-white ${section === "Change Profile"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/profile-update"
            className={`flex items-center p-2  group ${section === "Change Profile"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div className="flex flex-row pl-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="size-4 "
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Change Profile
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Change Password"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <Link
            href="/users/password-change"
            className={`flex items-center p-2  group ${section === "Change Password"
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
                <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal  text-sm">
                Change Password
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`pb-2 text-white ${section === "Logout"
            ? "bg-[#F6F1DE] text-black"
            : "hover:bg-[#F6F1DE] hover:text-black "
            }`}
        >
          <a
            href="#"
            className={`flex items-center p-2  group ${section === "Logout"
              ? "bg-[#F6F1DE] text-black"
              : "hover:bg-[#F6F1DE] hover:text-black "
              }`}
          >
            <div
              className="flex flex-row pl-10 justify-center items-center cursor-pointer"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                stroke="currentColor"
                className="size-4"
              >
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap font-normal text-sm">
                Logout
              </span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
