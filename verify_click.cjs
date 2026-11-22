const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2500));
// 真实点击导航里的「作品集」
const links=await p.$$('.nav__link');
let clicked=false;
for(const l of links){const t=await p.evaluate(e=>e.textContent.trim(),l); if(t.includes('\u4f5c\u54c1\u96c6')){await l.click();clicked=true;break;}}
await new Promise(r=>setTimeout(r,900));
const st=await p.evaluate(()=>({hash:location.hash,open:document.querySelector('.wp').className,opacity:getComputedStyle(document.querySelector('.wp')).opacity}));
console.log(JSON.stringify({clicked,st,errs}));
await new Promise(r=>setTimeout(r,600));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\works_click.png'});
await b.close();})();
