const ChatGptDataHandler = require("../../../utils/botLibre/bot/ChatGptDataHandler");
const commandObj = require("../../command");
const lineReplyHandler = require("../../ReplyHandler");


const ChatGptEventHandler = async function (client, event) {

    if (commandObj.botLibre.bot.chatGpt.chat.regex.exec(event.message.text)) {

        const regex = new RegExp(commandObj.botLibre.bot.chatGpt.chat.regex);
        const outputArr = regex.exec(event.message.text);

        const txt = outputArr[1];

        let chatErr = 0;
        const chatResult = await ChatGptDataHandler.chat(txt).catch(err => {
            chatErr = 1;
            return console.log(err);
        });
        if (chatErr) return;;
        
        if (!chatResult) return;
        
        const outputMsg = chatResult;

        return lineReplyHandler.replyWithText(client, event, outputMsg);

    }
    

}

module.exports = ChatGptEventHandler;