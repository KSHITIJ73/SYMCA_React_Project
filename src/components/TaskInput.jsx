import React from "react";
import { Plus } from "lucide-react";

export default function TaskInput({ newTask, setNewTask, addTask }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6 flex gap-3">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        placeholder="What needs to be done?"
        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={addTask}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <Plus size={18} /> Add
      </button>
    </div>
  );
}
