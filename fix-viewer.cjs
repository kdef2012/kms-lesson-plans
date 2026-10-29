const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

const renderQuestionLogic = `
function renderQuestionContent(ex) {
  let html = renderMath(ex.question);
  if (ex.type === 'multiple-choice' && ex.options) {
    html += '<ol style="list-style-type: upper-alpha; margin-left: 20px; margin-top: 10px; font-size: 0.9em;">' + ex.options.map(o => '<li>' + renderMath(o) + '</li>').join('') + '</ol>';
  }
  if (ex.type === 'interactive-graph' && ex.visualData && ex.visualData.originalPolygon) {
    const pts = ex.visualData.originalPolygon.map(p => '(' + p.x + ', ' + p.y + ')').join(', ');
    html += '<p style="margin-top: 10px; font-size: 0.9em; color: #555;"><em>Graph points: ' + pts + '</em></p>';
  }
  if (ex.type === 'matching' && ex.matchingPrompts && ex.matchingOptions) {
    html += '<div style="display: flex; gap: 40px; margin-top: 10px; font-size: 0.9em;">' +
      '<div><strong>Match these:</strong><ul>' + ex.matchingPrompts.map(p => '<li>' + renderMath(p.text) + '</li>').join('') + '</ul></div>' +
      '<div><strong>To these:</strong><ul>' + ex.matchingOptions.map(o => '<li>' + renderMath(o.text) + '</li>').join('') + '</ul></div>' +
    '</div>';
  }
  if (ex.type === 'drag-and-drop' && ex.prompts && ex.options) {
    html += '<div style="margin-top: 10px; font-size: 0.9em;">' +
      '<p><strong>Categories:</strong> ' + ex.prompts.map(p => renderMath(p.text)).join(' | ') + '</p>' +
      '<p><strong>Items:</strong> ' + ex.options.map(o => renderMath(o)).join(', ') + '</p>' +
    '</div>';
  }
  return html;
}
`;

if (!code.includes('function renderQuestionContent')) {
  code = code.replace(/const LessonPlanViewer = \(\{ plan \}\) => \{/, renderQuestionLogic + "\nconst LessonPlanViewer = ({ plan }) => {");
}

code = code.replace(/\$\{renderMath\(ex\.question\)\}/g, '${renderQuestionContent(ex)}');
code = code.replace(/Problem \{idx \+ 1\}: \{ex\.question\}/g, 'Problem {idx + 1}: <span dangerouslySetInnerHTML={{ __html: renderQuestionContent(ex) }} />');

fs.writeFileSync(path, code);
console.log("Updated LessonPlanViewer to render rich question types.");
