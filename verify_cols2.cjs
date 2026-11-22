const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2500));
await p.evaluate(()=>document.querySelector('#profile').scrollIntoView({block:'start'}));
await new Promise(r=>setTimeout(r,2500));
const out=[];
for(const w of [1280,1600,1920]){
  await p.setViewport({width:w,height:1000});await new Promise(r=>setTimeout(r,1200));
  const r=await p.evaluate(()=>{
    const i=document.querySelector('.profile__intro');
    const t=document.querySelector('.profile__timeline');
    const pr=document.querySelector('.profile');
    const cs=getComputedStyle(pr);
    return {cols:cs.gridTemplateColumns, align:cs.alignItems,
      iH:i.offsetHeight, tH:t.offsetHeight,
      iTop:i.offsetTop, tTop:t.offsetTop,
      iBot:i.offsetTop+i.offsetHeight, tBot:t.offsetTop+t.offsetHeight,
      delta:(t.offsetTop+t.offsetHeight)-(i.offsetTop+i.offsetHeight)};});
  out.push({w,...r});
}
console.log(JSON.stringify(out,null,2));await b.close();})();
