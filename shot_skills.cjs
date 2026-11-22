const puppeteer = require('puppeteer-core');
const fileUrl = 'file:///C:/Users/LOPES/.dsh/dsh_orb/portfolio_site/%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E7%BD%91%E7%AB%99.html';
(async () => {
  const b = await puppeteer.launch({
    executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless:'new', args:['--no-sandbox','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files'],
  });
  for (const [w,h,tag] of [[1600,1000,'d'],[390,844,'m']]) {
    const p = await b.newPage();
    await p.setViewport({width:w,height:h});
    await p.goto(fileUrl,{waitUntil:'networkidle0'});
    await new Promise(r=>setTimeout(r,2600));
    await p.evaluate(()=>document.querySelector('#skills').scrollIntoView({block:'start'}));
    await new Promise(r=>setTimeout(r,1800));
    await p.screenshot({path:`C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\shots\\skills_${tag}.png`});
    await p.close();
  }
  console.log('shots done');
  await b.close();
})();
