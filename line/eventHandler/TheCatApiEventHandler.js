const theCatApi = require("../../API/imgs/TheCatApi");
const commandObj = require("../command");
const lineReplyHandler = require("../ReplyHandler");

const TheCatApiEventHandler = {
    getRandomImg: async (client,event) => {

        let getRandomImgErr = 0;
        const randomImg = await theCatApi.getRandomImg().catch(err => {
            getRandomImgErr = 1;
            return console.log(err);
        });
        if (getRandomImgErr) return;;

        if (!randomImg || !randomImg[0] || !randomImg[0].url) return;
        const imgUrl = randomImg[0].url;

        return lineReplyHandler.replyWithImg(client, event, imgUrl, imgUrl);

    }
}
const XTheCatApiEventHandler = async function (client, event) {

    // 隨機貓圖
    if (commandObj.img.theCatApi.showRandomImg.regex.exec(event.message.text)) {

        let getRandomImgErr = 0;
        const randomImg = await theCatApi.getRandomImg().catch(err => {
            getRandomImgErr = 1;
            return console.log(err);
        });
        if (getRandomImgErr) return;;

        if (!randomImg || !randomImg[0] || !randomImg[0].url) return;
        const imgUrl = randomImg[0].url;

        return lineReplyHandler.replyWithImg(client, event, imgUrl, imgUrl);

    }


}

module.exports = TheCatApiEventHandler;