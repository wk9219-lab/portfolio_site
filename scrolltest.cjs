const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new', args: ['--no-sandbox','--disable-gpu','--hide-scrollbars'],
  });
  const p = await b.newPage();
  await p.setViewport({width:1600,height:1000});
  await p.goto('http://localhost:5174', {waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,2500));

  // 模拟真实用户：逐步向下滚动，每步停一下
  const results = [];
  const h = await p.evaluate(()=>document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) {
    await p.evaluate((yy)=>window.scrollTo(0,yy), y);
    await new Promise(r=>setTimeout(r,320));
    const s = await p.evaluate(()=>{
      const els=[...document.querySelectorAll('[data-reveal]')];
      return els.filter(e=>e.classList.contains('is-visible')).length;
    });
    results.push({y, visible:s});
  }
  const total = await p.evaluate(()=>document.querySelectorAll('[data-reveal]').length);
  console.log('total reveal els:', total);
  console.log(JSON.stringify(results));
  const final = await p.evaluate(()=>{
    const els=[...document.querySelectorAll('[data-reveal]')];
    return els.filter(e=>e.classList.contains('is-visible')).length;
  });
  console.log('final visible:', final, '/', total);
  await b.close();
})();
