const fs = require('fs');
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="test">5. Simplify $(a^5)^2$</div></body></html>', { runScripts: 'dangerously' });
const window = dom.window;
const document = window.document;
const katex = require('katex');
window.katex = katex;

// We can just define renderMathInElement from the module
const autoRender = require('./public/katex/auto-render.min.js');

try {
  autoRender(document.body, { 
    delimiters: [{left: '$', right: '$', display: false}],
    throwOnError: false
  });
  console.log(document.body.innerHTML);
} catch (e) {
  console.error('ERROR:', e);
}
