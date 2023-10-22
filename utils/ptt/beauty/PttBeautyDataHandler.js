const fetch = require('node-fetch');
const cheerio = require('cheerio');
const numHelper = require('../../../helpers/numHelper');
const pttBeautyDataFilterHandler = require("./PttBeautyDataFilter");

const headers = {
    "credentials": "include",
    "Cookie": "over18=1",
};
const PttBeautyDataHandler = {

    // 根據關鍵字取得文章列表搜索結果
    getRandomPostsByKeyWord: async function (min, max, keyword) {

        const page_num = numHelper.randomIntegerFromInterval(min, max);
        
        const url = `https://www.ptt.cc/bbs/Beauty/search?page=${page_num}&q=${keyword}`;

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
                link: $(obj).find(".title a").attr('href'),
            };
        }).get();

        return postsOrigin;

    },

    // 取得隨機文章資料
    getRandomPosts: async function (min, max) {

        const page_num = numHelper.randomIntegerFromInterval(min, max);
        const url = `https://www.ptt.cc/bbs/Beauty/index${page_num}.html`;

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
                link: $(obj).find(".title a").attr('href'),
            };
        }).get();

        return postsOrigin;

    },

    // 篩選文章列表資料
    filterPost: function (postsOrigin, filterType) {

        return postsOrigin.filter(post => {
            return pttBeautyDataFilterHandler[filterType](post);
        });

    },

    // 根據文章網址取得文章內容
    getPostDetail: async function (postUrl) {

        const urlPrefix = "https://www.ptt.cc";
        const url = urlPrefix + postUrl;

        const response = await fetch(url, {
            headers: headers,
        })


        if (!response || !response.text) {

            return new Promise((resolve, reject) => resolve({ hasErr: true, err: "no-img" }));
        }

        return response.text();

    },

    // 從文章內容html擷取出圖片連結
    getImgUrlFromPostDetail: async function (postDetail) {

        let images = postDetail.match(/imgur.com\/[0-9a-zA-Z]{7}/g);

        images = [...new Set(images)];

        if (!images || images.length <= 0) {
            return new Promise((resolve, reject) => resolve({ hasErr: true, err: "images array empty" }));
        }
        const formattedImgs = images.map(img => "https://" + img + ".jpg");

        return new Promise((resolve, reject) => resolve(formattedImgs));

    },

    // 取得隨機妹子圖片
    getRandomFemaleImg: async function () {

        const postsOrigin = await this.getRandomPostsByKeyWord(10, 2765,"正妹");

        let postsFilter = [];

        postsFilter = this.filterPost(postsOrigin, "filterFemaleImg");


        if (!postsFilter || postsFilter.length <= 0) {

            return new Promise((resolve, reject) => resolve({ hasErr: true, err: "no posts after filter" }));
        }

        const postsFilterRandomIdx = numHelper.generateRndomNumber(postsFilter.length - 1);
        const postUrl = postsFilter[postsFilterRandomIdx].link;

        const postDetail = await this.getPostDetail(postUrl);

        const imgs = await this.getImgUrlFromPostDetail(postDetail);

        const imgsRandomIdx = numHelper.generateRndomNumber(imgs.length - 1);
        const output = imgs[imgsRandomIdx];

        return new Promise((resolve, reject) => resolve(output));

    },

    // 取得隨機帥哥圖片
    getRandomMaleImg: async function () {

        const postsOrigin = await this.getRandomPostsByKeyWord(1, 122,"帥哥");
        let postsFilter = [];

        postsFilter = this.filterPost(postsOrigin, "filterMaleImg");


        if (!postsFilter || postsFilter.length <= 0) {

            return new Promise((resolve, reject) => resolve({ hasErr: true, err: "no posts after filter" }));
        }

        const postsFilterRandomIdx = numHelper.generateRndomNumber(postsFilter.length - 1);
        const postUrl = postsFilter[postsFilterRandomIdx].link;

        const postDetail = await this.getPostDetail(postUrl);

        const imgs = await this.getImgUrlFromPostDetail(postDetail);

        const imgsRandomIdx = numHelper.generateRndomNumber(imgs.length - 1);
        const output = imgs[imgsRandomIdx];

        return new Promise((resolve, reject) => resolve(output));

    }
}



module.exports = PttBeautyDataHandler;