const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:940,height:900});
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2000));
const out=[];
for(const w of [940,1280,1600,1920]){
  await p.setViewport({width:w,height:900});await new Promise(r=>setTimeout(r,700));
  const r=await p.evaluate(()=>{const i=document.querySelector('.profile__intro').getBoundingClientRect();
    const t=document.querySelector('.profile__timeline').getBoundingClientRect();
    const pr=document.querySelector('.profile');
    return {cols:getComputedStyle(pr).gridTemplateColumns, ih:Math.round(i.height), th:Math.round(t.height), diff:Math.round(t.bottom-i.bottom)};});
  out.push({w,...r});
}
console.log(JSON.stringify(out,null,2));await b.close();})();
