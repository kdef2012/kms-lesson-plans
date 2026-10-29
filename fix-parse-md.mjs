import fs from "fs";

const file = "src/components/LessonPlanViewer.jsx";
let content = fs.readFileSync(file, "utf8");

// We need to find the parseMd inside buildSlideshowHTML
const regex = /const parseMd = \(text\) => \{\s*if \(!text\) return '';\s*let t = window\.marked \? window\.marked\.parse\(text, \{ breaks: true \}\) : text;\s*return renderMath\(t\);\s*\};/;

const replacement = `
      const parseMd = (text) => {
        if (!text) return '';
        let t = renderMath(text);
        if (window.marked) {
          t = window.marked.parse(t, { breaks: true });
        }
        return t;
      };
`;

if (content.match(regex)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully patched parseMd in LessonPlanViewer.jsx");
} else {
    console.log("Regex did not match! Could not patch.");
}
