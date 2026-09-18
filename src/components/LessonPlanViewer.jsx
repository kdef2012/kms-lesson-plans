import React, { useState, useEffect } from 'react';

const STANDARD_MAP = {
  '8.G.1': 'NC.8.G.1 Verify experimentally the properties of rotations, reflections, and translations.',
  '8.G.2': 'NC.8.G.2 Use transformations to define congruence.',
  '8.G.3': 'NC.8.G.3 Describe the effect of dilations, translations, rotations, and reflections on two-dimensional figures using coordinates.',
  '8.G.4': 'NC.8.G.4 Use transformations to define similarity.',
  '8.NS.1': 'NC.8.NS.1 Understand that every number has a decimal expansion.'
};

import { supabase } from '../supabaseClient';
import { MessageSquare, Send, Download, Image as ImageIcon, AlertTriangle, CheckCircle2, Printer, Play } from 'lucide-react';
import { format } from 'date-fns';



const LessonPlanViewer = ({ plan, viewerPin, adminName }) => {
  const renderMath = (text) => {
    if (!text) return "";
    let t = text.replace(/\bpi\b/gi, '\\pi');
    if (!window.katex) return t;
    try {
      t = t.replace(/\$\$([\s\S]*?)\$\$/g, (m, math) => window.katex.renderToString(math, {displayMode: true, throwOnError: false}));
      t = t.replace(/\$([^\n]*?)\$/g, (m, math) => window.katex.renderToString(math, {displayMode: false, throwOnError: false}));
      return t;
    } catch (e) {
      return text;
    }
  };

  
  const renderQuestionContent = (ex) => {
    let html = renderMath(ex.question);
    
    if (ex.type === 'multiple-choice' && ex.options) {
      html += '<ol style="list-style-type: upper-alpha; margin-left: 20px; margin-top: 10px; font-size: 0.9em; text-align: left;">' + ex.options.map(o => '<li style="margin-bottom:4px;">' + renderMath(o) + '</li>').join('') + '</ol>';
    }
    
    if (ex.type === 'interactive-graph' && ex.visualData && ex.visualData.originalPolygon) {
      const gridMax = 10;
      const svgSize = 160;
      const center = svgSize / 2;
      const step = svgSize / (gridMax * 2);
      
      let gridLines = '';
      for(let i=0; i<=svgSize; i+=step) {
         gridLines += '<line x1="'+i+'" y1="0" x2="'+i+'" y2="'+svgSize+'" stroke="#eee" stroke-width="1"/>';
         gridLines += '<line x1="0" y1="'+i+'" x2="'+svgSize+'" y2="'+i+'" stroke="#eee" stroke-width="1"/>';
      }
      const axes = '<line x1="0" y1="'+center+'" x2="'+svgSize+'" y2="'+center+'" stroke="#333" stroke-width="2"/><line x1="'+center+'" y1="0" x2="'+center+'" y2="'+svgSize+'" stroke="#333" stroke-width="2"/>';
      
      const polyPts = ex.visualData.originalPolygon.map(p => (p.x * step + center) + ',' + (-p.y * step + center)).join(' ');
      const polygon = '<polygon points="' + polyPts + '" fill="rgba(66, 153, 225, 0.3)" stroke="#2b6cb0" stroke-width="2"/>';
      
      html += '<div style="margin-top: 15px; display: flex; justify-content: center;"><svg width="'+svgSize+'" height="'+svgSize+'" style="border: 1px solid #ccc; background: white;">' + gridLines + axes + polygon + '</svg></div>';
    }
    
    if (ex.type === 'matching' && ex.matchingPrompts && ex.matchingOptions) {
        const shiftedOptions = [...ex.matchingOptions];
        if (shiftedOptions.length > 1) {
            shiftedOptions.unshift(shiftedOptions.pop());
        }
        html += '<div style="display: flex; justify-content: space-around; width: 100%; margin-top: 15px; font-size: 0.85em; text-align: left;">' +
        '<div><ul style="list-style-type: decimal; padding-left: 20px;">' + ex.matchingPrompts.map(p => '<li style="margin-bottom:8px;">' + renderMath(p.text) + '</li>').join('') + '</ul></div>' +
        '<div><ul style="list-style-type: upper-alpha; padding-left: 20px;">' + shiftedOptions.map(o => '<li style="margin-bottom:8px;">' + renderMath(o.text) + '</li>').join('') + '</ul></div>' +
        '</div>';
      }

      if (ex.type === 'drag-and-drop' && ex.prompts && ex.options) {
      html += '<div style="margin-top: 15px; font-size: 0.85em; text-align: left; width: 100%;">' +
        '<div style="border: 1px dashed #666; padding: 10px; margin-bottom: 10px; text-align: center; border-radius: 4px;"><strong>Word Bank:</strong><br/>' + ex.options.map(o => renderMath(o)).join(' &nbsp;|&nbsp; ') + '</div>' +
        '<div style="display: flex; gap: 10px; justify-content: space-between;">' + 
        ex.prompts.map(p => '<div style="flex: 1; border: 1px solid #333; height: 100px; display: flex; flex-direction: column; align-items: center; border-radius: 4px; overflow: hidden;"><div style="background: #f1f5f9; width: 100%; text-align: center; padding: 4px; border-bottom: 1px solid #333; font-weight: bold;">' + renderMath(p.text) + '</div></div>').join('') +
        '</div></div>';
    }
    
    return html;
  };

  const [comments, setComments] = useState({}); // Grouped by section
  const [activeCommentSection, setActiveCommentSection] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

        const handlePrintGuidedNotes = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Popup was blocked! Please allow popups.");
      return;
    }
    
    // Parse direct instruction and replace bold text with blanks
    let notesContent = plan.direct_instruction || 'No notes provided.';
    notesContent = renderMath(notesContent);
    // Convert markdown to HTML but replace **bold** with fill in the blank lines
    
    let parsedNotes = window.marked ? window.marked.parse(notesContent, { breaks: true }) : notesContent;
    parsedNotes = parsedNotes.replace(/<strong>(.*?)<\/strong>/g, '<strong><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></strong> <span style="color: white; font-size: 1px;">$1</span>');

    let guidedHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {
      const guidedChunk = plan.structured_exemplars.slice(0, 2);
      guidedHTML = guidedChunk.map((ex, i) => {
        return `
          <div style="margin-bottom: 20px; break-inside: avoid;">
            <p style="font-size: 16px; margin-bottom: 5px;"><strong>Example ${i + 1}.</strong> ${renderQuestionContent(ex)}</p>
            <div style="border: 1px dashed #aaa; height: 120px; border-radius: 4px;"></div>
          </div>
        `;
      }).join('');
    }

    const html = 
      '<html>' +
        '<head>' +

          '<title>' + plan.topic + ' - Guided Notes</title>' +
          '<link rel="stylesheet" href="' + window.location.origin + '/katex/katex.min.css">' +
          '<style>' +
            'body { font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; padding: 20px 40px; line-height: 1.6; color: #333; }' +
            '.header { display: flex; justify-content: space-between; border-bottom: 2px solid #2d3748; padding-bottom: 10px; margin-bottom: 20px; font-size: 16px; }' +
            'h2 { text-align: center; color: #2d3748; margin-top: 0; margin-bottom: 20px; font-size: 20px; }' +
            'h3 { color: #4a5568; margin-top: 15px; margin-bottom: 5px; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px; }' +
            '@media print { body { padding: 0; margin: 0.5in; } }' +
            '.notes-content { font-size: 16px; margin-bottom: 30px; }' +
            '.notes-content p { margin-bottom: 15px; }' +
            '.notes-content hr { border: 0; border-top: 1px dashed #ccc; margin: 20px 0; }' +
          '</style>' +
        '</head>' +
        '<body>' +
          '<div class="header">' +
            '<div><strong>Name:</strong> _________________________________</div>' +
            '<div><strong>Date:</strong> ____________________</div>' +
          '</div>' +
          '<h2>Guided Notes: ' + plan.topic + '</h2>' +
          
          '<h3>Class Notes</h3>' +
          '<div class="notes-content">' + parsedNotes + '</div>' +
          
          '<h3>Guided Practice (We Do)</h3>' +
          guidedHTML +
          
          '<script>' +
            'window.onload = function() { setTimeout(() => window.print(), 500); };' +
          '</script>' + '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>' + '<script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);</script>' + '</body>' +
      '</html>';
      
    printWindow.document.write(html);
    printWindow.document.close();
  };

    const handlePrintWorksheet = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Worksheet popup was blocked! Please allow popups.");
      return;
    }
    
    let worksheetProblemsHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      const indChunk = plan.structured_exemplars.slice(6, 16);
      worksheetProblemsHTML = indChunk.map((ex, i) => {
        return `
          <div style="margin-bottom: 30px;">
            <p style="font-size: 18px;"><strong>${i + 1}.</strong> ${renderQuestionContent(ex)}</p>
            <div style="border: 1px solid #aaa; height: 150px; margin-top: 10px; border-radius: 4px;"></div>
          </div>
        `;
      }).join('');
    }

    const doNowContent = renderMath(plan.do_now || '');
    const exitTicketContent = renderMath(plan.exit_ticket || '');

    const html = 
      '<html>' +
        '<head>' +
          '<title>' + plan.topic + ' - Worksheet</title>' +
          '<link rel="stylesheet" href="' + window.location.origin + '/katex/katex.min.css">' +
          '<style>' +
            'body { font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; line-height: 1.6; color: #333; }' +
            '.header { display: flex; justify-content: space-between; border-bottom: 2px solid #2d3748; padding-bottom: 15px; margin-bottom: 30px; font-size: 18px; }' +
            'h2 { text-align: center; color: #2d3748; margin-bottom: 40px; }' +
            'h3 { color: #4a5568; margin-top: 30px; }' +
            '.box { border: 1px solid #aaa; height: 120px; margin-bottom: 30px; border-radius: 4px; }' +
          '</style>' +
        '</head>' +
        '<body>' +
          '<div class="header">' +
            '<div><strong>Name:</strong> _________________________________</div>' +
            '<div><strong>Date:</strong> ____________________</div>' +
          '</div>' +
          '<h2>' + plan.topic + '</h2>' +
          
          (doNowContent ? 
            '<h3>Warm Up (Do Now)</h3>' +
            '<p style="font-size: 18px; white-space: pre-wrap;">' + doNowContent + '</p>' +
            '<div class="box"></div>'
          : '') +

          '<h3>Practice Problems</h3>' +
          worksheetProblemsHTML +
          
          (exitTicketContent ? 
            '<h3>Exit Ticket</h3>' +
            '<p style="font-size: 18px; white-space: pre-wrap;">' + exitTicketContent + '</p>' +
            '<div class="box"></div>'
          : '') +

          '<script>' +
            'window.onload = function() { setTimeout(() => window.print(), 500); };' +
          '</script>' + '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>' + '<script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);</script>' + '</body>' +
      '</html>';
      
    printWindow.document.write(html);
    printWindow.document.close();
  };

  
    const handlePrintSlideshow = () => {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Slideshow popup was blocked! Please allow popups.");
        return;
      }

      // We need to re-generate the slides array here just like handlePresent does
      const cfuMatch = plan.direct_instruction ? plan.direct_instruction.match(/CFU:(.*?)(?:\n|$)/) : null;
      const cfuText = cfuMatch ? cfuMatch[1].trim() : "Show me on your fingers...";

      const eqMatch = plan.objective_3m ? plan.objective_3m.match(/SWBATs+(.*)/i) : null;
      const getEssentialQuestion = (obj) => {
        if (!obj) return "What is the core concept of today's lesson?";
        let topic = obj.toLowerCase();
        const m = topic.match(/involving (.*?) \(/);
        if (m) {
           return `How can we apply our understanding of ${m[1]} to solve real-world problems?`;
        }
        return "How can we apply today's concept to solve real-world problems?";
      };

      const problemsSlides = [];

      // Guided Practice (2 problems - separate slides)
      const guidedSlides = [];
      if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {
        const guidedChunk = plan.structured_exemplars.slice(0, 2);
        guidedChunk.forEach((ex, idx) => {
          guidedSlides.push({
            title: `8. Guided Practice (Problem ${idx + 1})`,
            content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(ex)}
</div>`
          });
        });
      }
  
      // Group Practice (4 problems - separate slides)
      const groupSlides = [];
      if (plan.structured_exemplars && plan.structured_exemplars.length >= 6) {
        const groupChunk = plan.structured_exemplars.slice(2, 6);
        groupChunk.forEach((ex, idx) => {
          groupSlides.push({
            title: `10. Group Practice (Problem ${idx + 1})`,
            content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(ex)}
</div>`
          });
        });
      }

      // Independent Practice (remaining 10 problems on one slide)
      if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
        const indChunk = plan.structured_exemplars.slice(6, 16);
        const chunkHTML = `<div class="problems-grid" style="grid-template-columns: repeat(2, 1fr); gap: 20px; font-size: 16px;">
` + 
          indChunk.map((ex, idx) => `  <div class="problem-box" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;"><strong>${idx + 1}. ${renderQuestionContent(ex)}</strong></div>
`).join('') + 
          `</div>`;
        problemsSlides.push({ title: "11. Independent Practice (All 10)", content: chunkHTML });
      } else {
        problemsSlides.push({ 
          title: "11. Independent Practice", 
          content: `<strong>Directions:</strong>
${plan.independent_practice || 'Complete the assigned independent practice problems quietly.'}`
        });
      }

      
      const diSlides = [];
      if (plan.direct_instruction) {
        let diText = plan.direct_instruction;
        // Inject telescope launch for 9/21
        if (plan.date_start === '2026-09-21' && !diText.includes('telescope')) {
           diText = diText.replace(/## Direct Instruction\s*---/i, "## Launch: The Telescope\n---\nImagine you are looking at a star through a telescope. The star doesn't change its actual shape, but the lenses inside the telescope *scale* the image up so your eye can see it. Today, we are going to learn how to mathematically build that telescope.\n\n## Direct Instruction\n---");
        }
        
        // Split by markdown headings
        const blocks = diText.split(/(?=## )/);
        
        blocks.forEach((block, idx) => {
          if (!block.trim()) return;
          
          let title = "Direct Instruction";
          const titleMatch = block.match(/## (.*?)\n/);
          if (titleMatch) {
             title = titleMatch[1].trim();
             block = block.replace(/## .*?\n/, '');
          }
          block = block.replace(/^---\n/, ''); // remove stray dashes

          let content = block.trim();
          
          if (content.includes('**Example 1**') && content.includes('**Example 2**')) {
             const ex1split = content.split('**Example 2**');
             diSlides.push({
              title: `${title} (Example 1)`,
              content: ex1split[0].replace(/\*\*Example 1\*\*/g, `**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${plan.structured_exemplars && plan.structured_exemplars.length > 0 ? renderQuestionContent(plan.structured_exemplars[0]) : ''}</div>`) + `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
             });
             diSlides.push({
              title: `${title} (Example 2)`,
              content: (`**Example 2**` + ex1split[1]).replace(/\*\*Example 2\*\*/g, `**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${plan.structured_exemplars && plan.structured_exemplars.length > 1 ? renderQuestionContent(plan.structured_exemplars[1]) : ''}</div>`) + `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
             });
          } else {
             diSlides.push({
              title: title,
              content: content.replace(/\*\*Example 1\*\*/g, `**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${plan.structured_exemplars && plan.structured_exemplars.length > 0 ? renderQuestionContent(plan.structured_exemplars[0]) : ''}</div>`).replace(/\*\*Example 2\*\*/g, `**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${plan.structured_exemplars && plan.structured_exemplars.length > 1 ? renderQuestionContent(plan.structured_exemplars[1]) : ''}</div>`) + (content.includes('Example') ? `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>` : '')
             });
          }
        });
      }


      
      const expectationsContent = `<div style="display: flex; align-items: center; justify-content: space-around;">
        <ul style="font-size: 28px; line-height: 2;">
          <li>No Cellphones</li>
          <li>Drop pencils when completed</li>
          <li>Communicate with respect</li>
          <li>Raise your hand</li>
        </ul>
        <div style="font-size: 150px;">??</div>
      </div>`;


      const baseSlides = [
        { title: plan.topic ? plan.topic.replace(/\[.*?\]\s*/, '') : '', content: `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center;"><h2>Welcome to Class!</h2><p>Get ready to start.</p></div>` },
        { title: "1. Spiraled Do Now", content: `**Directions:**\n${plan.do_now || ''}` },
        { title: "2. Classroom Expectations", content: expectationsContent },
        { title: "3. Today @ A Glance", content: `**SWBAT (Objective):**\n${plan.objective_3m || ''}\n\n**Essential question of the day:**\n${getEssentialQuestion(plan.objective_3m)}\n\n**Agenda**\n- Do Now - completed\n- Notes - Direct Instruction\n- Guided & Group Practice: We Do\n- Independent Practice\n- Exit Ticket` },


        { 
          title: "4. Student Shoutouts", 
          content: (() => {
             const dateShoutouts = shoutouts[plan.date_start] || ["Bradley Fontaine", "Sarah Jenkins", "Marcus Johnson"];
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return `
<div style="text-align: center; position: relative; z-index: 10;">
  <h3 style="color: var(--kms-teal-dark);">Highest TicketOut Scores!</h3>
  <div style="display: flex; justify-content: space-around; margin-top: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 1</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s1}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 2</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s2}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 3</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s3}</p>
    </div>
  </div>
</div>`;
          })()
        },



        { 
          title: "4. Student Shoutouts", 
          content: (() => {
             const dateShoutouts = shoutouts[plan.date_start] || ["Bradley Fontaine", "Sarah Jenkins", "Marcus Johnson"];
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return `
<div style="text-align: center; position: relative; z-index: 10;">
  <h3 style="color: var(--kms-teal-dark);">Highest TicketOut Scores!</h3>
  <div style="display: flex; justify-content: space-around; margin-top: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 1</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s1}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 2</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s2}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 3</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s3}</p>
    </div>
  </div>
</div>`;
          })()
        },



        { 
          title: "4. Student Shoutouts", 
          content: (() => {
             const dateShoutouts = shoutouts[plan.date_start] || ["Bradley Fontaine", "Sarah Jenkins", "Marcus Johnson"];
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return `<div class="confetti-container" style="position: absolute; top: -50px; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;"></div>
<div style="text-align: center; position: relative; z-index: 10;">
  <h3 style="color: var(--kms-teal-dark);">Highest TicketOut Scores!</h3>
  <div style="display: flex; justify-content: space-around; margin-top: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 1</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s1}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 2</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s2}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 3</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s3}</p>
    </div>
  </div>
</div>`;
          })()
        },


        
        
        

        ...diSlides,
        { title: "7. Formative Assessment #1", content: `**Check for understanding:**\n${cfuText}` },
        { title: "Classroom Expectations (Reminder)", content: expectationsContent },
        ...groupSlides,
        { title: "Classroom Expectations (Reminder)", content: expectationsContent },
        ...problemsSlides,
        { title: "12. Formative Assessment #2", content: `**Check for understanding:**\n${cfuText}` },
        { title: "13. Exit Ticket", content: `**Directions:**\n${plan.exit_ticket || ''}` },
      ];

      // Convert Markdown to HTML for all slides
      const parseMd = (text) => {
        if (!text) return '';
        let t = window.marked ? window.marked.parse(text, { breaks: true }) : text;
        return renderMath(t);
      };

      const slideHTML = baseSlides.map((slide, idx) => {
          return `
            <div class="slide-page">
                <div class="slide-header">${slide.title}</div>
                <div class="slide-content">${parseMd(slide.content)}</div>
            </div>
          `;
      }).join('');

      const html = 
        '<html>' +
          '<head>' +
            '<title>' + plan.topic + ' - Slideshow PDF</title>' +
            '<link rel="stylesheet" href="' + window.location.origin + '/katex/katex.min.css">' +
            '<style>' +
              '@page { size: landscape; margin: 0; }' +
              'body { font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; padding: 0; margin: 0; background: #f0f0f0; }' +
              '.slide-page { width: 10in; height: 7.5in; margin: 0 auto; background: white; padding: 0.5in; box-sizing: border-box; page-break-after: always; display: flex; flex-direction: column; position: relative; border: 1px solid #ccc; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }' +
              '.slide-header { font-size: 32px; font-weight: bold; color: white; background: #4a148c; padding: 20px; border-radius: 8px; margin-bottom: 30px; text-align: center; }' +
              '.slide-content { font-size: 24px; line-height: 1.6; color: #333; flex: 1; }' +
              '.problems-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }' +
              '@media print { body { background: white; } .slide-page { border: none; box-shadow: none; width: 100%; height: 100vh; } }' +
            '</style>' +
          '</head>' +
          '<body>' +
            slideHTML +
            '<script>' +
              'window.onload = function() { setTimeout(() => window.print(), 1000); };' +
            '</script>' + '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>' + '<script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);</script>' + '</body>' +
        '</html>';
        
      printWindow.document.write(html);
      printWindow.document.close();
    };

    const handlePresent = () => {

    const presentWindow = window.open('', '_blank');
    if (!presentWindow) {
      alert("Presentation popup was blocked! Please allow popups for this site to view the presentation.");
      return;
    }
    
    // Helper to generate the essential question
      const getEssentialQuestion = (obj) => {
        if (!obj) return "What is the core concept of today's lesson?";
        let topic = obj.toLowerCase();
        const m = topic.match(/involving (.*?) \(/);
        if (m) {
           return `How can we apply our understanding of ${m[1]} to solve real-world problems?`;
        }
        return "How can we apply today's concept to solve real-world problems?";
      };

    const problemsSlides = [];

        
      // Guided Practice (2 problems - separate slides)
      const guidedSlides = [];
      if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {
        const guidedChunk = plan.structured_exemplars.slice(0, 2);
        guidedChunk.forEach((ex, idx) => {
          guidedSlides.push({
            title: `8. Guided Practice (Problem ${idx + 1})`,
            content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(ex)}
</div>

<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
          });
        });
      }
  
      // Group Practice (4 problems - separate slides)
      const groupSlides = [];
      if (plan.structured_exemplars && plan.structured_exemplars.length >= 6) {
        const groupChunk = plan.structured_exemplars.slice(2, 6);
        groupChunk.forEach((ex, idx) => {
          groupSlides.push({
            title: `10. Group Practice (Problem ${idx + 1})`,
            content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
${renderQuestionContent(ex)}
</div>

<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
          });
        });
      }


    // Independent Practice (remaining 10 problems on one slide)
      if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
        const indChunk = plan.structured_exemplars.slice(6, 16);
      const chunkHTML = `<div class="problems-grid" style="grid-template-columns: repeat(4, 1fr); font-size: 14px;">\n` + 
        indChunk.map((ex, idx) => `  <div class="problem-box" style="padding: 10px;"><strong>${idx + 1}. ${renderQuestionContent(ex)}</strong></div>\n`).join('') + 
        `</div>\n\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>`;
      problemsSlides.push({ title: "11. Independent Practice (All 10)", content: chunkHTML });
    } else {
      problemsSlides.push({ 
        title: "11. Independent Practice", 
        content: `<strong>Directions:</strong>\n${plan.independent_practice || 'Complete the assigned independent practice problems quietly.'}\n\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>`
      });
    }

    // Process Direct Instruction into multiple slides if --- is present
    
      const diSlides = [];
      if (plan.direct_instruction) {
        let diText = plan.direct_instruction;
        // Inject telescope launch for 9/21
        if (plan.date_start === '2026-09-21' && !diText.includes('telescope')) {
           diText = diText.replace(/## Direct Instruction\s*---/i, "## Launch: The Telescope\n---\nImagine you are looking at a star through a telescope. The star doesn't change its actual shape, but the lenses inside the telescope *scale* the image up so your eye can see it. Today, we are going to learn how to mathematically build that telescope.\n\n## Direct Instruction\n---");
        }
        
        // Split by markdown headings
        const blocks = diText.split(/(?=## )/);
        
        blocks.forEach((block, idx) => {
          if (!block.trim()) return;
          
          let title = "Direct Instruction";
          const titleMatch = block.match(/## (.*?)\n/);
          if (titleMatch) {
             title = titleMatch[1].trim();
             block = block.replace(/## .*?\n/, '');
          }
          block = block.replace(/^---\n/, ''); // remove stray dashes

          let content = block.trim();
          
          if (content.includes('**Example 1**') && content.includes('**Example 2**')) {
             const ex1split = content.split('**Example 2**');
             diSlides.push({
              title: `${title} (Example 1)`,
              content: ex1split[0].replace(/\*\*Example 1\*\*/g, `**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${plan.structured_exemplars && plan.structured_exemplars.length > 0 ? renderQuestionContent(plan.structured_exemplars[0]) : ''}</div>`) + `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
             });
             diSlides.push({
              title: `${title} (Example 2)`,
              content: (`**Example 2**` + ex1split[1]).replace(/\*\*Example 2\*\*/g, `**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${plan.structured_exemplars && plan.structured_exemplars.length > 1 ? renderQuestionContent(plan.structured_exemplars[1]) : ''}</div>`) + `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
             });
          } else {
             diSlides.push({
              title: title,
              content: content.replace(/\*\*Example 1\*\*/g, `**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${plan.structured_exemplars && plan.structured_exemplars.length > 0 ? renderQuestionContent(plan.structured_exemplars[0]) : ''}</div>`).replace(/\*\*Example 2\*\*/g, `**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">${plan.structured_exemplars && plan.structured_exemplars.length > 1 ? renderQuestionContent(plan.structured_exemplars[1]) : ''}</div>`) + (content.includes('Example') ? `\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>` : '')
             });
          }
        });
      }


    const cfuStrategies = [
      'Turn and Talk: Discuss the core concept with your neighbor.',
      'Stop and Jot: Write down the most important thing you learned in the last 5 minutes.',
      'Think-Pair-Share: Think about the core concept for 30 seconds, then pair up and share your thoughts.',
      'Fist to Five: Rate your understanding from 0 (completely lost) to 5 (I could teach it) by holding up your fingers.',
      'Thumbs Up/Down: Show a thumbs up if you feel confident about the concept, or thumbs down if you need more help.',
      'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.'
    ];
    // Hash the topic string to consistently pick the same CFU strategy for the same lesson plan
    const hashStr = (plan.topic || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const defaultCfu = cfuStrategies[hashStr % cfuStrategies.length];

    
      var cfuText = plan.checks_for_understanding && plan.checks_for_understanding.length > 0 
        ? plan.checks_for_understanding[0].cfu 
        : defaultCfu;
      if (plan.date_start === '2026-09-21') {
         cfuText = 'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.';
      }


    
      const expectationsContent = `<div style="display: flex; align-items: center; justify-content: space-around;">
        <ul style="font-size: 28px; line-height: 2;">
          <li>No Cellphones</li>
          <li>Drop pencils when completed</li>
          <li>Communicate with respect</li>
          <li>Raise your hand</li>
        </ul>
        <div style="font-size: 150px;">??</div>
      </div>`;


    const baseSlides = [
      { title: plan.topic ? plan.topic.replace(/\[.*?\]\s*/, '') : '', content: `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center;"><h2>Welcome to Class!</h2><p>Get ready to start.</p></div>` },
      { 
        title: "1. Spiraled Do Now", 
        content: `**Directions:**\n${plan.do_now || ''}\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>` 
      },
      { 
        title: "2. Classroom Expectations", 
        content: expectationsContent 
      },
      { 
        title: "3. Today @ A Glance", 
        content: `**SWBAT (Objective):**\n${plan.objective_3m || ''}\n\n**Essential question of the day:**\n${getEssentialQuestion(plan.objective_3m)}\n\n**Agenda**\n- Do Now - completed\n- Notes - Direct Instruction\n- Guided & Group Practice: We Do\n- Independent Practice\n- Exit Ticket` 
      },
      
      
        

      

        


        { 
          title: "4. Student Shoutouts", 
          content: (() => {
             const dateShoutouts = shoutouts[plan.date_start] || ["Bradley Fontaine", "Sarah Jenkins", "Marcus Johnson"];
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return `<div class="confetti-container" style="position: absolute; top: -50px; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;"></div>
<div style="text-align: center; position: relative; z-index: 10;">
  <h3 style="color: var(--kms-teal-dark);">Highest TicketOut Scores!</h3>
  <div style="display: flex; justify-content: space-around; margin-top: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 1</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s1}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 2</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s2}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 3</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s3}</p>
    </div>
  </div>
</div>`;
          })()
        },
{ 
          title: "4. Student Shoutouts", 
          content: (() => {
             const dateShoutouts = shoutouts[plan.date_start] || ["Bradley Fontaine", "Sarah Jenkins", "Marcus Johnson"];
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return `<div class="confetti-container" style="position: absolute; top: -50px; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;"></div>
<div style="text-align: center; position: relative; z-index: 10;">
  <h3 style="color: var(--kms-teal-dark);">Highest TicketOut Scores!</h3>
  <div style="display: flex; justify-content: space-around; margin-top: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 1</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s1}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 2</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s2}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 3</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">${s3}</p>
    </div>
  </div>
</div>`;
          })()
        },

...diSlides,
      { 
        title: "7. Formative Assessment #1", 
        content: `**Check for understanding:**\n${cfuText}\n\n<div class="timer" onclick="startTimer(this, 2)">2:00</div>` 
      },
      { 
        title: "Classroom Expectations (Reminder)", 
        content: expectationsContent 
      },
      ...groupSlides,
      { 
        title: "Classroom Expectations (Reminder)", 
        content: expectationsContent 
      },
      ...problemsSlides,
      { 
        title: "13. Exit Ticket (Formative Assessment #3)", 
        content: `**Directions:**\n${plan.exit_ticket || ''}\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>` 
      }
    ];

    const processedSlides = baseSlides.map(slide => {
      let content = slide.content || "";
      content = content.replace(/\bpi\b/gi, '$\\\\pi$');
      content = renderMath(content);
      if (window.marked) {
        content = window.marked.parse(content, { breaks: true });
        content = content.replace(/<div class="timer"/g, '<div class="timer-container"><div class="timer"');
        content = content.replace(/<\/div><\/p>/g, '</div></div></p>');
      }
      return { ...slide, content };
    });

    const slidesJSON = JSON.stringify(processedSlides).replace(/</g, '\\u003c');

    const html = `
      <html>
        <head>
          <title>Presentation: ${plan.topic}</title>
          <link rel="stylesheet" href="${window.location.origin}/katex/katex.min.css">
          <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
          
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #6a0dad, #008080); color: #1e293b; overflow: hidden; }
            .slide-container {
              display: flex; flex-direction: column; justify-content: center; align-items: center;
              height: 100vh; padding: 40px 80px 100px 80px; box-sizing: border-box; overflow-y: auto;
            }
            h1 { font-size: 3.5vw; color: #300052; margin-bottom: 25px; text-align: center; text-transform: uppercase; font-weight: bold; letter-spacing: 2px;}
            .content-wrapper { width: 100%; max-width: 1400px; background: rgba(255, 255, 255, 0.95); padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
            .content { font-size: 1.8vw; line-height: 1.5; }
            .content p { margin-bottom: 15px; }
            .content ul, .content ol { margin-top: 5px; margin-bottom: 15px; padding-left: 40px; }
            .content li { margin-bottom: 10px; }
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
              position: fixed;
              top: 25px;
              right: 40px;
              z-index: 1000;
              display: inline-block;
              background: linear-gradient(135deg, #f59e0b, #d97706);
              color: white;
              font-size: 2.5vw;
              font-weight: bold;
              padding: 15px 30px;
              border-radius: 12px;
              cursor: pointer;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);
              transition: transform 0.1s;
              text-align: center;
              border: 4px solid #fff;
            }
            .timer:active { transform: scale(0.95); }
            .timer-container { }
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
            
            renderSlide();
            
            function renderSlide() {
              if (activeTimer) { clearInterval(activeTimer); activeTimer = null; }
              const currentSlide = slides[current];
              let parsedContent = currentSlide.content;

              document.getElementById('slide-content').innerHTML = 
                '<div class="content-wrapper">' +
                  '<h1>' + currentSlide.title + '</h1>' +
                  '<div class="content">' + parsedContent + '</div>' +
                '</div>';
              
              // Retry KaTeX rendering until the script is loaded
              
              
              
              if (parsedContent.includes('confetti-container')) {
                 setTimeout(() => {
                   if(window.confetti) window.confetti({particleCount: 200, spread: 180});
                 }, 300);
              }

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

            try {
              window.focus();
              document.body.focus();
            } catch(e) {}
            
            try {
              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(e => console.log('Fullscreen rejected.'));
              } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
              }
            } catch(e) {
              console.log('Fullscreen error:', e);
            }
            
            // Allow scripts to load before rendering first slide
            setTimeout(renderSlide, 100);
          </script>
        </body>
      </html>
    `;
    presentWindow.document.write(html);
    presentWindow.document.close();
  };

  const viewerRef = React.useRef(null);
  useEffect(() => {
    let retries = 0;
    const tryRender = () => {
      if (viewerRef.current && window.renderMathInElement) {
        window.renderMathInElement(viewerRef.current, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ],
          throwOnError: false
        });
      } else if (retries < 20) {
        retries++;
        setTimeout(tryRender, 100);
      }
    };
    tryRender();
  });

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
    <div ref={viewerRef}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: '0 0 5px 0', color: 'var(--kms-purple-dark)' }}>{plan.topic}</h2>
          {plan.week_label === 'Emergency Sub Plans' ? (
            <p style={{ margin: 0, color: '#666' }}><strong>{plan.week_label}</strong></p>
          ) : (
            <p style={{ margin: 0, color: '#666' }}>Date: <strong>{format(new Date(plan.date_start), 'MMMM d, yyyy')}</strong> | Week: <strong>{plan.week_label}</strong></p>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          
            <button onClick={handlePresent} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--kms-purple)', color: 'white' }}>
              <Play size={18} /> Present
            </button>
            <button onClick={handlePrintSlideshow} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Print Slideshow
            </button>

          <button onClick={handlePrintGuidedNotes} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Printer size={18} /> Guided Notes
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
      <Section id="standard" title="Standard" content={STANDARD_MAP[plan.standard] || plan.standard} />
      <Section id="do_now" title="Do Now (Spiral Topics)" content={plan.do_now} />
      <Section id="direct_instruction" title="Direct Instruction (Launch)" content={plan.direct_instruction} />
      
        {/* Advanced Exemplar Section */}
        {plan.exemplar_image_url && (
            <Section id="exemplar_image" title="Handwritten Exemplar">
                <div style={{ marginBottom: '20px' }}>
                    <a href={plan.exemplar_image_url} target="_blank" rel="noopener noreferrer">
                        <img 
                            src={plan.exemplar_image_url} 
                            alt="Handwritten Exemplar" 
                            style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', border: '1px solid #ddd' }} 
                        />
                    </a>
                </div>
            </Section>
        )}

        

        <Section id="group_practice" title="Group Practice">
            {plan.structured_exemplars && plan.structured_exemplars.length >= 6 ? (
                <div>
                    {plan.structured_exemplars.slice(2, 6).map((ex, idx) => (
                        <div key={'group-'+idx} style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: 'var(--kms-purple)', color: 'white', padding: '10px 15px', fontWeight: 'bold' }}>
                                Problem {idx + 3}: <span dangerouslySetInnerHTML={{ __html: renderQuestionContent(ex) }} />
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
                <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontStyle: 'italic', color: '#666' }}>
                    No group practice problems found.
                </div>
            )}
        </Section>

        <Section id="independent_practice" title="Independent Practice">
            {plan.structured_exemplars && plan.structured_exemplars.length >= 16 ? (
                <div>
                    {plan.structured_exemplars.slice(6, 16).map((ex, idx) => (
                        <div key={'ind-'+idx} style={{ marginBottom: '20px', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: 'var(--kms-purple)', color: 'white', padding: '10px 15px', fontWeight: 'bold' }}>
                                Problem {idx + 7}: <span dangerouslySetInnerHTML={{ __html: renderQuestionContent(ex) }} />
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
                <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', fontStyle: 'italic', color: '#666' }}>
                    No independent practice problems found.
                </div>
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

