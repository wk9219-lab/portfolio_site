const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000,deviceScaleFactor:1});
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2200));
await p.evaluate(()=>{location.hash='#works';});
await new Promise(r=>setTimeout(r,900));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\works_top.png'});
// 滚到项目集
await p.evaluate(()=>{document.querySelector('.wp__scroll').scrollTop=1500;});
await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\works_mid.png'});
// 滚到底
await p.evaluate(()=>{const s=document.querySelector('.wp__scroll');s.scrollTop=s.scrollHeight;});
await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\works_bottom.png'});
await b.close();console.log('ok');})();
