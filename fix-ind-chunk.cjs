const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

code = code.replace(/\/\/ Independent Practice \(remaining 10 problems on one slide\)\s*if \(plan\.structured_exemplars && plan\.structured_exemplars\.length > 0\) \{\s*const indChunk = plan\.structured_exemplars;/, `// Independent Practice (remaining 10 problems on one slide)
      if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
        const indChunk = plan.structured_exemplars.slice(6, 16);`);

fs.writeFileSync(path, code);
console.log("Fixed indChunk in presentation.");
