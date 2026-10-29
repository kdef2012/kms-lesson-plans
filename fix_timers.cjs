const fs = require('fs');
let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

// 1. Add timer to guided practice
const guidedTarget = 'guidedChunk.map(ex => `  <div class="problem-box"><strong>${renderMath(ex.question)}</strong></div>\\n`).join(\\'\\') + \\n            `</div>`;';
const guidedReplacement = 'guidedChunk.map(ex => `  <div class="problem-box"><strong>${renderMath(ex.question)}</strong></div>\\n`).join(\\'\\') + \\n            `</div>\\n\\n<div class="timer" onclick="startTimer(this, 10)">10:00</div>`;';
content = content.split(guidedTarget).join(guidedReplacement);

// 2. Fix CSS timer styles
const cssTarget = '            /* Timer Styles */\\n            .timer {\\n              display: inline-block;\\n              background: linear-gradient(135deg, #f59e0b, #d97706);\\n              color: white;\\n              font-size: 4vw;\\n              font-weight: bold;\\n              padding: 10px 40px;\\n              border-radius: 12px;\\n              cursor: pointer;\\n              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);\\n              margin-top: 20px;\\n              transition: transform 0.1s;\\n              text-align: center;\\n              border: 4px solid #fff;\\n            }\\n            .timer:active { transform: scale(0.95); }\\n            .timer-container { text-align: center; width: 100%; }';
const cssReplacement = '            /* Timer Styles */\\n            .timer {\\n              position: fixed; top: 30px; right: 40px; z-index: 1000;\\n              display: inline-block;\\n              background: linear-gradient(135deg, #f59e0b, #d97706);\\n              color: white;\\n              font-size: 2.5vw;\\n              font-weight: bold;\\n              padding: 15px 40px;\\n              border-radius: 12px;\\n              cursor: pointer;\\n              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.2);\\n              transition: transform 0.1s;\\n              text-align: center;\\n              border: 4px solid #fff;\\n            }\\n            .timer:active { transform: scale(0.95); }\\n            .timer-container { }';
content = content.split(cssTarget).join(cssReplacement);

// 3. Add padding bottom to slide-container
const paddingTarget = 'height: 100vh; padding: 20px 80px; box-sizing: border-box; overflow-y: auto;';
const paddingReplacement = 'height: 100vh; padding: 60px 80px 100px 80px; box-sizing: border-box; overflow-y: auto;';
content = content.split(paddingTarget).join(paddingReplacement);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
console.log('Fixed timers');
