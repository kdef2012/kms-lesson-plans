import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [user, setUser] = useState(null); // { role: 'teacher' | 'admin', pin: string }

  const handleLogin = (role, pin) => {
    setUser({ role, pin });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Konnoak Middle School - Mr. Nelson</h1>
        <h2>Lesson Plan Management System</h2>
      </header>
      
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to={user.role === 'teacher' ? "/teacher" : "/admin"} replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/teacher" 
            element={
              user?.role === 'teacher' ? (
                <TeacherDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/admin" 
            element={
              (user?.role === 'admin' || user?.role === 'teacher') ? (
                <AdminDashboard onLogout={handleLogout} pin={user.pin} role={user.role} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
