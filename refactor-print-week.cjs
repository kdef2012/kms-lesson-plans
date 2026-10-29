const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// 1. Add weekPlans to props
code = code.replace('const LessonPlanViewer = ({ plan, viewerPin, adminName }) => {', 'const LessonPlanViewer = ({ plan, weekPlans, viewerPin, adminName }) => {');

// 2. Extract buildSlideshowHTML
let startIdx = code.indexOf('const handlePrintSlideshow = () => {');
let cfuMatchIdx = code.indexOf('const cfuMatch = plan', startIdx);
let endIdx = code.indexOf('const html = `', cfuMatchIdx);

let htmlBuilderCode = code.substring(cfuMatchIdx, endIdx);

// Replace `plan` with `p` inside htmlBuilderCode
htmlBuilderCode = htmlBuilderCode.replace(/plan\./g, 'p.');

let buildFunc = `
    const buildSlideshowHTML = (p) => {
        ${htmlBuilderCode}
        return slideHTML;
    };
`;

let newHandlePrintSlideshow = `
    const handlePrintSlideshow = () => {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Slideshow popup was blocked! Please allow popups.");
        return;
      }
      
      const slideHTML = buildSlideshowHTML(plan);
`;

let weekPrintFunc = `
    const handlePrintWeekSlideshows = () => {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert("Slideshow popup was blocked! Please allow popups.");
        return;
      }
      
      if (!weekPlans || weekPlans.length === 0) return;
      
      const slideHTML = weekPlans.map(p => buildSlideshowHTML(p)).join('<div style="page-break-after: always; height: 0; padding: 0; border: none; margin: 0;"></div>');
      
      const html = \`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Week Slideshows</title>
            <link href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" rel="stylesheet">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background: #f0f2f5; }
              .slide-page { width: 1024px; height: 768px; margin: 20px auto; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); overflow: hidden; position: relative; display: flex; flex-direction: column; page-break-after: always; }
              .slide-header { background: linear-gradient(135deg, var(--kms-teal), var(--kms-teal-dark)); color: white; padding: 20px 40px; font-size: 32px; font-weight: bold; }
              .slide-content { padding: 40px; flex: 1; font-size: 28px; line-height: 1.6; }
              .slide-content p { margin-bottom: 20px; }
              .timer { font-size: 72px; font-weight: bold; text-align: center; font-family: monospace; color: var(--kms-purple); margin: 40px 0; cursor: pointer; }
              :root { --kms-teal: #008080; --kms-teal-dark: #004c4c; --kms-purple: #4B0082; --kms-purple-dark: #2a004c; }
              @media print { body { background: white; } .slide-page { border: none; box-shadow: none; width: 100%; height: 100vh; } }
            </style>
          </head>
          <body>
            \${slideHTML}
            <script>
              function startTimer(element, minutes) {
                if (element.dataset.running === 'true') return;
                element.dataset.running = 'true';
                let time = minutes * 60;
                let interval = setInterval(() => {
                  time--;
                  let m = Math.floor(time / 60);
                  let s = time % 60;
                  element.innerText = m + ':' + (s < 10 ? '0' : '') + s;
                  if (time <= 0) {
                    clearInterval(interval);
                    element.innerText = "Time's Up!";
                    element.style.color = "red";
                    element.dataset.running = 'false';
                  }
                }, 1000);
              }
              window.onload = function() { setTimeout(() => window.print(), 1000); };
            </script>
            <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
            <script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);</script>
          </body>
        </html>\`;
      
      printWindow.document.write(html);
      printWindow.document.close();
    };
`;

let endOfHandlePrintSlideshowIdx = code.indexOf('    };', endIdx) + 6;

// Insert buildFunc before handlePrintSlideshow
// Insert weekPrintFunc after handlePrintSlideshow
code = code.substring(0, startIdx) + buildFunc + newHandlePrintSlideshow + code.substring(endIdx, endOfHandlePrintSlideshowIdx) + '\n\n' + weekPrintFunc + code.substring(endOfHandlePrintSlideshowIdx);

// Now add the button!
let btnIdx = code.lastIndexOf('<button onClick={handlePrintSlideshow}');
let pdfUrlIdx = code.indexOf('{plan.pdf_url && (', btnIdx);
let endButtonGroupIdx = code.indexOf('</div>', pdfUrlIdx) + 6;

let weekButtonsHTML = `
        {weekPlans && weekPlans.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
            <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'var(--kms-purple)', marginRight: '10px' }}>Entire Week:</span>
            <button onClick={handlePrintWeekSlideshows} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Print Slideshows
            </button>
          </div>
        )}
`;

code = code.substring(0, endButtonGroupIdx) + weekButtonsHTML + code.substring(endButtonGroupIdx);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Done!');
