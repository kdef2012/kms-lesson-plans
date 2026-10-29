const fs = require('fs');
let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');
content = content.replace(/\\r\\n/g, '\\n');

const splitPoint1 = '      alert("Popup was blocked! Please allow popups.");\\n      return;\\n    }';
const splitPoint2 = '    printWindow.document.write(html);\\n    printWindow.document.close();\\n  };\\n\\n  const handlePrintWorksheet = () => {';

if (content.indexOf(splitPoint1) === -1 || content.indexOf(splitPoint2) === -1) {
    console.error("Could not find split points");
    console.error("1:", content.indexOf(splitPoint1));
    console.error("2:", content.indexOf(splitPoint2));
    process.exit(1);
}

const before = content.substring(0, content.indexOf(splitPoint1) + splitPoint1.length);
const after = content.substring(content.indexOf(splitPoint2));

const newMiddle = "\\n" +
"    let notesContent = plan.direct_instruction || 'No notes provided.';\\n" +
"    notesContent = renderMath(notesContent);\\n" +
"    const escapedNotes = JSON.stringify(notesContent).replace(/</g, '\\\\u003c');\\n" +
"\\n" +
"    let guidedHTML = '';\\n" +
"    if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {\\n" +
"      const guidedChunk = plan.structured_exemplars.slice(0, 2);\\n" +
"      guidedHTML = guidedChunk.map((ex, i) => {\\n" +
"        return '<div style=\"margin-bottom: 20px; break-inside: avoid;\">' +\\n" +
"          '<p style=\"font-size: 16px; margin-bottom: 5px;\"><strong>Example ' + (i + 1) + '.</strong> ' + renderMath(ex.question) + '</p>' +\\n" +
"          '<div style=\"border: 1px dashed #aaa; height: 120px; border-radius: 4px;\"></div>' +\\n" +
"          '</div>';\\n" +
"      }).join('');\\n" +
"    }\\n" +
"\\n" +
"    const html = \\n" +
"      '<html>' +\\n" +
"        '<head>' +\\n" +
"          '<script src=\"' + window.location.origin + '/marked.min.js\"></script>' +\\n" +
"          '<title>' + plan.topic + ' - Guided Notes</title>' +\\n" +
"          '<link rel=\"stylesheet\" href=\"' + window.location.origin + '/katex/katex.min.css\">' +\\n" +
"          '<style>' +\\n" +
"            'body { font-family: \\'Segoe UI\\', Tahoma, Geneva, Verdana, sans-serif; padding: 20px 40px; line-height: 1.6; color: #333; }' +\\n" +
"            '.header { display: flex; justify-content: space-between; border-bottom: 2px solid #2d3748; padding-bottom: 10px; margin-bottom: 20px; font-size: 16px; }' +\\n" +
"            'h2 { text-align: center; color: #2d3748; margin-top: 0; margin-bottom: 20px; font-size: 20px; }' +\\n" +
"            'h3 { color: #4a5568; margin-top: 15px; margin-bottom: 5px; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px; }' +\\n" +
"            '@media print { body { padding: 0; margin: 0.5in; } }' +\\n" +
"            '.notes-content { font-size: 16px; margin-bottom: 30px; }' +\\n" +
"            '.notes-content p { margin-bottom: 15px; }' +\\n" +
"            '.notes-content hr { border: 0; border-top: 1px dashed #ccc; margin: 20px 0; }' +\\n" +
"          '</style>' +\\n" +
"        '</head>' +\\n" +
"        '<body>' +\\n" +
"          '<div class=\"header\">' +\\n" +
"            '<div><strong>Name:</strong> _________________________________</div>' +\\n" +
"            '<div><strong>Date:</strong> ____________________</div>' +\\n" +
"          '</div>' +\\n" +
"          '<h2>Guided Notes: ' + plan.topic + '</h2>' +\\n" +
"          '<h3>Class Notes</h3>' +\\n" +
"          '<div id=\"notes-content\" class=\"notes-content\">Loading notes...</div>' +\\n" +
"          '<h3>Guided Practice (We Do)</h3>' +\\n" +
"          guidedHTML +\\n" +
"          '<script>' +\\n" +
"            'function initNotes() {' +\\n" +
"              'if (typeof marked !== \"undefined\") {' +\\n" +
"                'let raw = ' + escapedNotes + ';' +\\n" +
"                'let parsed = marked.parse(raw, { breaks: true });' +\\n" +
"                'parsed = parsed.replace(/<strong>(.*?)<\\\\/strong>/g, \\'<strong><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></strong> <span style=\"color: white; font-size: 1px;\">$1</span>\\');' +\\n" +
"                'document.getElementById(\"notes-content\").innerHTML = parsed;' +\\n" +
"                'setTimeout(() => window.print(), 500);' +\\n" +
"              '} else {' +\\n" +
"                'setTimeout(initNotes, 50);' +\\n" +
"              '}' +\\n" +
"            '}' +\\n" +
"            'initNotes();' +\\n" +
"          '</script>' +\\n" +
"        '</body>' +\\n" +
"      '</html>';\\n";

fs.writeFileSync('src/components/LessonPlanViewer.jsx', before + newMiddle + after, 'utf-8');
console.log('Fixed');
