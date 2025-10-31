import React from "react";
import { Trash2, Edit2, Check, X, Circle, CheckCircle2 } from "lucide-react";

export default function TaskItem({
  task,
  editingId,
  editText,
  setEditText,
  startEdit,
  saveEdit,
  cancelEdit,
  deleteTask,
  toggleComplete,
}) {
  const isEditing = editingId === task.id;

  return (
    <div className="bg-white p-4 rounded shadow-sm flex items-center gap-3">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={() => saveEdit(task.id)} className="text-green-600">
            <Check />
          </button>
          <button onClick={cancelEdit} className="text-gray-400">
            <X />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => toggleComplete(task.id)}
            className="text-gray-500"
          >
            {task.completed ? (
              <CheckCircle2 className="text-green-600" />
            ) : (
              <Circle />
            )}
          </button>
          <div className="flex-1">
            <p
              className={`text-lg ${
                task.completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.text}
            </p>
          </div>
          <button onClick={() => startEdit(task)} className="text-blue-500">
            <Edit2 />
          </button>
          <button onClick={() => deleteTask(task.id)} className="text-red-500">
            <Trash2 />
          </button>
        </>
      )}
    </div>
  );
}
