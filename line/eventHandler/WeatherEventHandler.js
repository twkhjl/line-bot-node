const weatherDataHandler = require("../../API/weather/DataHandler");
const commandObj = require("../command");
const lineReplyHandler = require("../ReplyHandler");

const WeatherEventHandler = {
    showRadarImage: async (client, event) => {
        let getRadarImageErr = 0;
        const result = await weatherDataHandler.getRadarImage().catch(err => {
            console.log(err);
            getRadarImageErr = 1;
            return;
        });
        if (getRadarImageErr) return;
        if (!result) return;
        const ProductURL = result.cwaopendata.dataset.resource.ProductURL;
        sentTime = result.cwaopendata.sent;
        const imgUrl = ProductURL + "?" + sentTime;



        return lineReplyHandler.replyWithImg(client, event, imgUrl, imgUrl);
    }
}


const xWeatherEventHandler = async function (client, event) {

    // 查詢高雄雷達回波圖
    if (commandObj.utils.weather.showRadarImg.regex.exec(event.message.text)) {

        let getRadarImageErr = 0;
        const result = await weatherDataHandler.getRadarImage().catch(err => {
            console.log(err);
            getRadarImageErr = 1;
            return;
        });
        if (getRadarImageErr) return;
        if (!result) return;
        const ProductURL = result.cwaopendata.dataset.resource.ProductURL;
        sentTime = result.cwaopendata.sent;
        const imgUrl = ProductURL + "?" + sentTime;



        return lineReplyHandler.replyWithImg(client, event, imgUrl, imgUrl);

    }

}

module.exports = WeatherEventHandler;