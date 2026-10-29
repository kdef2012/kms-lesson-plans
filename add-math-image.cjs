const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

const mathImage = `<div style="display: flex; justify-content: center; margin-top: 20px;"><img src="https://images.unsplash.com/photo-1632516643720-e7f0d7e6a604?q=80&w=600&auto=format&fit=crop" alt="Math" style="height: 180px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);" crossorigin="anonymous" /></div>`;

// Add it to Today @ A Glance
code = code.replace(/content: `\*\*SWBAT \(Objective\):\*\*/, 'content: `' + mathImage + '\\n\\n**SWBAT (Objective):**');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Added external math image!');
