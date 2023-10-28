const fetch = require('node-fetch');
const cheerio = require('cheerio');
const ArrayHelper = require('../../helpers/arrayHelper');

const headers = {
    "credentials": "include",
    "Cookie": "over18=1",
};

const linkPrefix = "https://www.ptt.cc";

const boardNameData = {
    "政黑":"hatepolitics",
    // "軍事":"military",
    "高雄":"kaohsiung",
    // "西洽":"c_chat",
    // "電影":"movie",
    // "電蝦":"pc_shopping",
    // "男女":"boy-girl",
    // "女孩":"womentalk",
    "就可":"joke",
    // "NBA":"nba",
    // "棒球":"baseball",
    // "股票":"stock",
    // "歐兔":"alltogether",
    // "省錢":"lifeismoney",
    // "八卦":"gossiping",
}

const PttDataHandler = {

    getBoardNameData:()=>{
        return boardNameData;
    },

    getSupportedBoardNameTW:()=>{
        return Object.keys(boardNameData);
    },

    // 取得看板總頁數
    getPageTotal: async function (boardName) {

        const url = `https://www.ptt.cc/bbs/${boardName}/index.html`;

        const response = await fetch(url, {
            headers: headers,
        })
        const data = await response.text();

        const $ = cheerio.load(data);

        const linkData = $('.btn.wide').map((index, obj) => {
            return {
                link: linkPrefix + $(obj).attr('href'),
                text: $(obj).text(),
            };
        }).get();
        const prevLinkData = linkData.filter(e => e.text.includes("上頁"));
        if (!prevLinkData[0] || !prevLinkData[0].link) return null;
        const pageNum = /\/index(\d+)\.html/gi.exec(prevLinkData[0].link)[1];
        return pageNum * 1 + 1;

    },

    // 取得搜尋結果總頁數
    getSearchResultPageTotal: async function (boardName, keyword) {

        // https://www.ptt.cc/bbs/Gossiping/search?q=%E5%95%8F%E5%8D%A6
        const url = `https://www.ptt.cc/bbs/${boardName}/search?q=${keyword}`;

        const response = await fetch(url, {
            headers: headers,
        })
        const data = await response.text();

        const $ = cheerio.load(data);

        const linkData = $('.btn.wide').map((index, obj) => {
            return {
                link: linkPrefix + $(obj).attr('href'),
                text: $(obj).text(),
            };
        }).get();

        const prevLinkData = linkData.filter(e => e.text.includes("最舊"));
        const pageNum = /\?page=(\d+)/gi.exec(prevLinkData[0].link)[1];
        return pageNum;

    },

    // https://www.ptt.cc/bbs/Kaohsiung/index.html

    // 根據關鍵字跟頁數取得單頁的文章列表搜索結果
    getSearchResultByPageNum: async function (boardName, pageNum, keyword) {


        const url = `https://www.ptt.cc/bbs/${boardName}/search?page=${pageNum}&q=${keyword}`;

        const response = await fetch(url, {
            headers: headers,
        })
        const data = await response.text();

        const $ = cheerio.load(data);
        let postsOrigin = [];

        postsOrigin = $('.r-ent').map((index, obj) => {
            return {
                author: $(obj).find('.author').text(),
                pushCnt: $(obj).find('.nrec span').text(),
                date: $(obj).find('.date').text(),
                name: $(obj).find(".title a").text(),
                link: linkPrefix + $(obj).find(".title a").attr('href'),
            };
        }).get();

        return postsOrigin;

    },

    // 根據頁數取得特定版面單頁的文章列表
    getPostsByPageNum: async function (boardName, pageNum) {


        const url = `https://www.ptt.cc/bbs/${boardName}/index${pageNum}.html`;

        const response = await fetch(url, {
            headers: headers,
        })
        const data = await response.text();

        const $ = cheerio.load(data);
        let postsOrigin = [];

        postsOrigin = $('.r-ent').map((index, obj) => {
            return {
                author: $(obj).find('.author').text(),
                pushCnt: $(obj).find('.nrec span').text(),
                date: $(obj).find('.date').text(),
                name: $(obj).find(".title a").text(),
                link: linkPrefix + $(obj).find(".title a").attr('href'),
            };
        }).get();

        return postsOrigin;

    },

    // 取得特定版面兩個頁數之間的文章列表
    getPostsBetweenPageNums: async function (boardName, min, max) {

        const numArr = ArrayHelper.getRangeArray(min, max);

        const output = await Promise.all(numArr.map(async (num) => {
            return this.getPostsByPageNum(boardName, num);
        }))

        const outputFlat = output.flat();

        return outputFlat;

    },

    // 取得搜索結果兩個頁數之間的文章列表
    getSearchResultBetweenPageNums: async function (boardName, min, max, keyword) {

        const numArr = ArrayHelper.getRangeArray(min, max);

        const output = await Promise.all(numArr.map(async (num) => {
            return this.getSearchResultByPageNum(boardName, num, keyword);
        }))

        const outputFlat = output.flat();

        return outputFlat;

    },


}



module.exports = PttDataHandler;