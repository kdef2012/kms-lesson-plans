import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, BookOpen, PlusCircle, Eye, MessageSquare } from 'lucide-react';
import ViewerPinManager from './ViewerPinManager';
import LessonPlanForm from './LessonPlanForm';
import FeedbackInbox from './FeedbackInbox';

const TeacherDashboard = ({ onLogout, teacherName }) => {
  const [activeTab, setActiveTab] = useState('create'); // 'create', 'manage'
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>{teacherName ? `Welcome, ${teacherName}` : 'Teacher Dashboard'}</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/admin')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #008080, #004c4c)' }}>
            <Eye size={18} /> Admin View
          </button>
          <button onClick={onLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <button 
          className={activeTab === 'create' ? 'btn-primary' : 'btn-secondary'} 
          style={{ opacity: activeTab === 'create' ? 1 : 0.7 }}
          onClick={() => setActiveTab('create')}
        >
          <PlusCircle size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Create Lesson Plan
        </button>
        <button 
          className={activeTab === 'inbox' ? 'btn-primary' : 'btn-secondary'} 
          style={{ opacity: activeTab === 'inbox' ? 1 : 0.7 }}
          onClick={() => setActiveTab('inbox')}
        >
          <MessageSquare size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Feedback Inbox
        </button>
        <button 
          className={activeTab === 'manage' ? 'btn-primary' : 'btn-secondary'} 
          style={{ opacity: activeTab === 'manage' ? 1 : 0.7 }}
          onClick={() => setActiveTab('manage')}
        >
          <BookOpen size={18} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
          Manage Settings & Viewers
        </button>
      </div>

      {activeTab === 'manage' && (
        <ViewerPinManager />
      )}

      {activeTab === 'create' && (
        <LessonPlanForm />
      )}
      
      {activeTab === 'inbox' && (
        <FeedbackInbox />
      )}
    </div>
  );
};

export default TeacherDashboard;
