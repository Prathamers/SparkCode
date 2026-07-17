import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    const content = await page.content();
    console.log('HTML snippets:', content.substring(0, 500));
    await browser.close();
  } catch(e) {
    console.error(e);
  }
})();
