import { db, auth } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState } from "react";

export default function TaskItem({ task }) {
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid, "tasks", task.id), {
        completed: !task.completed
      });
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleDeleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "tasks", task.id));
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className={`flex items-center gap-3 p-4 rounded-lg border transition ${
      task.completed
        ? "bg-gray-50 border-gray-200"
        : "bg-white border-indigo-200 hover:border-indigo-400"
    }`}>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
        disabled={loading}
        className="w-5 h-5 text-indigo-600 rounded cursor-pointer"
      />

      {/* Task Text */}
      <span
        className={`flex-1 text-lg ${
          task.completed
            ? "line-through text-gray-400"
            : "text-gray-800"
        }`}
      >
        {task.title}
      </span>

      {/* Delete Button */}
      <button
        onClick={handleDeleteTask}
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold transition disabled:opacity-50"
      >
        {loading ? "..." : "Delete"}
      </button>
    </div>
  );
}