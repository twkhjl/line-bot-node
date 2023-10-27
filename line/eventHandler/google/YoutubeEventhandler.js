const YoutubeDataHandler = require("../../../utils/YoutubeSearch/YoutubeDataHandler");
const commandObj = require("../../command");
const lineReplyHandler = require("../../ReplyHandler");

const YoutubeEventHandler = async function (client, event) {

    
    // 根據關鍵字回傳搜索結果
    //https://www.youtube.com/results?search_query=
    if (commandObj.google.youtube.multipleResult.regex.exec(event.message.text)) {

        const regex = new RegExp(commandObj.google.youtube.multipleResult.regex);
        const outputArr = regex.exec(event.message.text);
        const keyword = outputArr[1];
        const outputMsg = "https://www.youtube.com/results?search_query=" + keyword;

        return lineReplyHandler.replyWithText(client, event, outputMsg);
    }

    // (api)根據關鍵字回傳影片
    if (commandObj.google.youtube.apiSingleResult.regex.exec(event.message.text)) {


        const regex = new RegExp(commandObj.google.youtube.apiSingleResult.regex);
        const inputArr = regex.exec(event.message.text);
        const keyword = inputArr[1];

        const outputMsg = await YoutubeDataHandler.searchByKeyword(keyword);

        return lineReplyHandler.replyWithText(client, event, outputMsg);

       

    }

    
}

module.exports = YoutubeEventHandler;