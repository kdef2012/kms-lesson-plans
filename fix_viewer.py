import sys

with open('src/components/LessonPlanViewer.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Worksheet to skip first 6 items
old_worksheet = """    let worksheetProblemsHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 0) {
      worksheetProblemsHTML = plan.structured_exemplars.map((ex, i) => {
        return `
          <div style="margin-bottom: 10px; break-inside: avoid;">
            <p style="font-size: 14px; margin-bottom: 4px; margin-top: 0;"><strong>${i + 1}.</strong> ${renderMath(ex.question)}</p>
            <div style="border: 1px solid #aaa; height: 80px; border-radius: 4px;"></div>
          </div>
        `;
      }).join('');
    }"""

new_worksheet = """    let worksheetProblemsHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length > 6) {
      const indChunk = plan.structured_exemplars.slice(6);
      worksheetProblemsHTML = indChunk.map((ex, i) => {
        return `
          <div style="margin-bottom: 10px; break-inside: avoid;">
            <p style="font-size: 14px; margin-bottom: 4px; margin-top: 0;"><strong>${i + 1}.</strong> ${renderMath(ex.question)}</p>
            <div style="border: 1px solid #aaa; height: 80px; border-radius: 4px;"></div>
          </div>
        `;
      }).join('');
    }"""

content = content.replace(old_worksheet, new_worksheet)

# Fix script loading crash
old_script = """            <script>
              const slides = ${slidesJSON};
              let current = 0;
              let activeTimer = null;
              
              marked.setOptions({ breaks: true });
              
              function renderSlide() {"""

new_script = """            <script>
              const slides = ${slidesJSON};
              let current = 0;
              let activeTimer = null;
              
              window.onload = function() {
                if (typeof marked !== 'undefined') {
                  marked.setOptions({ breaks: true });
                }
                renderSlide();
              };
              
              function renderSlide() {"""

content = content.replace(old_script, new_script)

old_render = """                const currentSlide = slides[current];
                let parsedContent = marked.parse(currentSlide.content);"""

new_render = """                const currentSlide = slides[current];
                if (typeof marked === 'undefined') {
                  setTimeout(renderSlide, 100);
                  return;
                }
                let parsedContent = marked.parse(currentSlide.content);"""

content = content.replace(old_render, new_render)

with open('src/components/LessonPlanViewer.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed!")
