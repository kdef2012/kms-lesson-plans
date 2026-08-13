import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MessageSquare, Send, Download, Image as ImageIcon, AlertTriangle, CheckCircle2, Printer, Play } from 'lucide-react';
import { format } from 'date-fns';

const LessonPlanViewer = ({ plan, viewerPin, adminName }) => {
  const [comments, setComments] = useState({}); // Grouped by section
  const [activeCommentSection, setActiveCommentSection] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showPresentation, setShowPresentation] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrintWorksheet = () => {
    const printWindow = window.open('', '_blank');
    
    let exemplarsHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      exemplarsHTML = plan.structured_exemplars.map((ex, i) => `
        <div style="margin-bottom: 30px;">
          <p style="font-size: 18px;"><strong>${i + 1}.</strong> ${ex.question}</p>
          <div style="border: 1px solid #aaa; height: 150px; margin-top: 10px; border-radius: 4px;"></div>
        </div>
      `).join('');
    }

    const html = `
      <html>
        <head>
          <title>${plan.topic} - Worksheet</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; line-height: 1.6; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #2d3748; padding-bottom: 15px; margin-bottom: 30px; font-size: 18px; }
            h2 { text-align: center; color: #2d3748; margin-bottom: 40px; }
            h3 { color: #4a5568; margin-top: 30px; }
            .box { border: 1px solid #aaa; height: 120px; margin-bottom: 30px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div><strong>Name:</strong> _________________________________</div>
            <div><strong>Date:</strong> ____________________</div>
          </div>
          <h2>${plan.topic}</h2>
          
          ${plan.do_now ? `
            <h3>Warm Up (Do Now)</h3>
            <p style="font-size: 18px;">${plan.do_now}</p>
            <div class="box"></div>
          ` : ''}

          <h3>Practice Problems</h3>
          ${exemplarsHTML || '<div class="box"></div><div class="box"></div>'}
          
          ${plan.exit_ticket ? `
            <h3>Exit Ticket</h3>
            <p style="font-size: 18px;">${plan.exit_ticket}</p>
            <div class="box"></div>
          ` : ''}
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 250);
  };

  useEffect(() => {
    if (plan) {
      fetchComments();
      setActiveCommentSection(null);
    }
  }, [plan]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('lesson_plan_id', plan.id)
      .order('created_at', { ascending: true });
      
    if (!error && data) {
      const grouped = data.reduce((acc, c) => {
        if (!acc[c.section]) acc[c.section] = [];
        acc[c.section].push(c);
        return acc;
      }, {});
      setComments(grouped);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !activeCommentSection) return;
    setLoading(true);

    const { error } = await supabase
      .from('comments')
      .insert([{
        lesson_plan_id: plan.id,
        section: activeCommentSection,
        comment: newComment,
        author_pin: viewerPin,
        author_name: adminName || null
      }]);

    if (!error) {
      setNewComment('');
      fetchComments();
    }
    setLoading(false);
  };

  const Section = ({ title, content, id, children }) => {
    const sectionComments = comments[id] || [];
    
    return (
      <div 
        style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          backgroundColor: '#fafafa', 
          borderRadius: '8px',
          borderLeft: '4px solid var(--kms-purple)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: activeCommentSection === id ? '0 0 0 2px var(--kms-teal)' : 'none'
        }}
        onClick={() => setActiveCommentSection(id)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h4 style={{ margin: 0, color: 'var(--kms-purple-dark)' }}>{title}</h4>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: sectionComments.length > 0 ? 'var(--kms-teal)' : '#aaa' }}>
            <MessageSquare size={14} /> {sectionComments.length}
          </span>
        </div>
        
        {content && <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{content}</p>}
        {(!content && !children) && <em style={{ color: '#999' }}>Not provided</em>}
        {children}
        
        {/* Comments Panel for this Section */}
        {activeCommentSection === id && (
          <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #ddd' }} onClick={e => e.stopPropagation()}>
            <h5 style={{ margin: '0 0 10px 0', color: '#555' }}>Comments</h5>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
              {sectionComments.map(c => (
                <div key={c.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
                    <strong>{c.author_name || `Admin (PIN: ${c.author_pin})`}</strong> - {format(new Date(c.created_at), 'MMM d, h:mm a')}
                  </div>
                  <div style={{ fontSize: '14px' }}>{c.comment}</div>
                </div>
              ))}
              {sectionComments.length === 0 && <p style={{ fontSize: '12px', color: '#999' }}>No comments yet.</p>}
            </div>
            
            <form onSubmit={submitComment} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Add a comment..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                style={{ padding: '8px' }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '8px 15px' }} disabled={loading || !newComment.trim()}>
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    );
  };

  if (showPresentation) {
    const slides = [
      { title: plan.topic, content: `Objective: ${plan.objective_3m}\n\nStandard: ${plan.standard}` },
      { title: "Do Now", content: plan.do_now },
      { title: "Direct Instruction", content: plan.direct_instruction },
      { title: "Group Practice", content: plan.group_practice },
      ...(plan.structured_exemplars || []).map((ex, i) => ({
        title: `Practice Problem ${i + 1}`,
        content: ex.question
      })),
      { title: "Exit Ticket", content: plan.exit_ticket }
    ].filter(s => s.content && s.content.trim() !== '');

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#fff', zIndex: 99999, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: 'var(--bg-primary)' }}>
          <h1 style={{ fontSize: '4rem', color: 'var(--kms-purple-dark)', marginBottom: '40px', maxWidth: '80%' }}>{slides[currentSlide].title}</h1>
          <p style={{ fontSize: '2.5rem', whiteSpace: 'pre-wrap', color: 'var(--text-primary)', maxWidth: '80%', lineHeight: '1.5' }}>{slides[currentSlide].content}</p>
        </div>
        <div style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', backgroundColor: 'var(--bg-secondary)', borderTop: '2px solid var(--glass-border)' }}>
          <button className="btn-secondary" onClick={() => { setShowPresentation(false); setCurrentSlide(0); }}>Exit Presentation</button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="btn" onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} disabled={currentSlide === 0} style={{ marginRight: '15px' }}>Previous</button>
            <span style={{ fontSize: '1.2rem', margin: '0 20px', fontWeight: 'bold' }}>{currentSlide + 1} / {slides.length}</span>
            <button className="btn" onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))} disabled={currentSlide === slides.length - 1}>Next</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: '0 0 5px 0', color: 'var(--kms-purple-dark)' }}>{plan.topic}</h2>
          <p style={{ margin: 0, color: '#666' }}>Date: <strong>{format(new Date(plan.date_start), 'MMMM d, yyyy')}</strong> | Week: <strong>{plan.week_label}</strong></p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setShowPresentation(true)} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--kms-purple)', color: 'white' }}>
            <Play size={18} /> Present
          </button>
          <button onClick={handlePrintWorksheet} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Printer size={18} /> Worksheet
          </button>
          {plan.pdf_url && (
            <a href={plan.pdf_url} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <Download size={18} /> PDF
            </a>
          )}
        </div>
      </div>

      <p style={{ fontStyle: 'italic', color: '#666', marginBottom: '20px', fontSize: '14px' }}>
        Click on any section to view or add comments.
      </p>

      <Section id="objective_3m" title="3M Objective" content={plan.objective_3m} />
      <Section id="standard" title="Standard" content={plan.standard} />
      <Section id="do_now" title="Do Now (Spiral Topics)" content={plan.do_now} />
      <Section id="direct_instruction" title="Direct Instruction (Launch)" content={plan.direct_instruction} />
      <Section id="group_practice" title="Group Practice" content={plan.group_practice} />
      
      {/* Advanced Exemplar Section */}
      <Section id="independent_practice" title="Independent Practice (Exemplar)">
        {plan.exemplar_image_url && (
          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ margin: '0 0 10px 0', color: '#555', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ImageIcon size={16} /> Handwritten Exemplar
            </h5>
            <a href={plan.exemplar_image_url} target="_blank" rel="noopener noreferrer">
              <img 
                src={plan.exemplar_image_url} 
                alt="Handwritten Exemplar" 
                style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid #ddd' }} 
              />
            </a>
          </div>
        )}
        
        {plan.structured_exemplars && plan.structured_exemplars.length > 0 ? (
          <div>
            <h5 style={{ margin: '0 0 15px 0', color: '#555' }}>Structured Problem Breakdown</h5>
            {plan.structured_exemplars.map((ex, idx) => (
              <div key={idx} style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: 'var(--kms-purple)', color: 'white', padding: '10px 15px', fontWeight: 'bold' }}>
                  Problem {idx + 1}: {ex.question}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#fff' }}>
                  <div style={{ flex: '1 1 50%', padding: '15px', borderRight: '1px solid #eee' }}>
                    <div style={{ color: 'var(--kms-teal-dark)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                      <CheckCircle2 size={16} /> Correct Process / Answer
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.correct_answer}</div>
                  </div>
                  <div style={{ flex: '1 1 50%', padding: '15px', backgroundColor: '#fff5f5' }}>
                    <div style={{ color: '#d32f2f', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                      <AlertTriangle size={16} /> Anticipated Misconception & Intervention
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>{ex.misconception}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{plan.independent_practice}</p>
        )}
      </Section>
      
      <Section id="criteria_for_success" title="Criteria for Success" content={plan.criteria_for_success} />
      <Section id="exit_ticket" title="Exit Ticket" content={plan.exit_ticket} />

      {/* Legacy check to avoid errors if not defined in older data */}
      {plan.checks_for_understanding && plan.checks_for_understanding.length > 0 && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fafafa', borderRadius: '8px', borderLeft: '4px solid var(--kms-teal)' }}>
          <h4 style={{ margin: '0 0 10px 0', color: 'var(--kms-purple-dark)' }}>Checks for Understanding</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--kms-teal-light)' }}>
                <th style={{ padding: '8px 0', width: '50%' }}>CFU</th>
                <th style={{ padding: '8px 0' }}>Method/DOK</th>
              </tr>
            </thead>
            <tbody>
              {plan.checks_for_understanding.map((cfu, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px 0' }}>{cfu.cfu}</td>
                  <td style={{ padding: '8px 0' }}>{cfu.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default LessonPlanViewer;
