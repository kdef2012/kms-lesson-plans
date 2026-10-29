const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

// Add the state
if (!code.includes('const [shoutouts, setShoutouts]')) {
    code = code.replace(/const \[selectedPlanId, setSelectedPlanId\] = useState\(null\);/, 
    "const [selectedPlanId, setSelectedPlanId] = useState(null);\n  const [shoutouts, setShoutouts] = useState({});\n  useEffect(() => { fetch('/shoutouts.json').then(r=>r.json()).then(data=>setShoutouts(data)).catch(e=>console.log(e)); }, []);");
}

// Replace the hardcoded student shoutouts
const shoutoutsLogic = `
        const dateShoutouts = shoutouts[plan.date_start] || ["Bradley Fontaine", "Sarah Jenkins", "Marcus Johnson"];
        const s1 = dateShoutouts[0] || "Student 1";
        const s2 = dateShoutouts[1] || "Student 2";
        const s3 = dateShoutouts[2] || "Student 3";
        
        slides.push({
          title: "8. Student Shoutouts (Highest TicketOut Scores)",
          content: \`<div class="confetti"></div>
<div style="display: flex; justify-content: space-around; margin-top: 50px;">
  <div style="background: white; color: var(--kms-purple-dark); padding: 20px; border-radius: 12px; text-align: center; width: 30%; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
    <h3>Core 1</h3>
    <h2 style="margin: 10px 0; color: var(--kms-teal-dark);">\${s1}</h2>
    <p>Highest Score!</p>
  </div>
  <div style="background: white; color: var(--kms-purple-dark); padding: 20px; border-radius: 12px; text-align: center; width: 30%; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
    <h3>Core 2</h3>
    <h2 style="margin: 10px 0; color: var(--kms-teal-dark);">\${s2}</h2>
    <p>Highest Score!</p>
  </div>
  <div style="background: white; color: var(--kms-purple-dark); padding: 20px; border-radius: 12px; text-align: center; width: 30%; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
    <h3>Core 3</h3>
    <h2 style="margin: 10px 0; color: var(--kms-teal-dark);">\${s3}</h2>
    <p>Highest Score!</p>
  </div>
</div>\`
        });
`;

// remove old shoutouts
code = code.replace(/slides\.push\(\{\s*title: "8\. Student Shoutouts[\s\S]*?\}\);\s*\}\);/, shoutoutsLogic + "\n      });");

fs.writeFileSync(path, code);
console.log("Injected fetch shoutouts!");
