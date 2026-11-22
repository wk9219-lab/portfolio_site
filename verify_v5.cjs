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
    telLinks: [...document.querySelectorAll('a[href^="tel:"]')].map(e=>e.getAttribute('href')),
    profileContacts: [...document.querySelectorAll('.profile__contact .contact-item')].map(e=>e.textContent.trim()),
    contactMeta: [...document.querySelectorAll('.contact__meta .contact-item')].map(e=>e.textContent.trim()),
    hasPlaceholder: document.body.innerText.includes('138xxxx6789'),
    hasReal: document.body.innerText.includes('13192286018'),
    heroOverflow: (()=>{const l=document.querySelector('.hero__line');return l.scrollWidth-l.clientWidth;})(),
    docOverflow: document.documentElement.scrollWidth - window.innerWidth,
    revealCount: document.querySelectorAll('[data-reveal]').length,
  }));
  console.log(JSON.stringify({info, errs}, null, 2));
  await b.close();
})();
