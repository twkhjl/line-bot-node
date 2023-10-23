const MessageRecordModel = require("../models/MessageRecordModel");

const dateTimeHelper = require("../helpers/dateTimeHelper");

const lineApiHandler = require("./ApiHandler");
const lineReplyHandler = require("./ReplyHandler");
const ApiHandler = require("./ApiHandler");

// line bot指令
const commandObj = require("./command");

const guessNumberEventHandler = require("./eventHandler/GuessNumberEventHandler");
const weatherEventHandler = require("./eventHandler/WeatherEventHandler");
const ImgEventhandler = require("./eventHandler/ImgEventHandler");
const TheCatApiEventHandler = require("./eventHandler/TheCatApiEventHandler");
const DogCeoApiEventHandler = require("./eventHandler/DogCeoApiEventHandler");
const ShibeOnlineApiEventHandler = require("./eventHandler/ShibeOnlineApiEventHandler");
const GoogleTranslateEventHandler = require("./eventHandler/GoogleTranslateEventHandler");
const ReplyHandler = require("./ReplyHandler");
const PttBeautyEventHandler = require("./eventHandler/ptt/PttBeautyEventHandler");
const ChatGptEventHandler = require("./eventHandler/botLibre/ChatGptEventHandler");
const PttBeautyModel = require("../models/PttBeautyModel");

// event handler
const EventHandler = async function (req, client, event) {

    const requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const webHookUrl = requestUrl.replace("/callback", "");

    const eventMessageText = event.message && event.message.text ? event.message.text : "";
    const eventMessageType = event.message && event.message.type ? event.message.type : "";

    const userId = event.source && event.source.userId ? event.source.userId : "";
    const groupId = event.source && event.source.groupId ? event.source.groupId : "";


    

    // 顯示教學
    if (commandObj.readme.regex.exec(event.message.text)) {
        const outputMsg = `請參考指令教學網址:\n${webHookUrl}/readme`;

        return lineReplyHandler.replyWithText(client, event, outputMsg);
    }


    // chatGPT3.5
    ChatGptEventHandler(client, event);

    // 終極密碼
    guessNumberEventHandler(client, event);

    // 天氣預報相關
    weatherEventHandler(client, event);

    // 梗圖相關
    ImgEventhandler(client, event);

    // 貓圖
    TheCatApiEventHandler(client, event);

    // 狗圖
    DogCeoApiEventHandler(client, event);

    // 柴柴圖
    ShibeOnlineApiEventHandler(client, event);

    // ptt表特版
    PttBeautyEventHandler(client, event);

    

    // 取得群組id用
    if (eventMessageText == 'groupid' && groupId) {

        let groupSummaryErr = 0;
        const output = await lineApiHandler.groupSummary(groupId).catch(() => {
            groupSummaryErr = 1;
            return console.log("err")
        });
        if (groupSummaryErr) return;
        return console.log(output);
    }

    // 搜索youtube
    //https://www.youtube.com/results?search_query=
    if (commandObj.search.youtube.regex.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.youtube.regex);
        const outputArr = regex.exec(eventMessageText);
        const keyword = outputArr[1];
        const outputMsg = "https://www.youtube.com/results?search_query=" + keyword;

        return lineReplyHandler.replyWithText(client, event, outputMsg);
    }


    // google導航
    // https://www.google.com.tw/maps/dir/地點1/地點2
    if (commandObj.search.googleMap.regex.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.googleMap.regex);
        const outputArr = regex.exec(eventMessageText);
        const startLocation = outputArr[1];
        const goal = outputArr[2];
        const outputMsg = `https://www.google.com.tw/maps/dir/${startLocation}/${goal}`;

        return lineReplyHandler.replyWithText(client, event, outputMsg);


    }


}

module.exports = EventHandler;