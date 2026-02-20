"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const API = process.env.NEXT_PUBLIC_API_URL || "https://api.dynrbni.biz.id/api";

type Task = {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    dueDate?: string;
};

function EmptyState({ tab }: { tab: "active" | "completed" }) {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 text-blue-300 text-2xl select-none">
                {tab === "active" ? "✦" : "◈"}
            </div>
            <p
                className="text-xl text-gray-700 mb-1 font-medium"
            >
                {tab === "active" ? "No active tasks" : "Nothing completed yet"}
            </p>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                {tab === "active"
                    ? "Add your first task and start planning your day with intention."
                    : "Complete a task to see it show up here."}
            </p>
        </div>
    );
}

export default function TasksPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
    const [showModal, setShowModal] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
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

    // Fetch tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const res = await fetch(`${API}/tasks`, {
                    headers: { Authorization: `Bearer ${token}` },
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

    const filtered = tasks
        .filter((t) =>
            activeTab === "active"
                ? t.status === "PENDING" || t.status === "IN_PROGRESS"
                : t.status === "COMPLETED"
        )
        .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

    // Create / Update task via API
    const saveTask = async (task: Task) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            if (editTask) {
                const res = await fetch(`${API}/tasks/${task.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
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
                setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
            } else {
                const res = await fetch(`${API}/tasks/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
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

    // Toggle status via API
    const toggle = async (id: string) => {
        const token = localStorage.getItem("token");
        if (!token) return;
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        const newStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";
        try {
            await fetch(`${API}/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            setTasks((prev) =>
                prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
            );
        } catch (err) {
            console.error("Failed to toggle task:", err);
        }
    };

    // Delete task via API
    const deleteTask = async (id: string) => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            await fetch(`${API}/tasks/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error("Failed to delete task:", err);
        }
    };

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

                        {/* TOP BAR — date + search + add */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between mb-6">

                            {/* Date */}
                            <button className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition">
                                <span
                                    className="text-base font-medium"
                                >
                                    {new Date().toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Search + Add */}
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <circle cx="11" cy="11" r="7" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Search tasks…"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 w-52 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition placeholder:text-gray-300"
                                    />
                                </div>

                                <button
                                    onClick={() => { setEditTask(null); setShowModal(true); }}
                                    className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 hover:opacity-90 hover:-translate-y-px transition-all shadow-md shadow-blue-200"
                                >
                                    <span className="text-base leading-none">+</span>
                                    Add New Task
                                </button>
                            </div>
                        </div>

                        {/* TABS */}
                        <div className="flex items-center gap-1 mb-6">
                            {(["active", "completed"] as const).map((tab) => {
                                const count = tasks.filter((t) =>
                                    tab === "active"
                                        ? t.status === "PENDING" || t.status === "IN_PROGRESS"
                                        : t.status === "COMPLETED"
                                ).length;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2
                      ${activeTab === tab
                                                ? "bg-white text-blue-600 border border-gray-100 shadow-sm"
                                                : "text-gray-400 hover:text-gray-600"
                                            }`}
                                    >
                                        <span className="capitalize">
                                            {tab === "active" ? "Active" : "Completed"}
                                        </span>
                                        {count > 0 && (
                                            <span
                                                className={`text-xs px-1.5 py-0.5 rounded-full
                          ${activeTab === tab
                                                        ? "bg-blue-50 text-blue-500"
                                                        : "bg-gray-100 text-gray-400"
                                                    }`}
                                            >
                                                {count}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* TASK GRID */}
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filtered.length === 0 ? (
                                    <EmptyState tab={activeTab} />
                                ) : (
                                    filtered.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onToggle={toggle}
                                            onDelete={deleteTask}
                                            onEdit={(t) => {
                                                setEditTask(t);
                                                setShowModal(true);
                                            }}
                                        />
                                    ))
                                )}
                            </div>
                        )}
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