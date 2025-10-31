import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterTabs from "./components/FilterTabs";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  // Load from local storage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));
  const toggleComplete = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };
  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: editText } : t)));
    setEditingId(null);
    setEditText("");
  };

  const filteredTasks = tasks.filter((t) =>
    filter === "active" ? !t.completed : filter === "completed" ? t.completed : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          TaskFlow
        </h1>
        <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
        <FilterTabs filter={filter} setFilter={setFilter} />
        <TaskList
          tasks={filteredTasks}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
        <p className="text-center text-gray-500 mt-8 text-sm">
          TaskFlow v1.0 — Simple Task Manager
        </p>
      </div>
    </div>
  );
}
