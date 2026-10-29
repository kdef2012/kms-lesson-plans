const fs = require('fs');

let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const old_code = `    let guidedHTML = '';
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
    } else {`;

const new_code = `    let guidedHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {
      const guidedChunk = plan.structured_exemplars.slice(0, 2);
      guidedHTML = \`<div class="problems-grid">\\n\` + 
          guidedChunk.map(ex => \`  <div class="problem-box"><strong>\${renderMath(ex.question)}</strong></div>\\n\`).join('') + 
          \`</div>\`;
    }

    // Group Practice (next 4 problems)
    let groupHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length >= 6) {
      const groupChunk = plan.structured_exemplars.slice(2, 6);
      groupHTML = \`<div class="problems-grid">\\n\` + 
          groupChunk.map(ex => \`  <div class="problem-box"><strong>\${renderMath(ex.question)}</strong></div>\\n\`).join('') + 
          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 10)">10:00</div>\`;
    }

    // Independent Practice (remaining 10 problems on one slide)
    if (plan.structured_exemplars && plan.structured_exemplars.length > 6) {
      const indChunk = plan.structured_exemplars.slice(6);
      const chunkHTML = \`<div class="problems-grid" style="grid-template-columns: repeat(4, 1fr); font-size: 14px;">\\n\` + 
        indChunk.map((ex, idx) => \`  <div class="problem-box" style="padding: 10px;"><strong>\${idx + 7}. \${renderMath(ex.question)}</strong></div>\\n\`).join('') + 
        \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`;
      problemsSlides.push({ title: "11. Independent Practice (All 10)", content: chunkHTML });
    } else {`;

if (content.includes(old_code)) {
    content = content.replace(old_code, new_code);
    fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
    console.log("Replaced successfully!");
} else {
    console.log("Could not find the old code block!");
}
