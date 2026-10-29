const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

code = code.replace('const LessonPlanViewer = ({ plan, viewerPin, adminName }) => {', 'const LessonPlanViewer = ({ plan, weekPlans, viewerPin, adminName }) => {');

let hpStart = code.indexOf('const handlePrintSlideshow =');
let logicStart = code.indexOf('const cfuMatch', hpStart);
let logicEnd = code.indexOf('const html = \n', logicStart);

let extractedLogic = code.substring(logicStart, logicEnd);

let extractedFuncBody = extractedLogic;
const props = ['topic', 'structured_exemplars', 'direct_instruction', 'objective_3m', 'date_start', 'do_now', 'exit_ticket', 'independent_practice', 'checks_for_understanding'];
for (let prop of props) {
    let regex = new RegExp(`([^a-zA-Z])plan\\.${prop}`, 'g');
    extractedFuncBody = extractedFuncBody.replace(regex, `$1p.${prop}`);
}

let buildSlideshowHTMLFunc = `
    const buildSlideshowHTML = (p) => {
        ${extractedFuncBody}
        return slideHTML;
    };
`;

code = code.substring(0, logicStart) + '\n      const slideHTML = buildSlideshowHTML(plan);\n\n      ' + code.substring(logicEnd);

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
              .slide-page { width: 1024px; height: 768px; margin: 20px auto; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; page-break-after: always; page-break-inside: avoid; position: relative; }
              .slide-header { background: #4B0082; color: white; padding: 25px 40px; font-size: 32px; font-weight: bold; border-bottom: 6px solid #008080; }
              .slide-content { flex: 1; padding: 40px; font-size: 28px; line-height: 1.6; overflow-y: auto; }
              .timer-container { position: absolute; bottom: 30px; right: 40px; }
              .timer { background: #008080; color: white; padding: 10px 25px; border-radius: 30px; font-weight: bold; font-family: monospace; font-size: 32px; border: 3px solid #004c4c; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
              .problem-box { border: 2px solid #ccc; border-radius: 8px; background: white; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
              .problem-header { background: #f8f9fa; padding: 15px 20px; border-bottom: 2px solid #eee; font-weight: bold; color: #4B0082; font-size: 24px; }
              .problem-body { padding: 20px; }
              
              /* Math rendering fixes */
              .katex-display { overflow-x: auto; overflow-y: hidden; max-width: 100%; }
              .katex { max-width: 100%; white-space: normal; word-wrap: break-word; }
              
              @media print {
                @page { size: landscape; margin: 0; }
                body { background: white; }
                .slide-page { margin: 0; box-shadow: none; border-radius: 0; width: 100%; height: 100vh; }
              }
            </style>
          </head>
          <body>
            \${slideHTML}
            <script>window.onload = function() { setTimeout(() => window.print(), 1000); };</script>
            <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
            <script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);</script>
          </body>
        </html>\`;
        
      printWindow.document.write(html);
      printWindow.document.close();
    };
`;

let returnIdx = code.lastIndexOf('return (');
code = code.substring(0, returnIdx) + buildSlideshowHTMLFunc + '\n' + weekPrintFunc + '\n\n  ' + code.substring(returnIdx);

let printButtonsIdx = code.indexOf('<Printer size={18} /> Print Slideshow\n            </button>');
let endOfButtonsIdx = code.indexOf('</div>', printButtonsIdx) + 6;

let newWeekButtonsHTML = `<Printer size={18} /> Print Slideshow
            </button>
            {plan.pdf_url && (
              <a href={plan.pdf_url} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <Download size={18} /> PDF
              </a>
            )}
          </div>
          {weekPlans && weekPlans.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
              <span style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: 'var(--kms-purple)', marginRight: '10px' }}>Entire Week:</span>
              <button onClick={handlePrintWeekSlideshows} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Printer size={18} /> Print Slideshows
              </button>
            </div>
          )}`;

code = code.substring(0, printButtonsIdx) + newWeekButtonsHTML + code.substring(endOfButtonsIdx);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Refactored cleanly!");
