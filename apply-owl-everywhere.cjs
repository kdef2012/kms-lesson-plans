const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// 1. Revert base64 to /owl.jpg
code = code.replace(/<img src="data:image\/jpeg;base64,[^"]+"/g, '<img src="/owl.jpg"');

// 2. Add <base> tag to head
code = code.replace(/<title>\$\{plan\.topic\}<\/title>` \+/, '<title>${plan.topic}</title>` +\n          \'<base href="\' + window.location.origin + \'/">\' +');

// 3. Add owl to Student Shoutouts
const shoutoutOwl = `<div style="display: flex; justify-content: center; margin-top: 15px;"><img src="/owl.jpg" alt="Owl" style="height: 120px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);" /></div>`;
code = code.replace(/<h2>Student Shoutouts<\/h2>/, `<h2>Student Shoutouts</h2>${shoutoutOwl}`);

// 4. Add owl to Exit Ticket slide
const exitTicketOwl = `<div style="display: flex; justify-content: center; margin-top: 20px;"><img src="/owl.jpg" alt="Owl" style="height: 150px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /></div>`;
code = code.replace(/<div class="timer" onclick="startTimer\(this, 5\)">5:00<\/div>`/g, `<div class="timer" onclick="startTimer(this, 5)">5:00</div>${exitTicketOwl}\``); // Note: this might hit multiple timers, which is fine, it puts the owl on timed slides!

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Applied owl everywhere and added base tag!');
