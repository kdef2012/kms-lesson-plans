const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// 1. Add vibrant gradient to body and white background to content-wrapper
code = code.replace(/body \{\s*margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\s*background-color: #f8fafc; color: #1e293b; overflow: hidden;\s*\}/, 
  "body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #6a0dad, #008080); color: #1e293b; overflow: hidden; }");

code = code.replace(/\.content-wrapper \{ width: 100%; max-width: 1400px; \}/, 
  ".content-wrapper { width: 100%; max-width: 1400px; background: rgba(255, 255, 255, 0.95); padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }");

code = code.replace(/h1 \{ font-size: 3\.5vw; color: #00e676; margin-bottom: 15px; text-align: center; text-transform: uppercase; font-weight: bold; letter-spacing: 2px;\}/, 
  "h1 { font-size: 3.5vw; color: #300052; margin-bottom: 25px; text-align: center; text-transform: uppercase; font-weight: bold; letter-spacing: 2px;}");

// 2. Add confetti script to head
code = code.replace(/<link rel="stylesheet" href="\$\{window\.location\.origin\}\/katex\/katex\.min\.css">/, 
  '<link rel="stylesheet" href="${window.location.origin}/katex/katex.min.css">\n          <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>');

// 3. Trigger confetti in renderSlide()
const triggerConfetti = `
              if (parsedContent.includes('confetti-container')) {
                 setTimeout(() => {
                   if(window.confetti) window.confetti({particleCount: 200, spread: 180});
                 }, 300);
              }
`;
code = code.replace(/document\.getElementById\('progress'\)\.innerText = \(current \+ 1\) \+ ' \/ ' \+ slides\.length;/, 
  triggerConfetti + "\n              document.getElementById('progress').innerText = (current + 1) + ' / ' + slides.length;");

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Patched styling!");
