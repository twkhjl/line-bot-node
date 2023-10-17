const command = {
    readme: {
        regex: /^mic怎麼用$/,
        name: "mic怎麼用",
        description: "顯示mic的使用教學網址",

    },

    learnTrashTalk: {
        regex: /^mic學幹話 (\S+) (.+)$/,
        name: "mic學幹話 {關鍵字} {幹話內容}",
        description: "教mic學幹話",

    },
    talkTrash: {
        regex: /^mic (.+)$/,
        name: "mic {關鍵字}",
        description: "讓mic說幹話",

    },
    removeAllTrashTalk: {
        regex: /^mic幹話忘光光$/,
        name: "mic幹話忘光光",
        description: "讓mic把以前學過的幹話全部忘記",

    },
    removeOneTrashTalk: {
        regex: /^mic給我忘記 (.+)$/,
        name: "mic給我忘記 {幹話關鍵字}",
        description: "讓mic忘記特定的幹話",

    },

    showRandomImg: {
        regex: /^mic圖呢$/,
        name: "mic圖呢",
        description: "讓mic秀出隨機梗圖",

    },

    showImgByTitle: {
        regex: /^mic支援 (.+)$/,
        name: "mic支援 {圖片關鍵字}",
        description: "根據圖片關鍵字秀出梗圖",

    },
    showAllImgTitle: {
        regex: /^mic支援那些圖$/,
        name: "mic支援那些圖",
        description: "讓mic秀出有標題的梗圖列表",

    },
    showRainfullRate: {
        regex: /^mic明天(.+)區?會下雨嗎$/,
        name: "mic明天{某某區}會下雨嗎",
        description: "查詢明天高雄特定行政區的降雨機率,'區'字可不打",

    },
    showRadarImg: {
        regex: /^mic雷達回波圖$/,
        name: "mic雷達回波圖",
        description: "顯示高雄的雷達回波圖",

    },

    search: {
        youtube: {
            regex: /^mic搜yt (.+)$/,
            name: "mic搜yt {關鍵字}",
            description: "讓mic搜尋youtube",
        },
        google: {
            regex: /^mic搜 (.+)$/,
            name: "(此功能暫不開放)mic搜 {圖片關鍵字}",
            description: "(此功能暫不開放)搜尋google圖片",

        },
        googleMap: {
            regex: /^mic導航 (.+)到(.+)$/,
            name: "mic導航 {出發地}到{目的地}",
            description: "讓mic用google導航",

        },
    },

    game: {
        guessNumber: {
            startGame: {
                regex: /^mic終極密碼開始$/,
                name: "mic終極密碼開始",
                description: "開始終極密碼遊戲",

            },
            endGame: {
                regex: /^mic終極密碼結束$/,
                name: "mic終極密碼結束",
                description: "結束終極密碼遊戲",

            }
        }
    }
};


module.exports = command;