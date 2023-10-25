const commandObj = require("../command");
const lineReplyHandler = require("../ReplyHandler");
const freePlantApi = require('../../API/imgs/FreePlantApi');
const FreePlantApiEventHandler = async function (client, event) {

    if (commandObj.img.freePlantApi.showRandomImg.regex.exec(event.message.text)) {

        let getRandomImgErr = 0;
        const imgs = await freePlantApi.getRandomImg().catch(err => {
            getRandomImgErr = 1;
            return console.log(err);
        });
        if (getRandomImgErr) return;;

        if (!imgs || imgs.length <= 0) return;
        const imgUrl = imgs.small_url;

        return lineReplyHandler.replyWithImg(client, event, imgUrl, imgUrl);

    }


}

module.exports = FreePlantApiEventHandler;