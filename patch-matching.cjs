const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

const newMatching = `
    if (ex.type === 'matching' && ex.matchingPrompts && ex.matchingOptions) {
        const shiftedOptions = [...ex.matchingOptions];
        if (shiftedOptions.length > 1) {
            shiftedOptions.unshift(shiftedOptions.pop());
        }
        html += '<div style="display: flex; justify-content: space-around; width: 100%; margin-top: 15px; font-size: 0.85em; text-align: left;">' +
        '<div><ul style="list-style-type: decimal; padding-left: 20px;">' + ex.matchingPrompts.map(p => '<li style="margin-bottom:8px;">' + renderMath(p.text) + '</li>').join('') + '</ul></div>' +
        '<div><ul style="list-style-type: upper-alpha; padding-left: 20px;">' + shiftedOptions.map(o => '<li style="margin-bottom:8px;">' + renderMath(o.text) + '</li>').join('') + '</ul></div>' +
        '</div>';
      }
`;

const regex = /if\s*\(ex\.type\s*===\s*'matching'\s*&&\s*ex\.matchingPrompts\s*&&\s*ex\.matchingOptions\)\s*\{[\s\S]*?\}\s*if\s*\(ex\.type\s*===\s*'drag-and-drop'/g;
code = code.replace(regex, newMatching.trim() + "\n\n      if (ex.type === 'drag-and-drop'");

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Patched matching!");
