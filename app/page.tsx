"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-[2px]">
                <div className="w-[5px] h-[5px] bg-white rounded-[1.5px]" />
                <div className="w-[5px] h-[5px] bg-white rounded-[1.5px]" />
                <div className="w-[5px] h-[5px] bg-white rounded-[1.5px]" />
                <div className="w-[5px] h-[5px] bg-white rounded-[1.5px]" />
              </div>
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              Daily<span className="text-blue-600">Plan</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            Simple task management for everyone
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Plan your day.
            <br />
            <span className="text-blue-600">Get things done.</span>
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
            DailyPlan helps you organize tasks, track progress, and stay
            productive. No clutter, no complexity — just focus.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href={isLoggedIn ? "/dashboard" : "/register"}
              className="px-7 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-sm"
            >
              {isLoggedIn ? "Open Dashboard" : "Start for Free"}
            </Link>
            <Link
              href="#features"
              className="px-7 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition text-sm"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#f8fafd] rounded-2xl border border-gray-200 shadow-xl overflow-hidden p-1">
            <div className="bg-white rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-gray-400">DailyPlan — Dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total Tasks", value: "12", color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Completed", value: "8", color: "text-green-600", bg: "bg-green-50" },
                  { label: "In Progress", value: "4", color: "text-amber-500", bg: "bg-amber-50" },
                ].map(({ label, value, color, bg }) => (
                  <div key={label} className="rounded-xl border border-gray-100 p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center ${color} text-sm font-bold`}>
                      {value}
                    </div>
                    <span className="text-xs text-gray-500">{label}</span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: "67%" }} />
              </div>
              <p className="text-[11px] text-gray-400">8 of 12 tasks completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20 bg-[#f8fafd]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-medium text-blue-600 uppercase tracking-widest mb-2">
              Features
            </p>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Everything you need to stay on track
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Task Management",
                desc: "Create, edit, and organize tasks with priorities and due dates.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "Progress Tracking",
                desc: "See your completion rate and stay motivated with visual progress.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                title: "Priority System",
                desc: "Set urgency levels to focus on what matters most, when it matters.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map(({ title, desc, icon }) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
            Ready to get organized?
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Join DailyPlan and start managing your tasks the smarter way. Free to use, no credit card required.
          </p>
          <Link
            href={isLoggedIn ? "/dashboard" : "/register"}
            className="inline-flex px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-sm"
          >
            {isLoggedIn ? "Go to Dashboard" : "Get Started — It's Free"}
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-[1.5px]">
                <div className="w-[4px] h-[4px] bg-white rounded-[1px]" />
                <div className="w-[4px] h-[4px] bg-white rounded-[1px]" />
                <div className="w-[4px] h-[4px] bg-white rounded-[1px]" />
                <div className="w-[4px] h-[4px] bg-white rounded-[1px]" />
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-700">DailyPlan</span>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DailyPlan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
