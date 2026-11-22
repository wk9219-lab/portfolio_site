const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2500));
await p.evaluate(()=>{location.hash='#works';});
await new Promise(r=>setTimeout(r,1200));
await p.evaluate(()=>{document.querySelector('.wp__pg').scrollIntoView({block:'center'});});
await new Promise(r=>setTimeout(r,600));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\pg_grid.png'});
await p.click('.wp__pgitem');
await new Promise(r=>setTimeout(r,1200));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\pg_pv.png'});
await p.mouse.click(20,500);
await new Promise(r=>setTimeout(r,700));
const c1=await p.evaluate(()=>({pv:!!document.querySelector('.wp__pv'),wp:document.querySelector('.wp').className}));
// reopen and test bottom blank
await p.click('.wp__pgitem');await new Promise(r=>setTimeout(r,900));
await p.mouse.click(800,985);await new Promise(r=>setTimeout(r,700));
const c2=await p.evaluate(()=>({pv:!!document.querySelector('.wp__pv')}));
// open 2nd project (coffee) check count
await p.evaluate(()=>{const it=document.querySelectorAll('.wp__pgitem')[1]; it.click();});
await new Promise(r=>setTimeout(r,1000));
const c3=await p.evaluate(()=>({name:document.querySelector('.wp__pvname').innerText,imgs:document.querySelectorAll('.wp__pvimg').length}));
console.log(JSON.stringify({c1,c2,c3,errs},null,1));
await b.close();})();