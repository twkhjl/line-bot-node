const commandObj = require("../command");
const lineReplyHandler = require("../ReplyHandler");

const InstructionEventHandler = {

    showReadMeUrl: (client, event, options = null) => {

        const webHookUrl = options.webHookUrl || null;
        // 顯示教學
        if (commandObj.instruction.readme.regex.exec(event.message.text)) {

            let outputMsg = "";
            if (webHookUrl) {
                outputMsg = `請參考指令教學網址:\n${webHookUrl}/readme`;
            }

            if (!outputMsg) return null;

            return lineReplyHandler.replyWithText(client, event, outputMsg);
        }

    },
    showQuickCarousel: (client, event,options) => {

        const webHookUrl = options.webHookUrl || null;

        const aboutBubble = require("../flexMessages/bubbles/aboutBubble");
        const getImgBubble = require("../flexMessages/bubbles/getImgBubble");
        const getImgBubble2 = require("../flexMessages/bubbles/getImgBubble2");
        const pttBubble = require("../flexMessages/bubbles/pttBubble");
        const tutBubble = require("../flexMessages/bubbles/tutBubble");
        const gameBubble = require("../flexMessages/bubbles/gameBubble");
        const utilBubble = require("../flexMessages/bubbles/utilBubble");

        const bubbleSize = "kilo";

        const bubbleConfig = { bubbleSize, webHookUrl };

        const flexMessage = {
            "type": "carousel",
            "contents": [
                aboutBubble(bubbleConfig),
                tutBubble(bubbleConfig),
                pttBubble(bubbleConfig),
                getImgBubble(bubbleConfig),
                getImgBubble2(bubbleConfig),
                gameBubble(bubbleConfig),
                utilBubble(bubbleConfig),
            ]
        };
        return lineReplyHandler.replyWithFlex(client, event, flexMessage);
    }
}

module.exports = InstructionEventHandler;