const marked = require('marked');

// Simulating the flow
const dbString = '$\\sqrt{20}$'; // One backslash
console.log('1. From DB:', dbString);

let content = dbString.replace(/\\/g, '\\\\'); // Two backslashes
console.log('2. After replace:', content);

const slidesJSON = JSON.stringify({ content });
console.log('3. JSON output:', slidesJSON);

// Now simulate the browser script parsing
const browserEval = JSON.parse(slidesJSON).content; // Parses it back, should be two backslashes
console.log('4. Browser eval:', browserEval);

// Now marked.js parsing
const html = marked.parse(browserEval);
console.log('5. Marked HTML:', html);
