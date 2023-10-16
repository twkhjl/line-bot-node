const TrashTalkModel = require("../models/TrashTalkModel");
const MessageRecordModel = require("../models/MessageRecordModel");
const ImgModel = require("../models/ImgModel");

const dateTimeHelper = require("../helpers/dateTimeHelper");

const lineApiHandler = require("./ApiHandler");
const linReplyHandler = require("./ReplyHandler");
const readme = require("./readme");
const ApiHandler = require("./ApiHandler");

const weatherDataHandler = require("../API/weather/DataHandler");

const guessNumberEventHandler = require("./eventHandler/GuessNumberEventHandler");

const trashTalkEventHandler = require("./eventHandler/TrashTalkEventhandler");

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

    // line bot指令
    const commandObj = require("./command");

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
        return linReplyHandler.replyWithText(client, event, outputMsg);
    }

    // 隨機梗圖
    if (commandObj.showRandomImg.exec(eventMessageText)) {

        let getRandomImgErr = 0;
        const randomImg = await ImgModel.getRandomImg().catch(err => {
            removeAllFromGroupErr = 1;
            return console.log(err);
        });
        if (getRandomImgErr) return;;

        if (!randomImg || !randomImg.original_content_url || !randomImg.preview_image_url) return;

        return linReplyHandler.replyWithImg(client, event, randomImg.original_content_url, randomImg.preview_image_url);

    }

    // 搜索youtube
    //https://www.youtube.com/results?search_query=
    if (commandObj.search.youtube.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.youtube);
        const outputArr = regex.exec(eventMessageText);
        const keyword = outputArr[1];
        const outputMsg = "https://www.youtube.com/results?search_query=" + keyword;

        return linReplyHandler.replyWithText(client, event, outputMsg);
    }

    // 搜google
    // https://www.google.com/search?q=
    if (commandObj.search.google.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.google);
        const outputArr = regex.exec(eventMessageText);
        const keyword = outputArr[1];
        const outputMsg = "https://www.google.com/search?q=" + keyword;

        return linReplyHandler.replyWithText(client, event, outputMsg);

    }

    // google導航
    // https://www.google.com.tw/maps/dir/地點1/地點2
    if (commandObj.search.googleMap.exec(eventMessageText)) {

        const regex = new RegExp(commandObj.search.googleMap);
        const outputArr = regex.exec(eventMessageText);
        const startLocation = outputArr[1];
        const goal = outputArr[2];
        const outputMsg = `https://www.google.com.tw/maps/dir/${startLocation}/${goal}`;

        return linReplyHandler.replyWithText(client, event, outputMsg);


    }

    // 查詢高雄特定行政區明天降雨機率
    if (commandObj.showRainfullRate.exec(eventMessageText)) {
        const regex = new RegExp(commandObj.showRainfullRate);
        const outputArr = regex.exec(eventMessageText);
        let districtKeyword = outputArr[1];


        if (!districtKeyword.includes("區")) {
            districtKeyword += "區";
        }

        let getRainfullRateErr = 0;
        const outputMsg = await weatherDataHandler.getRainfullRate(districtKeyword).catch(err => {
            console.log(err);
            getRainfullRateErr = 1;
            return;
        });
        if (getRainfullRateErr) return;
        return linReplyHandler.replyWithText(client, event, outputMsg);

    }


}

module.exports = EventHandler;