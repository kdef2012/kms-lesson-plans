const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

code = code.replace(/renderQuestionContent\(ex\)/g, 'renderQuestionContent(ex, idx || i || 0)');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed MC option calls!");
