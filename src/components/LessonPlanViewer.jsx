import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { MessageSquare, Send, Download, Image as ImageIcon, AlertTriangle, CheckCircle2, Printer, Play } from 'lucide-react';
import { format } from 'date-fns';

const LessonPlanViewer = ({ plan, viewerPin, adminName }) => {
  const [comments, setComments] = useState({}); // Grouped by section
  const [activeCommentSection, setActiveCommentSection] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handlePresent = () => {
    const presentWindow = window.open('', '_blank');
    
    // Helper to generate the essential question
    const getEssentialQuestion = (obj) => {
      if (!obj) return "What is the core concept of today's lesson?";
      let eq = obj.toLowerCase();
      if (eq.startsWith('students will ')) {
        eq = eq.substring(14);
      }
      return "How can we " + eq + "?";
    };

    // Consolidate practice problems into chunks of 5
    const problemsSlides = [];
    if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      for (let i = 0; i < plan.structured_exemplars.length; i += 5) {
        const chunk = plan.structured_exemplars.slice(i, i + 5);
        const chunkHTML = `<div class="problems-grid">\n` + 
          chunk.map(ex => `  <div class="problem-box">**${ex.question}**</div>\n`).join('') + 
          `</div>\n\n**Expectations:**\n- Start Immediately\n- Work Silently and Independently\n- Cellphones Free Zone\n- 100% Engaged. ALL STUDENTS WORKING!!\n\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>`;
        problemsSlides.push({ title: "11. Independent Practice", content: chunkHTML });
      }
    } else {
      problemsSlides.push({ 
        title: "11. Independent Practice", 
        content: `**Directions:**\n${plan.independent_practice || 'Complete assigned problems.'}\n\n**Expectations:**\n- Start Immediately\n- Work Silently and Independently\n- Cellphones Free Zone\n- 100% Engaged. ALL STUDENTS WORKING!!\n\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>`
      });
    }

    // Process Direct Instruction into multiple slides if --- is present
    const diSlides = [];
    if (plan.direct_instruction) {
      const parts = plan.direct_instruction.split(/(?:\r?\n)?---(?:\r?\n)?/);
      parts.forEach((part, idx) => {
        if (part.trim()) {
          diSlides.push({
            title: parts.length > 1 ? `6. Direct Instruction / Launch (Part ${idx + 1})` : "6. Direct Instruction / Launch",
            content: part.trim() + `\n\n<div class="timer" onclick="startTimer(this, 10)">10:00</div>`
          });
        }
      });
    }

    const cfuText = plan.checks_for_understanding && plan.checks_for_understanding.length > 0 
      ? plan.checks_for_understanding[0].cfu 
      : 'Turn and talk to your neighbor about the core concept we just discussed.';

    const baseSlides = [
      { title: plan.topic, content: `## Welcome to Class!\n\nGet ready to start.` },
      { 
        title: "1. Spired Do Now", 
        content: `**Directions:**\n${plan.do_now || ''}\n\n**Expectations:**\n- Enter classroom SILENTLY\n- Start IMMEDIATELY\n- Work SILENTLY and INDEPENDENTLY\n- Cell phone Free Zone\n- 100% Engaged ALL STUDENTS WORKING!!\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>` 
      },
      { 
        title: "2. Classroom Expectations", 
        content: `- No Cellphones\n- Drop pencils when completed\n- Communicate with respect\n- Raise your hand` 
      },
      { 
        title: "3. Today @ A Glance", 
        content: `**SWBAT (Objective):**\n${plan.objective_3m || ''}\n\n**Essential question of the day:**\n${getEssentialQuestion(plan.objective_3m)}\n\n**Agenda**\n- Do Now - completed\n- Notes - Direct Instruction\n- Guided & Group Practice: We Do\n- Independent Practice\n- Exit Ticket` 
      },
      { 
        title: "4. Future Planning Forward", 
        content: `Use this time to have students document their homework, upcoming assignments/quizzes, test, etc.\n\n*Upcoming:* _______________________` 
      },
      { 
        title: "5. Student Shout out", 
        content: `*Recognize students for their accomplishments (academic, behavior, extracurricular, etc.)*\n\n**Today's Shout Outs:**\n- \n- ` 
      },
      ...diSlides,
      { 
        title: "7. Formative Assessment #1", 
        content: `**Check for understanding:**\n${cfuText}\n\n<div class="timer" onclick="startTimer(this, 2)">2:00</div>` 
      },
      { 
        title: "8. Guided Practice / Monitor", 
        content: `- Guided Practice = Students should have at least 2 opportunities to practice with the teacher before being released.\n- Monitor students data and output.\n- Scaffolded practice` 
      },
      { 
        title: "10. Group Practice", 
        content: `**Directions:**\n${plan.group_practice || ''}\n\n**Expectations:**\n- Start IMMEDIATELY\n- Work silently & independently OR voice level 1 in pairs (6 inches)\n- Actively participate, collaborate and contribute\n- Be prepared to share out\n- Cell Phone Free Zone\n- 100% Engaged ALL STUDENTS WORKING!!\n\n<div class="timer" onclick="startTimer(this, 10)">10:00</div>` 
      },
      ...problemsSlides,
      { 
        title: "13. Exit Ticket (Formative Assessment #3)", 
        content: `**Directions:**\n${plan.exit_ticket || ''}\n\n**Expectations:**\n- Start IMMEDIATELY\n- Work SILENTLY and INDEPENDENTLY\n- Cell phone Free Zone\n- 100% Engaged ALL STUDENTS WORKING!\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>` 
      }
    ];

    const slidesJSON = JSON.stringify(baseSlides).replace(/</g, '\\u003c');

    const html = `
      <html>
        <head>
          <title>Presentation: ${plan.topic}</title>
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
          <style>
            body { 
              margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              background-color: #f8fafc; color: #1e293b; overflow: hidden;
            }
            .slide-container {
              display: flex; flex-direction: column; justify-content: center; align-items: center;
              height: 100vh; padding: 40px 100px; box-sizing: border-box; overflow-y: auto;
            }
            h1 { font-size: 4vw; color: #00e676; margin-bottom: 20px; text-align: center; text-transform: uppercase; font-weight: bold; letter-spacing: 2px;}
            .content-wrapper { width: 100%; max-width: 1400px; }
            .content { font-size: 2.2vw; line-height: 1.6; }
            .content p { margin-bottom: 20px; }
            .content ul, .content ol { margin-top: 10px; margin-bottom: 20px; padding-left: 40px; }
            .content li { margin-bottom: 15px; }
            .content strong { color: #334155; }
            
            /* Practice Problems Grid */
            .problems-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px; margin-bottom: 20px;}
            .problem-box { 
              border: 2px solid #cbd5e1; padding: 20px; border-radius: 12px; 
              background: #fff; text-align: center; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              display: flex; align-items: center; justify-content: center; min-height: 100px;
            }
            .problem-box p { margin: 0; }
            
            .controls {
              position: fixed; bottom: 0; width: 100%; display: flex; justify-content: space-between;
              background: #fff; border-top: 1px solid #e2e8f0; padding: 15px 40px; box-sizing: border-box;
            }
            button {
              padding: 12px 24px; font-size: 18px; border: none; background: #e0e7ff; color: #4338ca; 
              border-radius: 8px; cursor: pointer; font-weight: bold; transition: background 0.2s;
            }
            button:hover:not(:disabled) { background: #c7d2fe; }
            button:disabled { background: #f1f5f9; color: #94a3b8; cursor: not-allowed; }
            .progress { font-size: 20px; font-weight: bold; padding-top: 10px; color: #64748b; }

            /* Timer Styles */
            .timer {
              display: inline-block;
              background: linear-gradient(135deg, #f59e0b, #d97706);
              color: white;
              font-size: 4vw;
              font-weight: bold;
              padding: 10px 40px;
              border-radius: 12px;
              cursor: pointer;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
              margin-top: 20px;
              transition: transform 0.1s;
              text-align: center;
              border: 4px solid #fff;
            }
            .timer:active { transform: scale(0.95); }
            .timer-container { text-align: center; width: 100%; }
          </style>
        </head>
        <body tabindex="0">
          <div id="slide-content" class="slide-container"></div>
          <div class="controls">
            <button id="prevBtn" onclick="prevSlide()">Previous</button>
            <div id="progress" class="progress"></div>
            <button id="nextBtn" onclick="nextSlide()">Next</button>
          </div>
          <script>
            const slides = ${slidesJSON};
            let current = 0;
            let activeTimer = null;
            
            marked.setOptions({ breaks: true });
            
            function renderSlide() {
              if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
              const currentSlide = slides[current];
              let parsedContent = marked.parse(currentSlide.content);
              
              // Wrap timer in a centered container if it exists
              parsedContent = parsedContent.replace(/<div class="timer"/g, '<div class="timer-container"><div class="timer"');
              parsedContent = parsedContent.replace(/<\/div><\/p>/g, '</div></div></p>'); // Fix marked p tag wrapping

              document.getElementById('slide-content').innerHTML = \`
                <div class="content-wrapper">
                  <h1>\${currentSlide.title}</h1>
                  <div class="content">\${parsedContent}</div>
                </div>
              \`;
              document.getElementById('progress').innerText = (current + 1) + ' / ' + slides.length;
              document.getElementById('prevBtn').disabled = current === 0;
              document.getElementById('nextBtn').disabled = current === slides.length - 1;
            }

            function startTimer(el, minutes) {
              if (el.dataset.running) return;
              el.dataset.running = "true";
              let time = minutes * 60;
              
              if (activeTimer) clearInterval(activeTimer);
              
              activeTimer = setInterval(() => {
                time--;
                let m = Math.floor(time / 60);
                let s = time % 60;
                el.innerText = m + ":" + (s < 10 ? "0" : "") + s;
                if (time <= 0) {
                  clearInterval(activeTimer);
                  el.style.background = "linear-gradient(135deg, #ef4444, #b91c1c)";
                  el.innerText = "TIME'S UP!";
                }
              }, 1000);
            }

            function nextSlide() {
              if (current < slides.length - 1) {
                current++;
                renderSlide();
              }
            }

            function prevSlide() {
              if (current > 0) {
                current--;
                renderSlide();
              }
            }

            document.addEventListener('keydown', (e) => {
              if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) {
                e.preventDefault(); 
                nextSlide();
              } else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(e.key)) {
                e.preventDefault(); 
                prevSlide();
              } else if (e.key === 'b' || e.key === '.') {
                 // Black screen toggle for clicker
                 const body = document.body;
                 body.style.backgroundColor = body.style.backgroundColor === 'black' ? '#f8fafc' : 'black';
                 document.getElementById('slide-content').style.display = body.style.backgroundColor === 'black' ? 'none' : 'flex';
                 document.querySelector('.controls').style.display = body.style.backgroundColor === 'black' ? 'none' : 'flex';
              }
            });

            window.focus();
            document.body.focus();
            
            document.documentElement.requestFullscreen().catch(e => console.log('Fullscreen rejected.'));
            renderSlide();
          </script>
        </body>
      </html>
    `;
    presentWindow.document.write(html);
    presentWindow.document.close();
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: '0 0 5px 0', color: 'var(--kms-purple-dark)' }}>{plan.topic}</h2>
          <p style={{ margin: 0, color: '#666' }}>Date: <strong>{format(new Date(plan.date_start), 'MMMM d, yyyy')}</strong> | Week: <strong>{plan.week_label}</strong></p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handlePresent} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--kms-purple)', color: 'white' }}>
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
