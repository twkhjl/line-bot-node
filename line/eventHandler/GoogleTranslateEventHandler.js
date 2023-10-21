const commandObj = require("../command");
const lineReplyHandler = require("../ReplyHandler");

const translateDataHandler = require("../../utils/GoogleTranslate/DataHandler");

const GoogleTranslateEventHandler = async function (client, event) {

    // 翻成中文
    if (commandObj.translate.toTraditionalChinese.regex.exec(event.message.text)) {

        const regex = new RegExp(commandObj.translate.toTraditionalChinese.regex);
        const outputArr = regex.exec(event.message.text);
        
        const txt = outputArr[1];

        let translateErr = 0;
        const translateResult = await translateDataHandler.translate(txt).catch(err => {
            translateErr = 1;
            return console.log(err);
        });
        if (translateErr) return;;

        if (!translateResult) return;

        const outputMsg = translateResult;

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

module.exports = GoogleTranslateEventHandler;