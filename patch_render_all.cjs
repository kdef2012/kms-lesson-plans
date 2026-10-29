const fs = require('fs');

let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const target = `    const processedSlides = baseSlides.map(slide => {
      let content = slide.content || "";
      // Replace literal pi with $\\pi$ (using two backslashes so JSON.stringify makes it safe)
      content = content.replace(/\\bpi\\b/gi, '$\\\\\\\\pi$');
      return { ...slide, content };
    });`;

const replacement = `    const processedSlides = baseSlides.map(slide => {
      let content = slide.content || "";
      // Replace literal pi with $\\pi$ (using two backslashes so JSON.stringify makes it safe)
      content = content.replace(/\\bpi\\b/gi, '$\\\\\\\\pi$');
      
      // Render KaTeX for all slides
      content = renderMath(content);
      
      return { ...slide, content };
    });`;

if (content.includes('content = content.replace(/\\bpi\\b/gi, \'$\\\\\\\\pi$\');')) {
  content = content.replace('content = content.replace(/\\bpi\\b/gi, \'$\\\\\\\\pi$\');', 'content = content.replace(/\\bpi\\b/gi, \'$\\\\\\\\pi$\');\n      content = renderMath(content);');
  fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
  console.log("Replaced successfully!");
} else {
  console.log("Could not find target!");
}
