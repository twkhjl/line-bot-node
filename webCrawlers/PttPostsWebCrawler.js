const fetch = require('node-fetch');
const cheerio = require('cheerio');
const ArrayHelper = require('../helpers/arrayHelper');
const dateTimeHelper = require("../helpers/dateTimeHelper");
const headers = {
    "credentials": "include",
    "Cookie": "over18=1",
};

const linkPrefix = "https://www.ptt.cc";


const PttPostsWebCrawler = {

    // 取得看板總頁數
    getPageTotal: async function (boardName) {

        const url = `https://www.ptt.cc/bbs/${boardName}/index.html`;


        const response = await fetch(url, {
            headers: headers,
        })
        const data = await response.text();

        const $ = cheerio.load(data);

        const href = $('a.btn.wide').filter(function() {
            return $(this).text() === '‹ 上頁';
          }).attr('href');

        if (!href) return null;

        const pageNum = /\/index(\d+)\.html/gi.exec(href)[1];
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
                url: linkPrefix + $(obj).attr('href'),
                text: $(obj).text(),
            };
        }).get();

        const prevLinkData = linkData.filter(e => e.text.includes("最舊"));
        const pageNum = /\?page=(\d+)/gi.exec(prevLinkData[0].url)[1];
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
            return this.getPostData($, obj, {
                pageNum: pageNum,
                linkPrefix: linkPrefix
            });

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
            return this.getPostData($, obj, {
                pageNum: pageNum,
                linkPrefix: linkPrefix
            });
        }).get();

        return postsOrigin;

    },

    // 取得特定版面兩個頁數之間的文章列表
    getPostsBetweenPageNums: async function (boardName, min, max, config={}) {

        const numArr = ArrayHelper.getRangeArray(min, max);

        const output = await Promise.all(numArr.map(async (num) => {
            return this.getPostsByPageNum(boardName, num);
        }))

        if(config.noFlat){
            return output;
        }
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

    /* 根據文章連結取得發表時間
     ptt網址有UNIX timestamp,直接parse即可
     網址格式範例:
     https://www.ptt.cc/bbs/HatePolitics/M.1698493410.A.A8F.html
    */

    getPostDateFromPostUrl: function (postDetailUrl) {


        const url = postDetailUrl;
        const regExResult = /M\.(\d+)\.A/gi.exec(url);
        if(!regExResult || !regExResult[1]) return null;

        const unixTimeStamp = regExResult[1] * 1000;

        const postDate = dateTimeHelper.getTimeString(unixTimeStamp);
        return postDate;

    },

    // 從DOM取得所需的文章資料
    getPostData: function ($, obj, data) {

        const href = $(obj).find(".title a").attr('href');
        const url = href ? data.linkPrefix + href : null;
        const postDate = this.getPostDateFromPostUrl(href);
        return {
            author: $(obj).find('.author').text(),
            pushCnt: $(obj).find('.nrec span').text(),
            pageNum: data.pageNum,
            postDate: postDate,
            name: $(obj).find(".title a").text(),
            url: url,
        };

    }


}



module.exports = PttPostsWebCrawler;