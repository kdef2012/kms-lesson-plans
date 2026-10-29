const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

code = code.replace(/<img src="\$\{window\.location\.origin\}\/owl\.jpg"/g, '<img src="\' + window.location.origin + \'/owl.jpg"');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed string interpolation!");
