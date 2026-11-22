const puppeteer = require('puppeteer-core');
const fileUrl = 'file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async () => {
  const b = await puppeteer.launch({
    executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless:'new', args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files'],
  });
  const out=[];
  for (const [w,h] of [[1280,900],[1600,1000],[1920,1080],[390,844]]) {
    const p = await b.newPage();
    await p.setViewport({width:w,height:h});
    await p.goto(fileUrl,{waitUntil:'networkidle0'});
    await new Promise(r=>setTimeout(r,2400));
    const m = await p.evaluate(()=>{
      const sec=document.querySelector('#skills');
      const secR=sec.getBoundingClientRect();
      const skills=[...document.querySelectorAll('.skill')];
      const rows={};
      skills.forEach(s=>{const r=s.getBoundingClientRect(); rows[Math.round(r.top)]=(rows[Math.round(r.top)]||0)+1;});
      const grid=document.querySelector('.skills__grid');
      const gcs=getComputedStyle(grid);
      const nameOverflow=skills.filter(s=>{const n=s.querySelector('.skill__name');return n.scrollWidth>n.clientWidth+1;}).map(s=>s.querySelector('.skill__name').textContent);
      return {
        secH: Math.round(secR.height),
        cols: gcs.gridTemplateColumns.split(' ').length,
        rowCounts: Object.values(rows),
        skillCount: skills.length,
        nameOverflow,
        iconBox: (()=>{const i=document.querySelector('.skill__icon');const r=i.getBoundingClientRect();return Math.round(r.width)+'x'+Math.round(r.height);})(),
        svgBox: (()=>{const i=document.querySelector('.skill__icon svg');const r=i.getBoundingClientRect();return Math.round(r.width)+'x'+Math.round(r.height);})(),
        docOverflow: document.documentElement.scrollWidth - window.innerWidth,
      };
    });
    out.push({w, ...m});
    await p.close();
  }
  console.log(JSON.stringify(out,null,2));
  await b.close();
})();
