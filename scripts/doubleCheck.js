const { zip } = require('lodash');
const login = require('../crawlers/login');
const url = 'https://lighthouse.alphacamp.co/console/contract_work_times';

const assignmentUrls = require('../assignmentUrls.json');
const commentUrls = require('../commentUrls.json');
const urlsByMyCrawler = [...assignmentUrls, ...commentUrls].sort();

console.log(JSON.stringify(urlsByMyCrawler, null, 2));

const main = async () => {
  const browser = await login();
  const page = await browser.newPage();
  await page.goto(url);
  const urlsByAlphaCamp = (
    await page.$$eval('tr td:nth-child(2) a', as => {
      return as.map(a => a.href);
    })
  ).sort();

  console.log(JSON.stringify(urlsByAlphaCamp, null, 2));

  const result = zip(urlsByMyCrawler, urlsByAlphaCamp).every(([url1, url2]) => {
    return url1 === url2;
  });

  console.log(result);
  browser.close();
};

main();
