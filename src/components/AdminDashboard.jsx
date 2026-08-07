import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { LogOut, Calendar, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import LessonPlanViewer from './LessonPlanViewer';

const AdminDashboard = ({ onLogout, pin, role }) => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [groupedPlans, setGroupedPlans] = useState({});
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedWeeks, setExpandedWeeks] = useState({});

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const { data, error } = await supabase
      .from('lesson_plans')
      .select('*')
      .order('date_start', { ascending: true });
      
    if (!error && data) {
      setPlans(data);
      // Group by week_label
      const groups = data.reduce((acc, plan) => {
        if (!acc[plan.week_label]) acc[plan.week_label] = [];
        acc[plan.week_label].push(plan);
        return acc;
      }, {});
      setGroupedPlans(groups);
      
      // Expand the first week by default
      const weeks = Object.keys(groups);
      if (weeks.length > 0) {
        setExpandedWeeks({ [weeks[0]]: true });
        setSelectedPlan(groups[weeks[0]][0]);
      }
    }
  };

  const toggleWeek = (week) => {
    setExpandedWeeks(prev => ({ ...prev, [week]: !prev[week] }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Admin / Viewer Dashboard</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          {role === 'teacher' && (
            <button onClick={() => navigate('/teacher')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #008080, #004c4c)' }}>
              <ArrowLeft size={18} /> Back to Teacher View
            </button>
          )}
          <button onClick={onLogout} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px', alignItems: 'start' }}>
        {/* Accordion Sidebar */}
        <div className="glass" style={{ padding: '10px' }}>
          <h3 style={{ margin: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} /> Weeks
          </h3>
          
          {Object.keys(groupedPlans).length === 0 && (
            <p style={{ padding: '10px', color: '#666' }}>No lesson plans found.</p>
          )}

          {Object.keys(groupedPlans).map((week) => (
            <div key={week} className="accordion-item">
              <div 
                className="accordion-header" 
                onClick={() => toggleWeek(week)}
              >
                <span>{week}</span>
                {expandedWeeks[week] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </div>
              
              {expandedWeeks[week] && (
                <div className="accordion-content" style={{ padding: '0' }}>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {groupedPlans[week].map(plan => (
                      <li key={plan.id}>
                        <button 
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '12px 20px',
                            background: selectedPlan?.id === plan.id ? 'rgba(0,128,128,0.1)' : 'transparent',
                            border: 'none',
                            borderLeft: selectedPlan?.id === plan.id ? '4px solid var(--kms-teal)' : '4px solid transparent',
                            cursor: 'pointer',
                            fontWeight: selectedPlan?.id === plan.id ? 'bold' : 'normal',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => setSelectedPlan(plan)}
                        >
                          {format(parseISO(plan.date_start), 'EEEE (M/d)')} - {plan.topic || 'No Topic'}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lesson Plan Viewer */}
        <div className="glass" style={{ padding: '20px' }}>
          {selectedPlan ? (
            <LessonPlanViewer plan={selectedPlan} viewerPin={pin} />
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p>Select a date from the sidebar to view the lesson plan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
