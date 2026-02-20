"use client";

import { useState, useEffect } from "react";

type Task = {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    dueDate?: string;
};

export default function TaskModal({
    show,
    onClose,
    onSave,
    editTask,
}: {
    show: boolean;
    onClose: () => void;
    onSave: (task: Task) => void;
    editTask: Task | null;
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (editTask) {
            setTitle(editTask.title);
            setDescription(editTask.description || "");
            setPriority(editTask.priority || "MEDIUM");
            setDueDate(editTask.dueDate ? editTask.dueDate.split("T")[0] : "");
        } else {
            setTitle("");
            setDescription("");
            setPriority("MEDIUM");
            setDueDate("");
        }
    }, [editTask, show]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSave({
            id: editTask?.id || "",
            title: title.trim(),
            description: description.trim() || undefined,
            status: editTask?.status || "PENDING",
            priority,
            dueDate: dueDate || undefined,
        });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-[scaleIn_0.2s_ease]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.12em] text-blue-500 font-medium">
                            {editTask ? "Edit Task" : "New Task"}
                        </p>
                        <h3 className="text-lg font-semibold text-gray-800 mt-0.5">
                            {editTask ? "Update your task" : "Add a new task"}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-medium mb-1.5 block">
                            Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What do you need to do?"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder:text-gray-300"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-medium mb-1.5 block">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Add details about this task…"
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition resize-none placeholder:text-gray-300"
                        />
                    </div>

                    {/* Priority + Due Date */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-medium mb-1.5 block">
                                Priority
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition bg-white"
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                                <option value="URGENT">Urgent</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-[11px] uppercase tracking-[0.1em] text-gray-400 font-medium mb-1.5 block">
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-medium shadow-md shadow-blue-200 hover:opacity-90 hover:-translate-y-px transition-all"
                        >
                            {editTask ? "Save Changes" : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
