const fs = require('fs');

let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// 1. Get the old base64 string
const match = code.match(/data:image\/jpeg;base64,[^"]+/);
if (!match) {
  console.log("Couldn't find the old base64 string!");
  process.exit(1);
}
const oldBase64 = match[0];

// 2. Get the new transparent base64 string
const img = fs.readFileSync('public/owl-transparent.png');
const newBase64 = 'data:image/png;base64,' + img.toString('base64');

// 3. Remove it from Student Shoutouts
const shoutoutOwlRegex = new RegExp(`<div style="display: flex; justify-content: center; margin-top: 15px;"><img src="${oldBase64.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" alt="Owl" style="height: 120px; border-radius: 10px; box-shadow: 0 4px 10px rgba\\(0,0,0,0\\.15\\);" /></div>`, 'g');
code = code.replace(shoutoutOwlRegex, '');

// 4. Remove it from Exit Ticket / Timers
const exitTicketOwlRegex = new RegExp(`<div style="display: flex; justify-content: center; margin-top: 20px;"><img src="${oldBase64.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" alt="Owl" style="height: 150px; border-radius: 12px; box-shadow: 0 4px 12px rgba\\(0,0,0,0\\.15\\);" /></div>`, 'g');
code = code.replace(exitTicketOwlRegex, '');

// 5. Replace it on Classroom Expectations with the new transparent one
code = code.replace(oldBase64, newBase64); // This will replace the remaining one

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Reverted from other slides and applied transparent owl to expectations!');
