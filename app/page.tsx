"use client";

import { useState, useEffect } from "react";

const tasks = [
  { label: "Design new portfolio", time: "9:00 AM", done: true, color: "#a78bfa" },
  { label: "Review project brief", time: "10:30 AM", done: true, color: "#f472b6" },
  { label: "Team standup call", time: "12:00 PM", done: false, color: "#34d399" },
];

export default function Home() {
  const [checked, setChecked] = useState(tasks.map(t => t.done));
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const completed = checked.filter(Boolean).length;
  const progress = Math.round((completed / tasks.length) * 100);

  return (
    <div className="bg-slate-50 text-gray-900 min-h-screen font-sans">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur bg-white/80 border-b border-gray-200 px-10 py-4 flex justify-between items-center">
        <div className="font-serif text-3xl">DailyPlan</div>
        <div className="space-x-4 hidden md:flex">
          <a href="#about" className="text-gray-500 hover:text-gray-900">About</a>
          <a href="#features" className="text-gray-500 hover:text-gray-900">Features</a>
          <a href="#pricing" className="text-gray-500 hover:text-gray-900">Pricing</a>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2 rounded-full border">Login</button>
          <button className="px-5 py-2 rounded-full bg-blue-600 text-white">Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 text-center px-6">
        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm mb-6">
          ● Now available on all devices
        </span>

        <h1 className="font-serif text-6xl mb-6">
          Your day,<br />
          <span className="italic bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
            beautifully
          </span>{" "}
          planned
        </h1>

        <p className="text-gray-500 max-w-md mx-auto mb-8">
          A calm, focused space to organize your tasks and build habits.
        </p>

        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 text-white shadow-lg">
          Start for free
        </button>

        {/* CARD */}
        {mounted && (
          <div className="max-w-md mx-auto mt-16">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Today's Plan</span>
                <span>{new Date().toDateString()}</span>
              </div>

              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>{completed} of {tasks.length} completed</span>
                <span className="text-blue-600">{progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-1 mb-4">
                <div
                  className="h-1 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {tasks.map((task, i) => (
                <div
                  key={i}
                  onClick={() =>
                    setChecked(prev => prev.map((v, j) => j === i ? !v : v))
                  }
                  className="flex items-center gap-3 py-2 border-b last:border-none cursor-pointer hover:opacity-80"
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      checked[i] ? "bg-current text-white" : ""
                    }`}
                    style={{ color: task.color, borderColor: task.color }}
                  >
                    {checked[i] && "✓"}
                  </div>

                  <span className={`flex-1 ${checked[i] ? "line-through text-gray-400" : ""}`}>
                    {task.label}
                  </span>

                  <span className="text-xs text-gray-400">{task.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}