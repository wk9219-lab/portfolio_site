const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2500));
await p.evaluate(()=>{location.hash='#works';});
await new Promise(r=>setTimeout(r,1200));
const r=await p.evaluate(()=>{
 const cards=[...document.querySelectorAll('.wp .wp__card')];
 const imgs=cards.map(c=>getComputedStyle(c).backgroundImage.slice(0,28));
 return {
  open: document.querySelector('.wp').className,
  cards: cards.length,
  items: document.querySelectorAll('.wp .wp__item').length,
  labels: [...document.querySelectorAll('.wp__label b')].map(e=>e.textContent),
  titles: [...document.querySelectorAll('.wp__title')].map(e=>e.textContent),
  cap: document.querySelector('.wp__cap') ? document.querySelector('.wp__cap').textContent : null,
  imgOK: imgs.filter(x=>x.includes('data:image')).length,
  overflowX: document.documentElement.scrollWidth-document.documentElement.clientWidth,
  scrollH: document.querySelector('.wp__scroll').scrollHeight
 };});
console.log(JSON.stringify({r,errs},null,2));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\works_new_top.png'});
await p.evaluate(()=>{const s=document.querySelector('.wp__scroll');s.scrollTop=900;});
await new Promise(r=>setTimeout(r,900));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\works_new_mid.png'});
await p.evaluate(()=>{const s=document.querySelector('.wp__scroll');s.scrollTop=s.scrollHeight;});
await new Promise(r=>setTimeout(r,900));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\works_new_bot.png'});
await b.close();})();