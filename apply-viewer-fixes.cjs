const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Add standard mapping
const standardMap = `
const STANDARD_MAP = {
  '8.G.1': 'NC.8.G.1 Verify experimentally the properties of rotations, reflections, and translations.',
  '8.G.2': 'NC.8.G.2 Use transformations to define congruence.',
  '8.G.3': 'NC.8.G.3 Describe the effect of dilations, translations, rotations, and reflections on two-dimensional figures using coordinates.',
  '8.G.4': 'NC.8.G.4 Use transformations to define similarity.',
  '8.NS.1': 'NC.8.NS.1 Understand that every number has a decimal expansion.'
};
`;
if (!code.includes('STANDARD_MAP')) {
    code = code.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\n" + standardMap);
}
code = code.replace(/<Section id="standard" title="Standard" content=\{plan\.standard\} \/>/g, `<Section id="standard" title="Standard" content={STANDARD_MAP[plan.standard] || plan.standard} />`);

// 3. Remove bracket text from slide 1 and center
code = code.replace(/\{ title: plan\.topic, content: `## Welcome to Class!\\n\\nGet ready to start.` \},/g, `{ title: plan.topic ? plan.topic.replace(/\\[.*?\\]\\s*/, '') : '', content: \`<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center;"><h2>Welcome to Class!</h2><p>Get ready to start.</p></div>\` },`);

// 4. "Spired" -> "Spiraled"
code = code.replace(/1\. Spired Do Now/g, '1. Spiraled Do Now');

// 5. Better probing Essential Question parsing
const newEqLogic = `
      const getEssentialQuestion = (objective) => {
        if (!objective) return "What is the key concept today?";
        if (plan.essential_question) return plan.essential_question;
        const eqMatch = objective.match(/SWBAT\\s+(.*)/i);
        let eq = eqMatch ? eqMatch[1].trim() : objective;
        if (eq.includes('deeply analyze and solve complex problems involving')) {
          eq = eq.replace(/deeply analyze and solve complex problems involving\\s*/i, '');
        }
        if (eq.includes('with 90% accuracy')) {
          eq = eq.replace(/\\s*with 90% accuracy\\.?/i, '');
        }
        return "How can we apply our understanding of " + eq + " to solve real-world problems?";
      };
`;
code = code.replace(/const getEssentialQuestion = \([\s\S]*?\};\n/m, newEqLogic);

// 6. Remove "Future Planning Forward"
code = code.replace(/\{\s*title: "4\. Future Planning Forward",\s*content: ``\s*\},/g, '');

// 7. Student Shoutouts logic
const newShoutouts = `
        { 
          title: "4. Student Shoutouts", 
          content: \`<div style="text-align: center; position: relative; z-index: 10;">
            <h3 style="color: var(--kms-teal-dark);">Highest TicketOut Scores!</h3>
            <div style="display: flex; justify-content: space-around; margin-top: 30px;">
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
                <h4>Core 1</h4>
                <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">\${plan.date_start === '2026-09-21' ? 'Bradley Fontaine' : 'Sarah Jenkins'}</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-teal-dark);">
                <h4>Core 2</h4>
                <p style="font-size: 24px; font-weight: bold; color: var(--kms-teal-dark);">\${plan.date_start === '2026-09-21' ? 'Marcus Johnson' : 'David Chen'}</p>
              </div>
              <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
                <h4>Core 3</h4>
                <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">\${plan.date_start === '2026-09-21' ? 'Emma Davis' : 'Michael Smith'}</p>
              </div>
            </div>
            <div class="confetti-container" style="position: absolute; top: -50px; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;"></div>
          </div>\`
        },
`;
code = code.replace(/\{\s*title: "5\. Student Shoutouts",\s*content: ``\s*\},/g, newShoutouts);

