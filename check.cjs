const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--hide-scrollbars'],
  });
  const p = await b.newPage();
  await p.setViewport({ width: 1600, height: 1000 });
  await p.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
  await new Promise(r=>setTimeout(r,2500));

  // 1) 检查 nav 磨砂状态切换
  const navBefore = await p.evaluate(()=>document.querySelector('.nav').className);
  await p.evaluate(()=>window.scrollTo(0, 600));
  await new Promise(r=>setTimeout(r,700));
  const navAfter = await p.evaluate(()=>document.querySelector('.nav').className);

  // 2) 检查所有 reveal 元素是否可见
  await p.evaluate(async ()=>{
    const h = document.body.scrollHeight;
    for(let y=0; y<h; y+=400){ window.scrollTo(0,y); await new Promise(r=>setTimeout(r,60)); }
    window.scrollTo(0,0);
  });
  await new Promise(r=>setTimeout(r,1200));
  const revealStats = await p.evaluate(()=>{
    const els=[...document.querySelectorAll('[data-reveal]')];
    const vis=els.filter(e=>e.classList.contains('is-visible')).length;
    return {total:els.length, visible:vis};
  });

  // 3) 项目数量与标题
  const projects = await p.evaluate(()=>[...document.querySelectorAll('.project__title')].map(e=>e.textContent.trim()));
  const caps = await p.evaluate(()=>[...document.querySelectorAll('.cap__title')].map(e=>e.textContent.trim()));

  // 4) 控制台错误
  console.log(JSON.stringify({navBefore, navAfter, revealStats, projects, caps}, null, 2));

  // 5) 重新截图 projects 全模块
  await p.evaluate(()=>document.querySelector('#projects').scrollIntoView({block:'start'}));
  await new Promise(r=>setTimeout(r,1500));
  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\p3b_projects.png'});
  await p.evaluate(()=>window.scrollBy(0,900));
  await new Promise(r=>setTimeout(r,1200));
  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\p3c_projects2.png'});

  await b.close();
})();
