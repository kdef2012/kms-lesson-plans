const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('about:blank');
  
  const result = await page.evaluate(() => {
    document.write('<html><body><script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"><\\/script><div id="test">HELLO</div></body></html>');
    document.close();
    return document.getElementById('test') ? document.getElementById('test').innerHTML : 'NULL';
  });
  
  console.log("RESULT:", result);
  await browser.close();
})();
