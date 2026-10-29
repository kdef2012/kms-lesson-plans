const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// Replace all relative owl.jpg with explicitly absolute ones just in case the base tag fails in some browsers
code = code.replace(/<img src="\/owl\.jpg"/g, '<img src="\' + window.location.origin + \'/owl.jpg"');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Fixed img tags!');
