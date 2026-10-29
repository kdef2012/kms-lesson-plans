const fs = require('fs');

let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const oldPrint = `    let exemplarsHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      exemplarsHTML = plan.structured_exemplars.map((ex, i) => {
        const q = ex.question.replace(/\\bpi\\b/gi, '$\\\\pi$');
        return \`
          <div style="margin-bottom: 30px;">
            <p style="font-size: 18px;"><strong>\${i + 1}.</strong> \${q}</p>
            <div style="border: 1px solid #aaa; height: 150px; margin-top: 10px; border-radius: 4px;"></div>
          </div>
        \`;
      }).join('');
    }`;

const newPrint = `    let guidedHTML = '';
    let groupHTML = '';
    let indepHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      const renderEx = (ex, i) => {
        const q = ex.question.replace(/\\bpi\\b/gi, '$\\\\pi$');
        return \`
          <div style="margin-bottom: 30px;">
            <p style="font-size: 18px;"><strong>\${i + 1}.</strong> \${q}</p>
            <div style="border: 1px solid #aaa; height: 150px; margin-top: 10px; border-radius: 4px;"></div>
          </div>
        \`;
      };
      
      const guidedChunk = plan.structured_exemplars.slice(0, 2);
      guidedHTML = guidedChunk.map((ex, i) => renderEx(ex, i)).join('');
      
      const groupChunk = plan.structured_exemplars.slice(2, 6);
      groupHTML = groupChunk.map((ex, i) => renderEx(ex, i + 2)).join('');
      
      const indepChunk = plan.structured_exemplars.slice(6);
      indepHTML = indepChunk.map((ex, i) => renderEx(ex, i + 6)).join('');
    }`;

content = content.replace(oldPrint, newPrint);

content = content.replace(
    "${exemplarsHTML || '<div class=\"box\"></div><div class=\"box\"></div>'}",
    "${guidedHTML ? '<h3>Guided Practice (We Do)</h3>' + guidedHTML : ''}\\n          ${groupHTML ? '<h3>Group Practice (You Do Together)</h3>' + groupHTML : ''}\\n          ${indepHTML ? '<h3>Independent Practice (You Do)</h3>' + indepHTML : ''}\\n          ${(!guidedHTML && !groupHTML && !indepHTML) ? '<div class=\"box\"></div><div class=\"box\"></div>' : ''}"
);


const oldPresent = `    const problemsSlides = [];

    let guidedHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {
      const guidedChunk = plan.structured_exemplars.slice(0, 2);
      guidedHTML = \`<div class="problems-grid">\\n\` + 
          guidedChunk.map(ex => \`  <div class="problem-box"><strong>\${ex.question}</strong></div>\\n\`).join('') + 
          \`</div>\`;
    }

    // Group Practice (next 2 problems)
    let groupHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length >= 4) {
      const groupChunk = plan.structured_exemplars.slice(2, 4);
      groupHTML = \`<div class="problems-grid">\\n\` + 
          groupChunk.map(ex => \`  <div class="problem-box"><strong>\${ex.question}</strong></div>\\n\`).join('') + 
          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 10)">10:00</div>\`;
    }

    // Independent Practice (remaining problems)
    if (plan.structured_exemplars && plan.structured_exemplars.length > 4) {
      const indChunk = plan.structured_exemplars.slice(4);
      for (let i = 0; i < indChunk.length; i += 6) {
        const chunk = indChunk.slice(i, i + 6);
        const chunkHTML = \`<div class="problems-grid">\\n\` + 
          chunk.map((ex, idx) => \`  <div class="problem-box"><strong>\${i + idx + 5}. \${ex.question}</strong></div>\\n\`).join('') + 
          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`;
        problemsSlides.push({ title: "11. Independent Practice", content: chunkHTML });
      }
    } else {
      problemsSlides.push({ 
        title: "11. Independent Practice", 
        content: \`<strong>Directions:</strong>\\n\${plan.independent_practice || 'Complete the assigned independent practice problems quietly.'}\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`
      });
    }`;

const newPresent = `    const problemsSlides = [];

    let guidedHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      const guidedChunk = plan.structured_exemplars.slice(0, 2);
      guidedHTML = \`<div class="problems-grid">\\n\` + 
          guidedChunk.map(ex => \`  <div class="problem-box"><strong>\${ex.question}</strong></div>\\n\`).join('') + 
          \`</div>\`;
    }

    let groupHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 2) {
      const groupChunk = plan.structured_exemplars.slice(2, 6);
      groupHTML = \`<div class="problems-grid">\\n\` + 
          groupChunk.map(ex => \`  <div class="problem-box"><strong>\${ex.question}</strong></div>\\n\`).join('') + 
          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 10)">10:00</div>\`;
    }

    if (plan.structured_exemplars && plan.structured_exemplars.length > 6) {
      const indChunk = plan.structured_exemplars.slice(6);
      for (let i = 0; i < indChunk.length; i += 5) {
        const chunk = indChunk.slice(i, i + 5);
        const chunkHTML = \`<div class="problems-grid">\\n\` + 
          chunk.map((ex, idx) => \`  <div class="problem-box"><strong>\${i + idx + 7}. \${ex.question}</strong></div>\\n\`).join('') + 
          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`;
        problemsSlides.push({ title: "11. Independent Practice", content: chunkHTML });
      }
    } else {
      problemsSlides.push({ 
        title: "11. Independent Practice", 
        content: \`<strong>Directions:</strong>\\n\${plan.independent_practice || 'Complete the assigned independent practice problems quietly.'}\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`
      });
    }`;

content = content.replace(oldPresent, newPresent);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
console.log('Patched');
