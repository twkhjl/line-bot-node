const fetch = require('node-fetch');
const cheerio = require('cheerio');
const ArrayHelper = require('../../helpers/arrayHelper');

const headers = {
    "credentials": "include",
    "Cookie": "over18=1",
};

/*
    要過濾的文章資料格式範例:
    [
        {
            author: "作者名稱",
            pushCnt: "推文數",
            date: "日期",
            name: "文章標題",
            link: "文章連結",
        },
        ...
    ]
 */
const PttDataFilter = {

    /*
        取得推文數超過特定數字的文章列表
    */
    filterDataWithPushCnt: async function (postData, filterNum) {

        return postData.filter(e => e.pushCnt > filterNum || e.pushCnt == '爆')

    },

    /*
       取得噓文數超過特定數字的文章列表
       只能輸入以下字串進行過濾:
       X1,X2,X3,X4,X5,X6,X7,X8,X9,XX
   */
    filterDataWithBooCnt: async function (postData, filterTxt) {

        const booCntObj = {
            X1: 10,
            X2: 20,
            X3: 30,
            X4: 40,
            X5: 50,
            X6: 60,
            X7: 70,
            X8: 80,
            X9: 90,
            XX: 100,
        };

        const booCntKeys = Object.keys(booCntObj);

        if (!booCntKeys.includes(filterTxt)) return null;

        const bootCntNum = booCntObj[filterTxt];

        const filteredBootCntArr = booCntKeys.filter(key => booCntObj[key] >= bootCntNum);

        return postData.filter(e => filteredBootCntArr.includes(e.pushCnt));

    },

    /*
        取得推爆的文章列表
    */
    filterDataWith100PushCnt: async function (postData, filterNum) {

        return postData.filter(e => e.pushCnt == '爆')

    },

    /*
        取得噓爆的文章列表
    */
    filterDataWith100BooCnt: async function (postData, filterNum) {

        return postData.filter(e => e.pushCnt == 'XX')

    },





}



module.exports = PttDataFilter;