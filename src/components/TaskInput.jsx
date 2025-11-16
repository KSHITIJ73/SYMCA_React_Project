import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function TaskInput() {
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (!taskTitle.trim() || !auth.currentUser) {
      alert("Please enter a task");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "users", auth.currentUser.uid, "tasks"), {
        title: taskTitle,
        completed: false,
        createdAt: serverTimestamp()
      });
      setTaskTitle("");
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="What do you want to do today?"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddTask}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
    </div>
  );
}