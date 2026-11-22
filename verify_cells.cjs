const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0',timeout:120000});await new Promise(r=>setTimeout(r,1200));
await p.evaluate(()=>{location.hash='#works';});
await new Promise(r=>setTimeout(r,1200));
const out=[];
for(let i=0;i<5;i++){
  const cells=await p.$$('.wp__vidcell');
  await cells[i].click();await new Promise(r=>setTimeout(r,900));
  out.push(await p.evaluate(()=>{const f=[...document.querySelectorAll('.wp__cv .wp__frame')];
    return {n:f.length,ok:f.filter(x=>x.naturalWidth>0).length};}));
  await p.keyboard.press('Escape');await new Promise(r=>setTimeout(r,500));
}
console.log(JSON.stringify({out,errs}));
await b.close();})();