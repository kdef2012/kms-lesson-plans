const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// Replace renderQuestionContent
const newRender = `
  const renderQuestionContent = (ex, index = 0) => {
    let html = renderMath(ex.question);
    
    if (ex.type === 'multiple-choice' && ex.options) {
      // Deterministically shuffle based on question string length + index
      let opts = [...ex.options];
      let seed = (ex.question || '').length + index;
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.abs(Math.sin(seed++) * 10000)) % (i + 1);
        [opts[i], opts[j]] = [opts[j], opts[i]];
      }
      html += '<ol style="list-style-type: upper-alpha; margin-left: 20px; margin-top: 10px; font-size: 0.9em; text-align: left;">' + opts.map(o => '<li style="margin-bottom:4px;">' + renderMath(o) + '</li>').join('') + '</ol>';
    }
`;

code = code.replace(/const renderQuestionContent = \(ex\) => \{\s*let html = renderMath\(ex\.question\);\s*if \(ex\.type === 'multiple-choice' && ex\.options\) \{\s*html \+= '<ol style="list-style-type: upper-alpha; margin-left: 20px; margin-top: 10px; font-size: 0.9em; text-align: left;">' \+ ex\.options\.map\(o => '<li style="margin-bottom:4px;">' \+ renderMath\(o\) \+ '<\/li>'\)\.join\(''\) \+ '<\/ol>';\s*\}/, newRender);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed MC options!");
