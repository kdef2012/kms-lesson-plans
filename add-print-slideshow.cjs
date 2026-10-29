const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

const regex1 = /const handlePresent = \(\) => \{/;

const printSlideshowFunc = `
    const handlePrintSlideshow = () => {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Slideshow popup was blocked! Please allow popups.");
        return;
      }

      // We need to re-generate the slides array here just like handlePresent does
      const cfuMatch = plan.direct_instruction ? plan.direct_instruction.match(/CFU:(.*?)(?:\n|$)/) : null;
      const cfuText = cfuMatch ? cfuMatch[1].trim() : "Show me on your fingers...";

      const eqMatch = plan.objective_3m ? plan.objective_3m.match(/SWBAT\s+(.*)/i) : null;
      const getEssentialQuestion = (objective) => {
        if (!objective) return "What is the key concept today?";
        const eqMatch = objective.match(/SWBAT\s+(.*)/i);
        const eq = eqMatch ? eqMatch[1].trim() : objective;
        return "How can we " + eq + "?";
      };

      const problemsSlides = [];

      // Guided Practice (2 problems - separate slides)
      const guidedSlides = [];
      if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {
        const guidedChunk = plan.structured_exemplars.slice(0, 2);
        guidedChunk.forEach((ex, idx) => {
          guidedSlides.push({
            title: \`8. Guided Practice (Problem \${idx + 1})\`,
            content: \`<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">\n\${renderQuestionContent(ex)}\n</div>\`
          });
        });
      }
  
      // Group Practice (4 problems - separate slides)
      const groupSlides = [];
      if (plan.structured_exemplars && plan.structured_exemplars.length >= 6) {
        const groupChunk = plan.structured_exemplars.slice(2, 6);
        groupChunk.forEach((ex, idx) => {
          groupSlides.push({
            title: \`10. Group Practice (Problem \${idx + 1})\`,
            content: \`<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">\n\${renderQuestionContent(ex)}\n</div>\`
          });
        });
      }

      // Independent Practice (remaining 10 problems on one slide)
      if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
        const indChunk = plan.structured_exemplars.slice(6, 16);
        const chunkHTML = \`<div class="problems-grid" style="grid-template-columns: repeat(2, 1fr); gap: 20px; font-size: 16px;">\n\` + 
          indChunk.map((ex, idx) => \`  <div class="problem-box" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;"><strong>\${idx + 1}. \${renderQuestionContent(ex)}</strong></div>\n\`).join('') + 
          \`</div>\`;
        problemsSlides.push({ title: "11. Independent Practice (All 10)", content: chunkHTML });
      } else {
        problemsSlides.push({ 
          title: "11. Independent Practice", 
          content: \`<strong>Directions:</strong>\n\${plan.independent_practice || 'Complete the assigned independent practice problems quietly.'}\`
        });
      }

      const diSlides = [];
      if (plan.direct_instruction) {
        const parts = plan.direct_instruction.split(/(?:\\r?\\n)?---(?:\\r?\\n)?/);
        parts.forEach((part, idx) => {
          if (part.trim()) {
            diSlides.push({
              title: parts.length > 1 ? \`6. Direct Instruction / Launch (Part \${idx + 1})\` : "6. Direct Instruction / Launch",
                content: part.trim()
                  .replace(/\\*\\*Example 1\\*\\*/g, \`**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 0 ? renderQuestionContent(plan.structured_exemplars[0]) : ''}</div>\`)
                  .replace(/\\*\\*Example 2\\*\\*/g, \`**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 1 ? renderQuestionContent(plan.structured_exemplars[1]) : ''}</div>\`)
            });
          }
        });
      }

      const expectationsContent = \`- No Cellphones\\n- Drop pencils when completed\\n- Communicate with respect\\n- Raise your hand\`;

      const baseSlides = [
        { title: plan.topic, content: \`## Welcome to Class!\\n\\nGet ready to start.\` },
        { title: "1. Spired Do Now", content: \`**Directions:**\\n\${plan.do_now || ''}\` },
        { title: "2. Classroom Expectations", content: expectationsContent },
        { title: "3. Today @ A Glance", content: \`**SWBAT (Objective):**\\n\${plan.objective_3m || ''}\\n\\n**Essential question of the day:**\\n\${getEssentialQuestion(plan.objective_3m)}\\n\\n**Agenda**\\n- Do Now - completed\\n- Notes - Direct Instruction\\n- Guided & Group Practice: We Do\\n- Independent Practice\\n- Exit Ticket\` },
        { title: "4. Future Planning Forward", content: \`\` },
        { title: "5. Student Shoutouts", content: \`\` },
        ...diSlides,
        { title: "7. Formative Assessment #1", content: \`**Check for understanding:**\\n\${cfuText}\` },
        { title: "Classroom Expectations (Reminder)", content: expectationsContent },
        ...guidedSlides,
        { title: "Classroom Expectations (Reminder)", content: expectationsContent },
        ...groupSlides,
        { title: "Classroom Expectations (Reminder)", content: expectationsContent },
        ...problemsSlides,
        { title: "12. Formative Assessment #2", content: \`**Check for understanding:**\\n\${cfuText}\` },
        { title: "13. Exit Ticket", content: \`**Directions:**\\n\${plan.exit_ticket || ''}\` },
      ];

      // Convert Markdown to HTML for all slides
      const parseMd = (text) => {
        if (!text) return '';
        let t = window.marked ? window.marked.parse(text, { breaks: true }) : text;
        return renderMath(t);
      };

      const slideHTML = baseSlides.map((slide, idx) => {
          return \`
            <div class="slide-page">
                <div class="slide-header">\${slide.title}</div>
                <div class="slide-content">\${parseMd(slide.content)}</div>
            </div>
          \`;
      }).join('');

      const html = 
        '<html>' +
          '<head>' +
            '<title>' + plan.topic + ' - Slideshow PDF</title>' +
            '<link rel="stylesheet" href="' + window.location.origin + '/katex/katex.min.css">' +
            '<style>' +
              '@page { size: landscape; margin: 0; }' +
              'body { font-family: \\'Segoe UI\\', Tahoma, Geneva, Verdana, sans-serif; padding: 0; margin: 0; background: #f0f0f0; }' +
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
            '</script>' +
          '</body>' +
        '</html>';
        
      printWindow.document.write(html);
      printWindow.document.close();
    };

    const handlePresent = () => {
`;

code = code.replace(regex1, printSlideshowFunc);

const regex2 = /<button onClick=\{handlePresent\} className="btn" style=\{\{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var\(--kms-purple\)', color: 'white' \}\}>\s*<Play size=\{18\} \/> Present\s*<\/button>/;

const buttons = `
            <button onClick={handlePresent} className="btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--kms-purple)', color: 'white' }}>
              <Play size={18} /> Present
            </button>
            <button onClick={handlePrintSlideshow} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Print Slideshow
            </button>
`;

code = code.replace(regex2, buttons);

fs.writeFileSync(path, code);
console.log("Added Print Slideshow button.");
