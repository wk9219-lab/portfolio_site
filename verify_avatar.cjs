const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{
const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2200));
const info=await p.evaluate(()=>{
  const a=document.querySelector('.profile__avatar');
  const cs=getComputedStyle(a);const sp=a.querySelector('span');
  const r=a.getBoundingClientRect();
  return {w:Math.round(r.width),h:Math.round(r.height),
    bgStart:cs.backgroundImage.slice(0,44),
    bgSize:cs.backgroundSize,bgPos:cs.backgroundPosition,
    radius:cs.borderRadius,
    spanOpacity:sp?getComputedStyle(sp).opacity:'none',
    loadedImg:(()=>{const im=new Image();im.src='x';return true})()};
});
// 等图片解码
const decoded=await p.evaluate(()=>new Promise(res=>{
  const a=document.querySelector('.profile__avatar');
  const m=getComputedStyle(a).backgroundImage.match(/url\("(.+?)"\)/);
  if(!m) return res('no-url');
  const im=new Image(); im.onload=()=>res(im.naturalWidth+'x'+im.naturalHeight); im.onerror=()=>res('load-error'); im.src=m[1];
}));
await p.evaluate(()=>document.querySelector('#profile').scrollIntoView({block:'center'}));
await new Promise(r=>setTimeout(r,1200));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\avatar_check.png'});
console.log(JSON.stringify({info,decoded,errs},null,2));
await b.close();})();
