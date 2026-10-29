const fs = require('fs');
let html = fs.readFileSync('grade8_u2_l4.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);
$('.im-c-row__body .im-c-content').each((i, el) => {
    let text = $(el).text().trim();
    if(text.length > 50) {
        console.log(`[CONTENT ${i}]`, text.substring(0, 150).replace(/\n/g, ' '));
    }
});
