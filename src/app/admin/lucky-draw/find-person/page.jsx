'use client'
import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import Header from "@/app/admin/components/header/Header";
import SideBar from "@/app/admin/components/sidebar/SideBar";
import { Wheel } from 'react-custom-roulette';

const users = [
    { name: 'Alice', email: 'alice@example.com', isRegistered: true, isActivated: true, balance: 1500, slot: 'Slot1' },
    { name: 'Bob', email: 'bob@example.com', isRegistered: false, isActivated: false, balance: 0, slot: 'Slot2' },
    { name: 'Charlie', email: 'charlie@example.com', isRegistered: true, isActivated: false, balance: 300, slot: 'Slot3' },
    { name: 'David', email: 'david@example.com', isRegistered: true, isActivated: true, balance: 500, slot: 'Slot4' },
    { name: 'Eve', email: 'eve@example.com', isRegistered: false, isActivated: true, balance: 1200, slot: 'Slot5' },
    { name: 'Frank', email: 'frank@example.com', isRegistered: true, isActivated: true, balance: 800, slot: 'Slot6' },
];

const Page = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [showModal, setShowModal] = useState(false); // Modal for winner details
    const [winnerDetails, setWinnerDetails] = useState(null); // Store winner's details
    const [isOpen, setIsOpen] = useState(false); // Modal for deposit
    const [amount, setAmount] = useState(""); // Deposit amount
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const buttonRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [cardLoading, setCardLoading] = useState(null);
    const [isClose, setisClose] = useState(false);

    const handleCardClick = (type) => {
        setCardLoading(type);

    }
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

    // useEffect(() => {
    //     document.addEventListener("click", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }
    }, []);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * users.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

    const closeModal = () => setShowModal(false);
    const closeModalAmount = () => {
        setIsOpen(false);
        setAmount(""); // Reset field on close
    };

    const handleSubmit = () => {
        if (!amount) return alert("Please enter an amount.");
        console.log("Deposited Amount:", amount);
        closeModalAmount();
    };
    const section = "Lucky Draw"
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
                    <p className="text-[12px] md:text-xl md:font-semibold ml-4 md:ml-64 lg:ml-64 p-5">
                        Lucky Draw
                    </p>

                    {/* Header component */}
                    <div className="ml-auto">
                        <Header appear={true} />
                    </div>
                </div>
                <aside
                    ref={sidebarRef}
                    id="separator-sidebar"
                    className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } sm:translate-x-0`}
                    aria-label="Sidebar"
                >
                    <SideBar section={section} />
                </aside>
            </div>
            <div className="sm:ml-64">
                <div className='p-2 bg-white'>
                    <div className="flex flex-col items-center gap-4 mt-3">
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={users.map((user) => ({ option: user.name }))}
                            backgroundColors={['#22405c', '#F6F1DE']}
                            textColors={['#ffffff', '#000000']} // White on dark, Black on light
                            onStopSpinning={() => {
                                setMustSpin(false);
                                setWinnerDetails(users[prizeNumber]);
                                setShowModal(true); // Show modal when spin stops
                            }}
                        />

                        <button
                            onClick={handleSpinClick}
                            className="bg-[#22405c] text-white px-4 py-2 rounded mt-4"
                        >
                            Spin
                        </button>

                        {/* Winner Details Modal */}
                        {showModal && winnerDetails && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                                    <h2 className="text-xl font-semibold mb-4">Winner Details</h2>
                                    <div className="space-y-2">
                                        <p><strong>Name:</strong> {winnerDetails.name}</p>
                                        <p><strong>Email:</strong> {winnerDetails.email}</p>
                                        <p><strong>Registered:</strong> {winnerDetails.isRegistered ? 'Yes' : 'No'}</p>
                                        <p><strong>Activated:</strong> {winnerDetails.isActivated ? 'Yes' : 'No'}</p>
                                        <p><strong>Balance:</strong> ${winnerDetails.balance}</p>
                                        <p><strong>Slot:</strong> {winnerDetails.slot}</p>
                                        <button
                                            className="bg-[#22405c] text-white px-4 py-2 rounded mt-4"
                                            onClick={() => setIsOpen(true)} // Open deposit modal
                                        >
                                            Add Deposit
                                        </button>
                                    </div>
                                    <Link href="../../../admin/lucky-draw">
                                        <button
                                            onClick={closeModal}
                                            className="mt-4 bg-[#22405c] text-white px-4 py-2 rounded"
                                        >
                                            Close
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Deposit Amount Modal */}
                        {isOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex justify-center items-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                    <h2 className="text-xl font-semibold mb-4 text-center">Enter Amount</h2>
                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full border border-gray-300 p-2 rounded mb-4"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="bg-[#F6F1DE] px-4 py-2 rounded"
                                            onClick={closeModalAmount}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-[#22405c] text-white px-4 py-2 rounded "
                                            onClick={handleSubmit}
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
        </div>

    );
};

export default Page;

// import dynamic from 'next/dynamic';

// const LuckyDrawClient = dynamic(() => import('./LuckyDrawClient'), {
//     ssr: false,
// });

// export default function Page() {
//     return <LuckyDrawClient />;
// }
