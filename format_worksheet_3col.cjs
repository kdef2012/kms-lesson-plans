const fs = require('fs');

let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const newHandlePrintWorksheet = `  const handlePrintWorksheet = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Worksheet popup was blocked! Please allow popups.");
      return;
    }
    
    let worksheetProblemsHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      worksheetProblemsHTML = plan.structured_exemplars.map((ex, i) => {
        return \`
          <div style="margin-bottom: 10px; break-inside: avoid;">
            <p style="font-size: 14px; margin-bottom: 4px; margin-top: 0;"><strong>\${i + 1}.</strong> \${renderMath(ex.question)}</p>
            <div style="border: 1px solid #aaa; height: 80px; border-radius: 4px;"></div>
          </div>
        \`;
      }).join('');
    }

    const doNowContent = renderMath(plan.do_now || '');
    const exitTicketContent = renderMath(plan.exit_ticket || '');

    const html = 
      '<html>' +
        '<head>' +
          '<title>' + plan.topic + ' - Worksheet</title>' +
          '<link rel="stylesheet" href="' + window.location.origin + '/katex/katex.min.css">' +
          '<style>' +
            'body { font-family: \\'Segoe UI\\', Tahoma, Geneva, Verdana, sans-serif; padding: 10px 20px; line-height: 1.3; color: #333; }' +
            '.header { display: flex; justify-content: space-between; border-bottom: 2px solid #2d3748; padding-bottom: 5px; margin-bottom: 10px; font-size: 14px; }' +
            'h2 { text-align: center; color: #2d3748; margin-top: 0; margin-bottom: 10px; font-size: 18px; }' +
            'h3 { color: #4a5568; margin-top: 10px; margin-bottom: 5px; font-size: 14px; border-bottom: 1px solid #eee; padding-bottom: 3px; }' +
            '.box { border: 1px solid #aaa; height: 60px; margin-bottom: 10px; border-radius: 4px; }' +
            '.problems-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; }' +
            '@media print { body { padding: 0; margin: 0.5in; } }' +
          '</style>' +
        '</head>' +
        '<body>' +
          '<div class="header">' +
            '<div><strong>Name:</strong> _________________________________</div>' +
            '<div><strong>Date:</strong> ____________________</div>' +
          '</div>' +
          '<h2>' + plan.topic + '</h2>' +
          
          (doNowContent ? 
            '<h3>Warm Up (Do Now)</h3>' +
            '<p style="font-size: 14px; white-space: pre-wrap; margin-top: 3px; margin-bottom: 3px;">' + doNowContent + '</p>' +
            '<div class="box"></div>'
          : '') +

          '<h3>Practice Problems</h3>' +
          '<div class="problems-grid">' +
          worksheetProblemsHTML +
          '</div>' +
          
          (exitTicketContent ? 
            '<h3 style="page-break-before: auto;">Exit Ticket</h3>' +
            '<p style="font-size: 14px; white-space: pre-wrap; margin-top: 3px; margin-bottom: 3px;">' + exitTicketContent + '</p>' +
            '<div class="box" style="height: 80px;"></div>'
          : '') +

          '<script>' +
            'window.onload = function() { setTimeout(() => window.print(), 500); };' +
          '</script>' +
        '</body>' +
      '</html>';
      
    printWindow.document.write(html);
    printWindow.document.close();
  };`;

const startIndex = content.indexOf('const handlePrintWorksheet = () => {');
const endIndex = content.indexOf('  const handlePresent = () => {');

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newHandlePrintWorksheet + '\n\n' + content.substring(endIndex);
  fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
  console.log("Successfully replaced handlePrintWorksheet with 3 columns!");
} else {
  console.log("Could not find bounds.");
}
