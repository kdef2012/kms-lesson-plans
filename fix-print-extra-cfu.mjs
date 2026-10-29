import fs from "fs";

const file = "src/components/LessonPlanViewer.jsx";
let content = fs.readFileSync(file, "utf8");

// Remove the Formative Assessment #2 line
const oldString = '{ title: "12. Formative Assessment #2", content: `**Check for understanding:**\\n${cfuText}` },';

if (content.includes(oldString)) {
    content = content.replace(oldString, "");
    
    // While we are at it, let's also rename the Exit Ticket title in print to match present
    const oldExitString = '{ title: "13. Exit Ticket", content: `**Directions:**\\n${p.exit_ticket || \'\'}` },';
    const newExitString = '{ title: "13. Exit Ticket (Formative Assessment #3)", content: `**Directions:**\\n${p.exit_ticket || \'\'}` },';
    content = content.replace(oldExitString, newExitString);
    
    fs.writeFileSync(file, content);
    console.log("Successfully removed Formative Assessment #2 and updated Exit Ticket title in LessonPlanViewer.jsx");
} else {
    console.log("Could not find the string to replace!");
}
