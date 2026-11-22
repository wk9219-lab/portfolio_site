const puppeteer = require('puppeteer-core');
const fileUrl = 'file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless:'new', args:['--no-sandbox','--disable-gpu','--allow-file-access-from-files'],
  });
  const p = await b.newPage();
  const out = [];
  for (const w of [1280, 1440, 1600, 1920, 2560]) {
    await p.setViewport({width:w, height:900});
    await p.goto(fileUrl, {waitUntil:'networkidle0'});
    await new Promise(r=>setTimeout(r,2200));
    const m = await p.evaluate(()=>{
      const line = document.querySelector('.hero__line');
      const title = document.querySelector('.hero__title');
      const words = [...document.querySelectorAll('.hero__word')];
      const cs = getComputedStyle(title);
      return {
        fontSize: cs.fontSize,
        lineScrollW: line.scrollWidth,
        lineClientW: line.clientWidth,
        titleScrollW: title.scrollWidth,
        titleClientW: title.clientWidth,
        docScrollW: document.documentElement.scrollWidth,
        viewportW: window.innerWidth,
        words: words.map(e=>e.textContent.trim()),
        wordRects: words.map(e=>{const r=e.getBoundingClientRect();return {t:e.textContent.trim(), left:Math.round(r.left), right:Math.round(r.right)};}),
      };
    });
    out.push({w, ...m});
  }
  console.log(JSON.stringify(out, null, 2));
  await b.close();
})();
