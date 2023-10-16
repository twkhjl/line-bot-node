const MessageRecordModel = require("../models/MessageRecordModel");

const dateTimeHelper = require("../helpers/dateTimeHelper");

const lineApiHandler = require("./ApiHandler");
const lineReplyHandler = require("./ReplyHandler");
const readme = require("./readme");
const ApiHandler = require("./ApiHandler");

const guessNumberEventHandler = require("./eventHandler/GuessNumberEventHandler");
const trashTalkEventHandler = require("./eventHandler/TrashTalkEventhandler");
const weatherEventHandler = require("./eventHandler/WeatherEventHandler");
const ImgEventhandler = require("./eventHandler/ImgEventHandler");

// line bot指令
const commandObj = require("./command");

// event handler
const EventHandler = async function (client, event) {

    const eventMessageText = event.message && event.message.text ? event.message.text : "";
    const eventMessageType = event.message && event.message.type ? event.message.type : "";

    const userId = event.source && event.source.userId ? event.source.userId : "";
    const groupId = event.source && event.source.groupId ? event.source.groupId : "";


    // 終極密碼
    guessNumberEventHandler(client,event);


    // linebot僅限群組使用
    if (!groupId) {
        return;
    }
    // 紀錄群組對話
    if (event.type == 'message' && eventMessageType == 'text' && groupId) {

        const data = {
            group_id: groupId,
            user_id: userId,
            message_type: eventMessageType,
            message: eventMessageText,
            created_at: dateTimeHelper.getCurrentTimeString(),

        };

        let userProfileErr = 0;
        let userProfile = null;
        if (userId) {
            userProfile = await ApiHandler.userProfile(userId).catch(err => {
                userProfileErr = 1;
                console.log(err);
                return;
            })
        }

        if (userProfile && userProfile.displayName) {
            data.display_name = userProfile.displayName;
        }

        await MessageRecordModel.insert(data).catch(err => {
            return console.log(err);
        });
    }

    // 幹話相關
    trashTalkEventHandler(client,event);

    // 天氣預報相關
    weatherEventHandler(client,event);

    // 梗圖相關
    ImgEventhandler(client,event);

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

    // 顯示教學
    if (commandObj.readme.exec(eventMessageText)) {
        const outputMsg = readme;
        return lineReplyHandler.replyWithText(client, event, outputMsg);
    }

   

    // 搜索youtube
    //https://www.youtube.com/results?search_query=
    if (commandObj.search.youtube.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.youtube);
        const outputArr = regex.exec(eventMessageText);
        const keyword = outputArr[1];
        const outputMsg = "https://www.youtube.com/results?search_query=" + keyword;

        return lineReplyHandler.replyWithText(client, event, outputMsg);
    }

    // 搜google
    // https://www.google.com/search?q=
    if (commandObj.search.google.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.google);
        const outputArr = regex.exec(eventMessageText);
        const keyword = outputArr[1];
        const outputMsg = "https://www.google.com/search?q=" + keyword;

        return lineReplyHandler.replyWithText(client, event, outputMsg);

    }

    // google導航
    // https://www.google.com.tw/maps/dir/地點1/地點2
    if (commandObj.search.googleMap.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.googleMap);
        const outputArr = regex.exec(eventMessageText);
        const startLocation = outputArr[1];
        const goal = outputArr[2];
        const outputMsg = `https://www.google.com.tw/maps/dir/${startLocation}/${goal}`;

        return lineReplyHandler.replyWithText(client, event, outputMsg);


    }

    


}

module.exports = EventHandler;