const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');
const regex = /\{ title: "2\. Classroom Expectations", content:(.+?)\},/;
const match = code.match(regex);
console.log(match ? match[1].substring(0, 100) + '... (truncated)' : 'Not found');
