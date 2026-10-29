const fs = require('fs');
let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const oldInit = \`            function initPresentation() {
              if (typeof marked !== 'undefined') {
                marked.setOptions({ breaks: true });
                renderSlide();
              } else {
                setTimeout(initPresentation, 50);
              }
            }\`;

const newInit = \`            function initPresentation() {
              if (typeof marked !== 'undefined') {
                renderSlide();
              } else {
                setTimeout(initPresentation, 50);
              }
            }\`;

content = content.replace(oldInit, newInit);

const oldParse = \`let parsedContent = marked.parse(currentSlide.content);\`;
const newParse = \`let parsedContent = marked.parse(currentSlide.content, { breaks: true });\`;

content = content.replace(oldParse, newParse);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
console.log('Fixed marked syntax');
