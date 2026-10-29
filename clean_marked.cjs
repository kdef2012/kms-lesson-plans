const fs = require('fs');

let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

// 1. GUIDED NOTES: Parse markdown synchronously in React
const guidedRegex = /const escapedNotes = [\\s\\S]*?<script>.*?initNotes[\\s\\S]*?<\\/script>/m;
const oldGuidedNotesSection = content.match(guidedRegex)[0];
console.log("Found guided notes script section");

const newGuidedNotesSection = \`
    let parsedNotes = window.marked ? window.marked.parse(notesContent, { breaks: true }) : notesContent;
    parsedNotes = parsedNotes.replace(/<strong>(.*?)<\\/strong>/g, '<strong><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u></strong> <span style="color: white; font-size: 1px;">$1</span>');

    let guidedHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {
      const guidedChunk = plan.structured_exemplars.slice(0, 2);
      guidedHTML = guidedChunk.map((ex, i) => {
        return \\\`
          <div style="margin-bottom: 20px; break-inside: avoid;">
            <p style="font-size: 16px; margin-bottom: 5px;"><strong>Example \\\${i + 1}.</strong> \\\${renderMath(ex.question)}</p>
            <div style="border: 1px dashed #aaa; height: 120px; border-radius: 4px;"></div>
          </div>
        \\\`;
      }).join('');
    }

    const html = 
      '<html>' +
        '<head>' +
          '<title>' + plan.topic + ' - Guided Notes</title>' +
          '<link rel="stylesheet" href="' + window.location.origin + '/katex/katex.min.css">' +
          '<style>' +
            'body { font-family: \\'Segoe UI\\', Tahoma, Geneva, Verdana, sans-serif; padding: 20px 40px; line-height: 1.6; color: #333; }' +
            '.header { display: flex; justify-content: space-between; border-bottom: 2px solid #2d3748; padding-bottom: 10px; margin-bottom: 20px; font-size: 16px; }' +
            'h2 { text-align: center; color: #2d3748; margin-top: 0; margin-bottom: 20px; font-size: 20px; }' +
            'h3 { color: #4a5568; margin-top: 15px; margin-bottom: 5px; font-size: 18px; border-bottom: 1px solid #eee; padding-bottom: 5px; }' +
            '@media print { body { padding: 0; margin: 0.5in; } }' +
            '.notes-content { font-size: 16px; margin-bottom: 30px; }' +
            '.notes-content p { margin-bottom: 15px; }' +
            '.notes-content hr { border: 0; border-top: 1px dashed #ccc; margin: 20px 0; }' +
          '</style>' +
        '</head>' +
        '<body>' +
          '<div class="header">' +
            '<div><strong>Name:</strong> _________________________________</div>' +
            '<div><strong>Date:</strong> ____________________</div>' +
          '</div>' +
          '<h2>Guided Notes: ' + plan.topic + '</h2>' +
          
          '<h3>Class Notes</h3>' +
          '<div class="notes-content">' + parsedNotes + '</div>' +
          
          '<h3>Guided Practice (We Do)</h3>' +
          guidedHTML +
          
          '<script>' +
            'window.onload = function() { setTimeout(() => window.print(), 500); };' +
          '</script>\`;

content = content.replace(oldGuidedNotesSection, newGuidedNotesSection.trim());


// 2. PRESENTATION: Pre-parse markdown in React
const handlePresentRegex = /const slides = \\[\\s\\S]*?const slidesJSON = JSON\\.stringify\\(slides\\);/;
const oldSlidesDef = content.match(handlePresentRegex)[0];
console.log("Found handlePresent slides section");

const newSlidesDef = oldSlidesDef + \`
      const parsedSlides = slides.map(s => ({
        ...s,
        content: window.marked ? window.marked.parse(s.content, { breaks: true }) : s.content
      }));
      const slidesJSON = JSON.stringify(parsedSlides);
\`.trim();
content = content.replace(oldSlidesDef, newSlidesDef.replace('const slidesJSON = JSON.stringify(slides);', ''));


// 3. PRESENTATION POPUP SCRIPT: Remove polling
const presentationScriptRegex = /function initPresentation\\(\\) \\{[\\s\\S]*?function renderSlide\\(\\) \\{/;
const oldPresentationScript = content.match(presentationScriptRegex)[0];
console.log("Found presentation script section");

const newPresentationScript = \`
            function renderSlide() {
\`.trim();
content = content.replace(oldPresentationScript, newPresentationScript);

// Remove marked.parse from renderSlide
content = content.replace(/let parsedContent = marked\\.parse\\(currentSlide\\.content, \\{ breaks: true \\}\\);/, "let parsedContent = currentSlide.content;");
// Remove marked.parse from Print All
content = content.replace(/let parsedContent = marked\\.parse\\(slide\\.content, \\{ breaks: true \\}\\);/g, "let parsedContent = slide.content;");
// Remove marked <script> injections
content = content.replace(/<script src="\\$\\{window\\.location\\.origin\\}\\/marked\\.min\\.js"><\\/script>/g, "");
content = content.replace(/'<script src="' \\+ window\\.location\\.origin \\+ '\\/marked\\.min\\.js"><\\/script>' \\+/g, "");

fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
console.log('Fixed');
