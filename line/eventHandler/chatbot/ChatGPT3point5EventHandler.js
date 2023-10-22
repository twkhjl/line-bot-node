const ChatGPT3point5DataHandler = require("../../../utils/chatBot/chatGPT3.5/ChatGPT3point5DataHandler");
const commandObj = require("../../command");
const lineReplyHandler = require("../../ReplyHandler");


const ChatGPT3point5EventHandler = async function (client, event) {

    // 翻成中文
    if (commandObj.chatbot.chatGPT3point5.chat.regex.exec(event.message.text)) {

        const regex = new RegExp(commandObj.chatbot.chatGPT3point5.chat.regex);
        const outputArr = regex.exec(event.message.text);

        const txt = outputArr[1];

        let chatErr = 0;
        const chatResult = await ChatGPT3point5DataHandler.chat(txt).catch(err => {
            chatErr = 1;
            return console.log(err);
        });
        if (chatErr) return;;

        if (!chatResult) return;

        const outputMsg = chatResult;

        return lineReplyHandler.replyWithText(client, event, outputMsg);

    }
    // 翻成其他語言
    if (commandObj.translate.toAnotherLanguage.regex.exec(event.message.text)) {

        const regex = new RegExp(commandObj.translate.toAnotherLanguage.regex);
        const outputArr = regex.exec(event.message.text);

        const lang = outputArr[1];
        const txt = outputArr[2];


        let translateErr = 0;
        const translateResult = await translateDataHandler.translate(txt, lang).catch(err => {
            translateErr = 1;
            return console.log(err);
        });
        if (translateErr) return;;

        if (!translateResult) return;

        const outputMsg = translateResult;

        return lineReplyHandler.replyWithText(client, event, outputMsg);

    }

}

module.exports = ChatGPT3point5EventHandler;