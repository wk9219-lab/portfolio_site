const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,3000));
const r=await p.evaluate(()=>{
 const vs=[...document.querySelectorAll('.project__visual')];
 return {
  count: vs.length,
  photoCount: document.querySelectorAll('.project__visual--photo').length,
  orbs: document.querySelectorAll('.project__orb').length,
  noTexts: [...document.querySelectorAll('.project__no')].map(e=>e.textContent),
  noColor: getComputedStyle(document.querySelector('.project__no')).color,
  bgOK: vs.map(v=>{const b=getComputedStyle(v).backgroundImage; return b.startsWith('linear-gradient')&&b.includes('data:image/jpeg')}),
  bgSize: getComputedStyle(vs[0]).backgroundSize,
  overflow: document.documentElement.scrollWidth-document.documentElement.clientWidth,
  imgsLoaded: [...document.querySelectorAll('.project__visual')].length
 };});
console.log(JSON.stringify({r,errs},null,2));
await p.evaluate(()=>document.querySelector('#projects').scrollIntoView({block:'start'}));
await new Promise(r=>setTimeout(r,1800));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\projects_photo.png'});
await b.close();})();