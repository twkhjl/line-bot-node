const PttBeautyDataHandler = require("../../../utils/ptt/beauty/PttBeautyDataHandler");
const commandObj = require("../../command");
const lineReplyHandler = require("../../ReplyHandler");

const PttBeautyEventHandler = async function (client, event) {

    // 隨機正妹圖片
    if (commandObj.ptt.beauty.showRandomFemaleImg.regex.exec(event.message.text)) {


        let getRandomImgErr = 0;
        const randomImg = await PttBeautyDataHandler.getRandomFemaleImg().catch(err => {
            getRandomImgErr = 1;
            return console.log(err);
        });
        
        if (getRandomImgErr) return;

        if (!randomImg || randomImg.hasErr) return;


        return lineReplyHandler.replyWithImg(client, event, randomImg, randomImg);

    }

     // 隨機帥哥圖片
     if (commandObj.ptt.beauty.showRandomMaleImg.regex.exec(event.message.text)) {


        let getRandomImgErr = 0;
        const randomImg = await PttBeautyDataHandler.getRandomMaleImg().catch(err => {
            getRandomImgErr = 1;
            return console.log(err);
        });
        if (getRandomImgErr) return;

        if (!randomImg || randomImg.hasErr) return;


        return lineReplyHandler.replyWithImg(client, event, randomImg, randomImg);

    }




}

module.exports = PttBeautyEventHandler;