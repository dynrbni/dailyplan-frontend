"use client";

import { useState } from "react";
import { Task } from "../types/task";
import { MoreHorizontal } from "lucide-react";

type Props = {
task: Task;
onToggle: (id: number) => void;
onDelete: (id: number) => void;
onEdit: (task: Task) => void;
};

export default function TaskCard({
task,
onToggle,
onDelete,
onEdit,
}: Props) {
const [openMenu, setOpenMenu] = useState(false);

return (
<div
    onClick={() => onEdit(task)}
    className={`relative p-4 rounded-xl shadow-sm cursor-pointer transition hover:shadow-md ${task.color}`}
>
    {/* HEADER */}
    <div className="flex justify-between items-start">
    <div className="flex items-center gap-2">
        <input
        type="checkbox"
        checked={task.status === "COMPLETED"}
        onClick={(e) => e.stopPropagation()}
        onChange={() => onToggle(task.id)}
        />

        <h3
        className={`font-semibold text-sm ${
            task.status === "COMPLETED"
            ? "line-through text-gray-400"
            : ""
        }`}
        >
        {task.title}
        </h3>
    </div>

    {/* THREE DOT BUTTON */}
    <div className="relative">
        <button
        onClick={(e) => {
            e.stopPropagation();
            setOpenMenu(!openMenu);
        }}
        className="p-1 hover:bg-black/10 rounded-md"
        >
        <MoreHorizontal size={16} />
        </button>

        {/* DROPDOWN */}
        {openMenu && (
        <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-lg border border-gray-100 z-10"
        >
            <button
            onClick={() => {
                onDelete(task.id);
                setOpenMenu(false);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600 rounded-lg"
            >
            Delete
            </button>
        </div>
        )}
    </div>
    </div>

    {/* DESCRIPTION */}
    {task.description && (
    <p className="text-xs text-gray-600 mt-2">
        {task.description}
    </p>
    )}

    {/* FOOTER */}
    <div className="flex justify-between items-center mt-3 text-xs">
    <span className="px-2 py-1 bg-white/60 rounded-md">
        {task.priority}
    </span>

    <span className="text-gray-500">
        {task.dueDate}
    </span>
    </div>
</div>
);
} // TaskCard.tsx