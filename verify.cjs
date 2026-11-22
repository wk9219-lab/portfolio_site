const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new', args: ['--no-sandbox','--disable-gpu','--hide-scrollbars'],
  });
  const p = await b.newPage();
  const failed=[], errors=[];
  p.on('response', r=>{ if(r.status()>=400) failed.push(r.status()+' '+r.url()); });
  p.on('pageerror', e=>errors.push(e.message));
  await p.setViewport({width:1600,height:1000});
  await p.goto('http://127.0.0.1:5174', {waitUntil:'networkidle0', timeout:30000});
  await new Promise(r=>setTimeout(r,3000));
  const info = await p.evaluate(()=>({
    title: document.title,
    sections: [...document.querySelectorAll('section')].map(s=>s.id),
    heroText: document.querySelector('.hero__title')?.textContent.trim(),
  }));
  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\verify_hero.png'});
  console.log(JSON.stringify({info, failed, errors}, null, 2));
  await b.close();
})();
