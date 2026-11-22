const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2500));
await p.evaluate(()=>{location.hash='#works';});
await new Promise(r=>setTimeout(r,1500));
await p.evaluate(()=>{document.querySelector('.wp__pg').scrollIntoView({block:'center'});});
await new Promise(r=>setTimeout(r,800));
const g=await p.evaluate(()=>({covers:document.querySelectorAll('.wp__pgitem').length,
  cols:getComputedStyle(document.querySelector('.wp__pg')).gridTemplateColumns,
  labels:[...document.querySelectorAll('.wp__pgitem .wp__label b')].map(e=>e.textContent),
  pv:!!document.querySelector('.wp__pv'),
  biggone:!document.querySelector('.wp__card--big')}));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\pg_grid.png'});
await p.click('.wp__pgitem');
await new Promise(r=>setTimeout(r,1200));
const v1=await p.evaluate(()=>{const im=document.querySelectorAll('.wp__pvimg');
  let ok=0; im.forEach(i=>{if(i.naturalWidth>0) ok++;});
  return {pv:!!document.querySelector('.wp__pv'),imgs:im.length,ok,
    name:(document.querySelector('.wp__pvname')||{}).innerText,
    firstW:im.length?Math.round(im[0].getBoundingClientRect().width):0,
    firstH:im.length?Math.round(im[0].getBoundingClientRect().height):0};});
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\pg_pv.png'});
await p.click('.wp__pvn--r');
await new Promise(r=>setTimeout(r,1200));
const v2=await p.evaluate(()=>({name:document.querySelector('.wp__pvname').innerText,
  left:Math.round(document.querySelector('.wp__pvbody').scrollLeft)}));
await p.click('.wp__pvn--r');
await new Promise(r=>setTimeout(r,1200));
const v3=await p.evaluate(()=>document.querySelector('.wp__pvname').innerText);
await p.mouse.click(20,500);
await new Promise(r=>setTimeout(r,700));
const v4=await p.evaluate(()=>({pv:!!document.querySelector('.wp__pv'),wp:document.querySelector('.wp').className}));
console.log(JSON.stringify({g,v1,v2,v3,v4,errs},null,1));
await b.close();})();