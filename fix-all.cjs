const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// 1. CSS fix
code = code.replace(/\.problem-box \{ \r?\n\s*border: 2px solid #cbd5e1;/, 
  ".problem-box { \n              word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; hyphens: auto; \n              border: 2px solid #cbd5e1;");

// 2. MC shuffle logic
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

// 3. Add owl to Expectations slide
const owlHtml = `<div style="display: flex; justify-content: center; align-items: center; margin-top: 20px;"><img src="/owl.jpg" alt="Owl" style="height: 250px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);" /></div>`;
code = code.replace(/content: expectationsContent/, `content: expectationsContent + '${owlHtml}'`);

// Safely pass idx to renderQuestionContent where available
code = code.replace(/renderQuestionContent\(ex\)/g, "renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))");

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed all 3!");
