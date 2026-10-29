import fs from "fs";

const file = "src/components/LessonPlanViewer.jsx";
let content = fs.readFileSync(file, "utf8");

// The exact string to replace in buildSlideshowHTML
const oldStr = `      // Independent Practice (remaining 10 problems on one slide)
      if (p.structured_exemplars && p.structured_exemplars.length > 0) {
        const indChunk = p.structured_exemplars.slice(6, 16);
        const chunkHTML = \`<div class="problems-grid" style="grid-template-columns: repeat(2, 1fr); gap: 20px; font-size: 16px;">
\` + 
          indChunk.map((ex, idx) => \`  <div class="problem-box" style="padding: 15px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid;"><strong>\${idx + 1}. \${renderQuestionContent(ex, typeof idx !== 'undefined' ? idx : (typeof i !== 'undefined' ? i : 0))}</strong></div>
\`).join('') + 
          \`</div>\`;
        problemsSlides.push({ title: "11. Independent Practice (All 10)", content: chunkHTML });
      } else {`;

const newStr = `      // Independent Practice (every problem on its own slide for printing)
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
      } else {`;

if (content.includes(oldStr)) {
    content = content.replace(oldStr, newStr);
    fs.writeFileSync(file, content);
    console.log("SUCCESSFULLY replaced string!");
} else {
    // maybe \r\n vs \n? Let's just normalize and try again
    const normalizedContent = content.replace(/\r\n/g, "\n");
    if (normalizedContent.includes(oldStr)) {
        content = normalizedContent.replace(oldStr, newStr);
        fs.writeFileSync(file, content);
        console.log("SUCCESSFULLY replaced string after normalization!");
    } else {
        console.log("FAILED to find string. Printing surrounding context...");
        // find index of "Independent Practice (remaining 10 problems on one slide)"
        const idx = normalizedContent.indexOf("Independent Practice (remaining 10 problems on one slide)");
        if (idx !== -1) {
            console.log(normalizedContent.substring(idx, idx + 500));
        } else {
            console.log("Could not find the comment at all!");
        }
    }
}
