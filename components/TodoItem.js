'use client';

import { useState } from 'react';

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleUpdate = () => {
    onUpdate(todo._id, { title, completed: todo.completed });
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(todo._id, { title: todo.title, completed: !todo.completed });
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow mr-4 p-2 border rounded"
        />
      ) : (
        <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </span>
      )}
      <div className="flex space-x-2">
        <button
          onClick={handleToggleComplete}
          className={`px-3 py-1 rounded ${
            todo.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {todo.completed ? 'Completed' : 'Complete'}
        </button>
        {isEditing ? (
          <button onClick={handleUpdate} className="px-3 py-1 bg-blue-500 text-white rounded">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-yellow-500 text-white rounded">
            Edit
          </button>
        )}
        <button onClick={() => onDelete(todo._id)} className="px-3 py-1 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </li>
  );
}