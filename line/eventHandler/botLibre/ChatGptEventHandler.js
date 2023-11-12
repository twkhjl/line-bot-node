const ChatGptDataHandler = require("../../../utils/botLibre/bot/ChatGptDataHandler");
const ApiHandler = require("../../ApiHandler");
const commandObj = require("../../command");
const lineReplyHandler = require("../../ReplyHandler");

let botSetting = process.env.BOT_SETTING;


const ChatGptEventHandler = async function (client, event) {

    const groupId = event.source && event.source.groupId ? event.source.groupId : "";
    const userId = event.source && event.source.userId ? event.source.userId : "";

    if (!client) return null;
    if (!event || !event.message || !event.message.text) return null;
    if (!groupId && !userId) return null;

    let userInput = null;

    if (groupId && !commandObj.botLibre.bot.chatGpt.chat.regex.exec(event.message.text)) {
        return null;
    }

    if (groupId && commandObj.botLibre.bot.chatGpt.chat.regex.exec(event.message.text)) {
        const regex = new RegExp(commandObj.botLibre.bot.chatGpt.chat.regex);
        const outputArr = regex.exec(event.message.text);
        userInput = outputArr[1];
    }

    if (!groupId && userId) {
        userInput = event.message.text;
    }

    let userProfile = null;
    if(userId){
        userProfile = await ApiHandler.userProfile(userId);
    }

    let chatMsg = null;
    chatMsg += botSetting;

    if (groupId) {
        chatMsg += " 你現在在一個群組聊天室裡,跟你對話的可能不只一人. ";
    }
    if (groupId && userId && userProfile && userProfile.displayName) {
        chatMsg += ` 現在跟你對話的是 ${userProfile.displayName} `;
    }

    if (!groupId) {
        chatMsg += " 你現在在一對一的聊天室裡,跟你對話的只有我. ";
    }

    if (!groupId && userId && userProfile && userProfile.displayName) {
        chatMsg += ` 我是 ${userProfile.displayName} `;
    }

    chatMsg += " 讓我們開始對話. ";
    chatMsg += userInput;




    let chatErr = 0;
    const chatResult = await ChatGptDataHandler.chat(chatMsg).catch(err => {
        chatErr = 1;
        return console.log(err);
    });
    if (chatErr) return;;

    if (!chatResult) return;

    const outputMsg = chatResult;

    return lineReplyHandler.replyWithText(client, event, outputMsg);



}

module.exports = ChatGptEventHandler;