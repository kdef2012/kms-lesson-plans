const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// Replace literal </script> with </' + 'script> inside the confetti tags I added
code = code.replace(/<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/canvas-confetti@1\.6\.0\/dist\/confetti\.browser\.min\.js"><\/script>/g, '<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></\' + \'script>\'');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Patched script tags!");
