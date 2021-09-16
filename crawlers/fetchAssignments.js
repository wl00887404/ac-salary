const { writeFileSync } = require('fs');
const { last } = require('lodash');

const login = require('./login');
const config = require('../config.json');

const begin = new Date(config.begin).getTime();
const end = new Date(config.end).getTime();
const url =
  'https://lighthouse.alphacamp.co/console/answer_lists/answer_comments?program_id=39&status=replied';
const urls = [];

const fetch = async browser => {
  const page = await browser.newPage();
  const results = [];

  await page.goto(url);

  while (true) {
    const data = await page.$$eval('tbody tr:not(:first-child)', trs =>
      trs.map(tr => {
        const name = tr.querySelector('td:nth-child(1) p').innerText;
        const time = new Date(
          tr.querySelector('td:nth-child(2)').innerText,
        ).getTime();
        const url = tr.querySelector('td:nth-child(3) a').href;

        return { name, url, time };
      }),
    );
    const myData = data.filter(
      ({ name, time }) => name == 'Max' && begin <= time && time < end,
    );

    results.push(...myData.map(({ time }) => new Date(time).toISOString()));
    urls.push(...myData.map(({ url }) => url));

    const nextButton = await page.$('a[rel="next"]');

    if (!nextButton || last(data).time < begin) break;

    nextButton.click();
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  return results;
};

const stringify = value => JSON.stringify(value, null, 2);

const main = async () => {
  const browser = await login();
  const results = await fetch(browser);

  writeFileSync('./assignments.json', stringify(results));
  writeFileSync('./assignmentUrls.json', stringify(urls.sort()));

  browser.close();
};

main();
