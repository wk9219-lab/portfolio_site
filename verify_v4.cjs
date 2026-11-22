const puppeteer = require('puppeteer-core');
const fileUrl = 'file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async () => {
  const b = await puppeteer.launch({
    executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless:'new', args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files'],
  });
  const p = await b.newPage();
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.setViewport({width:1600,height:1000});
  await p.goto(fileUrl,{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,2600));
  const info = await p.evaluate(()=>({
    note: document.querySelector('.section__note')?.textContent.trim(),
    projects: [...document.querySelectorAll('.project')].map(e=>({
      no: e.querySelector('.project__no')?.textContent.trim(),
      title: e.querySelector('.project__title')?.textContent.trim(),
      meta: e.querySelector('.project__meta')?.textContent.trim(),
      desc: e.querySelector('.project__desc')?.textContent.trim(),
    })),
    revealOK: document.querySelectorAll('[data-reveal]').length,
    heroOverflow: (()=>{const l=document.querySelector('.hero__line');return l.scrollWidth-l.clientWidth;})(),
    docOverflow: document.documentElement.scrollWidth - window.innerWidth,
  }));
  console.log(JSON.stringify({info, errs}, null, 2));
  await b.close();
})();
