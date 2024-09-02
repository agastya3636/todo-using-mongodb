import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [editingTaskId, setEditingTaskId] = useState(null);

useEffect(() => {
  const fetchTasks = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/todos/',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };

    try {
      const response = await axios.request(config);
      
      setTasks(response.data.todo_list);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  fetchTasks();
}, []); 
  
  
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(''); 

  const formattedDueDate = new Date(dueDate).toISOString(); 
  const newTask = { title, description, status, dueDate: formattedDueDate, priority };

  try {
    if (editingTaskId) {
      const response = await axios.put(`http://localhost:8000/api/v1/todos/?id=${editingTaskId}`, newTask, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const newtask = tasks.map(task => task._id === editingTaskId ? response.data.todo : task);
      setTasks(newtask);
      setEditingTaskId(null);
    } else {
      const response = await axios.post('http://localhost:8000/api/v1/todos', newTask, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
   
      setTasks([...tasks, response.data.todo]);
    }
    setTitle('');
    setDescription('');
    setStatus('pending');
    setDueDate('');
    setPriority('Medium');
  } catch (error) {
    console.error('Error saving task:', error);
    setError('An error occurred while saving the task.');
  } finally {
    setIsLoading(false); 
  }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  




const handleRemove = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/v1/todos/?id=${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
      setTasks(tasks.filter(task => task._id !== id));
  } catch (error) {
    console.error('Error removing task:', error);
  }
};

const handleEdit = (index) => {
  const task = tasks[index];
  setTitle(task.title);
  setDescription(task.description);
  setStatus(task.status);
  setDueDate(new Date(task.dueDate).toISOString().split('T')[0]); 
  setPriority(task.priority);
  setEditingTaskId(task._id); 
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">{editingTaskId ? 'Edit Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            {editingTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
      <div className="w-full max-w-6xl p-8 mt-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Tasks</h2>
        <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-gray-600">Status: <span className={`font-semibold ${task.status === 'completed' ? 'text-green-500' : task.status === 'in-progress' ? 'text-yellow-500' : 'text-red-500'}`}>{task.status}</span></p>
              <p className="text-gray-600">Due Date: {new Date(task.dueDate).toISOString().split('T')[0]}</p>
              <p className="text-gray-600">Priority: <span className={`font-semibold ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>{task.priority}</span></p>
              <div className="flex justify-between mt-4">
                <button onClick={() => handleEdit(index)} className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">
                  Edit
                </button>
                <button onClick={() => handleRemove(task._id)} className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;