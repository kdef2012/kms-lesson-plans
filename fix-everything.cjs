const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// 1. Re-add the shoutouts state variable
code = code.replace(/const \[activeCommentSection, setActiveCommentSection\] = useState\(null\);/, 
  "const [activeCommentSection, setActiveCommentSection] = useState(null);\n  const [shoutouts, setShoutouts] = useState({});\n  useEffect(() => { fetch('/shoutouts.json').then(r => r.json()).then(d => setShoutouts(d)).catch(e => console.error('No shoutouts found', e)); }, []);");

// 2. Remove all occurrences of the Shoutouts slide
const shoutoutsRegex = /\{\s*title:\s*"4\. Student Shoutouts",\s*content:\s*\(\(\) => \{[\s\S]*?\}\)\(\)\s*\},\s*/g;
code = code.replace(shoutoutsRegex, "");

// 3. Re-inject ONE correct occurrence of the Shoutouts slide into handlePresent and handlePrintSlideshow
const correctShoutouts = `
        { 
          title: "4. Student Shoutouts", 
          content: (() => {
             const dateShoutouts = shoutouts[plan.date_start] || ["Bradley Fontaine", "Sarah Jenkins", "Marcus Johnson"];
             const s1 = dateShoutouts[0] || "Student 1";
             const s2 = dateShoutouts[1] || "Student 2";
             const s3 = dateShoutouts[2] || "Student 3";
             return \`<div class="confetti-container" style="position: absolute; top: -50px; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1;"></div>
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

const insertPoint = /(\{\s*title:\s*"3\.\s*Today\s*@\s*A\s*Glance",\s*content:\s*`[\s\S]*?Exit\s*Ticket`\s*\},\s*)/g;
code = code.replace(insertPoint, (match) => match + '\n' + correctShoutouts);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed!");
