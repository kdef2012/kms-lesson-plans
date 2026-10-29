const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// The current buttons block looks like:
// <Printer size={18} /> Print Slideshow
//             </button>
//             {plan.pdf_url && (
//               <a href={plan.pdf_url} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
//                 <Download size={18} /> PDF
//               </a>
//             )}
//           </div>

// I need to add back the Guided Notes and Worksheet buttons BEFORE the PDF button.

let searchStr = '{plan.pdf_url && (';
let replacement = `
            <button onClick={handlePrintGuidedNotes} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Guided Notes
            </button>
            <button onClick={handlePrintWorksheet} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Worksheet
            </button>
            {plan.pdf_url && (`

code = code.replace(searchStr, replacement);
fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Restored missing buttons!");
