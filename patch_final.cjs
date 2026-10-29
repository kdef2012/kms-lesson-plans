const fs = require('fs');
let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const oldScript = \`            <script>
              const slides = \${slidesJSON};
              let current = 0;
              let activeTimer = null;
              
              marked.setOptions({ breaks: true });
              
              function renderSlide() {\`;

const newScript = \`            <script>
              const slides = \${slidesJSON};
              let current = 0;
              let activeTimer = null;
              
              window.onload = function() {
                if (typeof marked !== 'undefined') {
                  marked.setOptions({ breaks: true });
                }
                renderSlide();
              };
              
              function renderSlide() {\`;

content = content.replace(oldScript, newScript);

const oldRender = \`                const currentSlide = slides[current];
                let parsedContent = marked.parse(currentSlide.content);\`;

const newRender = \`                const currentSlide = slides[current];
                if (typeof marked === 'undefined') {
                  setTimeout(renderSlide, 100);
                  return;
                }
                let parsedContent = marked.parse(currentSlide.content);\`;

content = content.replace(oldRender, newRender);

const oldWorksheet = \`    let worksheetProblemsHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      worksheetProblemsHTML = plan.structured_exemplars.map((ex, i) => {
        return \\\`
          <div style="margin-bottom: 10px; break-inside: avoid;">
            <p style="font-size: 14px; margin-bottom: 4px; margin-top: 0;"><strong>\\\${i + 1}.</strong> \\\${renderMath(ex.question)}</p>
            <div style="border: 1px solid #aaa; height: 80px; border-radius: 4px;"></div>
          </div>
        \\\`;
      }).join('');
    }\`;

const newWorksheet = \`    let worksheetProblemsHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 6) {
      const indChunk = plan.structured_exemplars.slice(6);
      worksheetProblemsHTML = indChunk.map((ex, i) => {
        return \\\`
          <div style="margin-bottom: 10px; break-inside: avoid;">
            <p style="font-size: 14px; margin-bottom: 4px; margin-top: 0;"><strong>\\\${i + 1}.</strong> \\\${renderMath(ex.question)}</p>
            <div style="border: 1px solid #aaa; height: 80px; border-radius: 4px;"></div>
          </div>
        \\\`;
      }).join('');
    }\`;

content = content.replace(oldWorksheet, newWorksheet);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
console.log('Fixed');
