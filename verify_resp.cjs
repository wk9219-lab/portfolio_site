const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:900});
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2000));
const out=[];
for(const w of [1600,1200,1024,900,640,390]){
  await p.setViewport({width:w,height:900});await new Promise(r=>setTimeout(r,500));
  out.push(await p.evaluate(w=>{const h=document.querySelector('.nav__link--hot');const l=document.querySelector('.nav__links');
    return {w,hot:getComputedStyle(h).display,links:getComputedStyle(l).display,
      overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};},w));
}
console.log(JSON.stringify(out,null,2));await b.close();})();
