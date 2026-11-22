const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{
const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files','--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'load',timeout:120000});
await new Promise(r=>setTimeout(r,4000));
await p.evaluate(()=>{location.hash='#works';});
await new Promise(r=>setTimeout(r,1500));
const info=await p.evaluate(()=>{
 const f=[...document.querySelectorAll('.wp__frag')];
 return {n:f.length, ratios:f.map(x=>(x.naturalWidth/x.naturalHeight).toFixed(2)),
  cols:getComputedStyle(document.querySelector('.wp__masonry')).columnCount,
  heights:f.slice(0,3).map(x=>Math.round(x.getBoundingClientRect().height))};
});
await p.evaluate(()=>{document.querySelector('.wp__scroll').scrollTop=99999;});
await new Promise(r=>setTimeout(r,800));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\m1_frag.png'});
// open lightbox
await p.evaluate(()=>{document.querySelector('.wp__frag').scrollIntoView({block:'center'});});
await new Promise(r=>setTimeout(r,500));
await p.evaluate(()=>{document.querySelectorAll('.wp__frag')[2].click();});
await new Promise(r=>setTimeout(r,900));
const lb1=await p.evaluate(()=>({open:!!document.querySelector('.wp__lb'),
  w:Math.round(document.querySelector('.wp__lbimg').getBoundingClientRect().width)}));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\m2_lightbox.png'});
// click backdrop (corner) to close
await p.mouse.click(40,40);
await new Promise(r=>setTimeout(r,700));
const lb2=await p.evaluate(()=>({open:!!document.querySelector('.wp__lb'), stillWorks:document.querySelector('.wp').className}));
console.log(JSON.stringify({info,lb1,lb2,errs},null,2));
await b.close();})();