const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// Add <base> tag to head
code = code.replace(/<title>Presentation: \$\{plan\.topic\}<\/title>` \+/, '<title>Presentation: ${plan.topic}</title>` +\n          \'<base href="\' + window.location.origin + \'/">\' +');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Added base tag!');
