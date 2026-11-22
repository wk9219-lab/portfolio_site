const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{
const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'load',timeout:180000});
await new Promise(r=>setTimeout(r,6000));
await p.evaluate(()=>{location.hash='#works';});
await new Promise(r=>setTimeout(r,2000));
const info=await p.evaluate(()=>{
 const f=[...document.querySelectorAll('.wp__frag')];
 return {n:f.length, loaded:f.filter(x=>x.naturalWidth>0).length,
   cols:getComputedStyle(document.querySelector('.wp__masonry')).columnCount,
   scrollH:document.querySelector('.wp__scroll').scrollHeight};
});
await p.evaluate(()=>{const s=document.querySelector('.wp__scroll');s.scrollTop=s.scrollHeight;});
await new Promise(r=>setTimeout(r,1500));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\f_all_bot.png'});
await p.evaluate(()=>{const s=document.querySelector('.wp__scroll');s.scrollTop=s.scrollHeight-1700;});
await new Promise(r=>setTimeout(r,1200));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\f_all_mid.png'});
// lightbox cycle test
await p.evaluate(()=>{document.querySelectorAll('.wp__frag')[30].click();});
await new Promise(r=>setTimeout(r,800));
const a1=await p.evaluate(()=>({open:!!document.querySelector('.wp__lb'), srcLen:document.querySelector('.wp__lbimg').src.length}));
await p.evaluate(()=>{document.querySelector('.wp__lbbtn--next').click();});
await new Promise(r=>setTimeout(r,500));
const a2=await p.evaluate(()=>({srcLen:document.querySelector('.wp__lbimg').src.length}));
await p.mouse.click(25,25);
await new Promise(r=>setTimeout(r,600));
const a3=await p.evaluate(()=>({open:!!document.querySelector('.wp__lb')}));
await p.setViewport({width:390,height:844});await new Promise(r=>setTimeout(r,800));
const mob=await p.evaluate(()=>({cols:getComputedStyle(document.querySelector('.wp__masonry')).columnCount,ov:document.documentElement.scrollWidth-document.documentElement.clientWidth}));
console.log(JSON.stringify({info,a1,a2,a3,mob,errs},null,2));
await b.close();})();