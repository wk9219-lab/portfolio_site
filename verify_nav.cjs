const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:950});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2500));
const info=await p.evaluate(()=>{
 const ls=[...document.querySelectorAll('.nav__link')];
 const hot=document.querySelector('.nav__link--hot');
 const cs=hot?getComputedStyle(hot):null;
 return {order:ls.map(e=>e.textContent.replace(/[\[\]]/g,'').trim()),
   lastClass:ls[ls.length-1].className,
   hotText:hot?hot.textContent.trim():null,
   color:cs?cs.color:null, weight:cs?cs.fontWeight:null,
   bg:cs?cs.backgroundColor:null, radius:cs?cs.borderRadius:null,
   pad:cs?cs.padding:null,
   navRight:Math.round(ls[ls.length-1].getBoundingClientRect().right),
   ctaLeft:Math.round(document.querySelector('.nav__cta').getBoundingClientRect().left),
   overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};});
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\nav_hot.png',clip:{x:0,y:0,width:1600,height:160}});
console.log(JSON.stringify({info,errs},null,2));await b.close();})();
