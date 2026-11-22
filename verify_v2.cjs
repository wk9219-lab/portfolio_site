const puppeteer = require('puppeteer-core');
const fileUrl = 'file:///C:/Users/LOPES/Desktop/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new', args: ['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files'],
  });
  const p = await b.newPage();
  const errors=[];
  p.on('pageerror', e=>errors.push(e.message));
  await p.setViewport({width:1600,height:1000});
  await p.goto(fileUrl, {waitUntil:'networkidle0', timeout:30000});
  await new Promise(r=>setTimeout(r,3000));

  const info = await p.evaluate(()=>({
    title: document.title,
    heroWords: [...document.querySelectorAll('.hero__word')].map(e=>e.textContent.trim()),
    navLogo: document.querySelector('.nav__logo')?.textContent.trim(),
    avatar: document.querySelector('.profile__avatar span')?.textContent.trim(),
    name: document.querySelector('.profile__name')?.textContent.trim(),
    contacts: [...document.querySelectorAll('.profile__contact .contact-item')].map(e=>e.textContent.trim()),
    contactIcons: document.querySelectorAll('.profile__contact svg').length,
    footer: document.querySelector('.footer')?.textContent.trim().replace(/\s+/g,' '),
    contactMeta: [...document.querySelectorAll('.contact__meta .contact-item')].map(e=>e.textContent.trim()),
    contactRowIcons: document.querySelectorAll('.contact__row svg, .contact__meta svg').length,
  }));

  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\v2_hero.png'});

  // profile 截图
  await p.evaluate(()=>document.querySelector('#profile').scrollIntoView({block:'start'}));
  await new Promise(r=>setTimeout(r,1600));
  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\v2_profile.png'});

  // contact 截图
  await p.evaluate(()=>document.querySelector('#contact').scrollIntoView({block:'start'}));
  await new Promise(r=>setTimeout(r,1600));
  await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\v2_contact.png'});

  console.log(JSON.stringify({info, errors}, null, 2));
  await b.close();
})();
