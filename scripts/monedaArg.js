const fs = require('fs');
const path = require('path');
module.exports = async(page, website) => {
    const {selectors} = website;
    await page.goto(website.url);
    await page.waitForSelector(selectors.trendlistTag);
    const trendsText = await page.evaluate((trendlistTag) =>{
         const trendList = document.querySelectorAll(trendlistTag);
         const trendsText = [];
         for(const trend of trendList){
            trendsText.push(trend.innerText);
         }
         return trendsText;
    }, selectors.trendlistTag);
    const regExp = new RegExp('');
    const trends = [];
    for (const text of trendsText) {
        const textSplited = text.split('\n').filter((txt) => regExp.test(txt));
        const newTrend ={
            monedaArg: textSplited[0]
        };
        trends.push(newTrend);
        
    }
    fs.writeFileSync(
    path.join(__dirname,`monedaArg.json`),
    JSON.stringify(trends),
    'utf8'
    );
};