const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// 1. Fix welcome slide height
code = code.replace(/height: 100%;/g, 'padding: 40px 0;');

// 2. Fix owl image path
code = code.replace(/<img src="\/owl\.jpg"/g, '<img src="${window.location.origin}/owl.jpg"');

// 3. Fix shoutouts hardcoded names
code = code.replace(/\["Bradley Fontaine", "Sarah Jenkins", "Marcus Johnson"\]/g, '["TBD", "TBD", "TBD"]');

// 4. Fix h1 font size
code = code.replace(/h1 \{ font-size: 3\.5vw;/g, 'h1 { font-size: clamp(24px, 3.5vw, 48px);');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed popup bugs!");
