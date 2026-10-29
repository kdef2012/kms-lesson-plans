const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// Get the base64 png string that is currently appended
const base64Match = code.match(/<img src="data:image\/png;base64,[^"]+"/);
if (!base64Match) {
  console.log("Error: could not find png base64!");
  process.exit(1);
}
const owlImgTag = base64Match[0] + ' alt="Owl" style="height: 350px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);" />';

// Replace the expectationsContent entirely
const newExpectations = `expectationsContent = \`<div style="display: flex; align-items: center; justify-content: space-around; padding: 20px;">
        <ul style="font-size: 32px; line-height: 2.2;">
          <li>No Cellphones</li>
          <li>Drop pencils when completed</li>
          <li>Communicate with respect</li>
          <li>Raise your hand</li>
        </ul>
        <div>${owlImgTag}</div>
      </div>\`;`;

code = code.replace(/expectationsContent = `<div style="display: flex;[\s\S]*?<\/div>`;/, newExpectations);

// Remove the old appended owl from baseSlides
const oldSlideRegex = /\{ title: "2\. Classroom Expectations", content: expectationsContent \+ '<div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;"><img src="data:image\/png;base64,[^"]+" alt="Owl" style="height: 250px; border-radius: 20px; box-shadow: 0 10px 25px rgba\(0,0,0,0\.2\);" \/><\/div>' \},/;
code = code.replace(oldSlideRegex, '{ title: "2. Classroom Expectations", content: expectationsContent },');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Fixed expectations slide and removed ??');
