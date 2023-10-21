const weatherDataHandler = require("../../API/weather/DataHandler");
const commandObj = require("../command");
const lineReplyHandler = require("../ReplyHandler");


const WeatherEventHandler = async function (client, event) {

    // 查詢高雄雷達回波圖
    if (commandObj.showRadarImg.regex.exec(event.message.text)) {
        
        let getRadarImageErr = 0;
        const result = await weatherDataHandler.getRadarImage().catch(err => {
            console.log(err);
            getRadarImageErr = 1;
            return;
        });
        if (getRadarImageErr) return;
        if(!result) return;
        const ProductURL = result.cwaopendata.dataset.resource.ProductURL;
        sentTime = result.cwaopendata.sent;
        const imgUrl = ProductURL+"?"+sentTime;



        return lineReplyHandler.replyWithImg(client,event,imgUrl,imgUrl);

    }
    // 查詢高雄特定行政區明天降雨機率
    if (commandObj.showRainfullRate.regex.exec(event.message.text)) {
        const regex = new RegExp(commandObj.showRainfullRate.regex);
        const outputArr = regex.exec(event.message.text);
        let districtKeyword = outputArr[1];


        if (!districtKeyword.includes("區")) {
            districtKeyword += "區";
        }

        let getRainfullRateErr = 0;
        const outputMsg = await weatherDataHandler.getRainfullRate(districtKeyword).catch(err => {
            console.log(err);
            getRainfullRateErr = 1;
            return;
        });
        if (getRainfullRateErr) return;
        return lineReplyHandler.replyWithText(client, event, outputMsg);

    }
}

module.exports = WeatherEventHandler;