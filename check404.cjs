const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new', args: ['--no-sandbox','--disable-gpu'],
  });
  const p = await b.newPage();
  const failed = [];
  p.on('response', r => { if (r.status() >= 400) failed.push(r.status()+' '+r.url()); });
  await p.setViewport({width:1600,height:1000});
  await p.goto('http://localhost:5174', {waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,2000));
  console.log(JSON.stringify(failed, null, 2));
  await b.close();
})();
