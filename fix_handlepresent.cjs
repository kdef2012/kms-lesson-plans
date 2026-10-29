const fs = require('fs');

let content = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf-8');

const newHandlePresent = `  const handlePresent = () => {
    const presentWindow = window.open('', '_blank');
    if (!presentWindow) {
      alert("Presentation popup was blocked! Please allow popups for this site to view the presentation.");
      return;
    }
    
    // Helper to generate the essential question
    const getEssentialQuestion = (obj) => {
      if (!obj) return "What is the core concept of today's lesson?";
      let eq = obj.toLowerCase();
      if (eq.startsWith('students will ')) {
        eq = eq.substring(14);
      }
      return "How can we " + eq + "?";
    };

    const problemsSlides = [];

    let guidedHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length >= 2) {
      const guidedChunk = plan.structured_exemplars.slice(0, 2);
      guidedHTML = \`<div class="problems-grid">\\n\` + 
          guidedChunk.map(ex => \`  <div class="problem-box"><strong>\${renderMath(ex.question)}</strong></div>\\n\`).join('') + 
          \`</div>\`;
    }

    let groupHTML = '';
    if (plan.structured_exemplars && plan.structured_exemplars.length >= 6) {
      const groupChunk = plan.structured_exemplars.slice(2, 6);
      groupHTML = \`<div class="problems-grid">\\n\` + 
          groupChunk.map(ex => \`  <div class="problem-box"><strong>\${renderMath(ex.question)}</strong></div>\\n\`).join('') + 
          \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 10)">10:00</div>\`;
    }

    if (plan.structured_exemplars && plan.structured_exemplars.length > 6) {
      const indChunk = plan.structured_exemplars.slice(6);
      const chunkHTML = \`<div class="problems-grid" style="grid-template-columns: repeat(4, 1fr); font-size: 14px;">\\n\` + 
        indChunk.map((ex, idx) => \`  <div class="problem-box" style="padding: 10px;"><strong>\${idx + 7}. \${renderMath(ex.question)}</strong></div>\\n\`).join('') + 
        \`</div>\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`;
      problemsSlides.push({ title: "11. Independent Practice (All 10)", content: chunkHTML });
    } else {
      problemsSlides.push({ 
        title: "11. Independent Practice", 
        content: \`<strong>Directions:</strong>\\n\${plan.independent_practice || 'Complete the assigned independent practice problems quietly.'}\\n\\n<div class="timer" onclick="startTimer(this, 15)">15:00</div>\`
      });
    }

    // Process Direct Instruction into multiple slides if --- is present
    const diSlides = [];
    if (plan.direct_instruction) {
      const parts = plan.direct_instruction.split(/(?:\\r?\\n)?---(?:\\r?\\n)?/);
      parts.forEach((part, idx) => {
        if (part.trim()) {
          diSlides.push({
            title: parts.length > 1 ? \`6. Direct Instruction / Launch (Part \${idx + 1})\` : "6. Direct Instruction / Launch",
            content: renderMath(part.trim()) + \`\\n\\n<div class="timer" onclick="startTimer(this, 10)">10:00</div>\`
          });
        }
      });
    }

    const cfuText = plan.checks_for_understanding && plan.checks_for_understanding.length > 0 
      ? plan.checks_for_understanding.map(c => \`• **CFU:** \${c.question} (\${c.method}, DOK \${c.dok})\`).join('\\n')
      : "Teacher will circulate and check for understanding.";

    const slides = [
      {
        title: "Do Now",
        content: renderMath(plan.do_now) || "Please complete the Do Now activity on your desk.",
        icon: "timer",
        time: "5:00"
      },
      {
        title: "Expectations",
        content: \`• No Cellphones\\n• Drop pencils when completed\\n• Communicate with respect\\n• Raise your hand\`,
        icon: "list"
      },
      {
        title: "Today's Objective",
        content: \`**\${plan.topic}**\\n\\n\${plan.objective_3m}\\n\\n*Essential Question: \${getEssentialQuestion(plan.objective_3m)}*\`,
        icon: "target"
      },
      ...diSlides,
      {
        title: "Formative Assessment #1",
        content: \`**Check for Understanding:**\\n\\n\${cfuText}\`,
        icon: "help-circle",
        time: "2:00"
      },
      {
        title: "Guided Practice (We Do)",
        content: guidedHTML || "Let's work through these problems together.",
        icon: "users",
        time: "10:00"
      },
      {
        title: "Formative Assessment #2",
        content: \`**Check for Understanding:**\\n\\n\${cfuText}\`,
        icon: "help-circle",
        time: "2:00"
      },
      {
        title: "Group Practice (You Do Together)",
        content: groupHTML || "Work with your shoulder partner.",
        icon: "users",
        time: "10:00"
      },
      ...problemsSlides,
      {
        title: "Exit Ticket",
        content: renderMath(plan.exit_ticket) || "Please complete the exit ticket before leaving.",
        icon: "check-square",
        time: "5:00"
      }
    ];

    const parsedSlides = slides.map(slide => {
      let parsedContent = marked.parse(slide.content);
      parsedContent = parsedContent.replace(/<strong>(.*?)<\\/strong>/g, (match, p1) => \`<strong style="color: var(--kms-purple-dark); font-weight: 700;">\${p1}</strong>\`);
      return { ...slide, content: parsedContent };
    });

    const html = \`
      <html>
        <head>
          <title>\${plan.topic} - Presentation</title>
          <link rel="stylesheet" href="\${window.location.origin}/katex/katex.min.css">
          <style>
            :root {
              --kms-purple: #4a148c;
              --kms-purple-light: #7c43bd;
              --kms-purple-dark: #12005e;
              --kms-teal: #009688;
              --kms-gray: #f5f5f5;
            }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              margin: 0; 
              padding: 0;
              background-color: var(--kms-gray);
              color: #333;
              overflow: hidden;
            }
            .slide-container {
              display: flex;
              flex-direction: column;
              height: 100vh;
              padding: 40px;
              box-sizing: border-box;
            }
            .slide-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 4px solid var(--kms-purple);
              padding-bottom: 20px;
              margin-bottom: 40px;
            }
            .slide-title {
              font-size: 48px;
              color: var(--kms-purple-dark);
              margin: 0;
              display: flex;
              align-items: center;
              gap: 20px;
            }
            .slide-time {
              font-size: 32px;
              color: var(--kms-teal);
              font-weight: bold;
              background: #e0f2f1;
              padding: 10px 20px;
              border-radius: 8px;
            }
            .slide-content {
              flex-grow: 1;
              font-size: 36px;
              line-height: 1.6;
            }
            .controls {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-top: 20px;
              border-top: 2px solid #ddd;
            }
            button {
              padding: 15px 30px;
              font-size: 24px;
              background-color: var(--kms-purple);
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
            }
            button:disabled {
              background-color: #ccc;
              cursor: not-allowed;
            }
            .progress {
              font-size: 24px;
              color: #666;
            }
            .problems-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 30px;
              margin-top: 30px;
            }
            .problem-box {
              background: white;
              padding: 20px;
              border-radius: 12px;
              border-left: 6px solid var(--kms-teal);
              box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            }
            .timer {
              font-size: 120px;
              font-weight: bold;
              text-align: center;
              color: var(--kms-purple);
              font-family: monospace;
              margin-top: 50px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <div id="app"></div>
          <script>
            const slides = \${JSON.stringify(parsedSlides)};
            let currentSlide = 0;
            let timerInterval;

            function updateSlide() {
              const slide = slides[currentSlide];
              let timeHTML = '';
              if (slide.time) {
                timeHTML = '<div class="slide-time">' + slide.time + '</div>';
              }
              
              let prevAttr = currentSlide === 0 ? 'disabled' : '';
              let nextAttr = currentSlide === slides.length - 1 ? 'disabled' : '';

              const html = 
                '<div class="slide-container">' +
                  '<div class="slide-header">' +
                    '<h1 class="slide-title">' + slide.title + '</h1>' +
                    timeHTML +
                  '</div>' +
                  '<div id="slide-content" class="slide-content">' +
                    slide.content +
                  '</div>' +
                  '<div class="controls">' +
                    '<button onclick="prevSlide()" ' + prevAttr + '>Previous</button>' +
                    '<div class="progress">Slide ' + (currentSlide + 1) + ' of ' + slides.length + '</div>' +
                    '<button onclick="nextSlide()" ' + nextAttr + '>Next</button>' +
                  '</div>' +
                '</div>';
                
              document.getElementById('app').innerHTML = html;
              clearInterval(timerInterval);
            }

            window.prevSlide = function() {
              if (currentSlide > 0) {
                currentSlide--;
                updateSlide();
              }
            };

            window.nextSlide = function() {
              if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateSlide();
              }
            };

            window.startTimer = function(element, minutes) {
              if (element.dataset.running === 'true') return;
              element.dataset.running = 'true';
              
              let timeLeft = minutes * 60;
              
              timerInterval = setInterval(() => {
                timeLeft--;
                const m = Math.floor(timeLeft / 60);
                const s = timeLeft % 60;
                element.innerText = m + ':' + (s < 10 ? '0' : '') + s;
                
                if (timeLeft <= 60) {
                  element.style.color = '#d32f2f';
                }
                
                if (timeLeft <= 0) {
                  clearInterval(timerInterval);
                  element.innerText = "TIME'S UP!";
                  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                  audio.play();
                }
              }, 1000);
            };

            document.addEventListener('keydown', (e) => {
              if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
              if (e.key === 'ArrowLeft') prevSlide();
            });

            window.onload = updateSlide;
          </script>
        </body>
      </html>
    \`;
    presentWindow.document.write(html);
    presentWindow.document.close();
  };`;

// Use regex to replace the entire handlePresent function
const startIndex = content.indexOf('const handlePresent = () => {');
const endIndex = content.indexOf('  };', startIndex) + 4;

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newHandlePresent + content.substring(endIndex);
  fs.writeFileSync('src/components/LessonPlanViewer.jsx', content, 'utf-8');
  console.log("Successfully replaced handlePresent!");
} else {
  console.log("Could not find handlePresent bounds.");
}
