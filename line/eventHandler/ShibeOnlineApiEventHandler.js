const ShibeOnlineApi = require("../../API/imgs/ShibeOnlineApi");
const commandObj = require("../command");
const lineReplyHandler = require("../ReplyHandler");

const ShibeOnlineApiEventHandler = async function (client, event) {

    // 隨機狗圖
    if (commandObj.img.shibeOnlineApi.showRandomImg.regex.exec(event.message.text)) {

        let getRandomImgErr = 0;
        const randomImg = await ShibeOnlineApi.getRandomImg().catch(err => {
            getRandomImgErr = 1;
            return console.log(err);
        });
        if (getRandomImgErr) return;


        if (!randomImg || !randomImg[0]) return;
        const imgUrl = randomImg[0];

        return lineReplyHandler.replyWithImg(client, event, imgUrl, imgUrl);

    }

    
}

module.exports = ShibeOnlineApiEventHandler;