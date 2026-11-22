const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:950});
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2000));
const o=await p.evaluate(()=>{const n=document.querySelector('.nav');const cs=getComputedStyle(n);
 const kids=[...n.children].map(e=>({cls:e.className,left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)}));
 return {display:cs.display,justify:cs.justifyContent,align:cs.alignItems,gap:cs.gap,pad:cs.padding,maxw:cs.maxWidth,width:Math.round(n.getBoundingClientRect().width),kids};});
console.log(JSON.stringify(o,null,2));await b.close();})();
