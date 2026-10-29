const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// Add word-break logic to problem-box
code = code.replace(/\.problem-box \{ \r?\n\s*border: 2px solid #cbd5e1;/, 
  ".problem-box { \n              word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; hyphens: auto; \n              border: 2px solid #cbd5e1;");

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed CSS!");
