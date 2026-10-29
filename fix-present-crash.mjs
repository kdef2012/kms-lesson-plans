import fs from "fs";

const file = "src/components/LessonPlanViewer.jsx";
let content = fs.readFileSync(file, "utf8");

// Find the bad block in handlePresent and fix it
const oldBadLogic = `    // Independent Practice (every problem on its own slide for printing)
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
      problemsSlides.push({ 
        title: "11. Independent Practice", 
        content: \`<strong>Directions:</strong>\\n\${plan.independent_practice || 'Complete the assigned independent practice problems quietly.'}\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`
      });
    }`;

const newGoodLogic = `    // Independent Practice (every problem on its own slide for presentation)
      if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
        const indChunk = plan.structured_exemplars.slice(6, 16);
        indChunk.forEach((ex, idx) => {
          problemsSlides.push({
            title: \`11. Independent Practice (Problem \${idx + 1})\`,
            content: \`<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
\${renderQuestionContent(ex, idx)}
</div>\\n\\n<div class="timer" onclick="startTimer(this, 3)">3:00</div>\`
          });
        });
      } else {
      problemsSlides.push({ 
        title: "11. Independent Practice", 
        content: \`<strong>Directions:</strong>\\n\${plan.independent_practice || 'Complete the assigned independent practice problems quietly.'}\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`
      });
    }`;

// Wait, I might not get the whitespace exactly right. Let's use a smarter replace.
content = content.replace(/      if \(p\.structured_exemplars && p\.structured_exemplars\.length > 0\) \{\n        const indChunk = p\.structured_exemplars\.slice\(6, 16\);\n        indChunk\.forEach\(\(ex, idx\) => \{\n          problemsSlides\.push\(\{\n            title: `11\. Independent Practice \(Problem \$\{idx \+ 1\}\)`,\n            content: `<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">\n\$\{renderQuestionContent\(ex, idx\)\}\n<\/div>`\n          \}\);\n        \}\);\n      \} else \{\n      problemsSlides\.push\(\{ \n        title: "11\. Independent Practice", \n        content: `<strong>Directions:<\/strong>\\n\$\{plan\.independent_practice/, 
`      if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
        const indChunk = plan.structured_exemplars.slice(6, 16);
        indChunk.forEach((ex, idx) => {
          problemsSlides.push({
            title: \`11. Independent Practice (Problem \${idx + 1})\`,
            content: \`<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">\n\${renderQuestionContent(ex, idx)}\n</div>\n\n<div class="timer" onclick="startTimer(this, 3)">3:00</div>\`
          });
        });
      } else {
      problemsSlides.push({ 
        title: "11. Independent Practice", 
        content: \`<strong>Directions:</strong>\\n\${plan.independent_practice`);

fs.writeFileSync(file, content);
console.log("Successfully fixed handlePresent!");
