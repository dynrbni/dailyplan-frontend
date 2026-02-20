"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.dynrbni.biz.id/api";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  dueDate?: string;
};

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const t = localStorage.getItem("token");
      if (!t) return;
      try {
        const res = await fetch(`${API}/tasks`, {
          headers: { Authorization: `Bearer ${t}` },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setTasks(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setTasks(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Stats
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;
  const pending = tasks.filter((t) => t.status === "PENDING").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Recent tasks (last 6)
  const recentTasks = [...tasks].reverse().slice(0, 6);

  // Create / Update task
  const saveTask = async (task: Task) => {
    const t = localStorage.getItem("token");
    if (!t) return;

    try {
      if (editTask) {
        // Update
        const res = await fetch(`${API}/tasks/${task.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`,
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
          }),
        });
        const data = await res.json();
        const updated = data?.data || task;
        setTasks((prev) => prev.map((x) => (x.id === task.id ? updated : x)));
      } else {
        // Create
        const res = await fetch(`${API}/tasks/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${t}`,
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
          }),
        });
        const data = await res.json();
        const created = data?.data || task;
        setTasks((prev) => [...prev, created]);
      }
    } catch (err) {
      console.error("Failed to save task:", err);
    }

    setShowModal(false);
    setEditTask(null);
  };

  // Toggle status
  const toggleTask = async (id: string) => {
    const t = localStorage.getItem("token");
    if (!t) return;
    const task = tasks.find((x) => x.id === id);
    if (!task) return;

    const newStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";
    try {
      await fetch(`${API}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${t}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      setTasks((prev) =>
        prev.map((x) => (x.id === id ? { ...x, status: newStatus } : x))
      );
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    const t = localStorage.getItem("token");
    if (!t) return;
    try {
      await fetch(`${API}/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${t}` },
      });
      setTasks((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      label: "Completed",
      value: completed,
      color: "text-green-600",
      bg: "bg-green-50",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: pending,
      color: "text-amber-500",
      bg: "bg-amber-50",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "In Progress",
      value: inProgress,
      color: "text-purple-600",
      bg: "bg-purple-50",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    authChecked ? (
      <div className="flex min-h-screen bg-[#f8fafd]">
        {/* SIDEBAR */}
        <Sidebar tasks={tasks} />

        {/* MAIN AREA */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* NAVBAR */}
          <Navbar />

          {/* CONTENT */}
          <main className="flex-1 px-8 py-7">
            {/* PAGE HEADER */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-blue-500 font-medium mb-0.5">
                  Overview
                </p>
                <h2
                  className="text-2xl tracking-tight text-gray-900 leading-tight font-semibold"
                >
                  Dashboard
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <button
                onClick={() => {
                  setEditTask(null);
                  setShowModal(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-1.5 hover:opacity-90 hover:-translate-y-px transition-all shadow-md shadow-blue-200"
              >
                <span className="text-base leading-none">+</span>
                Add New Task
              </button>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {stats.map(({ label, value, color, bg, icon }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center ${color}`}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-800">{value}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* PROGRESS BAR */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">Overall Progress</p>
                <span className="text-sm font-semibold text-blue-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                {completed} of {total} tasks completed
              </p>
            </div>

            {/* RECENT TASKS */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-0.5">
                    Recent Activity
                  </p>
                  <h3
                    className="text-lg text-gray-800 font-semibold"
                  >
                    Your Tasks
                  </h3>
                </div>
                <a
                  href="/tasks"
                  className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
                >
                  View All →
                </a>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                </div>
              ) : recentTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 text-blue-300 text-2xl select-none">
                    ✦
                  </div>
                  <p
                    className="text-xl text-gray-700 mb-1 font-medium"
                  >
                    No tasks yet
                  </p>
                  <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                    Click &quot;Add New Task&quot; to start planning your day.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onEdit={(t) => {
                        setEditTask(t);
                        setShowModal(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>

        {/* MODAL */}
        <TaskModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={saveTask}
          editTask={editTask}
        />
      </div>
    ) : (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafd]">
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    )
  );
}