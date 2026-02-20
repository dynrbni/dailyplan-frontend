"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
};

type Props = {
  tasks: Task[];
};

export default function Sidebar({ tasks }: Props) {
  const [todoOpen, setTodoOpen] = useState(true);
  const [teamOpen, setTeamOpen] = useState(true);

  const teamMates = ["Dean", "Putra", "Rafael", "Sulthon", "Damay", "Elmira"];

  const total     = tasks.length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;
  const progress  = total ? Math.round((completed / total) * 100) : 0;

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <aside
        className="w-60 min-h-screen bg-white border-r border-gray-100 flex flex-col py-6 px-4 shrink-0"
        style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
      >
        {/* Logo */}
        <div className="px-2 mb-8">
          <span
            className="text-2xl tracking-tight text-gray-900"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Daily<span className="text-blue-600">Plan</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 flex-1">

          {/* Overview */}
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition text-left">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Overview
          </button>

          {/* Team Mates */}
          <button
            onClick={() => setTeamOpen(!teamOpen)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition w-full mt-1"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Team Mates
            </div>
            <svg
              className={`w-3.5 h-3.5 text-gray-300 transition-transform ${teamOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {teamOpen && (
            <div className="ml-4 flex flex-col gap-0.5 border-l border-gray-100 pl-3 mb-1">
              {teamMates.map((name) => (
                <button
                  key={name}
                  className="text-sm text-gray-400 hover:text-gray-600 py-1 text-left transition flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 inline-flex items-center justify-center text-white text-[10px] shrink-0">
                    {name.charAt(0)}
                  </span>
                  {name}
                </button>
              ))}
            </div>
          )}

          {/* Todo List */}
          <button
            onClick={() => setTodoOpen(!todoOpen)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 transition w-full"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Todo List
            </div>
            <svg
              className={`w-3.5 h-3.5 text-blue-300 transition-transform ${todoOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {todoOpen && (
            <div className="ml-4 flex flex-col gap-0.5 border-l border-blue-100 pl-3">
              {tasks.length === 0 ? (
                <span className="text-xs text-gray-300 py-1">No tasks yet</span>
              ) : (
                tasks.map((task) => (
                  <button
                    key={task.id}
                    className="text-sm text-gray-400 hover:text-gray-600 py-1 text-left truncate transition flex items-center gap-1.5"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${task.status === "COMPLETED" ? "bg-blue-300" : "bg-gray-300"}`} />
                    {task.title}
                  </button>
                ))
              )}
            </div>
          )}
        </nav>

        {/* Progress card — bottom */}
        <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-100 px-4 py-4">
          <p className="text-xs font-medium text-blue-600 mb-1">Today&apos;s Progress</p>
          <div className="flex items-end justify-between mb-2">
            <span
              className="text-3xl text-gray-900 leading-none"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {progress}<span className="text-lg text-blue-500">%</span>
            </span>
            <span className="text-xs text-gray-400">{completed}/{total} done</span>
          </div>
          <div className="w-full h-1.5 bg-blue-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}