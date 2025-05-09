// 'use client'

// import axios from 'axios';
// import React, { useState } from 'react'

// const SettingPage = () => {
//   const [ currentPassword, setCurrentPassword ] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [loading , setLoading] = useState(false);
//   const [message , setMessage] = useState('')

//   const handleSubmit = async (e:React.FormEvent) =>{
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');
//     try{
//       const res = await axios.put("http://localhost:5001/api/account/change-password",{currentPassword,newPassword},
//         {withCredentials:true}
//       )
//       setMessage(res.data.message)
//     }catch(err:any){
//       setMessage(err.response?.data?.message || "somethig went worng")
//     }
//     finally{
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded">
//     <h2 className="text-xl font-semibold mb-4">Change Password</h2>
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label>Current Password</label>
//         <input
//           type="password"
//           className="w-full p-2 border"
//           value={currentPassword}
//           onChange={(e) => setCurrentPassword(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>New Password</label>
//         <input
//           type="password"
//           className="w-full p-2 border"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//       </div>
//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         {loading ? "Changing..." : "Change Password"}
//       </button>
//     </form>
//     {message && <p className="mt-4 text-center text-red-600">{message}</p>}
//   </div>

//   )
// }

// export default SettingPage










// app/settings/page.tsx
"use client";
import React, { useState } from "react";
import ChangePasswordForm from '../../Components/changepwd/changePasswordForm'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("changePassword");

  return (
    <div className="max-w-xl mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4 mt-16">Account Settings</h1>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "changePassword" ? "bg-[#611f69] text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("changePassword")}
        >
          Change Password
        </button>
        {/* Add more tabs/buttons here */}
      </div>

      {activeTab === "changePassword" && <ChangePasswordForm />}
    </div>
  );
}
