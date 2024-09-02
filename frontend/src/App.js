import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Tasks from './components/Tasks';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
};

export default App;