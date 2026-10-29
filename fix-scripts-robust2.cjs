const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

code = code.replace(/<\/script>/g, `\${"<"}/script>`);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed ALL!");
