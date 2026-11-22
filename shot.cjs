const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--font-render-hinting=none'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));   // 等进场动画

  const out = process.argv[2];
  await page.screenshot({ path: path.join(out, 'p1_hero.png') });

  // 滚动到各模块
  const sections = ['#profile', '#projects', '#capabilities', '#contact'];
  const names = ['p2_profile', 'p3_projects', 'p4_caps', 'p5_contact'];
  for (let i = 0; i < sections.length; i++) {
    await page.evaluate((sel) => {
      document.querySelector(sel).scrollIntoView({ behavior: 'instant', block: 'start' });
    }, sections[i]);
    await new Promise(r => setTimeout(r, 1800));
    await page.screenshot({ path: path.join(out, names[i] + '.png') });
  }

  // 全页
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(out, 'full.png'), fullPage: true });

  await browser.close();
  console.log('DONE');
})();
