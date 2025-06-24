"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Header from "@/app/admin/components/header/page";
import SideBar from "@/app/admin/components/sidebar/SideBar";

import Cookies from "js-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";

const users = [
  {
    name: "Alice",
    email: "alice@example.com",
    isRegistered: true,
    isActivated: true,
    balance: 1500,
    slot: "Slot1",
  },
  {
    name: "Bob",
    email: "bob@example.com",
    isRegistered: false,
    isActivated: false,
    balance: 0,
    slot: "Slot2",
  },
  {
    name: "Charlie",
    email: "charlie@example.com",
    isRegistered: true,
    isActivated: false,
    balance: 300,
    slot: "Slot3",
  },
  {
    name: "David",
    email: "david@example.com",
    isRegistered: true,
    isActivated: true,
    balance: 500,
    slot: "Slot4",
  },
  {
    name: "Eve",
    email: "eve@example.com",
    isRegistered: false,
    isActivated: true,
    balance: 1200,
    slot: "Slot5",
  },
  {
    name: "Frank",
    email: "frank@example.com",
    isRegistered: true,
    isActivated: true,
    balance: 800,
    slot: "Slot6",
  },
];

const Page = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [winnerDetails, setWinnerDetails] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");

  console.log(": ");

  const [formData, setFormData] = useState({
    price: "",
    levelOneCommission: "",
    drawingDate: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSidebarToggle = () => setIsSidebarOpen(!isSidebarOpen);
  const handleClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * users.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const closeModal = () => setShowModal(false);
  const closeModalAmount = () => {
    setIsOpen(false);
    setAmount("");
  };

  const handleDepositSubmit = async () => {
    if (!amount || !winnerDetails?.id) {
      toast.error("Missing amount, winner info, or draw .");
      return;
    }

    console.log(amount, winnerDetails.id);

    console.log("entered 1");
    try {
      const depositRes = await axios.put(
        `/api/admin/total-user`,
        {
          amount: parseFloat(amount),
          userId: winnerDetails.id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log("entered 2");
      console.log("res of deposit: ", depositRes);

      if (depositRes.data.status === 200) {
        toast.success("Deposit successfully added.");

        closeModalAmount();
        setShowModal(false);
      } else {
        toast.error("Failed to deposit.");
      }
    } catch (error) {
      console.error("Deposit error:", error);
      toast.error("Something went wrong during deposit.");
    }
  };

  return (
    <div className="overflow-y-auto scrollbar-hidden">
      <div className="p-2 w-full">
        <div className="flex items-center justify-between">
          <button
            ref={buttonRef}
            onClick={handleSidebarToggle}
            className="p-2 text-sm text-gray-500 rounded-lg sm:hidden"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>

          <p className="text-[12px] md:text-xl font-semibold ml-4 md:ml-64 p-5">
            Lucky Draw
          </p>
          <div className="ml-auto">
            <Header appear={true} />
          </div>
        </div>

        <aside
          ref={sidebarRef}
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          <SideBar section="Lucky Draw" />
        </aside>
      </div>

      <div className="sm:ml-64 p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-xl flex flex-col items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-center text-[#22405c]">
              Spin and Find a Random Person for Lucky Draw
            </h2>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {users.map((user, index) => (
                <div
                  key={index}
                  className={`text-center py-2 px-3 rounded shadow transition-all duration-300 ${
                    index === prizeNumber && !mustSpin
                      ? "bg-green-600 text-white font-bold"
                      : "bg-[#F6F1DE] text-black"
                  }`}
                >
                  {user.name}
                </div>
              ))}
            </div>

            <button
              onClick={async () => {
                const newPrizeNumber = Math.floor(Math.random() * users.length);
                setPrizeNumber(newPrizeNumber);
                setMustSpin(true);

                setTimeout(async () => {
                  setMustSpin(false);
                  try {
                    const res = await axios.get(`/api/admin/total-user`, {
                      headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                      },
                    });

                    const winner = res.data?.data?.winner;
                    if (res.data.status === 200 && winner) {
                      setWinnerDetails({
                        id: winner.id,
                        name: winner.name,
                        email: winner.email,
                        username: winner.username,
                        isRegistered: winner.is_registered,
                        isActivated: winner.isInActivatedSlots,
                        balance: res.data.data.totalCompanyCommission,
                        slot: "-",
                      });
                      setShowModal(true);
                    } else {
                      toast.error("No winner data received.");
                    }
                  } catch (error) {
                    console.error("Error fetching winner:", error);
                    toast.error(
                      error?.response?.data?.message ||
                        "Could not retrieve winner info"
                    );
                  }
                }, 1500);
              }}
              className="bg-[#22405c] text-white px-4 py-2 rounded"
            >
              Spin
            </button>
          </div>

          {showModal && winnerDetails && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Winner Details</h2>
                <p>
                  <strong>Name:</strong> {winnerDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {winnerDetails.email}
                </p>
                <p>
                  <strong>Registered:</strong>{" "}
                  {winnerDetails.isRegistered ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Activated:</strong>{" "}
                  {winnerDetails.isActivated ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Balance:</strong> ${winnerDetails.balance}
                </p>

                <button
                  onClick={() => setIsOpen(true)}
                  className="mt-3 bg-[#22405c] text-white px-4 py-2 rounded mr-2"
                >
                  Add Deposit
                </button>

                <Link href="../../../admin/lucky-draw">
                  <button
                    onClick={closeModal}
                    className="mt-3 bg-[#22405c] text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </Link>
              </div>
            </div>
          )}

          {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Enter Amount
                </h2>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded mb-4"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={closeModalAmount}
                    className="bg-[#F6F1DE] px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDepositSubmit}
                    className="bg-[#22405c] text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Page;
