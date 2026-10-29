const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

const regex = /title: parts\.length > 1 \? `6\. Direct Instruction \/ Launch \(Part \$\{idx \+ 1\}\)` : "6\. Direct Instruction \/ Launch",\s*content: part\.trim\(\) \+ `\\n\\n<div class="timer" onclick="startTimer\(this, 5\)">5:00<\/div>`/;

const newLogic = `title: parts.length > 1 ? \`6. Direct Instruction / Launch (Part \${idx + 1})\` : "6. Direct Instruction / Launch",
              content: part.trim()
                .replace(/\\*\\*Example 1\\*\\*/g, \`**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 0 ? renderQuestionContent(plan.structured_exemplars[0]) : ''}</div>\`)
                .replace(/\\*\\*Example 2\\*\\*/g, \`**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 1 ? renderQuestionContent(plan.structured_exemplars[1]) : ''}</div>\`)
                + \`\\n\\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>\``;

code = code.replace(regex, newLogic);
fs.writeFileSync(path, code);
console.log("Fixed DI visuals.");
