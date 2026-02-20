"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Task = {
    id: string;
    title: string;
    status: string;
};

export default function Sidebar({ tasks = [] }: { tasks: Task[] }) {
    const pathname = usePathname();

    const pending = tasks.filter((t) => t.status === "PENDING").length;
    const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
    const completed = tasks.filter((t) => t.status === "COMPLETED").length;

    const links = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
                </svg>
            ),
        },
        {
            href: "/tasks",
            label: "Tasks",
            icon: (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
        },
        {
            href: "/profile",
            label: "Profile",
            icon: (
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
    ];

    return (
        <aside className="w-[240px] bg-white border-r border-gray-100 flex flex-col min-h-screen shrink-0">
            {/* Logo */}
            <div className="px-6 py-5 border-b border-gray-50">
                <Link href="/dashboard" className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md shadow-blue-200">
                        <div className="grid grid-cols-2 gap-[3px]">
                            <div className="w-[6px] h-[6px] bg-white rounded-[2px]" />
                            <div className="w-[6px] h-[6px] bg-white rounded-[2px]" />
                            <div className="w-[6px] h-[6px] bg-white rounded-[2px]" />
                            <div className="w-[6px] h-[6px] bg-white rounded-[2px]" />
                        </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900 tracking-tight">
                        Daily<span className="text-blue-600">Plan</span>
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4">
                <p className="px-3 mb-2 text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium">
                    Menu
                </p>
                <div className="flex flex-col gap-1">
                    {links.map(({ href, label, icon }) => {
                        const active = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${active
                                        ? "bg-blue-50 text-blue-600 shadow-sm"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    }`}
                            >
                                <span className={active ? "text-blue-500" : "text-gray-400"}>{icon}</span>
                                {label}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Task Summary */}
            {tasks.length > 0 && (
                <div className="px-4 pb-4">
                    <div className="bg-gray-50 rounded-xl p-3.5">
                        <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400 font-medium mb-3">
                            Summary
                        </p>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Pending</span>
                                <span className="text-xs font-semibold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg">
                                    {pending}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">In Progress</span>
                                <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg">
                                    {inProgress}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Completed</span>
                                <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-0.5 rounded-lg">
                                    {completed}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
