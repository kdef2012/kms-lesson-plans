const fs = require('fs');
let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const oldTarget = [
"    // Parse direct instruction and replace bold text with blanks",
"    let notesContent = plan.direct_instruction || 'No notes provided.';",
"    notesContent = renderMath(notesContent);",
"    // Convert markdown to HTML but replace **bold** with fill in the blank lines",
"    ",
"    let parsedNotes = marked.parse(notesContent);",
"    parsedNotes = parsedNotes.replace(/<strong>(.*?)<\\/strong>/g, '<strong><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></strong> <span style=\"color: white; font-size: 1px;\">$1</span>');"
].join('\\n');

const newTarget = [
"    let notesContent = plan.direct_instruction || 'No notes provided.';",
"    notesContent = renderMath(notesContent);",
"    const escapedNotes = JSON.stringify(notesContent).replace(/</g, '\\\\u003c');",
"    let parsedNotes = ''; // Fallback if needed, but we will render it in popup"
].join('\\n');

content = content.replace(oldTarget, newTarget);

const oldHtml1 = "'<head>' +";
const newHtml1 = "'<head>' +" + "\\n          '<script src=\"' + window.location.origin + '/marked.min.js\"></script>' +";
content = content.replace(oldHtml1, newHtml1);

const oldHtml2 = "'<div class=\"notes-content\">' + parsedNotes + '</div>' +";
const newHtml2 = "'<div id=\"notes-content\" class=\"notes-content\">Loading notes...</div>' +";
content = content.replace(oldHtml2, newHtml2);

const oldScript = "'window.onload = function() { setTimeout(() => window.print(), 500); };' +";
const newScript = "'function initNotes() {' +" +
"  'if (typeof marked !== \"undefined\") {' +" +
"    'let raw = ' + escapedNotes + ';' +" +
"    'let parsed = marked.parse(raw, { breaks: true });' +" +
"    'parsed = parsed.replace(/<strong>(.*?)<\\\\/strong>/g, \\'<strong><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></strong> <span style=\"color: white; font-size: 1px;\">$1</span>\\');' +" +
"    'document.getElementById(\"notes-content\").innerHTML = parsed;' +" +
"    'setTimeout(() => window.print(), 500);' +" +
"  '} else {' +" +
"    'setTimeout(initNotes, 50);' +" +
"  '}' +" +
"'}' +" +
"'initNotes();' +";

content = content.replace(oldScript, newScript);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
console.log('Fixed');
