

const lineApiHandler = require("./ApiHandler");
const lineReplyHandler = require("./ReplyHandler");

// line bot指令
const commandObj = require("./command");

const guessNumberEventHandler = require("./eventHandler/GuessNumberEventHandler");
const weatherEventHandler = require("./eventHandler/WeatherEventHandler");
const TheCatApiEventHandler = require("./eventHandler/TheCatApiEventHandler");
const DogCeoApiEventHandler = require("./eventHandler/DogCeoApiEventHandler");
const ShibeOnlineApiEventHandler = require("./eventHandler/ShibeOnlineApiEventHandler");
const PttBeautyEventHandler = require("./eventHandler/ptt/PttBeautyEventHandler");
const ChatGptEventHandler = require("./eventHandler/botLibre/ChatGptEventHandler");
const FreePlantApiEventHandler = require("./eventHandler/FreePlantApiEventHandler");
const InstructionEventHandler = require("./instruction/InstructionEventHandler");
const YoutubeEventHandler = require("./eventHandler/google/YoutubeEventhandler");
const PttPostEventHandler = require("./eventHandler/ptt/PttPostEventHandler");
const GoogleDoodleGamesEventHandler = require("./eventHandler/google/GoogleDoodleGamesEventHandler");
const numHelper = require("../helpers/numHelper");

// event handler
const EventHandler = async function (req, client, event) {

    if (!req) return;
    if (!client) return;
    if (!event || !event.message || !event.message.text) return;

    const requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const webHookUrl = requestUrl.replace("/callback", "");

    const eventMessageText = event.message && event.message.text ? event.message.text : "";

    const groupId = event.source && event.source.groupId ? event.source.groupId : "";

    // 指令教學及輪播
    // InstructionEventHandler(client, event, { webHookUrl: webHookUrl });

    // 顯示教學
    if (commandObj.instruction.readme.regex.exec(event.message.text)) {
        return InstructionEventHandler.showReadMeUrl(client, event, { webHookUrl: webHookUrl });
    }

    // 顯示指令輪播圖
    if (commandObj.instruction.carousel.regex.exec(event.message.text)) {
        return InstructionEventHandler.showQuickCarousel(client, event, { webHookUrl: webHookUrl });
    }

    // 顯示林園雷達回波圖
    if (commandObj.utils.weather.showRadarImg.regex.exec(event.message.text)) {
        return weatherEventHandler.showRadarImage(client, event);
    }

    // 貓圖
    if (commandObj.img.theCatApi.showRandomImg.regex.exec(event.message.text)) {
        return TheCatApiEventHandler.getRandomImg(client, event);
    }

    // 狗圖
    if (commandObj.img.dogCeoApi.showRandomImg.regex.exec(event.message.text)) {
        return DogCeoApiEventHandler.getRandomImg(client, event);
    }

    // 柴柴圖
    if (commandObj.img.shibeOnlineApi.showRandomImg.regex.exec(event.message.text)) {
        return ShibeOnlineApiEventHandler.getRandomImg(client, event);
    }

    // 植物圖
    if (commandObj.img.freePlantApi.showRandomImg.regex.exec(event.message.text)) {
        return FreePlantApiEventHandler.getRandomImg(client, event);
    }

    // ptt表特版
    // 隨機正妹圖(資料庫)
    if (commandObj.ptt.beauty.showRandomFemaleImg.regex.exec(event.message.text)) {
        return PttBeautyEventHandler.getRandomFemaleImg(client, event);
    }
    // 隨機帥哥圖(資料庫)
    if (commandObj.ptt.beauty.showRandomMaleImg.regex.exec(event.message.text)) {
        return PttBeautyEventHandler.getRandomMaleImg(client, event);

    }

    // 搜尋yt
    // 回傳多個結果(使用網址)
    if (commandObj.google.youtube.multipleResult.regex.exec(event.message.text)) {
        return YoutubeEventHandler.urlMultipleResult(client, event);
    }
    // 回傳單一結果(使用api)
    if (commandObj.google.youtube.apiSingleResult.regex.exec(event.message.text)) {
        return YoutubeEventHandler.apiSingleResult(client, event);
    }

    // ptt文章顯示相關
    // 顯示支援板名
    if (commandObj.ptt.posts.showSupportedBoardName.regex.exec(event.message.text)) {
        return PttPostEventHandler.getSupportedBoardNameTW(client, event);
    }
    // 顯示熱門文章
    if (commandObj.ptt.posts.showHotPosts.regex.exec(event.message.text)) {
        return PttPostEventHandler.showHotPosts(client, event);
    }
    // 顯示噓文
    if (commandObj.ptt.posts.showBooPosts.regex.exec(event.message.text)) {
        return PttPostEventHandler.showBooPosts(client, event);
    }
    // 顯示最新文章
    if (commandObj.ptt.posts.showLatestPosts.regex.exec(event.message.text)) {
        return PttPostEventHandler.showLatestPosts(client, event);
    }

    // google小遊戲
    if (commandObj.google.doodle.regex.exec(event.message.text)) {
        return GoogleDoodleGamesEventHandler.showAll(client, event);
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

    const guessNumberDataHandler = require("../games/guessNumber/DataHandler");
    const condGuessNumber = {
        startGame: commandObj.game.guessNumber.startGame.regex.exec(eventMessageText),
        starting: (function() {
            groupData = guessNumberDataHandler.findByGroupId(groupId);
            if (!groupData) return false;
            return groupId && groupData && groupData.phase;
        })(),
        endGame: commandObj.game.guessNumber.endGame.regex.exec(eventMessageText),

    };

    if(condGuessNumber.startGame || condGuessNumber.endGame || (condGuessNumber && numHelper.isPositiveInteger(eventMessageText))){
        // 終極密碼
        guessNumberEventHandler(client, event);
    }



    // chatGPT3.5
    ChatGptEventHandler(client, event);



}

module.exports = EventHandler;