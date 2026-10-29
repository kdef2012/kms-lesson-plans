const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// For handlePresent backtick string
code = code.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/canvas-confetti@1\.6\.0\/dist\/confetti\.browser\.min\.js"><\/script>/, 
  '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js">${"<"}/script>');

code = code.replace(/<\/script>\n          <\/body>\n        <\/html>\n    `;/, 
  '${"<"}/script>\n        </body>\n      </html>\n    `;');

// For single quotes in the other functions
code = code.replace(/'<\/script>' \+ '<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/canvas-confetti@1\.6\.0\/dist\/confetti\.browser\.min\.js"><\/script>' \+ '<script>setTimeout\(\(\) => \{ if\(document\.querySelector\("\.confetti-container"\)\) confetti\(\{particleCount: 150, spread: 180\}\); \}, 500\);<\/script>'/g,
  '"<" + "/script>" + "<script src=\\"https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js\\"><" + "/script>" + "<script>setTimeout(() => { if(document.querySelector(\\".confetti-container\\")) confetti({particleCount: 150, spread: 180}); }, 500);<" + "/script>"');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed!");
