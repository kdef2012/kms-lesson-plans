const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('https://kms-lesson-plans.vercel.app/', { waitUntil: 'networkidle0' });
  
  console.log("Page loaded. Clicking a lesson to open the modal...");
  
  // Click the first lesson
  const lessonClicked = await page.evaluate(() => {
    const card = document.querySelector('.cursor-pointer');
    if (card) { card.click(); return true; }
    return false;
  });
  
  if (lessonClicked) {
     await new Promise(r => setTimeout(r, 2000));
     console.log("Clicking Present Slideshow...");
     
     // The "Present Slideshow" button opens a new window, which Puppeteer needs to intercept
     const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
     
     await page.evaluate(() => {
       const btns = Array.from(document.querySelectorAll('button'));
       const presentBtn = btns.find(b => b.textContent.includes('Present Slideshow'));
       if (presentBtn) presentBtn.click();
     });
     
     const popup = await newPagePromise;
     if (popup) {
        popup.on('console', msg => console.log('POPUP LOG:', msg.text()));
        popup.on('pageerror', err => console.log('POPUP ERROR:', err.toString()));
        await new Promise(r => setTimeout(r, 2000));
        console.log("Popup HTML snippet:", await popup.evaluate(() => document.body.innerHTML.substring(0, 200)));
     }
  }
  
  await browser.close();
})();
