const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

const renderLogic = `
function renderQuestionContent(ex) {
  let html = "";
  if (typeof renderMath === 'function') {
      html = renderMath(ex.question);
  } else {
      html = ex.question;
  }
  
  if (ex.type === 'multiple-choice' && ex.options) {
    html += '<ol style="list-style-type: upper-alpha; margin-left: 20px; margin-top: 10px; font-size: 0.9em; text-align: left;">' + ex.options.map(o => '<li style="margin-bottom:4px;">' + (typeof renderMath === 'function' ? renderMath(o) : o) + '</li>').join('') + '</ol>';
  }
  
  if (ex.type === 'interactive-graph' && ex.visualData && ex.visualData.originalPolygon) {
    const gridMax = 10;
    const svgSize = 160;
    const center = svgSize / 2;
    const step = svgSize / (gridMax * 2);
    
    let gridLines = '';
    for(let i=0; i<=svgSize; i+=step) {
       gridLines += '<line x1="'+i+'" y1="0" x2="'+i+'" y2="'+svgSize+'" stroke="#eee" stroke-width="1"/>';
       gridLines += '<line x1="0" y1="'+i+'" x2="'+svgSize+'" y2="'+i+'" stroke="#eee" stroke-width="1"/>';
    }
    const axes = '<line x1="0" y1="'+center+'" x2="'+svgSize+'" y2="'+center+'" stroke="#333" stroke-width="2"/><line x1="'+center+'" y1="0" x2="'+center+'" y2="'+svgSize+'" stroke="#333" stroke-width="2"/>';
    
    const polyPts = ex.visualData.originalPolygon.map(p => (p.x * step + center) + ',' + (-p.y * step + center)).join(' ');
    const polygon = '<polygon points="' + polyPts + '" fill="rgba(66, 153, 225, 0.3)" stroke="#2b6cb0" stroke-width="2"/>';
    
    html += '<div style="margin-top: 15px; display: flex; justify-content: center;"><svg width="'+svgSize+'" height="'+svgSize+'" style="border: 1px solid #ccc; background: white;">' + gridLines + axes + polygon + '</svg></div>';
  }
  
  if (ex.type === 'matching' && ex.matchingPrompts && ex.matchingOptions) {
    html += '<div style="display: flex; justify-content: space-around; width: 100%; margin-top: 15px; font-size: 0.85em; text-align: left;">' +
      '<div><ul style="list-style-type: decimal; padding-left: 20px;">' + ex.matchingPrompts.map(p => '<li style="margin-bottom:8px;">' + (typeof renderMath === 'function' ? renderMath(p.text) : p.text) + '</li>').join('') + '</ul></div>' +
      '<div><ul style="list-style-type: upper-alpha; padding-left: 20px;">' + ex.matchingOptions.map(o => '<li style="margin-bottom:8px;">' + (typeof renderMath === 'function' ? renderMath(o.text) : o.text) + '</li>').join('') + '</ul></div>' +
    '</div>';
  }
  
  if (ex.type === 'drag-and-drop' && ex.prompts && ex.options) {
    html += '<div style="margin-top: 15px; font-size: 0.85em; text-align: left; width: 100%;">' +
      '<div style="border: 1px dashed #666; padding: 10px; margin-bottom: 10px; text-align: center; border-radius: 4px;"><strong>Word Bank:</strong><br/>' + ex.options.map(o => (typeof renderMath === 'function' ? renderMath(o) : o)).join(' &nbsp;|&nbsp; ') + '</div>' +
      '<div style="display: flex; gap: 10px; justify-content: space-between;">' + 
      ex.prompts.map(p => '<div style="flex: 1; border: 1px solid #333; height: 100px; display: flex; flex-direction: column; align-items: center; border-radius: 4px; overflow: hidden;"><div style="background: #f1f5f9; width: 100%; text-align: center; padding: 4px; border-bottom: 1px solid #333; font-weight: bold;">' + (typeof renderMath === 'function' ? renderMath(p.text) : p.text) + '</div></div>').join('') +
      '</div></div>';
  }
  
  return html;
}
`;

if (!code.includes('function renderQuestionContent')) {
  // Put it right before LessonPlanViewer
  code = code.replace(/const LessonPlanViewer = \(/, renderLogic + '\nconst LessonPlanViewer = (');
}

fs.writeFileSync(path, code);
console.log("Appended renderQuestionContent.");
