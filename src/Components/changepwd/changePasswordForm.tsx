// components/ChangePasswordForm.tsx
"use client";
import { useState } from "react";
import axios from "axios";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:5001/api/account/change-password", {
        currentPassword,
        newPassword,
      },
      {
        withCredentials: true, 
      }
    );

      setMessage(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-[#611f69] text-white py-2 px-4 rounded hover:bg-violet-700"
      >
        Change Password
      </button>
      {message && <p className="text-sm text-center">{message}</p>}
    </form>
  );
};

export default ChangePasswordForm;
