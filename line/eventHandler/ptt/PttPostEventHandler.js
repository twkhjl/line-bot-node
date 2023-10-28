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
        outputMsg+=`目前支援以下ptt板名的熱門文及噓文搜尋:\n`;
        [].forEach.call(boardName,function(name){
            outputMsg+=`${name}\n`;
        })

        return lineReplyHandler.replyWithText(client,event,outputMsg);
    }

    // 熱門文章
    if (commandObj.ptt.posts.showHotPosts.regex.exec(event.message.text)) {

        const regex = new RegExp(commandObj.ptt.posts.showHotPosts.regex);
        const outputArr = regex.exec(event.message.text);

        console.log(outputArr);

        if(!outputArr[1]) return null;

        if(outputArr[1].length > 6) return null;
        
        const boardNameTW = outputArr[1].replace("板","");
        if(!boardNameData[boardNameTW]) return null;
        
        const boardName = boardNameData[boardNameTW];
        
        const pageTotal = await PttDataHandler.getPageTotal(boardName);
        const minPageNum = (pageTotal*1 - 50)*1 <= 0 ? pageTotal : (pageTotal*1 - 50)*1;

        const posts = await PttDataHandler.getPostsBetweenPageNums(boardName,minPageNum,pageTotal);
        const filteredPosts = await PttDataFilter.filterDataWithPushCnt(posts,60);
        const slicedPosts = filteredPosts.slice(0,10);

        let outputMsg = "";
        outputMsg+=`PTT${boardNameTW}板熱門文章(60推以上)\n`;
        [].forEach.call(slicedPosts,function(post){
            outputMsg+=`(${post.pushCnt})${post.name}\n`;
            outputMsg+=`${post.link}\n\n`;
        })

        return lineReplyHandler.replyWithText(client,event,outputMsg);
    }

    // 熱門噓文
    if (commandObj.ptt.posts.showBooPosts.regex.exec(event.message.text)) {

        const regex = new RegExp(commandObj.ptt.posts.showBooPosts.regex);
        const outputArr = regex.exec(event.message.text);

        if(!outputArr[1]) return null;

        if(outputArr[1].length > 3) return null;
        
        const boardNameTW = outputArr[1].replace("板","");
        if(!boardNameData[boardNameTW]) return null;
        
        
        
        const boardName = boardNameData[boardNameTW];

        const pageTotal = await PttDataHandler.getPageTotal(boardName);
        const minPageNum = (pageTotal*1 - 50)*1 <= 0 ? pageTotal : (pageTotal*1 - 50)*1;

        const posts = await PttDataHandler.getPostsBetweenPageNums(boardName,minPageNum,pageTotal);
        const filteredPosts = await PttDataFilter.filterDataWithBooCnt(posts,"X1");
        const slicedPosts = filteredPosts.slice(0,10);
        let outputMsg = "";
        outputMsg+=`PTT${boardNameTW}板熱門噓文(X1以上)\n`;
        [].forEach.call(slicedPosts,function(post){
            outputMsg+=`(${post.pushCnt})${post.name}\n`;
            outputMsg+=`${post.link}\n\n`;
        })

        return lineReplyHandler.replyWithText(client,event,outputMsg);
    }


    




}

module.exports = PttPostEventHandler;