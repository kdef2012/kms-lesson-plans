const fs = require('fs');
let code = fs.readFileSync('src/components/LessonPlanViewer.jsx', 'utf8');

// Find the start of handlePrintWeekSlideshows
let startIdx = code.indexOf('const handlePrintWeekSlideshows = () => {');
// The function ends with: printWindow.document.close(); \n    };\n
let endStr = 'printWindow.document.close();\n    };';
let endIdx = code.indexOf(endStr, startIdx);

if (startIdx === -1 || endIdx === -1) {
    console.error("Could not find handlePrintWeekSlideshows!");
    process.exit(1);
}

// Extract the function
let funcCode = code.substring(startIdx, endIdx + endStr.length);

// Remove it from its current location
code = code.substring(0, startIdx) + code.substring(endIdx + endStr.length);

// Insert it before the main return statement
// The main return statement looks like: `return (\n      <div \n        style={{`
let returnIdx = code.lastIndexOf('return (');
if (returnIdx === -1) {
    console.error("Could not find return statement!");
    process.exit(1);
}

code = code.substring(0, returnIdx) + '\n\n' + funcCode + '\n\n  ' + code.substring(returnIdx);

fs.writeFileSync('src/components/LessonPlanViewer.jsx', code);
console.log("Moved handlePrintWeekSlideshows!");
