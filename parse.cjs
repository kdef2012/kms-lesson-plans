const fs = require('fs');
let html = fs.readFileSync('grade8_u2_l4.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);
$('h2.im-c-hero__heading').each((i, el) => {
    console.log($(el).text().trim());
});
console.log("---");
$('h1.im-c-heading').each((i, el) => {
    console.log($(el).text().trim());
});
console.log($('p.im-c-heading--xlb').text().trim());
