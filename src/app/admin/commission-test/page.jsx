// "use client";
// import React, { useState, useEffect } from "react";
// import LinkingWithSidebar from "../components/LinkingWithSidebar";
// import Header from "../components/Header";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";

// function CommissionTestPage() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [selectedType, setSelectedType] = useState("registration");
//   const [testResult, setTestResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("/api/admin/users", {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("token")}`,
//         },
//       });
//       setUsers(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       toast.error("Failed to fetch users");
//     }
//   };

//   const testCommission = async () => {
//     if (!selectedUser) {
//       toast.error("Please select a user");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(`/api/test-commission?userId=${selectedUser}&type=${selectedType}`, {
//         headers: {
//           Authorization: `Bearer ${Cookies.get("token")}`,
//         },
//       });
//       setTestResult(response.data.data);
//       toast.success(`${selectedType} commission test completed`);
//     } catch (error) {
//       console.error("Error testing commission:", error);
//       toast.error("Failed to test commission");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTypeColor = (type) => {
//     switch (type) {
//       case 'registration': return 'bg-blue-500';
//       case 'activation': return 'bg-green-500';
//       case 'slot': return 'bg-purple-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getTypeLabel = (type) => {
//     switch (type) {
//       case 'registration': return 'Registration';
//       case 'activation': return 'Activation';
//       case 'slot': return 'Slot Purchase';
//       default: return type;
//     }
//   };

//   return (
//     <div className="flex">
//       <LinkingWithSidebar />
//       <div className="flex-1">
//         <Header />
//         <div className="p-6">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h1 className="text-2xl font-bold text-gray-900 mb-6">
//               Commission Distribution Test
//             </h1>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               {/* Test Controls */}
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Commission Type
//                   </label>
//                   <select
//                     value={selectedType}
//                     onChange={(e) => setSelectedType(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="registration">Registration Commission</option>
//                     <option value="activation">Activation Commission</option>
//                     <option value="slot">Slot Commission</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Select User to Test
//                   </label>
//                   <select
//                     value={selectedUser}
//                     onChange={(e) => setSelectedUser(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="">Choose a user...</option>
//                     {users.map((user) => (
//                       <option key={user._id} value={user._id}>
//                         {user.username} - {user.fname} {user.lname}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <button
//                   onClick={testCommission}
//                   disabled={loading || !selectedUser}
//                   className={`w-full text-white py-3 px-4 rounded-lg hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed ${getTypeColor(selectedType)}`}
//                 >
//                   {loading ? "Testing..." : `Test ${getTypeLabel(selectedType)} Commission`}
//                 </button>
//               </div>

//               {/* Results */}
//               {testResult && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Test Results - {getTypeLabel(testResult.type)}
//                   </h3>

//                   {/* User Info */}
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-medium text-gray-900 mb-2">User Information</h4>
//                     <p><strong>Username:</strong> {testResult.user.username}</p>
//                     <p><strong>Referrer ID:</strong> {testResult.user.referrerId || "None"}</p>
//                     <p><strong>Commission Type:</strong> {getTypeLabel(testResult.type)}</p>
//                   </div>

//                   {/* Settings */}
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-medium text-gray-900 mb-2">Commission Settings</h4>
//                     <p><strong>Price:</strong> ${testResult.settings.price}</p>
//                     <p><strong>Company %:</strong> {testResult.settings.companyPercent}%</p>
//                     <p><strong>Company Extra %:</strong> {testResult.settings.companyExtraPercent}%</p>
//                     <p><strong>Max Levels:</strong> {testResult.type === 'registration' ? '2' : '7'}</p>
//                   </div>

//                   {/* Calculations */}
//                   <div className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-medium text-gray-900 mb-2">Calculations</h4>
//                     <p><strong>Total Amount:</strong> ${testResult.calculations.totalAmount}</p>
//                     <p><strong>Company Amount:</strong> ${testResult.calculations.companyAmount}</p>
//                     <p><strong>Distributable:</strong> ${testResult.calculations.distributable}</p>
//                     <p><strong>Company Extra Amount:</strong> ${testResult.summary.companyExtraAmount}</p>
//                   </div>

//                   {/* Referral Chain */}
//                   {testResult.referralChain.length > 0 ? (
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="font-medium text-gray-900 mb-2">Referral Chain ({testResult.referralChain.length} levels)</h4>
//                       {testResult.referralChain.map((ref) => (
//                         <div key={ref.id} className="mb-2 p-2 bg-white rounded border">
//                           <p><strong>Level {ref.level}:</strong> {ref.username}</p>
//                           <p><strong>Registered:</strong> {ref.is_registered ? "Yes" : "No"}</p>
//                           <p><strong>Percentage:</strong> {ref.percentage}%</p>
//                           <p><strong>Would Receive:</strong> ${ref.wouldReceive}</p>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="font-medium text-gray-900 mb-2">Referral Chain</h4>
//                       <p className="text-gray-600">No referral chain found</p>
//                     </div>
//                   )}

//                   {/* Distribution Summary */}
//                   <div className="bg-blue-50 p-4 rounded-lg">
//                     <h4 className="font-medium text-gray-900 mb-2">Distribution Summary</h4>
//                     <p><strong>Total to Company:</strong> ${testResult.summary.totalToCompany}</p>
//                     <p><strong>Remaining to Company:</strong> ${testResult.summary.remainingToCompany}</p>
//                     <p><strong>Total Distributed:</strong> ${testResult.summary.totalDistributed}</p>
//                     <p><strong>Users Receiving Commission:</strong> {testResult.summary.distributedTo.length}</p>
//                     <p><strong>Referral Chain Length:</strong> {testResult.summary.referralChainLength}</p>
//                   </div>

//                   {/* Detailed Distribution */}
//                   {testResult.summary.distributedTo.length > 0 && (
//                     <div className="bg-green-50 p-4 rounded-lg">
//                       <h4 className="font-medium text-gray-900 mb-2">Users Receiving Commission</h4>
//                       {testResult.summary.distributedTo.map((dist) => (
//                         <div key={dist.level} className="mb-1 p-2 bg-white rounded border">
//                           <p><strong>Level {dist.level}:</strong> {dist.username} - ${dist.amount} ({dist.percentage}%)</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CommissionTestPage; 