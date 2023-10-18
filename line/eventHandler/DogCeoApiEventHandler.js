const dogCeoAPI = require("../../API/imgs/DogCeoApi");
const commandObj = require("../command");
const lineReplyHandler = require("../ReplyHandler");

const DogCeoApiEventHandler = async function (client, event) {

    // 隨機狗圖
    if (commandObj.img.dogCeoApi.showRandomImg.regex.exec(event.message.text)) {

        let getRandomImgErr = 0;
        const randomImg = await dogCeoAPI.getRandomImg().catch(err => {
            getRandomImgErr = 1;
            return console.log(err);
        });
        if (getRandomImgErr) return;;

        if (!randomImg || !randomImg.message) return;
        const imgUrl = randomImg.message;

        return lineReplyHandler.replyWithImg(client, event, imgUrl, imgUrl);

    }

    
}

module.exports = DogCeoApiEventHandler;