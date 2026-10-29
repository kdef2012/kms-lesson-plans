const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');
const oldMatches = code.match(/data:image\/jpeg;base64/g) || [];
const newMatches = code.match(/data:image\/png;base64/g) || [];
console.log('Old JPEG matches:', oldMatches.length);
console.log('New PNG matches:', newMatches.length);
