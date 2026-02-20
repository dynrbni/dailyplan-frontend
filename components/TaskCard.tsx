"use client";

type Task = {
    id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    dueDate?: string;
};

const priorityColors: Record<string, { bg: string; text: string; label: string }> = {
    LOW: { bg: "bg-gray-100", text: "text-gray-500", label: "Low" },
    MEDIUM: { bg: "bg-blue-50", text: "text-blue-600", label: "Medium" },
    HIGH: { bg: "bg-orange-50", text: "text-orange-600", label: "High" },
    URGENT: { bg: "bg-red-50", text: "text-red-600", label: "Urgent" },
};

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    PENDING: { bg: "bg-amber-50", text: "text-amber-600", label: "Pending" },
    IN_PROGRESS: { bg: "bg-blue-50", text: "text-blue-600", label: "In Progress" },
    COMPLETED: { bg: "bg-green-50", text: "text-green-600", label: "Completed" },
    CANCELLED: { bg: "bg-gray-100", text: "text-gray-500", label: "Cancelled" },
};

export default function TaskCard({
    task,
    onToggle,
    onDelete,
    onEdit,
}: {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}) {
    const isCompleted = task.status === "COMPLETED";
    const priority = priorityColors[task.priority || "MEDIUM"];
    const status = statusColors[task.status] || statusColors.PENDING;

    return (
        <div
            className={`group bg-white rounded-2xl border shadow-sm p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${isCompleted ? "border-green-100 opacity-75" : "border-gray-100"
                }`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${priority.bg} ${priority.text}`}>
                        {priority.label}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
                        {status.label}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-blue-500 transition-colors"
                        title="Edit"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Title */}
            <h3
                className={`text-sm font-semibold mb-1.5 ${isCompleted ? "line-through text-gray-400" : "text-gray-800"
                    }`}
            >
                {task.title}
            </h3>

            {/* Description */}
            {task.description && (
                <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                    {task.description}
                </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                {task.dueDate && (
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                )}

                <button
                    onClick={() => onToggle(task.id)}
                    className={`ml-auto flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all ${isCompleted
                            ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                >
                    {isCompleted ? (
                        <>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            Reopen
                        </>
                    ) : (
                        <>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Complete
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
