const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// 1. Fix getEssentialQuestion
const newEq = `
      // Helper to generate the essential question
      const getEssentialQuestion = (obj) => {
        if (!obj) return "What is the core concept of today's lesson?";
        let topic = obj.toLowerCase();
        const m = topic.match(/involving (.*?) \\(/);
        if (m) {
           return \`How can we apply our understanding of \${m[1]} to solve real-world problems?\`;
        }
        return "How can we apply today's concept to solve real-world problems?";
      };
`;
code = code.replace(/\/\/ Helper to generate the essential question[\s\S]*?return "How can we " \+ eq \+ "\?";\s*\};/g, newEq.trim());

// 2. Fix expectations image
const expectImage = `<div style="text-align: center;"><img src="https://api.dicebear.com/9.x/bottts/svg?seed=Owl&backgroundColor=6c5ce7" width="150" style="border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.2);" /></div>`;
code = code.replace(/<div style="font-size: 80px; text-align: center; margin-bottom: 20px;">??<\/div>/g, expectImage);
code = code.replace(/<div style="font-size: 100px; margin-right: 40px; filter: drop-shadow\(0 4px 6px rgba\(0,0,0,0.2\)\);">??<\/div>/g, expectImage);


// 3. Fix matching so it's not straight across
const newMatching = `
      let html = '<div style="display: flex; gap: 40px; justify-content: center;">';
      html += '<ul style="list-style-type: none; padding: 0;">';
      q.metadata.pairs.forEach(p => {
        html += \`<li style="margin-bottom: 10px; padding: 10px; background: #f8fafc; border-radius: 4px;">\${renderMath(p.left)}</li>\`;
      });
      html += '</ul>';
      
      html += '<ul style="list-style-type: none; padding: 0;">';
      let rightOptions = q.metadata.pairs.map(p => p.right);
      // Shift the answers down by 1 to guarantee they are never straight across!
      if (rightOptions.length > 1) {
          rightOptions.unshift(rightOptions.pop());
      }
      
      rightOptions.forEach(r => {
        html += \`<li style="margin-bottom: 10px; padding: 10px; background: #e2e8f0; border-radius: 4px;">\${renderMath(r)}</li>\`;
      });
      html += '</ul></div>';
`;
code = code.replace(/let html = '<div style="display: flex; gap: 40px;">';[\s\S]*?html \+= '<\/ul><\/div>';/g, newMatching.trim());

// 4. Remove duplicate Student Shoutouts from handlePrintSlideshow
const printShoutoutsRegex = /\{\s*title: "4\. Student Shoutouts",\s*content: `<div style="text-align: center; position: relative; z-index: 10;">[\s\S]*?Michael Smith'\}<\/p>[\s\S]*?<\/div>`\s*\},/g;
code = code.replace(printShoutoutsRegex, '');

// 5. Remove duplicate Student Shoutouts from handlePresent
const presentShoutoutsRegex = /\{\s*title: "4\. Student Shoutouts",\s*content: `<div style="text-align: center; position: relative; z-index: 10;">[\s\S]*?Michael Smith'\}<\/p>[\s\S]*?<\/div>`\s*\},/g;
code = code.replace(presentShoutoutsRegex, '');

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Patched!");
