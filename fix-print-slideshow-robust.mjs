import fs from "fs";

const file = "src/components/LessonPlanViewer.jsx";
let content = fs.readFileSync(file, "utf8");

// We need to find the independent practice block inside buildSlideshowHTML
// Let's use a regex that is more robust
const regex = /\/\/ Independent Practice \(remaining 10 problems on one slide\)[\s\S]*?problemsSlides\.push\(\{ title: "11\. Independent Practice \(All 10\)", content: chunkHTML \}\);\s*\}/;

const newLogic = `// Independent Practice (every problem on its own slide for printing)
      if (p.structured_exemplars && p.structured_exemplars.length > 0) {
        const indChunk = p.structured_exemplars.slice(6, 16);
        indChunk.forEach((ex, idx) => {
          problemsSlides.push({
            title: \`11. Independent Practice (Problem \${idx + 1})\`,
            content: \`<div style="font-size: 24px; text-align: center; margin-top: 40px; padding: 20px; background: white; border-radius: 8px; border: 2px solid #ccc;">
\${renderQuestionContent(ex, idx)}
</div>\`
          });
        });
      }`;

if (content.match(regex)) {
    content = content.replace(regex, newLogic);
    fs.writeFileSync(file, content);
    console.log("SUCCESSFULLY patched Print Slideshow independent practice logic!");
} else {
    console.log("ERROR: Regex did not match!");
}
