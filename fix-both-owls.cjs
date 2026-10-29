const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// The transparent owl base64 string is already in the file at the top of the first expectationsContent
const match = code.match(/<img src="data:image\/png;base64,[^"]+"/);
if (!match) {
  console.log("Error: could not find png base64!");
  process.exit(1);
}
const owlImgTag = match[0] + ' alt="Owl" style="height: 350px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);" />';

// Replace ALL instances of the expectationsContent div block with the new one
const newExpectations = `expectationsContent = \`<div style="display: flex; align-items: center; justify-content: space-around; padding: 20px;">
        <ul style="font-size: 32px; line-height: 2.2;">
          <li>No Cellphones</li>
          <li>Drop pencils when completed</li>
          <li>Communicate with respect</li>
          <li>Raise your hand</li>
        </ul>
        <div>${owlImgTag}</div>
      </div>\`;`;

// Re-write the regex to match BOTH occurrences
code = code.replace(/expectationsContent = `<div style="display: flex;[\s\S]*?<\/div>`;/g, newExpectations);

// Also remove any appended Base64 owls from the baseSlides array in BOTH places
// It might look like: `content: expectationsContent + '<div...` or similar.
// Wait, I already removed it from the first one. Let's see if the second one still has it.
// The second one was: { title: "2. Classroom Expectations", content: expectationsContent + '<div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;"><img src="data:image/jpeg;base64,... /></div>' }
code = code.replace(/\{ title: "2\. Classroom Expectations", content: expectationsContent \+ '<div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;"><img src="[^"]+" alt="Owl"[^>]+><\/div>' \},/g, '{ title: "2. Classroom Expectations", content: expectationsContent },');

// Also remove if it was appended using window.location.origin
code = code.replace(/\{ title: "2\. Classroom Expectations", content: expectationsContent \+ '<div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;"><img src="' \+ window\.location\.origin \+ '\/owl\.jpg"[^>]+><\/div>' \},/g, '{ title: "2. Classroom Expectations", content: expectationsContent },');

// Also remove if it was just `content: expectationsContent` but we need to ensure no other owls are there.
fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Fixed ALL expectations slides!');
