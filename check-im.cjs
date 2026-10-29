const fetch = require('node-fetch');
const cheerio = require('cheerio');
async function getL(n) {
  const res = await fetch('https://curriculum.illustrativemathematics.org/MS/teachers/3/2/' + n + '/index.html');
  const html = await res.text();
  const $ = cheerio.load(html);
  console.log(`\n--- LESSON ${n} ---`);
  console.log($('h1.im-c-heading').text().trim());
  let acts = [];
  $('h2.im-c-hero__heading').each((i,el)=>acts.push($(el).text().trim()));
  console.log('Activities:', acts.join(', '));
}
async function run() { await getL(7); await getL(8); await getL(9); }
run();
