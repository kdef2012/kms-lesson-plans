import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MessageSquare, ArrowRight, X } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import LessonPlanViewer from './LessonPlanViewer';

const FeedbackInbox = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    // Fetch comments and join with lesson_plans to get the topic and date
    const { data, error } = await supabase
      .from('comments')
      .select('*, lesson_plans (id, date_start, topic, week_label, objective_3m, standard, do_now, direct_instruction, group_practice, independent_practice, criteria_for_success, exit_ticket, checks_for_understanding, pdf_url)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setComments(data);
    }
    setLoading(false);
  };

  const openLessonPlan = (plan) => {
    setSelectedPlan(plan);
    setSelectedPlanId(plan.id);
  };

  const closeLessonPlan = () => {
    setSelectedPlan(null);
    setSelectedPlanId(null);
  };

  if (selectedPlan) {
    return (
      <div style={{ position: 'relative' }}>
        <button 
          onClick={closeLessonPlan} 
          className="btn-secondary" 
          style={{ position: 'absolute', top: '0', right: '0', zIndex: 10, display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <X size={18} /> Close Lesson Plan
        </button>
        <LessonPlanViewer plan={selectedPlan} viewerPin="Teacher" />
      </div>
    );
  }

  return (
    <div className="glass" style={{ padding: '30px' }}>
      <h3 style={{ marginTop: 0, color: 'var(--kms-purple-dark)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <MessageSquare size={24} /> Admin Feedback Inbox
      </h3>
      
      {loading ? (
        <p>Loading feedback...</p>
      ) : comments.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>No feedback or comments from admins yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {comments.map(comment => (
            <div key={comment.id} style={{ 
              padding: '15px', 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              borderLeft: '4px solid var(--kms-teal)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>
                  <strong>{format(parseISO(comment.lesson_plans.date_start), 'MMM d, yyyy')}</strong> - {comment.lesson_plans.topic}
                </div>
                <div style={{ fontWeight: 'bold', color: 'var(--kms-purple)', marginBottom: '5px' }}>
                  Section: {comment.section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
                <div style={{ color: '#333', fontSize: '15px' }}>
                  "{comment.comment}"
                </div>
                <div style={{ fontSize: '11px', color: '#aaa', marginTop: '5px' }}>
                  Left by Admin PIN: {comment.author_pin} on {format(new Date(comment.created_at), 'MMM d, h:mm a')}
                </div>
              </div>
              
              <button 
                onClick={() => openLessonPlan(comment.lesson_plans)}
                className="btn-secondary"
                style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}
              >
                View Plan <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackInbox;
