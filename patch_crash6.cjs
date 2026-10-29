const fs = require('fs');

let lines = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8').split(/\\r?\\n/);

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('let parsedNotes = marked.parse(notesContent);')) {
        lines[i] = "    const escapedNotes = JSON.stringify(notesContent).replace(/</g, '\\\\u003c'); let parsedNotes = '';";
    }
    if (lines[i].includes('parsedNotes = parsedNotes.replace(/<strong>(.*?)<\\\\/strong>/g')) {
        lines[i] = "";
    }
    if (lines[i].includes("'window.onload = function() { setTimeout(() => window.print(), 500); };' +")) {
        lines[i] = "'function initNotes() { if (typeof marked !== \\"undefined\\") { let raw = ' + escapedNotes + '; let parsed = marked.parse(raw, { breaks: true }); parsed = parsed.replace(/<strong>(.*?)<\\\\/strong>/g, \\"<strong><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></strong> <span style=\\\\\\"color: white; font-size: 1px;\\\\\\">$1</span>\\"); document.getElementById(\\"notes-content\\").innerHTML = parsed; setTimeout(() => window.print(), 500); } else { setTimeout(initNotes, 50); } } initNotes();' +";
    }
    if (lines[i].includes("'<head>' +")) {
        lines[i] = "'<head>' + '<script src=\"' + window.location.origin + '/marked.min.js\"></script>' +";
    }
    if (lines[i].includes("'<div class=\"notes-content\">' + parsedNotes + '</div>' +")) {
        lines[i] = "'<div id=\"notes-content\" class=\"notes-content\">Loading notes...</div>' +";
    }
    if (lines[i].includes("marked.setOptions({ breaks: true });")) {
        lines[i] = "";
    }
    if (lines[i].includes("let parsedContent = marked.parse(currentSlide.content);")) {
        lines[i] = "              let parsedContent = marked.parse(currentSlide.content, { breaks: true });";
    }
    if (lines[i].includes("let parsedContent = marked.parse(slide.content);")) {
        lines[i] = "                  let parsedContent = marked.parse(slide.content, { breaks: true });";
    }
}

fs.writeFileSync('src/components/LessonPlanViewer.jsx', lines.join('\\n'), 'utf-8');
console.log('Fixed');
