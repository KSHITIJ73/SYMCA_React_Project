import { db, auth } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(collection(db, "users", auth.currentUser.uid, "tasks"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksList);
    });

    return () => unsubscribe();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Tasks</h2>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "pending"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Pending ({tasks.length - completedCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "completed"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No tasks yet! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}