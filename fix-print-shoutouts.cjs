const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

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

// Insert it right after "3. Today @ A Glance" in handlePrintSlideshow
const printLookFor = /\{ title: "3\. Today @ A Glance", content: `\*\*SWBAT \(Objective\):\*\*\\n\$\{plan\.objective_3m \|\| ''\}\\n\\n\*\*Essential question of the day:\*\*\\n\$\{getEssentialQuestion\(plan\.objective_3m\)\}\\n\\n\*\*Agenda\*\*\\n- Do Now - completed\\n- Notes - Direct Instruction\\n- Guided & Group Practice: We Do\\n- Independent Practice\\n- Exit Ticket` \},/;
code = code.replace(printLookFor, (match) => match + '\n\n' + dynamicShoutoutsPrint);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Injected Print Shoutouts properly!");
