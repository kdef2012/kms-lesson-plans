const fs = require('fs');
let htmlTemplate = fs.readFileSync('test.html', 'utf8');

// Mock variables
const plan = { topic: 'Test Topic' };
const slidesJSON = JSON.stringify([{ title: 'Test Slide', content: '<p>Test Content</p>' }]);
const window = { location: { origin: 'http://localhost' } };

try {
  const finalHtml = eval('`' + htmlTemplate + '`');
  fs.writeFileSync('test_final.html', finalHtml);
  console.log('HTML evaluated successfully');
} catch(e) {
  console.error(e);
}
