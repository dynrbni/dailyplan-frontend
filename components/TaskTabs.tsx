"use client";

type Props = {
activeTab: "active" | "completed";
setActiveTab: (v: "active" | "completed") => void;
};

export default function TaskTabs({ activeTab, setActiveTab }: Props) {
return (
<div className="flex gap-4 mb-6 border-b border-gray-200">
    <button
    onClick={() => setActiveTab("active")}
    className={`pb-2 text-sm font-medium transition ${
        activeTab === "active"
        ? "text-gray-800 border-b-2 border-gray-800"
        : "text-gray-400 hover:text-gray-600"
    }`}
    >
    Active Task
    </button>
    <button
    onClick={() => setActiveTab("completed")}
    className={`pb-2 text-sm font-medium transition ${
        activeTab === "completed"
        ? "text-gray-800 border-b-2 border-gray-800"
        : "text-gray-400 hover:text-gray-600"
    }`}
    >
    Completed
    </button>
</div>
);
} // TaskTabs.tsx