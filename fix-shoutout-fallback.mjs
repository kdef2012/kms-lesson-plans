import fs from "fs";

const file = "src/components/LessonPlanViewer.jsx";
let content = fs.readFileSync(file, "utf8");

const oldLogic = `             const getMostRecentShoutouts = (targetDate) => {
               // First check exact date and see if it has at least one real name
               if (shoutouts[targetDate] && shoutouts[targetDate].some(n => n !== "TBD" && n !== "Student 1" && n !== "Student 2" && n !== "Student 3")) {
                 return shoutouts[targetDate];
               }
               // Otherwise, find the most recent date before targetDate that has real names
               const pastDates = Object.keys(shoutouts)
                 .filter(d => d < targetDate && shoutouts[d].some(n => n !== "TBD" && n !== "Student 1" && n !== "Student 2" && n !== "Student 3"))
                 .sort((a,b) => new Date(b) - new Date(a));
               
               if (pastDates.length > 0) return shoutouts[pastDates[0]];
               
               // Fallback if absolutely no past dates have data
               return ["TBD", "TBD", "TBD"];
             };`;

const newLogic = `             const getMostRecentShoutouts = (targetDate) => {
               if (shoutouts[targetDate] && shoutouts[targetDate].some(n => n !== "TBD" && n !== "Student 1" && n !== "Student 2" && n !== "Student 3")) {
                 return shoutouts[targetDate];
               }
               return ["", "", ""]; // Leave blank if no specific shoutout is provided
             };`;

// Replace globally (it appears twice: once in handlePresent, once in buildSlideshowHTML)
content = content.replaceAll(oldLogic, newLogic);
fs.writeFileSync(file, content);
console.log("Successfully fixed shoutout fallback logic!");
