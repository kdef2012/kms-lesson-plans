const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// The base64 owl image has proven unstable in doc.write environments. Replace with absolute URL.
const originUrl = "`<img src=\"${window.location.origin}/owl-transparent.png\" alt=\"Owl\" style=\"height: 350px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);\" />`";

code = code.replace(/<div><img src="data:image\/png;base64,[^"]+" alt="Owl"[^>]+><\/div>/g, "<div>\" + " + originUrl + " + \"</div>");

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Done');
