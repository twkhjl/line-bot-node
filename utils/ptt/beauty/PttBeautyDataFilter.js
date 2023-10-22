const PttBeautyDataFilterHandler = {

    filterFemaleImg: (post) => {

        const filter = {
            filterSearchLink: !/\/search/gm.exec(post.link),
            filterAuthor: !/devil157/gm.exec(post.author),
            femaleOnly: /\[正妹\]/gm.exec(post.name),
            noHugeSize: !/大尺碼/gm.exec(post.name),
            noAnnouncement: !/(公告|水桶)/gm.exec(post.name),
            noBoob: !/(奶|兇|胸)/gm.exec(post.name),
            noBikini: !/(比基尼|泳裝)/gm.exec(post.name),
            noSeductive: !/(肉|胸|泳裝|蜜桃|巨|body|溫泉|點|乳|露|腿|臀|凸|翹|性|尻|豔|妖|辣|寫真|暴力|模特|坦克|誘惑|人妻|身材|清涼|福利|色)/gm.exec(post.name),
            noTiktok: !/抖音/gm.exec(post.name),
        }
        return Object.values(filter).every((value) => value);
    }, 
    filterMaleImg: (post) => {

        const filter = {
            filterSearchLink: !/\/search/gm.exec(post.link),
            maleOnly: /帥哥/gm.exec(post.name),
            noHugeSize: !/大尺碼/gm.exec(post.name),
            noAnnouncement: !/(公告|水桶)/gm.exec(post.name),
            noTiktok: !/抖音/gm.exec(post.name),
        }
        return Object.values(filter).every((value) => value);
    }
}


module.exports = PttBeautyDataFilterHandler;