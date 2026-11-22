const puppeteer=require('puppeteer-core');
const url='file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async()=>{const b=await puppeteer.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files']});
const p=await b.newPage();await p.setViewport({width:1600,height:1000});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(url,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,2500));
await p.evaluate(()=>{location.hash='#works';});
await new Promise(r=>setTimeout(r,1500));
const st=await p.evaluate(()=>{
  const cases=document.querySelectorAll('.wp__case');
  const frames=document.querySelectorAll('.wp__frame');
  const subs=document.querySelectorAll('.wp__sub');
  const vids=document.querySelectorAll('.wp video');
  let loaded=0; frames.forEach(f=>{if(f.naturalWidth>0) loaded++;});
  return {cases:cases.length,frames:frames.length,subs:subs.length,vids:vids.length,loaded,
    subText:subs.length?subs[0].innerText.replace(/\n/g,'|'):'',
    cols:frames.length?getComputedStyle(document.querySelector('.wp__frames')).gridTemplateColumns:'',
    caseW:cases.length?Math.round(cases[0].getBoundingClientRect().width):0,
    overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,
    scrollH:document.querySelector('.wp__scroll').scrollHeight};
});
// open frame lightbox
await p.click('.wp__frame');
await new Promise(r=>setTimeout(r,600));
const lb1=await p.evaluate(()=>({open:!!document.querySelector('.wp__lb'),src:(document.querySelector('.wp__lbimg')||{}).src?.slice(-30)||''}));
await p.evaluate(()=>{const n=document.querySelector('.wp__lbbtn--next'); if(n) n.click();});
await new Promise(r=>setTimeout(r,500));
const lb2=await p.evaluate(()=>(document.querySelector('.wp__lbimg')||{}).src?.slice(-30)||'');
await p.evaluate(()=>{document.querySelector('.wp__lb').click();});
await new Promise(r=>setTimeout(r,500));
const closed=await p.evaluate(()=>!document.querySelector('.wp__lb'));
console.log(JSON.stringify({st,lb1,lb2,closed,errs},null,1));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\sb_top.png'});
await p.evaluate(()=>{document.querySelector('.wp__scroll').scrollTop=760;});
await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\sb_frames.png'});
await b.close();})();