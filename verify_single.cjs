const puppeteer = require('puppeteer-core');
const fileUrl = 'file:///C:/Users/LOPES/Desktop/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new', args: ['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files'],
  });
  const p = await b.newPage();
  const failed=[], errors=[];
  p.on('requestfailed', r=>failed.push(r.url().slice(0,80)));
  p.on('pageerror', e=>errors.push(e.message));
  await p.setViewport({width:1600,height:1000});
  await p.goto(fileUrl, {waitUntil:'networkidle0', timeout:30000});
  await new Promise(r=>setTimeout(r,3000));

  const info = await p.evaluate(()=>({
    title: document.title,
    sections: [...document.querySelectorAll('section')].map(s=>s.id),
    hero: document.querySelector('.hero__title')?.textContent.trim(),
    navLinks: [...document.querySelectorAll('.nav__link')].map(e=>e.textContent.trim()),
    projects: [...document.querySelectorAll('.project__title')].map(e=>e.textContent.trim()),
  }));

  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\single_hero.png'});

  // 滚动测试动画
  await p.evaluate(async ()=>{
    const h=document.body.scrollHeight;
    for(let y=0;y<=h;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}
  });
  await new Promise(r=>setTimeout(r,1200));
  const reveal = await p.evaluate(()=>{
    const els=[...document.querySelectorAll('[data-reveal]')];
    return {total:els.length, visible:els.filter(e=>e.classList.contains('is-visible')).length};
  });
  await p.evaluate(()=>window.scrollTo(0,0));
  await new Promise(r=>setTimeout(r,600));
  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\single_full.png', fullPage:true});

  console.log(JSON.stringify({info, reveal, failed, errors}, null, 2));
  await b.close();
})();
