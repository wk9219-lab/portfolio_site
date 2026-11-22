const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:900});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2200));
const r1=await p.evaluate(()=>{
  const t=document.body.innerText;
  return {
    noteGone: !t.includes('\u5148\u4ee5\u9ad8\u7ea7\u5360\u4f4d\u56fe'),
    noteEl: document.querySelectorAll('.section__note').length,
    sections: [...document.querySelectorAll('section')].map(s=>s.id).filter(Boolean),
    navLinks: [...document.querySelectorAll('.nav__link')].map(a=>a.textContent.replace(/[\[\]]/g,'')),
    hasProj1: t.includes('\u5de5\u4e1a\u4ea7\u54c1\u5916\u89c2\u8bbe\u8ba1'),
    hasProj2: t.includes('\u5168\u5e74\u8282\u65e5\u8425\u9500\u89c6\u89c9\u5168\u6848'),
    overflow: document.documentElement.scrollWidth-document.documentElement.clientWidth,
    projTop: (()=>{const el=document.querySelector('.projects');const hd=document.querySelector('#projects .section-head, #projects h2')||document.querySelector('#projects > *:nth-child(1)');return el?Math.round(el.getBoundingClientRect().top):null})()
  };});
// 点作品集
const links=await p.$$('.nav__link');let opened=null;
for(const l of links){const t=await p.evaluate(e=>e.textContent, l); if(t.includes('\u4f5c\u54c1\u96c6')){await l.click();break;}}
await new Promise(r=>setTimeout(r,800));
const r2=await p.evaluate(()=>({hash:location.hash,cls:document.querySelector('.wp')?document.querySelector('.wp').className:'none'}));
console.log(JSON.stringify({r1,r2,errs},null,2));
await b.close();})();