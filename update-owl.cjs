const fs = require('fs');

// Read the new user uploaded image
const imgPath = 'C:/Users/kdnelson/.gemini/antigravity/brain/58079af7-1a4b-4ae3-8f7f-976dc59ae725/.user_uploaded/media_1789781995779.jpg';
const img = fs.readFileSync(imgPath);
const base64 = img.toString('base64');

// Copy it to public/owl.jpg just in case
fs.writeFileSync('public/owl.jpg', img);

// Update LessonPlanViewer.jsx
const jsxPath = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(jsxPath, 'utf8');

// Replace the old base64 string
code = code.replace(/data:image\/jpeg;base64,[^"]+/, 'data:image/jpeg;base64,' + base64);

fs.writeFileSync(jsxPath, code);
console.log('Successfully updated the owl image!');
