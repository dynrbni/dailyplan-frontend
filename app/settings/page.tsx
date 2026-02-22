"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    alert("Feature not available yet (UI only)");
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafd]">
      {/* Sidebar */}
      <Sidebar tasks={[]} />

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />

        <main className="flex-1 px-8 py-7">
          {/* Header */}
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-[0.12em] text-blue-500 font-medium">
              Settings
            </p>
            <h2 className="text-2xl font-semibold text-gray-900">
              Change Password
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              This feature is available for beta version only (UI only).
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-md">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="text-[11px] text-gray-400">
                ⚠️ This feature is in beta. Password change is not connected to backend yet.
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-all shadow-md shadow-blue-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}