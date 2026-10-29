import fs from "fs";
const file = "src/components/LessonPlanViewer.jsx";
let content = fs.readFileSync(file, "utf8");

const oldStr = `      // Independent Practice (every problem on its own slide for printing)
      if (p.structured_exemplars && p.structured_exemplars.length > 0) {
        const indChunk = p.structured_exemplars.slice(6, 16);
        indChunk.forEach((ex, idx) => {`;

const newStr = `      // Independent Practice (every problem on its own slide for printing)
      if (p.structured_exemplars && p.structured_exemplars.length > 0) {
        problemsSlides.push({ 
          title: "11. Independent Practice (Directions)", 
          content: \`<strong>Directions:</strong>\\n\${p.independent_practice || 'Complete the assigned independent practice problems quietly.'}\`
        });
        
        const indChunk = p.structured_exemplars.slice(6, 16);
        indChunk.forEach((ex, idx) => {`;

content = content.replace(oldStr, newStr);
fs.writeFileSync(file, content);
console.log("Patched LessonPlanViewer to show IP Directions slide in Print mode!");
