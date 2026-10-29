import fs from "fs";

const file = "src/components/LessonPlanViewer.jsx";
let content = fs.readFileSync(file, "utf8");

// 1. Remove the image from "3. Today @ A Glance" in buildSlideshowHTML
const oldGlance = '{ title: "3. Today @ A Glance", content: `<div style="display: flex; justify-content: center; margin-top: 20px;"><img src="https://images.unsplash.com/photo-1632516643720-e7f0d7e6a604?q=80&w=600&auto=format&fit=crop" alt="Math" style="height: 180px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" crossorigin="anonymous" /></div>\\n\\n**SWBAT (Objective):**\\n${p.objective_3m || \'\'}\\n\\n**Essential question of the day:**\\n${getEssentialQuestion(p.objective_3m)}\\n\\n**Agenda**\\n- Do Now - completed\\n- Notes - Direct Instruction\\n- Guided & Group Practice: We Do\\n- Independent Practice\\n- Exit Ticket` },';
const newGlance = '{ title: "3. Today @ A Glance", content: `**SWBAT (Objective):**\\n${p.objective_3m || \'\'}\\n\\n**Essential question of the day:**\\n${getEssentialQuestion(p.objective_3m)}\\n\\n**Agenda**\\n- Do Now - completed\\n- Notes - Direct Instruction\\n- Guided & Group Practice: We Do\\n- Independent Practice\\n- Exit Ticket` },';
content = content.replace(oldGlance, newGlance);

// 2. Change the Independent Practice logic in buildSlideshowHTML to put EVERY problem on its own slide
const oldIndepLogic = `
      // Independent Practice (remaining 10 problems on one slide)
      if (p.structured_exemplars && p.structured_exemplars.length > 0) {
        const indChunk = p.structured_exemplars.slice(6, 16);
        const chunkHTML = \`<div class="problems-grid" style="grid-template-columns: repeat(2, 1fr); gap: 20px; font-size: 16px;">
\` + 
          indChunk.map((ex, idx) => \`  <div class="problem-box" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;"><strong>\${idx + 1}. \${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}</strong></div>
\`).join('') + 
          \`</div>\`;
        problemsSlides.push({ title: "11. Independent Practice (All 10)", content: chunkHTML });
      } else {
`;
const newIndepLogic = `
      // Independent Practice (every problem on its own slide for printing)
      if (p.structured_exemplars && p.structured_exemplars.length > 0) {
        const indChunk = p.structured_exemplars.slice(6, 16);
        indChunk.forEach((ex, idx) => {
          problemsSlides.push({
            title: \`11. Independent Practice (Problem \${idx + 1})\`,
            content: \`<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
\${renderQuestionContent(ex, idx)}
</div>\`
          });
        });
      } else {
`;
content = content.replace(oldIndepLogic, newIndepLogic);

fs.writeFileSync(file, content);
console.log("Patched LessonPlanViewer.jsx for Print Slideshow.");
