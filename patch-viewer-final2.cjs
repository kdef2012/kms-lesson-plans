const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

const newEq = `
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
code = code.replace(/const getEssentialQuestion = \(objective\) => \{[\s\S]*?return "How can we " \+ eq \+ "\?";\s*\};/g, newEq.trim());

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Patched getEssentialQuestion everywhere!");
