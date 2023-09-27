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
            titulo: textSplited[0],
            fecha: textSplited[1],
            sale: textSplited[2],
            oferta: textSplited[3],
            precioOferta: textSplited[4],
            sinOferta: textSplited[5],
            precioReg: textSplited[6],
            descuento: textSplited[7],
            plataforma: textSplited[8]
        };
        trends.push(newTrend);
        
    }
    fs.writeFileSync(
    path.join(__dirname,`nintendoArg.json`),
    JSON.stringify(trends),
    'utf8'
    );
};