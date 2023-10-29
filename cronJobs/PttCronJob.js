const dateTimeHelper = require('../helpers/dateTimeHelper');
const PttPostModel = require('../models/PttPostModel');
const PttDataHandler = require('../utils/ptt/PttDataHandler');
const PttPostsWebCrawler = require("../webCrawlers/PttPostsWebCrawler");

const rawBoardNamesData = PttDataHandler.getBoardNameData();

const boardNames = Object.values(rawBoardNamesData);


/*
"軍事":"military",
"高雄":"kaohsiung",
"西洽":"c_chat",
"電影":"movie",
"電蝦":"pc_shopping",
"男女":"boy-girl",
"女孩":"womentalk",
"就可":"joke",
"NBA":"nba",
"棒球":"baseball",
"股票":"stock",
"歐兔":"alltogether",
"省錢":"lifeismoney",
"八卦":"gossiping",
 */

const PttCronJob = {

    updateDB: async () => {

        // 清空資料表
        await PttPostModel.truncate();

        
        let results = await Promise.all(

            boardNames.map(async (boardName) => {

                const pageTotal = await PttPostsWebCrawler.getPageTotal(boardName);
                const minPageNum = (pageTotal * 1 - 9) * 1 <= 0 ? pageTotal : (pageTotal * 1 - 9) * 1;

                const posts = await PttPostsWebCrawler.getPostsBetweenPageNums(boardName, minPageNum, pageTotal);

                const dataToInsert = posts.map(e => {
                    return [
                        boardName,
                        e.name,
                        e.author,
                        e.url,
                        e.pushCnt,
                        e.pageNum,
                        e.postDate,
                        dateTimeHelper.getCurrentTimeString()
                    ]
                });

                await PttPostModel.insert(dataToInsert);
            })
        );

        return results;

    },

}


module.exports = PttCronJob;