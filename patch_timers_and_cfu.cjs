const fs = require('fs');

let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const cfuLogic = `
    const cfuStrategies = [
      'Turn and Talk: Discuss the core concept with your neighbor.',
      'Stop and Jot: Write down the most important thing you learned in the last 5 minutes.',
      'Think-Pair-Share: Think about the core concept for 30 seconds, then pair up and share your thoughts.',
      'Fist to Five: Rate your understanding from 0 (completely lost) to 5 (I could teach it) by holding up your fingers.',
      'Thumbs Up/Down: Show a thumbs up if you feel confident about the concept, or thumbs down if you need more help.',
      'Cold Call Prep: Take 30 seconds to formulate a summary in your head. The teacher will call on a random student.'
    ];
    // Hash the topic string to consistently pick the same CFU strategy for the same lesson plan
    const hashStr = (plan.topic || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const defaultCfu = cfuStrategies[hashStr % cfuStrategies.length];

    const cfuText = plan.checks_for_understanding && plan.checks_for_understanding.length > 0 
      ? plan.checks_for_understanding[0].cfu 
      : defaultCfu;
`;

const regex1 = /const cfuText = plan\.checks_for_understanding && plan\.checks_for_understanding\.length > 0\s*\?\s*plan\.checks_for_understanding\[0\]\.cfu\s*:\s*'Turn and talk to your neighbor about the core concept we just discussed\.';/;
content = content.replace(regex1, cfuLogic.trim());

const regex2 = /<div class="timer" onclick="startTimer\(this, 2\)">2:00<\/div>/g;
content = content.replace(regex2, '<div class="timer" onclick="startTimer(this, 1.5)">1:30</div>');

const regex3 = /content: part\.trim\(\) \+ `\\n\\n<div class="timer" onclick="startTimer\(this, 10\)">10:00<\/div>`/g;
content = content.replace(regex3, 'content: part.trim() + `\\n\\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>`');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
console.log("Patched LessonPlanViewer.jsx successfully.");
