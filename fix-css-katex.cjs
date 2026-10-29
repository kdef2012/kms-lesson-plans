const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// Add overflow logic to handle KaTeX and long text
code = code.replace(/\.problem-box \{ \r?\n\s*word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; hyphens: auto; \r?\n\s*border: 2px solid #cbd5e1;/, 
  ".problem-box { \n              word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; hyphens: auto; overflow: auto; max-width: 100%; \n              border: 2px solid #cbd5e1;");

code = code.replace(/body \{ margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient\(135deg, #6a0dad, #008080\); color: #1e293b; overflow: hidden; \}/,
  "body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #6a0dad, #008080); color: #1e293b; overflow: hidden; }\n            .katex-display { overflow-x: auto; overflow-y: hidden; max-width: 100%; }\n            .katex { max-width: 100%; white-space: normal; word-wrap: break-word; }");

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed KaTeX CSS!");
