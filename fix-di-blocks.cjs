const fs = require('fs');
const path = 'src/components/LessonPlanViewer.jsx';
let code = fs.readFileSync(path, 'utf8');

const newDiLogic = `
      const diSlides = [];
      if (plan.direct_instruction) {
        let diText = plan.direct_instruction;
        // Inject telescope launch for 9/21
        if (plan.date_start === '2026-09-21' && !diText.includes('telescope')) {
           diText = diText.replace(/## Direct Instruction\\s*---/i, "## Launch: The Telescope\\n---\\nImagine you are looking at a star through a telescope. The star doesn't change its actual shape, but the lenses inside the telescope *scale* the image up so your eye can see it. Today, we are going to learn how to mathematically build that telescope.\\n\\n## Direct Instruction\\n---");
        }
        
        // Split by markdown headings
        const blocks = diText.split(/(?=## )/);
        
        blocks.forEach((block, idx) => {
          if (!block.trim()) return;
          
          let title = "Direct Instruction";
          const titleMatch = block.match(/## (.*?)\\n/);
          if (titleMatch) {
             title = titleMatch[1].trim();
             block = block.replace(/## .*?\\n/, '');
          }
          block = block.replace(/^---\\n/, ''); // remove stray dashes

          let content = block.trim();
          
          if (content.includes('**Example 1**') && content.includes('**Example 2**')) {
             const ex1split = content.split('**Example 2**');
             diSlides.push({
              title: \`\${title} (Example 1)\`,
              content: ex1split[0].replace(/\\*\\*Example 1\\*\\*/g, \`**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 0 ? renderQuestionContent(plan.structured_exemplars[0]) : ''}</div>\`) + \`\\n\\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>\`
             });
             diSlides.push({
              title: \`\${title} (Example 2)\`,
              content: (\`**Example 2**\` + ex1split[1]).replace(/\\*\\*Example 2\\*\\*/g, \`**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 1 ? renderQuestionContent(plan.structured_exemplars[1]) : ''}</div>\`) + \`\\n\\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>\`
             });
          } else {
             diSlides.push({
              title: title,
              content: content.replace(/\\*\\*Example 1\\*\\*/g, \`**Example 1**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 0 ? renderQuestionContent(plan.structured_exemplars[0]) : ''}</div>\`).replace(/\\*\\*Example 2\\*\\*/g, \`**Example 2**: <div style="background: white; color: black; border-radius: 4px; padding: 10px; margin: 10px 0;">\${plan.structured_exemplars && plan.structured_exemplars.length > 1 ? renderQuestionContent(plan.structured_exemplars[1]) : ''}</div>\`) + (content.includes('Example') ? \`\\n\\n<div class="timer" onclick="startTimer(this, 5)">5:00</div>\` : '')
             });
          }
        });
      }
`;

// Safely replace the existing diSlides logic block
const oldDiLogicRegex = /const diSlides = \[\];\s*if \(plan\.direct_instruction\) \{[\s\S]*?\}\s*\}\);\s*\}/g;
code = code.replace(oldDiLogicRegex, newDiLogic);

// Force 9/21 CFU to use Cold Call Prep!
const forceCfuStr = `
      var cfuText = plan.checks_for_understanding && plan.checks_for_understanding.length > 0 
        ? plan.checks_for_understanding[0].cfu 
        : defaultCfu;
      if (plan.date_start === '2026-09-21') {
         cfuText = 'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.';
      }
`;
code = code.replace(/var cfuText = plan\.checks_for_understanding[\s\S]*?: defaultCfu;/m, forceCfuStr);

// Ensure the Cold Call string replacement is still active for all
code = code.replace(/Cold Call Prep: Take 30 seconds to formulate a summary in your head\. The teacher will call on a random student\./g, 'Cold Call Prep: Take 1 minute to formulate summary in your head. A random student will be called upon.');

fs.writeFileSync(path, code);
console.log("Fixed di blocks!");
