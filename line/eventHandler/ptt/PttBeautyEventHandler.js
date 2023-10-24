const PttBeautyDataHandler = require("../../../utils/ptt/beauty/PttBeautyDataHandler");
const commandObj = require("../../command");
const lineReplyHandler = require("../../ReplyHandler");
const PttBeautyModel = require("../../../models/PttBeautyModel");

const PttBeautyEventHandler = async function (client, event) {

    // 隨機正妹圖(資料庫)
    if (commandObj.ptt.beauty.showRandomFemaleImg.regex.exec(event.message.text)) {
        const img = await PttBeautyModel.getRandomFemaleImg();
        if (!img) return null;
        return lineReplyHandler.replyWithImg(client, event, img, img);
    }


     // 隨機帥哥圖片
     if (commandObj.ptt.beauty.showRandomMaleImg.regex.exec(event.message.text)) {

        const img = await PttBeautyModel.getRandomMaleImg();
        if (!img) return null;
        return lineReplyHandler.replyWithImg(client, event, img, img);

    }




}

module.exports = PttBeautyEventHandler;