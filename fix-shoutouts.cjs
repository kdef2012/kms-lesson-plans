const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

const replacement = `
             const getMostRecentShoutouts = (targetDate) => {
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
             };
             const dateShoutouts = getMostRecentShoutouts(plan.date_start);`;

// The code has the dateShoutouts line in two places (presentation and worksheet)
code = code.replace(/const dateShoutouts = shoutouts\[plan\.date_start\] \|\| \["TBD", "TBD", "TBD"\];/g, replacement);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed shoutouts fallback logic!");
