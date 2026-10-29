const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

// Replace duplicate const cfuText
code = code.replace(/const cfuText = plan\.checks_for_understanding &&/g, "let cfuText2 = plan.checks_for_understanding &&");
code = code.replace(/\$\{cfuText\}\\n\\n<div class="timer" onclick="startTimer\(this, 2\)">2:00<\/div>/g, "${cfuText2}\\n\\n<div class=\"timer\" onclick=\"startTimer(this, 2)\">2:00</div>");

fs.writeFileSync(path, code);
console.log("Fixed duplicate cfuText.");
