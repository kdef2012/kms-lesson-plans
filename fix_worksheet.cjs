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
          <div style="margin-bottom: 30px;">
            <p style="font-size: 18px;"><strong>\${i + 1}.</strong> \${renderMath(ex.question)}</p>
            <div style="border: 1px solid #aaa; height: 150px; margin-top: 10px; border-radius: 4px;"></div>
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
            'body { font-family: \\'Segoe UI\\', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; line-height: 1.6; color: #333; }' +
            '.header { display: flex; justify-content: space-between; border-bottom: 2px solid #2d3748; padding-bottom: 15px; margin-bottom: 30px; font-size: 18px; }' +
            'h2 { text-align: center; color: #2d3748; margin-bottom: 40px; }' +
            'h3 { color: #4a5568; margin-top: 30px; }' +
            '.box { border: 1px solid #aaa; height: 120px; margin-bottom: 30px; border-radius: 4px; }' +
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
            '<p style="font-size: 18px; white-space: pre-wrap;">' + doNowContent + '</p>' +
            '<div class="box"></div>'
          : '') +

          '<h3>Practice Problems</h3>' +
          worksheetProblemsHTML +
          
          (exitTicketContent ? 
            '<h3>Exit Ticket</h3>' +
            '<p style="font-size: 18px; white-space: pre-wrap;">' + exitTicketContent + '</p>' +
            '<div class="box"></div>'
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
  console.log("Successfully replaced handlePrintWorksheet!");
} else {
  console.log("Could not find bounds.");
}
