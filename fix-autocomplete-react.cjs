const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

code = code.replace(/autocomplete="new-password"/, 'autoComplete="new-password"');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed autocomplete React!");
