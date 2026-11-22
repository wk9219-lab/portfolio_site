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
const before=await p.evaluate(()=>{
 const vids=[...document.querySelectorAll('.wp video')];
 return {videos:vids.length, posters:vids.filter(v=>v.poster&&v.poster.length>50).length,
  labels:[...document.querySelectorAll('.wp__label b')].map(e=>e.textContent),
  dur:[...document.querySelectorAll('.wp__dur')].map(e=>e.textContent),
  frag:document.querySelectorAll('.wp .wp__card--sq').length,
  big:document.querySelectorAll('.wp .wp__card--big').length,
  cards:document.querySelectorAll('.wp .wp__card').length};
});
// click first video card
const card=await p.$('.wp__card--video');
await card.click();
await new Promise(r=>setTimeout(r,2500));
const play=await p.evaluate(()=>{const v=document.querySelector('.wp video');return {paused:v.paused,t:v.currentTime,rs:v.readyState,btn:document.querySelector('.wp__play').className};});
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\v_top.png'});
// scroll to project + fragments
await p.evaluate(()=>{document.querySelector('.wp__scroll').scrollTop=1000;});
await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\v_mid.png'});
await p.evaluate(()=>{const s=document.querySelector('.wp__scroll');s.scrollTop=s.scrollHeight;});
await new Promise(r=>setTimeout(r,700));
await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\v_bot.png'});
// close and check playback paused
await p.evaluate(()=>{location.hash='';});
await new Promise(r=>setTimeout(r,800));
const after=await p.evaluate(()=>{const v=document.querySelector('.wp video');return {paused:v.paused};});
console.log(JSON.stringify({before,play,after,errs},null,2));
await b.close();})();