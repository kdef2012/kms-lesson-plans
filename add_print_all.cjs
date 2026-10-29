const fs = require('fs');
let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

// Replace the controls div inside the HTML template
const oldControls = `<div class="controls">
              <button id="prevBtn" onclick="prevSlide()">Previous</button>
              <div id="progress" class="progress"></div>
              <button id="nextBtn" onclick="nextSlide()">Next</button>
            </div>`;

const newControls = `<div class="controls" id="controls-bar">
              <button id="prevBtn" onclick="prevSlide()">Previous</button>
              <div id="progress" class="progress"></div>
              <div style="display: flex; gap: 10px;">
                <button id="printBtn" onclick="printAll()" style="background: #f1f5f9; color: #334155;">Print All</button>
                <button id="nextBtn" onclick="nextSlide()">Next</button>
              </div>
            </div>`;

content = content.replace(oldControls, newControls);

// Add the printAll() function right before function nextSlide()
const oldNextSlide = 'function nextSlide() {';
const newPrintAll = `function printAll() {
                if (activeTimer) clearInterval(activeTimer);
                document.getElementById('controls-bar').style.display = 'none';
                document.body.style.overflow = 'visible';
                
                let allHtml = '';
                slides.forEach((slide) => {
                  let parsedContent = marked.parse(slide.content);
                  parsedContent = parsedContent.replace(/<div class="timer"/g, '<div class="timer-container" style="display:none;"><div class="timer"');
                  parsedContent = parsedContent.replace(/<\\/div><\\/p>/g, '</div></div></p>');
                  
                  allHtml += \`
                    <div style="min-height: 100vh; page-break-after: always; padding: 40px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center;">
                      <div class="content-wrapper" style="width: 100%; max-width: 1400px; margin: 0 auto;">
                        <h1 style="color: #333; margin-bottom: 30px;">\${slide.title}</h1>
                        <div class="content">\${parsedContent}</div>
                      </div>
                    </div>
                  \`;
                });
                
                document.getElementById('slide-content').innerHTML = allHtml;
                document.getElementById('slide-content').style.height = 'auto';
                document.getElementById('slide-content').style.overflow = 'visible';
                
                setTimeout(() => {
                  window.print();
                  // Restore
                  document.getElementById('controls-bar').style.display = 'flex';
                  document.body.style.overflow = 'hidden';
                  document.getElementById('slide-content').style.height = '100vh';
                  document.getElementById('slide-content').style.overflow = 'auto';
                  renderSlide();
                }, 500);
              }
              
              function nextSlide() {`;

content = content.replace(oldNextSlide, newPrintAll);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
console.log('Added Print All functionality');
