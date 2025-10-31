import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  editingId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  cancelEdit,
  deleteTask,
  toggleComplete,
}) {
  if (tasks.length === 0)
    return (
      <div className="text-center text-gray-400 bg-white p-6 rounded shadow">
        No tasks yet — add one above!
      </div>
    );

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}
