const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// Fix the syntax error from the previous script
// Current broken part: <div>" + `<img src="${window.location.origin}/owl-transparent.png" alt="Owl" style="height: 350px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);" />` + "</div>
code = code.replace(/<div>" \+ `<img src="\$\{window\.location\.origin\}\/owl-transparent\.png" alt="Owl" style="height: 350px; border-radius: 20px; box-shadow: 0 10px 25px rgba\(0,0,0,0\.2\);" \/>` \+ "<\/div>/g, "<div><img src=\"${window.location.origin}/owl-transparent.png\" alt=\"Owl\" style=\"height: 350px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);\" /></div>");

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log('Fixed');
