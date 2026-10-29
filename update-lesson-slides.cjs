const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

// 1. Update the indChunk to use the slice
code = code.replace(/const indChunk = plan\.structured_exemplars;/, `const indChunk = plan.structured_exemplars.slice(6, 16);`);

// 2. Update the Presentation slides to separate the 6 problems into individual slides
const slideRegex = /let guidedHTML = '';\s*if \(plan\.structured_exemplars && plan\.structured_exemplars\.length >= 2\) \{\s*const guidedChunk = plan\.structured_exemplars\.slice\(0, 2\);\s*guidedHTML = `<div class="problems-grid">\\n` \+\s*guidedChunk\.map\(ex => `  <div class="problem-box"><strong>\$\{renderQuestionContent\(ex\)\}<\/strong><\/div>\\n`\)\.join\(''\) \+\s*`<\/div>\\n\\n<div class="timer" onclick="startTimer\(this, 10\)">10:00<\/div>`;\s*\}\s*\/\/ Group Practice \(next 4 problems\)\s*let groupHTML = '';\s*if \(plan\.structured_exemplars && plan\.structured_exemplars\.length >= 6\) \{\s*const groupChunk = plan\.structured_exemplars\.slice\(2, 6\);\s*groupHTML = `<div class="problems-grid">\\n` \+\s*groupChunk\.map\(\(ex, idx\) => `  <div class="problem-box"><strong>\$\{idx \+ 1\}\. \$\{renderQuestionContent\(ex\)\}<\/strong><\/div>\\n`\)\.join\(''\) \+\s*`<\/div>\\n\\n<div class="timer" onclick="startTimer\(this, 10\)">10:00<\/div>`;\s*\}/;

const newSlideLogic = `
      // Guided Practice (2 problems - separate slides)
      const guidedSlides = [];
      if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {
        const guidedChunk = plan.structured_exemplars.slice(0, 2);
        guidedChunk.forEach((ex, idx) => {
          guidedSlides.push({
            title: \`8. Guided Practice (Problem \${idx + 1})\`,
            content: \`<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">\n\${renderQuestionContent(ex)}\n</div>\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>\`
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
            content: \`<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">\n\${renderQuestionContent(ex)}\n</div>\n\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>\`
          });
        });
      }
`;

code = code.replace(slideRegex, newSlideLogic);

// 3. Inject the arrays into the `baseSlides` instead of the string properties
const baseSlidesRegex = /\{\s*title: "8\. Guided Practice",\s*content: guidedHTML\s*\}/g;
code = code.replace(baseSlidesRegex, `...guidedSlides`);

const baseSlidesRegex2 = /\{\s*title: "10\. Group Practice",\s*content: groupHTML\s*\}/g;
code = code.replace(baseSlidesRegex2, `...groupSlides`);

fs.writeFileSync(path, code);
console.log("Updated LessonPlanViewer slides to split up the 6 questions!");
