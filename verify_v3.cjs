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
  await new Promise(r=>setTimeout(r,2800));
  const info = await p.evaluate(()=>({
    title: document.title,
    role: document.querySelector('.profile__role')?.textContent.trim(),
    text: document.querySelector('.profile__text')?.textContent.trim(),
    jobs: [...document.querySelectorAll('.job')].map(e=>({
      date: e.querySelector('.job__date')?.textContent.trim(),
      company: e.querySelector('.job__company')?.textContent.trim(),
      role: e.querySelector('.job__role')?.textContent.trim(),
      desc: e.querySelector('.job__desc')?.textContent.trim(),
    })),
    stats: [...document.querySelectorAll('.stat')].map(e=>e.textContent.trim()),
    caps: [...document.querySelectorAll('.cap__title')].map(e=>e.textContent.trim()),
    footer: document.querySelector('.footer')?.textContent.trim(),
    heroOverflow: (()=>{const l=document.querySelector('.hero__line');return l.scrollWidth-l.clientWidth;})(),
    heroFont: getComputedStyle(document.querySelector('.hero__title')).fontSize,
  }));
  console.log(JSON.stringify({info, errs}, null, 2));
  await b.close();
})();
