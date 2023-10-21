const fetch = require('node-fetch');
const cheerio = require('cheerio');
const numHelper = require('../../../helpers/numHelper');

const PttBeautyDataHandler = {

    getRandomFemaleImg: async () => {


        const page_num = numHelper.randomIntegerFromInterval(3000, 4006);
        const url = `https://www.ptt.cc/bbs/Beauty/index${page_num}.html`;

        const headers = {
            "credentials": "include",
            "Cookie": "over18=1",
        }

        const response = await fetch(url, {
            headers: headers,
        })
        const data = await response.text();

        const $ = cheerio.load(data);
        let postsOrigin = [];

        postsOrigin = $('.r-ent a').map((index, obj) => {

            return {
                name: $(obj).text(),
                link: $(obj).attr('href'),
            };
        }).get();



        let postsFilter = [];

        postsFilter = postsOrigin.filter(post => {
            const cond = {
                filterSearchLink: !/\/search/gm.exec(post.link),
                femaleOnly: !/帥哥/gm.exec(post.name),
                noHugeSize: !/大尺碼/gm.exec(post.name),
                noAnnouncement: !/(公告|水桶)/gm.exec(post.name),
                noBoob: !/(奶|兇|胸)/gm.exec(post.name),
                noBikini: !/(比基尼|泳裝)/gm.exec(post.name),
                noSeductive: !/(凸|翹|性感|尻|辣|寫真|暴力)/gm.exec(post.name),
                noTiktok: !/抖音/gm.exec(post.name),
            }
            return cond.filterSearchLink
                && cond.femaleOnly
                && cond.noHugeSize
                && cond.noAnnouncement
                && cond.noBoob
                && cond.noBikini
                && cond.noTiktok
        });


        if (!postsFilter || postsFilter.length <= 0) {

            return new Promise((resolve, reject) => resolve({ hasErr: true, err: "no posts after filter" }));
        }

        const postsFilterRandomIdx = numHelper.generateRndomNumber(postsFilter.length - 1);
        const postUrl = "https://www.ptt.cc" + postsFilter[postsFilterRandomIdx].link;


        const responseBodyImg = await fetch(postUrl, {
            headers: headers,
        })


        if (!responseBodyImg || !responseBodyImg.text) {

            return new Promise((resolve, reject) => resolve({ hasErr: true, err: "no-img" }));
        }

        const dataImg = await responseBodyImg.text();

        let images = dataImg.match(/imgur.com\/[0-9a-zA-Z]{7}/g);
        images = [...new Set(images)];

        if (!images || images.length <= 0) {

            return new Promise((resolve, reject) => resolve({ hasErr: true, err: "images array empty" }));
        }



        const formattedImgs = images.map(img => "https://" + img + ".jpg");

        const formattedImgsRandomIdx = numHelper.generateRndomNumber(formattedImgs.length - 1);
        const output = formattedImgs[formattedImgsRandomIdx];
        return new Promise((resolve, reject) => resolve(output));

    }
}



module.exports = PttBeautyDataHandler;