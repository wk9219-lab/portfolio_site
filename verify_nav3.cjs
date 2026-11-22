const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:950});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2500));
const info=await p.evaluate(()=>{
 const nav=document.querySelector('.nav');
 const ls=[...document.querySelectorAll('.nav__link')];
 const hot=document.querySelector('.nav__link--hot');
 const cta=document.querySelector('.nav__cta');
 const cs=getComputedStyle(hot);
 return {linksOrder:ls.map(e=>e.textContent.replace(/[\[\]]/g,'').trim()),
  navKids:[...nav.children].map(e=>e.className),
  hotText:hot.textContent.trim(),
  hotRect:[Math.round(hot.getBoundingClientRect().left),Math.round(hot.getBoundingClientRect().right)],
  ctaRect:[Math.round(cta.getBoundingClientRect().left),Math.round(cta.getBoundingClientRect().right)],
  color:cs.color,weight:cs.fontWeight,bg:cs.backgroundImage.slice(0,40),radius:cs.borderRadius,
  overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};});
// 点击测试
const hotEl=await p.$('.nav__link--hot'); await hotEl.click(); await new Promise(r=>setTimeout(r,900));
const after=await p.evaluate(()=>({hash:location.hash,open:document.querySelector('.wp').className}));
await p.evaluate(()=>{location.hash='';}); await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\nav_final.png',clip:{x:0,y:0,width:1600,height:150}});
console.log(JSON.stringify({info,after,errs},null,2));await b.close();})();
