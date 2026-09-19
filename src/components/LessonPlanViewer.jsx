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

  
  
  const renderQuestionContent = (ex, index = 0) => {
    let html = renderMath(ex.question);
    
    if (ex.type === 'multiple-choice' && ex.options) {
      // Deterministically shuffle based on question string length + index
      let opts = [...ex.options];
      let seed = (ex.question || '').length + index;
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.abs(Math.sin(seed++) * 10000)) % (i + 1);
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      html += '<ol style="list-style-type: upper-alpha; margin-left: 20px; margin-top: 10px; font-size: 0.9em; text-align: left;">' + opts.map(o => '<li style="margin-bottom:4px;">' + renderMath(o) + '</li>').join('') + '</ol>';
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
  const [shoutouts, setShoutouts] = useState({});
  useEffect(() => { fetch('/shoutouts.json').then(r => r.json()).then(d => setShoutouts(d)).catch(e => console.error('No shoutouts found', e)); }, []);
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
            <p style="font-size: 16px; margin-bottom: 5px;"><strong>Example ${i + 1}.</strong> ${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}</p>
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
          ('<' + '/script>') + '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><' + '/script>' + '<script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);<' + '/script>' + '</body>' +
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
            <p style="font-size: 18px;"><strong>${i + 1}.</strong> ${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}</p>
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
          ('<' + '/script>') + '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><' + '/script>' + '<script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);<' + '/script>' + '</body>' +
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
${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}
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
${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}
</div>`
          });
        });
      }

      // Independent Practice (remaining 10 problems on one slide)
      if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
        const indChunk = plan.structured_exemplars.slice(6, 16);
        const chunkHTML = `<div class="problems-grid" style="grid-template-columns: repeat(2, 1fr); gap: 20px; font-size: 16px;">
` + 
          indChunk.map((ex, idx) => `  <div class="problem-box" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;"><strong>${idx + 1}. ${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}</strong></div>
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
        { title: plan.topic ? plan.topic.replace(/\[.*?\]\s*/, '') : '', content: `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 0; text-align: center;"><h2>Welcome to Class!</h2><p>Get ready to start.</p></div>` },
        { title: "1. Spiraled Do Now", content: `**Directions:**\n${plan.do_now || ''}` },
        { title: "2. Classroom Expectations", content: expectationsContent + '<div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;"><img src="data:image/jpeg;base64,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" alt="Owl" style="height: 250px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);" /></div>' },
        { title: "3. Today @ A Glance", content: `<div style="display: flex; justify-content: center; margin-top: 20px;"><img src="https://images.unsplash.com/photo-1632516643720-e7f0d7e6a604?q=80&w=600&auto=format&fit=crop" alt="Math" style="height: 180px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" crossorigin="anonymous" /></div>\n\n**SWBAT (Objective):**\n${plan.objective_3m || ''}\n\n**Essential question of the day:**\n${getEssentialQuestion(plan.objective_3m)}\n\n**Agenda**\n- Do Now - completed\n- Notes - Direct Instruction\n- Guided & Group Practice: We Do\n- Independent Practice\n- Exit Ticket` },


        

        { 
          title: "4. Student Shoutouts", 
          content: (() => {
             
             const getMostRecentShoutouts = (targetDate) => {
               // First check exact date and see if it has at least one real name
               if (shoutouts[targetDate] && shoutouts[targetDate].some(n => n !== "TBD" && n !== "Student 1" && n !== "Student 2" && n !== "Student 3")) {
                 return shoutouts[targetDate];
               }
               // Otherwise, find the most recent date before targetDate that has real names
               const pastDates = Object.keys(shoutouts)
                 .filter(d => d < targetDate && shoutouts[d].some(n => n !== "TBD" && n !== "Student 1" && n !== "Student 2" && n !== "Student 3"))
                 .sort((a,b) => new Date(b) - new Date(a));
               
               if (pastDates.length > 0) return shoutouts[pastDates[0]];
               
               // Fallback if absolutely no past dates have data
               return ["TBD", "TBD", "TBD"];
             };
             const dateShoutouts = getMostRecentShoutouts(plan.date_start);
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return `<div class="confetti-container" style="position: absolute; top: -50px; left: 0; width: 100%; padding: 40px 0; pointer-events: none; z-index: -1;"></div>
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
            ('<' + '/script>') + '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><' + '/script>' + '<script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);<' + '/script>' + '</body>' +
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
${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}
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
${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}
</div>

<div class="timer" onclick="startTimer(this, 5)">5:00</div>`
          });
        });
      }


    // Independent Practice (remaining 10 problems on one slide)
      if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
        const indChunk = plan.structured_exemplars.slice(6, 16);
      const chunkHTML = `<div class="problems-grid" style="grid-template-columns: repeat(4, 1fr); font-size: 14px;">\n` + 
        indChunk.map((ex, idx) => `  <div class="problem-box" style="padding: 10px;"><strong>${idx + 1}. ${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}</strong></div>\n`).join('') + 
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
      { title: plan.topic ? plan.topic.replace(/\[.*?\]\s*/, '') : '', content: `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 0; text-align: center;"><h2>Welcome to Class!</h2><p>Get ready to start.</p></div>` },
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
             
             const getMostRecentShoutouts = (targetDate) => {
               // First check exact date and see if it has at least one real name
               if (shoutouts[targetDate] && shoutouts[targetDate].some(n => n !== "TBD" && n !== "Student 1" && n !== "Student 2" && n !== "Student 3")) {
                 return shoutouts[targetDate];
               }
               // Otherwise, find the most recent date before targetDate that has real names
               const pastDates = Object.keys(shoutouts)
                 .filter(d => d < targetDate && shoutouts[d].some(n => n !== "TBD" && n !== "Student 1" && n !== "Student 2" && n !== "Student 3"))
                 .sort((a,b) => new Date(b) - new Date(a));
               
               if (pastDates.length > 0) return shoutouts[pastDates[0]];
               
               // Fallback if absolutely no past dates have data
               return ["TBD", "TBD", "TBD"];
             };
             const dateShoutouts = getMostRecentShoutouts(plan.date_start);
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return `<div class="confetti-container" style="position: absolute; top: -50px; left: 0; width: 100%; padding: 40px 0; pointer-events: none; z-index: -1;"></div>
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
          <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js">${"<"}/script>
          
          <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #6a0dad, #008080); color: #1e293b; overflow: hidden; }
            .katex-display { overflow-x: auto; overflow-y: hidden; max-width: 100%; }
            .katex { max-width: 100%; white-space: normal; word-wrap: break-word; }
            .slide-container {
              display: flex; flex-direction: column; justify-content: center; align-items: center;
              height: 100vh; padding: 40px 80px 100px 80px; box-sizing: border-box; overflow-y: auto;
            }
            h1 { font-size: clamp(24px, 3.5vw, 48px); color: #300052; margin-bottom: 25px; text-align: center; text-transform: uppercase; font-weight: bold; letter-spacing: 2px;}
            .content-wrapper { width: 100%; max-width: 1400px; background: rgba(255, 255, 255, 0.95); padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
            .content { font-size: clamp(14px, 1.5vw, 24px); line-height: 1.5; }
            .content p { margin-bottom: 15px; }
            .content ul, .content ol { margin-top: 5px; margin-bottom: 15px; padding-left: 40px; }
            .content li { margin-bottom: 10px; }
            .content strong { color: #334155; }
            
            /* Practice Problems Grid */
            .problems-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px; margin-bottom: 20px;}
            .problem-box { 
              word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; hyphens: auto; overflow: auto; max-width: 100%; 
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
          ${"<"}/script>
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
                                Problem {idx + 3}: <span dangerouslySetInnerHTML={{ __html: renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0)) }} />
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
                                Problem {idx + 7}: <span dangerouslySetInnerHTML={{ __html: renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0)) }} />
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