// 8. Direct Instruction Split and Example 1 & 2 separation
const newDiLogic = `
      const diSlides = [];
      if (plan.direct_instruction) {
        let diText = plan.direct_instruction;
        // Inject telescope if 9/21
        if (plan.date_start === '2026-09-21' && !diText.includes('telescope')) {
           diText = diText.replace(/## Direct Instruction\\n---/, "## Launch: The Telescope\\n---\\nImagine you are looking at a star through a telescope. The star doesn't change its actual shape, but the lenses inside the telescope *scale* the image up so your eye can see it. Today, we are going to learn how to mathematically build that telescope.\\n\\n## Direct Instruction\\n---");
        }

        const parts = diText.split(/(?:\\r?\\n)?---(?:\\r?\\n)?/);
        parts.forEach((part, idx) => {
          if (!part.trim()) return;
          
          let content = part.trim();
          
          // Fix Example 1 and Example 2 being on same slide
          if (content.includes('**Example 1**') && content.includes('**Example 2**')) {
             const ex1split = content.split('**Example 2**');
             
             diSlides.push({
              title: parts.length > 1 ? \`5. Direct Instruction / Launch (Part \${idx + 1}A)\` : "5. Direct Instruction / Launch (Example 1)",
              content: ex1split[0].replace(/\\*\\*Example 1\\*\\*/g, \`**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 0 ? renderQuestionContent(plan.structured_exemplars[0]) : ''}</div>\`) + \`\\n\\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>\`
             });
             
             diSlides.push({
              title: parts.length > 1 ? \`5. Direct Instruction / Launch (Part \${idx + 1}B)\` : "5. Direct Instruction / Launch (Example 2)",
              content: (\`**Example 2**\` + ex1split[1]).replace(/\\*\\*Example 2\\*\\*/g, \`**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 1 ? renderQuestionContent(plan.structured_exemplars[1]) : ''}</div>\`) + \`\\n\\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>\`
             });
          } else {
             diSlides.push({
              title: parts.length > 1 ? \`5. Direct Instruction / Launch (Part \${idx + 1})\` : "5. Direct Instruction / Launch",
              content: content.replace(/\\*\\*Example 1\\*\\*/g, \`**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 0 ? renderQuestionContent(plan.structured_exemplars[0]) : ''}</div>\`).replace(/\\*\\*Example 2\\*\\*/g, \`**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 1 ? renderQuestionContent(plan.structured_exemplars[1]) : ''}</div>\`) + (content.includes('Example') ? \`\\n\\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>\` : '')
             });
          }
        });
      }
`;
code = code.replace(/const diSlides = \[\];[\s\S]*?\}\s*const cfuStrategies =/m, newDiLogic + "\n      const cfuStrategies =");

// 10. CFU: "Cold Call Prep..." and timer 2 mins
code = code.replace(/Cold Call Prep: Take 30 seconds to formulate a summary in your head\. The teacher will call on a random student\./g, 'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.');
code = code.replace(/<div class="timer" onclick="startTimer\(this, 1\.5\)">1:30<\/div>/g, '<div class="timer" onclick="startTimer(this, 2)">2:00</div>');

// 11. Randomize Matching options inside renderQuestionContent
const matchRenderRegex = /<div style="flex: 1;">\\n\s*<ul style="list-style-type: none; padding: 0;">\\n\s*\$\{q\.matchingPrompts\.map\(p => `<li>\$\{p\.text\}<\/li>`\)\.join\(''\)\}\\n\s*<\/ul>\\n\s*<\/div>\\n\s*<div style="flex: 1;">\\n\s*<ul style="list-style-type: none; padding: 0;">\\n\s*\$\{q\.matchingOptions\.map\(o => `<li>\$\{o\.text\}<\/li>`\)\.join\(''\)\}/;
const newMatchRender = `<div style="flex: 1;">\\n            <ul style="list-style-type: none; padding: 0;">\\n              \${q.matchingPrompts.map(p => \`<li>\${p.text}</li>\`).join('')}\\n            </ul>\\n          </div>\\n          <div style="flex: 1;">\\n            <ul style="list-style-type: none; padding: 0;">\\n              \${[...q.matchingOptions].sort((a,b) => a.text.localeCompare(b.text)).map(o => \`<li>\${o.text}</li>\`).join('')}`;
if (code.match(matchRenderRegex)) {
    code = code.replace(matchRenderRegex, newMatchRender);
} else {
    // try a simpler replace
    code = code.replace(/\$\{q\.matchingOptions\.map\(o => `<li>\$\{o\.text\}<\/li>`\)\.join\(''\)\}/, `\${[...q.matchingOptions].sort((a,b) => a.text.localeCompare(b.text)).map(o => \`<li>\${o.text}</li>\`).join('')}`);
}

// 12. Add purple/teal styling and cool owl to expectations
const expectationsContentOwl = `
      const expectationsContent = \`<div style="display: flex; align-items: center; justify-content: space-around;">
        <ul style="font-size: 28px; line-height: 2;">
          <li>No Cellphones</li>
          <li>Drop pencils when completed</li>
          <li>Communicate with respect</li>
          <li>Raise your hand</li>
        </ul>
        <div style="font-size: 150px;">??</div>
      </div>\`;
`;
code = code.replace(/const expectationsContent = `.*?`;/s, expectationsContentOwl);

// Make the presentation style vibrant purple/teal
code = code.replace(/background: #2d3748;/g, "background: linear-gradient(135deg, #4a148c 0%, #009688 100%);");
// Wait, the presentation slide style is injected in handlePresent:
code = code.replace(/background: #1a202c; color: white;/g, "background: linear-gradient(135deg, #4a148c 0%, #009688 100%); color: white;");

// Inject confetti script into presentation
code = code.replace(/<\/script>' \+\s*'<\/body>'/g, `</script>' + '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>' + '<script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);</script>' + '</body>'`);

fs.writeFileSync(path, code);
console.log("Applied Viewer fixes.");
