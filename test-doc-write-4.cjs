const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('about:blank');
  
  const result = await page.evaluate(() => {
    const s = '<' + '/script>';
    document.write('<html><body><script>var x = 1;' + s + '<div id="test">HELLO</div></body></html>');
    document.close();
    return document.getElementById('test') ? document.getElementById('test').innerHTML : 'NULL';
  });
  
  console.log("RESULT WITH concat:", result);
  await browser.close();
})();
