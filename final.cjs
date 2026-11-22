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
  await p.goto('http://localhost:5174', {waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,3000));

  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\final_hero.png'});

  await p.evaluate(async ()=>{
    const h=document.body.scrollHeight;
    for(let y=0;y<=h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}
    window.scrollTo(0,0);
  });
  await new Promise(r=>setTimeout(r,1500));
  const stats = await p.evaluate(()=>{
    const els=[...document.querySelectorAll('[data-reveal]')];
    return {revealTotal:els.length, revealVisible:els.filter(e=>e.classList.contains('is-visible')).length,
            sections:[...document.querySelectorAll('section')].map(s=>s.id)};
  });
  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\final_full.png', fullPage:true});
  console.log(JSON.stringify({stats, failed, errors}, null, 2));
  await b.close();
})();
