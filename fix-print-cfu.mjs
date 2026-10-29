import fs from "fs";

const file = "src/components/LessonPlanViewer.jsx";
let content = fs.readFileSync(file, "utf8");

// Find the buildSlideshowHTML definition and replace the cfuText calculation
const regex = /const cfuMatch = p\.direct_instruction \? p\.direct_instruction\.match\(\/CFU:\(\.\*\?\)\(\?:\\n\|\$\)\/\) : null;\s*const cfuText = cfuMatch \? cfuMatch\[1\]\.trim\(\) : "Show me on your fingers\.\.\.";/;

const replacement = `
    const cfuStrategies = [
      'Turn and Talk: Discuss the core concept with your neighbor.',
      'Stop and Jot: Write down the most important thing you learned in the last 5 minutes.',
      'Think-Pair-Share: Think about the core concept for 30 seconds, then pair up and share your thoughts.',
      'Fist to Five: Rate your understanding from 0 (completely lost) to 5 (I could teach it) by holding up your fingers.',
      'Thumbs Up/Down: Show a thumbs up if you feel confident about the concept, or thumbs down if you need more help.',
      'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.'
    ];
    const hashStr = (p.topic || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const defaultCfu = cfuStrategies[hashStr % cfuStrategies.length];
    
    let cfuText = p.checks_for_understanding && p.checks_for_understanding.length > 0 
      ? p.checks_for_understanding[0].cfu 
      : defaultCfu;
      
    if (p.date_start === '2026-09-21') {
       cfuText = 'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.';
    }
`;

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully patched buildSlideshowHTML in LessonPlanViewer.jsx");
} else {
    console.log("Regex did not match! Could not patch.");
}
