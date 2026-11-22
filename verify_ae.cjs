const puppeteer = require('puppeteer-core');
const fileUrl = 'file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async () => {
  const b = await puppeteer.launch({
    executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless:'new', args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files'],
  });
  const out=[];
  for (const [w,h] of [[1600,1000],[1280,900],[390,844]]) {
    const p = await b.newPage();
    const errs=[]; p.on('pageerror',e=>errs.push(e.message));
    await p.setViewport({width:w,height:h});
    await p.goto(fileUrl,{waitUntil:'networkidle0'});
    await new Promise(r=>setTimeout(r,2400));
    const m = await p.evaluate(()=>{
      const groups=[...document.querySelectorAll('.skills__group')].map(g=>({
        label:g.querySelector('.skills__label').textContent.trim(),
        items:[...g.querySelectorAll('.skill')].map(s=>({
          name:s.querySelector('.skill__name').textContent.trim(),
          paths:s.querySelectorAll('.skill__icon svg path').length,
          color:s.querySelector('.skill__icon svg').getAttribute('stroke'),
          box:(()=>{const r=s.getBoundingClientRect();return Math.round(r.width)+'x'+Math.round(r.height);})(),
        }))
      }));
      const skills=[...document.querySelectorAll('.skill')];
      const rows={}; skills.forEach(s=>{const r=s.getBoundingClientRect();rows[Math.round(r.top)]=(rows[Math.round(r.top)]||0)+1;});
      return {groups, rowCounts:Object.values(rows), total:skills.length,
        docOverflow:document.documentElement.scrollWidth-window.innerWidth};
    });
    out.push({w, ...m, errs});
    await p.close();
  }
  console.log(JSON.stringify(out,null,2));
  await b.close();
})();
