const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const t0=Date.now();
const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0',timeout:120000});
const tLoad=Date.now()-t0;
await new Promise(r=>setTimeout(r,2000));
await p.evaluate(()=>{location.hash='#works';});
await new Promise(r=>setTimeout(r,2000));
const st=await p.evaluate(()=>{
  const frag=document.querySelectorAll('.wp__frag');
  const coverImg=document.querySelector('.wp__pgcover');
  return {
    covers:document.querySelectorAll('.wp__pgitem').length,
    frag:frag.length,
    fragLoaded:[...frag].filter(i=>i.naturalWidth>0).length,
    coverBg:(getComputedStyle(coverImg).backgroundSize),
    cells:document.querySelectorAll('.wp__vidcell').length,
    overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
    scrollH:document.querySelector('.wp__scroll').scrollHeight};
});
// project
await p.click('.wp__pgitem');
await new Promise(r=>setTimeout(r,1500));
const pv=await p.evaluate(()=>{const im=[...document.querySelectorAll('.wp__pvimg')];
  const fit=im.length?getComputedStyle(im[0]).objectFit:'';
  const r=im.length?im[0].getBoundingClientRect():{width:0,height:0};
  return {n:im.length,loaded:im.filter(i=>i.naturalWidth>0).length,fit,w:Math.round(r.width),h:Math.round(r.height),
    nat:im.length?im[0].naturalWidth+'x'+im[0].naturalHeight:''};});
await p.mouse.click(20,500);await new Promise(r=>setTimeout(r,600));
// storyboard
await p.click('.wp__vidcell');await new Promise(r=>setTimeout(r,1500));
const sb=await p.evaluate(()=>{const f=[...document.querySelectorAll('.wp__cv .wp__frame')];
  return {n:f.length,loaded:f.filter(i=>i.naturalWidth>0).length,fit:f.length?getComputedStyle(f[0]).objectFit:''};});
console.log(JSON.stringify({tLoad,st,pv,sb,errs},null,1));
await b.close();})();