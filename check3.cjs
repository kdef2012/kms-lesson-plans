const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');
const regex = /\{ title: "3\. Today @ A Glance", content:(.+?)\},/;
const match = code.match(regex);
console.log(match ? match[1] : 'Not found');
