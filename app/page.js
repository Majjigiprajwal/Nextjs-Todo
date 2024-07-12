'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get('/api/todos');
    setTodos(res.data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await axios.post('/api/todos', { title: newTodo });
    setNewTodo('');
    fetchTodos();
  };

  const updateTodo = async (id, updates) => {
    await axios.put(`/api/todos/${id}`, updates);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    fetchTodos();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Todo App</h1>
          <form onSubmit={addTodo} className="mb-8">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded">
              Add Todo
            </button>
          </form>
          <div className="mb-4 flex justify-center space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Completed
            </button>
          </div>
          <ul>
            {filteredTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} onUpdate={updateTodo} onDelete={deleteTodo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}