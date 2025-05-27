import React, { useState } from 'react';

const users = [
  { name: 'Alice', email: 'alice@example.com', isRegistered: true, isActivated: true, balance: 1500, slot: 'Slot1' },
  { name: 'Bob', email: 'bob@example.com', isRegistered: false, isActivated: false, balance: 0, slot: 'Slot2' },
  { name: 'Charlie', email: 'charlie@example.com', isRegistered: true, isActivated: false, balance: 300, slot: 'Slot3' },
  { name: 'David', email: 'david@example.com', isRegistered: true, isActivated: true, balance: 500, slot: 'Slot4' },
  { name: 'Eve', email: 'eve@example.com', isRegistered: false, isActivated: true, balance: 1200, slot: 'Slot5' },
  { name: 'Frank', email: 'frank@example.com', isRegistered: true, isActivated: true, balance: 800, slot: 'Slot6' },
];

const Spinner = () => {
  const [angle, setAngle] = useState(0);
  const [winnerDetails, setWinnerDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleSpinClick = () => {
    const selected = Math.floor(Math.random() * users.length);
    const rotate = 360 * 5 + selected * (360 / users.length); // rotate multiple rounds + target
    setAngle(rotate);
    setTimeout(() => {
      setWinnerDetails(users[selected]);
      setShowModal(true);
    }, 3000); // match with animation duration
  };

  const closeModal = () => setShowModal(false);
  const closeModalAmount = () => {
    setIsOpen(false);
    setAmount("");
  };

  const handleSubmit = () => {
    if (!amount) return alert("Please enter an amount.");
    console.log("Deposited Amount:", amount);
    closeModalAmount();
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-6">
      <div className="relative w-64 h-64 rounded-full border-4 border-[#22405c] flex items-center justify-center">
        <div
          className="absolute w-full h-full transition-transform duration-[3s] ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          {users.map((user, index) => (
            <div
              key={user.name}
              className="absolute left-1/2 top-1/2 origin-top rotate-[0deg] text-xs font-semibold"
              style={{
                transform: `rotate(${(360 / users.length) * index}deg) translateY(-120px)`,
              }}
            >
              {user.name}
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-4 h-4 bg-red-500 rounded-full z-10"></div>
      </div>

      <button
        onClick={handleSpinClick}
        className="bg-[#22405c] text-white px-6 py-2 rounded"
      >
        Spin
      </button>

      {showModal && winnerDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                onClick={() => setIsOpen(true)}
              >
                Add Deposit
              </button>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-[#22405c] text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
                className="bg-[#22405c] text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spinner;
