"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const API = "http://localhost:8080/api";

type Task = {
    id: string;
    title: string;
    status: string;
};

export default function ProfilePage() {
    const router = useRouter();

    const [userId, setUserId] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
    });
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);

    const [saved, setSaved] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [editing, setEditing] = useState(false);
    const [tempForm, setTempForm] = useState(form);

    // Fetch user profile & tasks from DB
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        setAuthChecked(true);

        // Load user from localStorage first (set by login)
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUserId(parsed.id || "");
                setForm({ name: parsed.name || "", email: parsed.email || "" });
                setTempForm({ name: parsed.name || "", email: parsed.email || "" });

                // Also fetch fresh data from API if we have the id
                if (parsed.id) {
                    fetch(`${API}/users/${parsed.id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            const user = data?.data || data;
                            if (user?.name) {
                                setForm({ name: user.name, email: user.email });
                                setTempForm({ name: user.name, email: user.email });
                            }
                        })
                        .catch(() => {});
                }
            } catch {
                // ignore parse errors
            }
        }

        // Fetch tasks for stats
        fetch(`${API}/tasks`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                const list = Array.isArray(data) ? data : data?.data || [];
                setTasks(list);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [router]);

    const handleEdit = () => { setTempForm(form); setEditing(true); setSaveError(""); };
    const handleCancel = () => { setTempForm(form); setEditing(false); setSaveError(""); };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token || !userId) return;
        setSaveError("");

        try {
            const res = await fetch(`${API}/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: tempForm.name,
                    email: tempForm.email,
                }),
            });
            const data = await res.json();
            if (data?.status === "error") {
                setSaveError(data.message || "Failed to save");
                return;
            }
            const updated = data?.data || tempForm;
            const newForm = { name: updated.name, email: updated.email };
            setForm(newForm);
            setTempForm(newForm);
            // Update localStorage so other pages stay in sync
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                localStorage.setItem("user", JSON.stringify({ ...parsed, name: newForm.name, email: newForm.email }));
            }
            setEditing(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            console.error("Failed to update profile:", err);
            setSaveError("Failed to connect to server");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    const fields = [
        {
            label: "Full Name",
            key: "name",
            type: "text",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            label: "Email",
            key: "email",
            type: "email",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
    ];

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "COMPLETED").length;
    const pendingTasks = tasks.filter((t) => t.status === "PENDING" || t.status === "IN_PROGRESS").length;

    const stats = [
        { label: "Total Tasks", value: String(totalTasks), textColor: "text-blue-600", bgColor: "bg-blue-50" },
        { label: "Completed", value: String(completedTasks), textColor: "text-green-600", bgColor: "bg-green-50" },
        { label: "Pending", value: String(pendingTasks), textColor: "text-amber-500", bgColor: "bg-amber-50" },
    ];

    return (
        authChecked ? (
        <div className="flex min-h-screen bg-[#f8fafd]">
            {/* SIDEBAR */}
            <Sidebar tasks={tasks} />

            {/* MAIN */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* NAVBAR */}
                <Navbar />

                {/* CONTENT */}
                <main className="flex-1 px-8 py-7">

                    {/* PAGE HEADER */}
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.12em] text-blue-500 font-medium mb-0.5">
                                Account
                            </p>
                            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 leading-tight">
                                My Profile
                            </h2>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Manage your personal information
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {editing ? (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-gray-500 border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 shadow-sm hover:opacity-90 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEdit}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* TOAST */}
                    {saved && (
                        <div className="flex items-center gap-2 px-4 py-3 mb-5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs animate-[fadeUp_0.3s_ease]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Profile saved successfully!
                        </div>
                    )}
                    {saveError && (
                        <div className="flex items-center gap-2 px-4 py-3 mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                            {saveError}
                        </div>
                    )}

                    {/* GRID */}
                    <div className="grid grid-cols-[220px_1fr] gap-5 items-start">

                        {/* ─── LEFT COLUMN ─── */}
                        <div className="flex flex-col gap-4">

                            {/* Profile Card */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                {/* Cover */}
                                <div className="h-20 bg-gradient-to-br from-blue-600 via-blue-400 to-indigo-400 relative">
                                    <div className="absolute inset-0 opacity-20"
                                        style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
                                    />
                                </div>

                                {/* Avatar + Info */}
                                <div className="flex flex-col items-center -mt-7 pb-5 px-4">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-xl font-semibold border-[3px] border-white shadow-md">
                                            {form.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
                                    </div>

                                    <p className="mt-2.5 text-sm font-semibold text-gray-800 tracking-tight">{form.name || "—"}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">{form.email}</p>
                                </div>
                            </div>

                            {/* Activity Card */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="px-4 py-3 border-b border-gray-50">
                                    <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">Activity</p>
                                </div>
                                <div className="divide-y divide-gray-50">
                                    {stats.map(({ label, value, textColor, bgColor }) => (
                                        <div key={label} className="flex items-center justify-between px-4 py-2.5">
                                            <span className="text-xs text-gray-500">{label}</span>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${textColor} ${bgColor}`}>
                                                {value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
                                <div className="px-4 py-3 border-b border-red-50">
                                    <p className="text-[10px] uppercase tracking-[0.12em] text-red-400 font-medium">Danger Zone</p>
                                </div>
                                <div className="p-3">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-red-200 text-red-400 text-xs hover:bg-red-50 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ─── RIGHT COLUMN ─── */}
                        <div className="flex flex-col gap-4">

                            {/* Personal Info */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                                    <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">Personal Information</p>
                                    {editing && (
                                        <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                                            Editing
                                        </span>
                                    )}
                                </div>
                                <div className="p-6 grid grid-cols-2 gap-4">
                                    {fields.map(({ label, key, type, icon }) => (
                                        <div key={key} className="flex flex-col gap-1.5">
                                            <label className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-medium">
                                                {label}
                                            </label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-3 pointer-events-none">{icon}</span>
                                                <input
                                                    type={type}
                                                    value={editing ? tempForm[key as keyof typeof tempForm] : form[key as keyof typeof form]}
                                                    disabled={!editing}
                                                    onChange={(e) => setTempForm({ ...tempForm, [key]: e.target.value })}
                                                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs transition-all duration-150 outline-none ${editing
                                                            ? "border border-blue-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-800"
                                                            : "border border-transparent bg-gray-50 text-gray-600 cursor-default"
                                                        }`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Preferences */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-50">
                                    <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">Preferences</p>
                                </div>
                                <div className="px-6 py-4 flex flex-col gap-4">
                                    <PreferenceToggle
                                        label="Email Notifications"
                                        hint="Receive daily summaries and reminders"
                                        defaultOn={true}
                                    />
                                    <PreferenceToggle
                                        label="Weekly Report"
                                        hint="Get a weekly progress digest every Sunday"
                                        defaultOn={false}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
        ) : (
            <div className="flex min-h-screen items-center justify-center bg-[#f8fafd]">
                <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
        )
    );
}

// ─── Toggle Component ───────────────────────────────────────────────
function PreferenceToggle({
    label,
    hint,
    defaultOn,
}: {
    label: string;
    hint: string;
    defaultOn: boolean;
}) {
    const [on, setOn] = useState(defaultOn);

    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <p className="text-xs font-medium text-gray-700">{label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{hint}</p>
            </div>
            <button
                onClick={() => setOn(!on)}
                className={`relative flex-shrink-0 w-9 h-5 rounded-full transition-colors duration-200 ${on ? "bg-gradient-to-r from-blue-600 to-blue-400" : "bg-gray-200"
                    }`}
            >
                <span
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${on ? "left-[18px]" : "left-0.5"
                        }`}
                />
            </button>
        </div>
    );
}