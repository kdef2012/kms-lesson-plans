const fs = require('fs');

let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const target = "content = content.replace(/\\bpi\\b/gi, '$\\\\\\\\pi$');";
const replacement = "content = content.replace(/\\bpi\\b/gi, '$\\\\\\\\pi$');\n      content = renderMath(content);";

if (content.includes(target)) {
  content = content.split(target).join(replacement);
  fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
  console.log("Replaced successfully!");
} else {
  console.log("Could not find target!");
}
