const puppeteer = require('puppeteer');
const websites = require('./websites.json');
const path = require('path');

(async () => {

    const browser = await puppeteer.launch({args: ['--no-sandbox', 'disable-setuid-sandbox']});
    const page = await browser.newPage();
    //for que lee todos los websites 
    for(const website of websites){
        const scriptPath = path.join(__dirname, 'scripts', website.scriptName);
        await require(scriptPath)(page,website);
        console.log('Scraping done for', website.name);
    }
    await browser.close();
    
})();
