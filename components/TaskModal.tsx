"use client";

import { useState, useEffect } from "react";
import { Task } from "../types/task";

const COLORS = [
"bg-blue-100",
"bg-purple-100",
"bg-yellow-100",
"bg-pink-100",
"bg-green-100",
];

type Props = {
show: boolean;
onClose: () => void;
onSave: (task: Task) => void;
editTask: Task | null;
};

export default function TaskModal({
show,
onClose,
onSave,
editTask,
}: Props) {
const [form, setForm] = useState({
title: "",
description: "",
priority: "LOW" as "LOW" | "MEDIUM" | "HIGH",
status: "PENDING" as "PENDING" | "DONE",
dueDate: "",
color: COLORS[0],
});

useEffect(() => {
if (editTask) {
    setForm({
    title: editTask.title,
    description: editTask.description,
    priority: editTask.priority,
    status: editTask.status,
    dueDate: editTask.dueDate,
    color: editTask.color,
    });
}
}, [editTask]);

if (!show) return null;

const handleSave = () => {
if (!form.title.trim()) return;

onSave({
    id: editTask ? editTask.id : Date.now(),
    ...form,
});

onClose();
};

return (
<div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
    <h2 className="text-lg font-semibold mb-5">
        {editTask ? "Edit Task" : "Add New Task"}
    </h2>

    <div className="space-y-4">
        {/* TITLE */}
        <div>
        <label className="text-xs text-gray-500 mb-1 block">
            Task Title
        </label>
        <input
            type="text"
            placeholder="Enter task title"
            value={form.title}
            onChange={(e) =>
            setForm({ ...form, title: e.target.value })
            }
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
        />
        </div>

        {/* DESCRIPTION */}
        <div>
        <label className="text-xs text-gray-500 mb-1 block">
            Description
        </label>
        <textarea
            placeholder="Optional description"
            value={form.description}
            onChange={(e) =>
            setForm({ ...form, description: e.target.value })
            }
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-blue-200 outline-none"
        />
        </div>

        {/* PRIORITY */}
        <div>
        <label className="text-xs text-gray-500 mb-1 block">
            Priority Level
        </label>
        <select
            value={form.priority}
            onChange={(e) =>
            setForm({
                ...form,
                priority: e.target.value as any,
            })
            }
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
        </select>
        </div>

        {/* STATUS */}
        <div>
        <label className="text-xs text-gray-500 mb-1 block">
            Task Status
        </label>
        <select
            value={form.status}
            onChange={(e) =>
            setForm({
                ...form,
                status: e.target.value as any,
            })
            }
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
            <option value="PENDING">Pending</option>
            <option value="DONE">Completed</option>
        </select>
        </div>

        {/* DUE DATE */}
        <div>
        <label className="text-xs text-gray-500 mb-1 block">
            Due Date 
        </label>
        <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
            }
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
        </div>

        {/* COLOR PICKER */}
        <div>
        <label className="text-xs text-gray-500 mb-2 block">
            Card Color
        </label>
        <div className="flex gap-2">
            {COLORS.map((c) => (
            <button
                key={c}
                type="button"
                onClick={() =>
                setForm({ ...form, color: c })
                }
                className={`w-7 h-7 rounded-full ${c} border-2 transition ${
                form.color === c
                    ? "border-gray-600 scale-110"
                    : "border-transparent"
                }`}
            />
            ))}
        </div>
        </div>
    </div>

    <div className="flex gap-2 mt-6">
        <button
        onClick={onClose}
        className="flex-1 border border-gray-200 rounded-lg py-2 text-sm"
        >
        Cancel
        </button>
        <button
        onClick={handleSave}
        className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm"
        >
        Save Task
        </button>
    </div>
    </div>
</div>
);
} // TaskModal.tsx