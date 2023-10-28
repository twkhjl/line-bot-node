const PttPostModel = require("../../../models/PttPostModel");
const PttDataFilter = require("../../../utils/ptt/PttDataFilter");
const PttDataHandler = require("../../../utils/ptt/PttDataHandler");
const commandObj = require("../../command");
const lineReplyHandler = require("../../ReplyHandler");

const boardNameData = PttDataHandler.getBoardNameData();

const PttPostEventHandler = async function (client, event) {

    // 顯示支援的板名
    if (commandObj.ptt.posts.showSupportedBoardName.regex.exec(event.message.text)) {

        const boardName = PttDataHandler.getSupportedBoardNameTW();

        let outputMsg = "";
        outputMsg += `目前支援以下ptt板名的熱門文及噓文搜尋:\n`;
        [].forEach.call(boardName, function (name) {
            outputMsg += `${name}\n`;
        })

        return lineReplyHandler.replyWithText(client, event, outputMsg);
    }

    // 熱門文章
    if (commandObj.ptt.posts.showHotPosts.regex.exec(event.message.text)) {

        const regex = new RegExp(commandObj.ptt.posts.showHotPosts.regex);
        const outputArr = regex.exec(event.message.text);


        if (!outputArr[1]) return null;

        if (outputArr[1].length > 6) return null;

        const boardNameTW = outputArr[1].replace("板", "");
        if (!boardNameData[boardNameTW]) return null;

        const boardName = boardNameData[boardNameTW];
        const pushCnt = 60;
        const posts = await PttPostModel.selectByPushCntWithLimit({
            boardName: boardName,
            pushCnt: 60,
            limit: 20,
        })

        let outputMsg = "";
        outputMsg += `PTT${boardNameTW}板熱門文章(${pushCnt}推以上)\n`;
        [].forEach.call(posts, function (post) {
            outputMsg += `(${post.push_cnt})${post.title}\n`;
            outputMsg += `${post.url}\n\n`;
        })

        return lineReplyHandler.replyWithText(client, event, outputMsg);
    }

    // 熱門噓文
    if (commandObj.ptt.posts.showBooPosts.regex.exec(event.message.text)) {

        const regex = new RegExp(commandObj.ptt.posts.showBooPosts.regex);
        const outputArr = regex.exec(event.message.text);

        if (!outputArr[1]) return null;

        if (outputArr[1].length > 6) return null;

        const boardNameTW = outputArr[1].replace("板", "");
        if (!boardNameData[boardNameTW]) return null;


        const boardName = boardNameData[boardNameTW];
        const pushCnt = 60;
        const posts = await PttPostModel.selectByBooCntWithLimit({
            boardName: boardName,
            pushCnt: "X1",
            limit: 20,
        });

        let outputMsg = "";
        outputMsg += `PTT${boardNameTW}板熱門噓文(X1以上)\n`;
        [].forEach.call(posts, function (post) {
            outputMsg += `(${post.push_cnt})${post.title}\n`;
            outputMsg += `${post.url}\n\n`;
        })

        return lineReplyHandler.replyWithText(client, event, outputMsg);
    }







}

module.exports = PttPostEventHandler;