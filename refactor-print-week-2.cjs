const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// ==== GUIDED NOTES ====
let gnStartIdx = code.indexOf('const handlePrintGuidedNotes = () => {');
let gnIntroIdx = code.indexOf('let guidedNotesHtml = `', gnStartIdx);
let gnEndIdx = code.indexOf('const html = `', gnIntroIdx);
let gnBuilderCode = code.substring(gnIntroIdx, gnEndIdx);

gnBuilderCode = gnBuilderCode.replace(/plan\./g, 'p.');
let gnBuildFunc = `
    const buildGuidedNotesHTML = (p) => {
        ${gnBuilderCode}
        return guidedNotesHtml;
    };
`;
let gnNewHandlePrint = `
    const handlePrintGuidedNotes = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert("Popup was blocked! Please allow popups.");
        return;
    }
    const guidedNotesHtml = buildGuidedNotesHTML(plan);
`;
let gnWeekPrintFunc = `
    const handlePrintWeekGuidedNotes = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert("Popup was blocked! Please allow popups.");
        return;
    }
    if (!weekPlans || weekPlans.length === 0) return;
    
    const guidedNotesHtml = weekPlans.map(p => buildGuidedNotesHTML(p)).join('<div style="page-break-after: always; height: 0; padding: 0; border: none; margin: 0;"></div>');
    
    const html = \`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Week Guided Notes</title>
            <link href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" rel="stylesheet">
            <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; background: white; }
            h1 { color: var(--kms-purple-dark); border-bottom: 2px solid var(--kms-teal); padding-bottom: 10px; margin-bottom: 30px; font-size: 28px; }
            h2 { color: var(--kms-teal-dark); margin-top: 30px; margin-bottom: 15px; font-size: 22px; }
            .section { margin-bottom: 30px; }
            .problem-box { background: #fafafa; border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
            .problem-box h4 { margin-top: 0; color: var(--kms-purple); margin-bottom: 10px; }
            .confetti-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
            :root { --kms-teal: #008080; --kms-teal-dark: #004c4c; --kms-purple: #4B0082; --kms-purple-dark: #2a004c; }
            @media print { body { padding: 0; margin: 0.5in; } }
            .notes-content { font-size: 16px; margin-bottom: 30px; }
            .notes-content p { margin-bottom: 15px; }
            </style>
        </head>
        <body>
            \${guidedNotesHtml}
            <script>window.onload = function() { setTimeout(() => window.print(), 500); };</script>
            <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
            <script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);</script>
        </body>
        </html>\`;
    printWindow.document.write(html);
    printWindow.document.close();
    };
`;
let gnEndOfHandleIdx = code.indexOf('    };', gnEndIdx) + 6;
code = code.substring(0, gnStartIdx) + gnBuildFunc + gnNewHandlePrint + code.substring(gnEndIdx, gnEndOfHandleIdx) + '\n\n' + gnWeekPrintFunc + code.substring(gnEndOfHandleIdx);


// ==== WORKSHEETS ====
let wsStartIdx = code.indexOf('const handlePrintWorksheet = () => {');
let wsIntroIdx = code.indexOf('let worksheetHtml = `', wsStartIdx);
let wsEndIdx = code.indexOf('const html = `', wsIntroIdx);
let wsBuilderCode = code.substring(wsIntroIdx, wsEndIdx);

wsBuilderCode = wsBuilderCode.replace(/plan\./g, 'p.');
let wsBuildFunc = `
    const buildWorksheetHTML = (p) => {
        ${wsBuilderCode}
        return worksheetHtml;
    };
`;
let wsNewHandlePrint = `
    const handlePrintWorksheet = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert("Worksheet popup was blocked! Please allow popups.");
        return;
    }
    const worksheetHtml = buildWorksheetHTML(plan);
`;
let wsWeekPrintFunc = `
    const handlePrintWeekWorksheet = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert("Worksheet popup was blocked! Please allow popups.");
        return;
    }
    if (!weekPlans || weekPlans.length === 0) return;
    
    const worksheetHtml = weekPlans.map(p => buildWorksheetHTML(p)).join('<div style="page-break-after: always; height: 0; padding: 0; border: none; margin: 0;"></div>');
    
    const html = \`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Week Worksheets</title>
            <link href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" rel="stylesheet">
            <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; background: white; }
            h1 { color: var(--kms-purple-dark); border-bottom: 2px solid var(--kms-teal); padding-bottom: 10px; margin-bottom: 30px; font-size: 28px; }
            h2 { color: var(--kms-teal-dark); margin-top: 30px; margin-bottom: 15px; font-size: 22px; }
            .section { margin-bottom: 30px; }
            .problem-box { background: white; border: 1px solid #333; padding: 20px; margin-bottom: 20px; page-break-inside: avoid; min-height: 250px; display: flex; flex-direction: column; overflow: hidden; word-wrap: break-word; hyphens: auto; }
            .problem-box h4 { margin-top: 0; color: #000; margin-bottom: 10px; }
            .confetti-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
            :root { --kms-teal: #008080; --kms-teal-dark: #004c4c; --kms-purple: #4B0082; --kms-purple-dark: #2a004c; }
            @media print { body { padding: 0; margin: 0.5in; } }
            </style>
        </head>
        <body>
            \${worksheetHtml}
            <script>window.onload = function() { setTimeout(() => window.print(), 500); };</script>
            <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
            <script>setTimeout(() => { if(document.querySelector(".confetti-container")) confetti({particleCount: 150, spread: 180}); }, 500);</script>
        </body>
        </html>\`;
    printWindow.document.write(html);
    printWindow.document.close();
    };
`;
let wsEndOfHandleIdx = code.indexOf('    };', wsEndIdx) + 6;
code = code.substring(0, wsStartIdx) + wsBuildFunc + wsNewHandlePrint + code.substring(wsEndIdx, wsEndOfHandleIdx) + '\n\n' + wsWeekPrintFunc + code.substring(wsEndOfHandleIdx);

// ==== ADD BUTTONS ====
// Let's replace the previous Week Buttons block with the new one
let oldWeekButtonsHTML = `<button onClick={handlePrintWeekSlideshows} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Print Slideshows
            </button>`;
let newWeekButtonsHTML = `<button onClick={handlePrintWeekSlideshows} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Slideshows
            </button>
            <button onClick={handlePrintWeekGuidedNotes} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Guided Notes
            </button>
            <button onClick={handlePrintWeekWorksheet} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Worksheets
            </button>`;

code = code.replace(oldWeekButtonsHTML, newWeekButtonsHTML);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Done 2!');
