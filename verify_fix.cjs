const puppeteer = require('puppeteer-core');
const fileUrl = 'file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async () => {
  const b = await puppeteer.launch({
    executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless:'new', args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files'],
  });
  const out=[];
  for (const [w,h] of [[390,844],[768,1024],[1024,768],[1280,900],[1440,900],[1600,1000],[1920,1080],[2560,1440]]) {
    const p = await b.newPage();
    const errs=[]; p.on('pageerror',e=>errs.push(e.message));
    await p.setViewport({width:w,height:h});
    await p.goto(fileUrl,{waitUntil:'networkidle0'});
    await new Promise(r=>setTimeout(r,2600));
    const m = await p.evaluate(()=>{
      const line=document.querySelector('.hero__line'), title=document.querySelector('.hero__title');
      const ws=[...document.querySelectorAll('.hero__word')];
      const lr=line.getBoundingClientRect();
      const wr=ws.map(e=>{const r=e.getBoundingClientRect();return{t:e.textContent.trim(),left:Math.round(r.left),right:Math.round(r.right)};});
      return {
        fontSize:getComputedStyle(title).fontSize,
        lineScrollW:line.scrollWidth, lineClientW:line.clientWidth,
        overflow:line.scrollWidth-line.clientWidth,
        lineLeft:Math.round(lr.left), lineRight:Math.round(lr.right),
        docScrollW:document.documentElement.scrollWidth, viewportW:window.innerWidth,
        words:wr,
      };
    });
    if(w===1600) await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\fix_1600.png'});
    if(w===390) await p.screenshot({path:'C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\fix_390.png'});
    out.push({w, ...m, errs});
    await p.close();
  }
  console.log(JSON.stringify(out,null,2));
  await b.close();
})();
