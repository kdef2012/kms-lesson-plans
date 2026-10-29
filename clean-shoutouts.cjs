const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// Strip ALL existing Shoutouts slides
const removeRegex = /\{\s*title:\s*"4\.\s*Student\s*Shoutouts",[\s\S]*?z-index:\s*-1;"\><\/div>`\s*\},/g;
code = code.replace(removeRegex, '');
const removeRegex2 = /\{\s*title:\s*"4\.\s*Student\s*Shoutouts",[\s\S]*?\}\s*\(\)\s*\},/g;
code = code.replace(removeRegex2, '');

// Re-inject precisely
const dynamicShoutoutsPrint = `
        { 
          title: "4. Student Shoutouts", 
          content: (() => {
             const dateShoutouts = shoutouts[plan.date_start] || ["Bradley Fontaine", "Sarah Jenkins", "Marcus Johnson"];
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return \`
<div style="text-align: center; position: relative; z-index: 10;">
  <h3 style="color: var(--kms-teal-dark);">Highest TicketOut Scores!</h3>
  <div style="display: flex; justify-content: space-around; margin-top: 30px;">
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 1</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">\${s1}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 2</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">\${s2}</p>
    </div>
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-top: 4px solid var(--kms-purple);">
      <h4>Core 3</h4>
      <p style="font-size: 24px; font-weight: bold; color: var(--kms-purple);">\${s3}</p>
    </div>
  </div>
</div>\`;
          })()
        },
`;

const dynamicShoutoutsPresent = dynamicShoutoutsPrint.replace('return `\n<div', 'return `<div class="confetti-container" style="position: absolute; top: -50px; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;"></div>\n<div');

const printLookFor = /const handlePrintSlideshow[\s\S]*?\{ title: "3\. Today @ A Glance"[\s\S]*?Exit Ticket` \},/;
code = code.replace(printLookFor, (match) => match + '\n\n' + dynamicShoutoutsPrint);

const presentLookFor = /const handlePresent[\s\S]*?\{\s*title:\s*"3\.\s*Today\s*@\s*A\s*Glance",\s*content:\s*`[\s\S]*?Exit\s*Ticket`\s*\},\s*/;
code = code.replace(presentLookFor, (match) => match + '\n\n' + dynamicShoutoutsPresent);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Cleaned and injected perfectly!");
