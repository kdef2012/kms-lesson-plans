const fs = require('fs');

const imgPath = 'C:/Users/kdnelson/.gemini/antigravity/brain/58079af7-1a4b-4ae3-8f7f-976dc59ae725/.user_uploaded/media_1789781995779.jpg';
const img = fs.readFileSync(imgPath);
const base64 = img.toString('base64');
const base64Src = 'data:image/jpeg;base64,' + base64;

let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// The code currently has `<img src="' + window.location.origin + '/owl.jpg"` everywhere because of my previous script
code = code.replace(/<img src="\' \+ window\.location\.origin \+ '\/owl\.jpg"/g, '<img src="' + base64Src + '"');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Applied base64 owl everywhere!');
