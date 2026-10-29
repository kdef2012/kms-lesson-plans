const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('about:blank');
  
  const result = await page.evaluate(() => {
    document.write('<html><body><script>var x = 1;<\\/script><div id="test">HELLO</div></body></html>');
    document.close();
    return document.getElementById('test') ? document.getElementById('test').innerHTML : 'NULL';
  });
  
  console.log("RESULT WITH \\/script>:", result);

  const result2 = await page.evaluate(() => {
    document.write('<html><body><script>var x = 1;</script><div id="test2">HELLO2</div></body></html>');
    document.close();
    return document.getElementById('test2') ? document.getElementById('test2').innerHTML : 'NULL';
  });

  console.log("RESULT WITH /script>:", result2);
  await browser.close();
})();
