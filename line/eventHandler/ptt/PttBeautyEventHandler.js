const PttBeautyDataHandler = require("../../../utils/ptt/beauty/PttBeautyDataHandler");
const commandObj = require("../../command");
const lineReplyHandler = require("../../ReplyHandler");
const PttBeautyModel = require("../../../models/PttBeautyModel");


const PttBeautyEventHandler = {

    // 隨機正妹圖(資料庫)
    getRandomFemaleImg: async (client, event) => {
        const img = await PttBeautyModel.getRandomFemaleImg();
        if (!img) return null;
        return lineReplyHandler.replyWithImg(client, event, img, img);
    },

    // 隨機帥哥圖(資料庫)
    getRandomMaleImg: async (client, event) => {
        const img = await PttBeautyModel.getRandomMaleImg();
        if (!img) return null;
        return lineReplyHandler.replyWithImg(client, event, img, img);
    }
}

module.exports = PttBeautyEventHandler;