const fs = require('fs');

let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const helper = `
  const renderMath = (text) => {
    if (!text) return "";
    let t = text.replace(/\\bpi\\b/gi, '\\\\pi');
    if (!window.katex) return t;
    try {
      t = t.replace(/\\$\\$([\\s\\S]*?)\\$\\$/g, (m, math) => window.katex.renderToString(math, {displayMode: true, throwOnError: false}));
      t = t.replace(/\\$([^\\n]*?)\\$/g, (m, math) => window.katex.renderToString(math, {displayMode: false, throwOnError: false}));
      return t;
    } catch (e) {
      return text;
    }
  };
`;

// Insert the helper at the start of LessonPlanViewer component
content = content.replace('const LessonPlanViewer = ({ plan, viewerPin, adminName }) => {', 'const LessonPlanViewer = ({ plan, viewerPin, adminName }) => {' + helper);

// Update Worksheet
content = content.replace(/const q = ex.question.replace\(\/\\bpi\\b\/gi, '\$\\\\pi'\);/g, 'const q = renderMath(ex.question);');

// Remove KaTeX scripts and tryRender from Worksheet
content = content.replace(/<script src="\$\{window\.location\.origin\}\/katex\/katex\.min\.js"><\/script>\s*<script src="\$\{window\.location\.origin\}\/katex\/auto-render\.min\.js"><\/script>/g, '');
const worksheetTryRenderRegex = /let retries = 0;\s*function tryRender\(\) \{[\s\S]*?\}\s*window\.onload = tryRender;/;
content = content.replace(worksheetTryRenderRegex, 'window.onload = function() { setTimeout(() => window.print(), 500); };');

// Update Presentation to use renderMath
const oldPresentGuided = `guidedHTML = \`<div class="problems-grid">\\n\` + \n          guidedChunk.map(ex => \`  <div class="problem-box"><strong>\${ex.question}</strong></div>\\n\`).join('') + \n          \`</div>\`;`;
const newPresentGuided = `guidedHTML = \`<div class="problems-grid">\\n\` + \n          guidedChunk.map(ex => \`  <div class="problem-box"><strong>\${renderMath(ex.question)}</strong></div>\\n\`).join('') + \n          \`</div>\`;`;
content = content.replace(oldPresentGuided, newPresentGuided);

const oldPresentGroup = `groupHTML = \`<div class="problems-grid">\\n\` + \n          groupChunk.map(ex => \`  <div class="problem-box"><strong>\${ex.question}</strong></div>\\n\`).join('') + \n          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 10)">10:00</div>\`;`;
const newPresentGroup = `groupHTML = \`<div class="problems-grid">\\n\` + \n          groupChunk.map(ex => \`  <div class="problem-box"><strong>\${renderMath(ex.question)}</strong></div>\\n\`).join('') + \n          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 10)">10:00</div>\`;`;
content = content.replace(oldPresentGroup, newPresentGroup);

const oldPresentIndep = `chunkHTML = \`<div class="problems-grid">\\n\` + \n          chunk.map((ex, idx) => \`  <div class="problem-box"><strong>\${i + idx + 7}. \${ex.question}</strong></div>\\n\`).join('') + \n          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`;`;
const newPresentIndep = `chunkHTML = \`<div class="problems-grid">\\n\` + \n          chunk.map((ex, idx) => \`  <div class="problem-box"><strong>\${i + idx + 7}. \${renderMath(ex.question)}</strong></div>\\n\`).join('') + \n          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`;`;
content = content.replace(oldPresentIndep, newPresentIndep);

// Also replace the 16 problems on one slide if the user wants it!
// They said: "also can we put all 16 questions on 1 slide?"
// Let's modify the independent practice chunking to just put ALL of them on one slide instead of chunks of 5.

const oldIndepLogic = `if (plan.structured_exemplars && plan.structured_exemplars.length > 6) {
      const indChunk = plan.structured_exemplars.slice(6);
      for (let i = 0; i < indChunk.length; i += 5) {
        const chunk = indChunk.slice(i, i + 5);
        const chunkHTML = \`<div class="problems-grid">\\n\` + 
          chunk.map((ex, idx) => \`  <div class="problem-box"><strong>\${i + idx + 7}. \${renderMath(ex.question)}</strong></div>\\n\`).join('') + 
          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`;
        problemsSlides.push({ title: "11. Independent Practice", content: chunkHTML });
      }
    }`;

const newIndepLogic = `if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      // The user requested ALL 16 questions on 1 slide for independent practice.
      // So instead of chunking, we will just map all structured_exemplars.
      const chunkHTML = \`<div class="problems-grid" style="grid-template-columns: repeat(4, 1fr); font-size: 14px;">\\n\` + 
        plan.structured_exemplars.map((ex, idx) => \`  <div class="problem-box" style="padding: 10px;"><strong>\${idx + 1}. \${renderMath(ex.question)}</strong></div>\\n\`).join('') + 
        \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`;
      problemsSlides.push({ title: "11. Independent Practice (All 16)", content: chunkHTML });
    }`;

content = content.replace(oldIndepLogic.replace('renderMath(ex.question)', 'ex.question'), newIndepLogic);

// Remove KaTeX scripts and tryRenderMath from Presentation
content = content.replace(/<script src="\$\{window\.location\.origin\}\/katex\/katex\.min\.js"><\/script>\s*<script src="\$\{window\.location\.origin\}\/katex\/auto-render\.min\.js"><\/script>/g, '');
const presentTryRenderRegex = /let retries = 0;\s*function tryRenderMath\(\) \{[\s\S]*?\}\s*tryRenderMath\(\);/;
content = content.replace(presentTryRenderRegex, '');


fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
console.log('Patched');
