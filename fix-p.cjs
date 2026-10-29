const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// The only valid uses of `p.` are:
// 1. Inside `const buildSlideshowHTML = (p) => { ... }`
// 2. Any other map functions like `(p) => p.something`
// But ALL the `p.structured_exemplars` that are outside of `buildSlideshowHTML` should be `plan.`!

// Let's just find `p.` that are NOT inside buildSlideshowHTML.
// Wait, an easier way is to just look for `p.` where `p` is not declared.
// Actually, I can just replace `p.` with `plan.` globally, 
// AND THEN change the parameter of `buildSlideshowHTML = (p) =>` to `buildSlideshowHTML = (plan) =>` !!
// If I change the parameter to `plan`, then `plan` is shadowed, but it's fine!
// Wait! If I just replace all `p.` with `plan.` where it means the lesson plan...

let lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
    // If it's a map function `map(p => p.x`, leave it alone. 
    // We only care about `p.` where it's accessing lesson plan properties:
    // p.topic, p.structured_exemplars, p.direct_instruction, p.objective_3m, p.date_start, p.do_now, p.exit_ticket, p.independent_practice, p.checks_for_understanding
    
    let props = ['topic', 'structured_exemplars', 'direct_instruction', 'objective_3m', 'date_start', 'do_now', 'exit_ticket', 'independent_practice', 'checks_for_understanding'];
    
    for (let prop of props) {
        let regex = new RegExp(`([^a-zA-Z])p\\.${prop}`, 'g');
        lines[i] = lines[i].replace(regex, `$1plan.${prop}`);
    }
}

code = lines.join('\n');

// Now, update buildSlideshowHTML's parameter to `plan` instead of `p`
code = code.replace('const buildSlideshowHTML = (p) => {', 'const buildSlideshowHTML = (plan) => {');
// update the map in weekPrintFunc: `weekPlans.map(p => buildSlideshowHTML(p))` is fine.

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Fixed p!");
