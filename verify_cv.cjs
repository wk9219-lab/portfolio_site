const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2500));
await p.evaluate(()=>{location.hash='#works';});
await new Promise(r=>setTimeout(r,1500));
const g=await p.evaluate(()=>({cells:document.querySelectorAll('.wp__vidcell').length,
  videos:document.querySelectorAll('.wp__grid--video video').length,
  cols:document.querySelectorAll('.wp__grid--video').length?getComputedStyle(document.querySelector('.wp__grid--video')).gridTemplateColumns:'',
  cv:!!document.querySelector('.wp__cv')}));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\cv_grid.png'});
await p.click('.wp__vidcell');
await new Promise(r=>setTimeout(r,1200));
const ex=await p.evaluate(()=>{const cv=document.querySelector('.wp__cv');
  return {cv:!!cv, frames:document.querySelectorAll('.wp__cv .wp__frame').length,
    sub:(document.querySelector('.wp__cv .wp__sub')||{}).innerText,
    vids:document.querySelectorAll('.wp__cv video').length,
    w:Math.round((document.querySelector('.wp__cvin')||{getBoundingClientRect:()=>{return{width:0}}}).getBoundingClientRect().width)};});
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\cv_open.png'});
await p.click('.wp__cv .wp__frame');
await new Promise(r=>setTimeout(r,700));
const lbA=await p.evaluate(()=>({lb:!!document.querySelector('.wp__lb'),cv:!!document.querySelector('.wp__cv')}));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\cv_lb.png'});
await p.mouse.click(30,500);
await new Promise(r=>setTimeout(r,600));
const lbB=await p.evaluate(()=>({lb:!!document.querySelector('.wp__lb'),cv:!!document.querySelector('.wp__cv')}));
await p.mouse.click(30,500);
await new Promise(r=>setTimeout(r,700));
const lbC=await p.evaluate(()=>({lb:!!document.querySelector('.wp__lb'),cv:!!document.querySelector('.wp__cv'),open:document.querySelector('.wp').className}));
console.log(JSON.stringify({g,ex,lbA,lbB,lbC,errs},null,1));
await b.close();})();