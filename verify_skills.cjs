const puppeteer = require('puppeteer-core');
const fileUrl = 'file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async () => {
  const b = await puppeteer.launch({
    executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless:'new', args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files'],
  });
  const p = await b.newPage();
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  p.on('console',m=>{ if(m.type()==='error') errs.push('console:'+m.text()); });
  await p.setViewport({width:1600,height:1000});
  await p.goto(fileUrl,{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,2800));
  const info = await p.evaluate(()=>{
    const sec = document.querySelector('#skills');
    return {
      skillsExists: !!sec,
      order: [...document.querySelectorAll('main section')].map(s=>s.id),
      navLinks: [...document.querySelectorAll('.nav__link')].map(e=>e.textContent.trim()),
      labels: [...document.querySelectorAll('.skills__label')].map(e=>e.textContent.trim()),
      groups: [...document.querySelectorAll('.skills__group')].map(g=>({
        label: g.querySelector('.skills__label').textContent.trim(),
        items: [...g.querySelectorAll('.skill')].map(s=>({
          name: s.querySelector('.skill__name').textContent.trim(),
          iconPaths: s.querySelectorAll('.skill__icon svg path').length,
          color: s.querySelector('.skill__icon svg').getAttribute('stroke'),
        }))
      })),
      docOverflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });
  console.log(JSON.stringify({info, errs}, null, 2));
  await b.close();
})();
