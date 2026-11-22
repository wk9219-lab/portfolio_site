const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{
const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2200));
await p.evaluate(()=>document.querySelector('#profile').scrollIntoView({block:'start'}));
await new Promise(r=>setTimeout(r,1500));
const m=await p.evaluate(()=>{
  const intro=document.querySelector('.profile__intro');
  const tl=document.querySelector('.profile__timeline');
  const av=document.querySelector('.profile__avatar');
  const ri=intro.getBoundingClientRect(), rt=tl.getBoundingClientRect(), ra=av.getBoundingClientRect();
  return {introTop:Math.round(ri.top),introBottom:Math.round(ri.bottom),introH:Math.round(ri.height),
          tlTop:Math.round(rt.top),tlBottom:Math.round(rt.bottom),tlH:Math.round(rt.height),
          diff:Math.round(rt.bottom-ri.bottom), avatar:Math.round(ra.width)+'x'+Math.round(ra.height)};
});
await p.setViewport({width:390,height:844});await new Promise(r=>setTimeout(r,900));
const mob=await p.evaluate(()=>({avatar:Math.round(document.querySelector('.profile__avatar').getBoundingClientRect().width),
  scrollW:document.documentElement.scrollWidth, inner:innerWidth}));
await p.setViewport({width:1600,height:1000});await new Promise(r=>setTimeout(r,900));
await p.evaluate(()=>document.querySelector('#profile').scrollIntoView({block:'start'}));
await new Promise(r=>setTimeout(r,1200));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\profile_v2.png'});
console.log(JSON.stringify({m,mob,errs},null,2));
await b.close();})();
