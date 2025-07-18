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
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalCollectedAmount, setTotalCollectedAmount] = useState(0);
  // const [users, setUsers] = useState([]);
  const { type } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [formData, setFormData] = useState({
    price: "",
    levelOneCommission: "",
    drawingDate: "",
  });

  console.log("type: ", type);

  useEffect(() => {
    const fetchLuckyDraw = async () => {
      try {
        const res = await axios.get(`/api/admin/lucky-draw/${type}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        const data = res.data?.data;

        if (data) {
          setFormData({
            price: data.winner.price || "",
            levelOneCommission: data.winner.levelOnePercentage || "",
            drawingDate: data.winner.drawDate?.split("T")[0] || "",
          });
          // setUsers(data.participants || []);
          setTotalParticipants(data.totalParticipants || 0);
          setTotalCollectedAmount(data.totalCollected || 0);
        }
      } catch (error) {
        console.log("No lucky draw data found for this type yet.");
      }
    };

    if (type) {
      fetchLuckyDraw();
    }
  }, [type]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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

  const handleSubmit = async () => {
    const { price, levelOneCommission, drawingDate } = formData;

    if (!price || !levelOneCommission || !drawingDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    const commission = parseFloat(levelOneCommission);
    if (commission < 0 || commission > 100) {
      toast.error("Commission rate must be between 0 and 100.");
      return;
    }

    try {
      const res = await axios.put(
        `/api/admin/lucky-draw/${type}`,
        {
          price: parseFloat(price),
          drawDate: drawingDate,
          levelOnePercentage: parseFloat(levelOneCommission),
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      toast.success("Lucky draw details updated.");
      console.log("Updated:", res.data);
    } catch (error) {
      toast.error("Failed to update lucky draw.");
      console.error("Update error:", error);
    }
  };



  const handleResetDraw = async () => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "This will reset the current Lucky Draw. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22405c",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
    });

    if (!confirmation.isConfirmed) return;

    try {
      const res = await axios.put(
        `/api/admin/lucky-draw/${type}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (res.data.status == 200) {
        toast.success(res?.data?.message || "Lucky draw reset successfully");

        setShowModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      toast.error("Failed to reset lucky draw");
    }
  };

  const handleDepositSubmit = async () => {
    if (!amount || !winnerDetails?.id || !type) {
      toast.error("Missing amount, winner info, or draw type.");
      return;
    }

    try {
      const depositRes = await axios.put(
        `/api/admin/lucky-draw/lucky-draw-deposit`,
        {
          amount: parseFloat(amount),
          userId: winnerDetails.id,
          balance: winnerDetails.balance,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      console.log("res of deposit: ", depositRes);

      if (depositRes.data.status === 200) {
        toast.success("Deposit successfully added.");

        const deleteRes = await axios.delete(`/api/admin/lucky-draw/${type}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        if (deleteRes.data.status === 200) {
          toast.success("Lucky draw entry deleted.");
        } else {
          toast.warn("Deposit added, but failed to delete lucky draw.");
        }

        closeModalAmount();
        setShowModal(false);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
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
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0`}
        >
          <SideBar section="Lucky Draw" />
        </aside>
      </div>

      <div className="md:ml-64">
        <div className="flex justify-center items-center min-h-[500px] p-2">
          <div className="bg-[#F6F1DE] rounded-md shadow-md p-8 w-full max-w-md">
            <h1 className="text-xl font-bold text-center mb-6">
              Create Lucky Draw
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter the price"
                />
              </div>

              <div>
                <label className="block">Level One Commission %:</label>
                <input
                  type="number"
                  name="levelOneCommission"
                  value={formData.levelOneCommission}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter Level 1 commission"
                />
              </div>

              <div>
                <label className="block">Date of Drawing:</label>
                <input
                  type="date"
                  name="drawingDate"
                  value={formData.drawingDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#22405c] text-white p-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      <div className="sm:ml-64 p-4">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-center text-[#22405c]">
            Spin and Find a Random Person for Lucky Draw
          </h2>
          {mustSpin && (
            <div className="text-sm text-gray-500 mb-2">Spinning...</div>
          )}

          {!mustSpin && (
            <button
              onClick={async () => {
                const newPrize = Math.floor(Math.random() * users.length);
                setPrizeNumber(newPrize);
                setMustSpin(true);

                setTimeout(async () => {
                  setMustSpin(false);
                  try {
                    const res = await axios.get(
                      `/api/admin/lucky-draw/lucky-draw-winner/${type}`,
                      {
                        headers: {
                          Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                      }
                    );

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
          )}
          <p>Total Participants: {totalParticipants}</p>
          <p>Total Collected Amount: ${totalCollectedAmount || 0}</p>
          <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
            {users.map((user, index) => (
              <div
                key={index}
                className={`text-center py-2 px-3 rounded shadow transition-all duration-300 ${index === prizeNumber && !mustSpin
                  ? "bg-green-600 text-white font-bold"
                  : "bg-[#F6F1DE] text-black"
                  }`}
              >
                {user.name}
              </div>
            ))}
          </div>

          {/* {mustSpin && (
            <div className="text-sm text-gray-500 mb-2">Spinning...</div>
          )}

          {!mustSpin && (
            <button
              onClick={async () => {
                const newPrize = Math.floor(Math.random() * users.length);
                setPrizeNumber(newPrize);
                setMustSpin(true);

                setTimeout(async () => {
                  setMustSpin(false);
                  try {
                    const res = await axios.get(
                      `/api/admin/lucky-draw/lucky-draw-winner/${type}`,
                      {
                        headers: {
                          Authorization: `Bearer ${Cookies.get("token")}`,
                        },
                      }
                    );

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
          )} */}

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
                  className="mt-3 bg-[#22405c] text-white px-4 py-2 rounded"
                >
                  Add Deposit
                </button>

                <button
                  onClick={handleResetDraw}
                  className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded ml-2"
                >
                  Reset Draw
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
    </div>
  );
};

export default Page;
