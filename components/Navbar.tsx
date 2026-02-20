"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext"; // sesuaikan path

export default function Navbar() {
  const router = useRouter();
  const { profile } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: "Profile",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onClick: () => { router.push("/profile"); setDropdownOpen(false); },
    },
    {
      label: "Settings",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      onClick: () => { router.push("/settings"); setDropdownOpen(false); },
    },
    {
      label: "Logout",
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
      onClick: () => { router.push("/"); setDropdownOpen(false); },
      danger: true,
    },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <header
        className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
      >
        {/* Title + date */}
        <div>
          <h1
            className="text-lg text-gray-900 leading-none"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            My Tasks
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Bell */}
          <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition relative">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17H9m6 0a3 3 0 01-6 0m6 0H5.268A2 2 0 013.4 14.1l1.6-8A2 2 0 017 4h10a2 2 0 012 2v.5" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 border-2 border-white" />
          </button>

          {/* Avatar + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center text-white text-sm font-semibold hover:opacity-90 hover:ring-2 hover:ring-blue-200 transition"
            >
              {profile.name.charAt(0).toUpperCase()}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                {/* User info */}
                <div className="px-4 py-3.5 border-b border-gray-100">
                  <p
                    className="text-sm text-gray-800 truncate"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {profile.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{profile.email}</p>
                </div>

                {/* Menu items */}
                <div className="py-1.5">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={item.onClick}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition
                        ${item.danger
                          ? "text-red-400 hover:bg-red-50 hover:text-red-500"
                          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}