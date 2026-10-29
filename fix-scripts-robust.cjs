const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// The single quote lines:
// '</script>' + '<script src="..."></script>' + '<script>...</script>'
// Let's replace ALL `'</script>'` with `('<' + '/script>')`
code = code.replace(/'<\/script>'/g, `('<' + '/script>')`);

// For the confetti tags with single quotes:
code = code.replace(/<\/script>' \+ '<\/body>/g, `<' + '/script>' + '</body>`);
code = code.replace(/"><\/script>'/g, `"><' + '/script>'`);
code = code.replace(/500\);<\/script>'/g, `500);<' + '/script>'`);

// Now for the backtick template (handlePresent)
code = code.replace(/"><\/script>\n/g, `">\${"<"}/script>\n`);
code = code.replace(/<\/script>\n          <\/body>/g, `\${"<"}/script>\n          </body>`);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed robustly!");
