const ImgModel = require("../../models/ImgModel");
const commandObj = require("../command");
const lineReplyHandler = require("../ReplyHandler");

const ImgEventhandler = async function (client, event) {

    // 隨機梗圖
    if (commandObj.showRandomImg.regex.exec(event.message.text)) {

        let getRandomImgErr = 0;
        const randomImg = await ImgModel.getRandomImg().catch(err => {
            removeAllFromGroupErr = 1;
            return console.log(err);
        });
        if (getRandomImgErr) return;;

        if (!randomImg || !randomImg.original_content_url || !randomImg.preview_image_url) return;

        return lineReplyHandler.replyWithImg(client, event, randomImg.original_content_url, randomImg.preview_image_url);

    }

    // 指定梗圖
    if (commandObj.showImgByTitle.regex.exec(event.message.text)) {

        const regex = new RegExp(commandObj.showImgByTitle.regex);
        const outputArr = regex.exec(event.message.text);
        const title = outputArr[1];

        let getOneByTitleErr = 0;
        const result = await ImgModel.getOneByTitle(title).catch(err => {
            getOneByTitleErr = 1;
            return console.log(err);
        });
        if (getOneByTitleErr) return;;

        if (!result || !result.original_content_url || !result.preview_image_url) return;

        return lineReplyHandler.replyWithImg(client, event, result.original_content_url, result.preview_image_url);

    }

    // 列出所有梗圖標題
    if (commandObj.showAllImgTitle.regex.exec(event.message.text)) {


        let getAllImgTitleErr = 0;
        const result = await ImgModel.getAllImgTitle().catch(err => {
            getAllImgTitleErr = 1;
            return console.log(err);
        });
        if (getAllImgTitleErr) return;
        if (!result) return;

        let output = "目前支援的圖片關鍵字如下:\n(關鍵字使用方式:輸入 'mic支援 關鍵字')\n";
        [].map.call(result,function(e){
            output+=e.title;
            output+="\n";
        })

        if (!output) return;

        return lineReplyHandler.replyWithText(client, event, output);

    }
}

module.exports = ImgEventhandler;