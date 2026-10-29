import fs from "fs";
const file = "src/components/LessonPlanViewer.jsx";
let content = fs.readFileSync(file, "utf8");

const oldStr = `    // Independent Practice (every problem on its own slide for printing)
      if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
        const indChunk = plan.structured_exemplars.slice(6, 16);
        indChunk.forEach((ex, idx) => {`;

const newStr = `    // Independent Practice (every problem on its own slide for presentation)
      if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
        // Always show the directions first with a 15 min timer
        problemsSlides.push({ 
          title: "11. Independent Practice (Directions)", 
          content: \`<strong>Directions:</strong>\\n\${plan.independent_practice || 'Complete the assigned independent practice problems quietly.'}\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`
        });
        
        const indChunk = plan.structured_exemplars.slice(6, 16);
        indChunk.forEach((ex, idx) => {`;

content = content.replace(oldStr, newStr);
fs.writeFileSync(file, content);
console.log("Patched LessonPlanViewer to show IP Directions slide in Present mode!");
