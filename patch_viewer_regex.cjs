const fs = require('fs');

let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

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

const regex = /let guidedHTML = '';\s*if \(plan\.structured_exemplars[\s\S]*?problemsSlides\.push\(\{ title: "11\. Independent Practice", content: chunkHTML \}\);\s*\}\s*\} else \{/;

if (regex.test(content)) {
    content = content.replace(regex, new_code);
    fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
    console.log("Replaced successfully!");
} else {
    console.log("Regex didn't match anything!");
}
