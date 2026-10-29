const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

code = code.replace(/\.content \{ font-size: 1\.8vw; line-height: 1\.5; \}/, 
  ".content { font-size: clamp(14px, 1.5vw, 24px); line-height: 1.5; }");

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed font size!");
