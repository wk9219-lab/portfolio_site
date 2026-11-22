const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--hide-scrollbars'],
  });
  const p = await b.newPage();
  const errors = [];
  p.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  p.on('pageerror', e => errors.push('PAGEERROR: '+e.message));
  await p.setViewport({ width: 1600, height: 1000 });
  await p.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
  await new Promise(r=>setTimeout(r,2500));

  // 缓慢滚动整页
  await p.evaluate(async ()=>{
    const h = document.body.scrollHeight;
    for(let y=0; y<=h; y+=300){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,80)); }
  });
  await new Promise(r=>setTimeout(r,1500));
  const stats = await p.evaluate(()=>{
    const els=[...document.querySelectorAll('[data-reveal]')];
    return { total: els.length, visible: els.filter(e=>e.classList.contains('is-visible')).length };
  });
  console.log(JSON.stringify({stats, errors}, null, 2));

  // 全页截图
  await p.evaluate(()=>window.scrollTo(0,0));
  await new Promise(r=>setTimeout(r,900));
  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\full2.png', fullPage:true});
  await b.close();
})();
