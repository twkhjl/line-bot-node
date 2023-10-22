const command = {
    readme: {
        regex: /^mic怎麼用$/i,
        name: "mic怎麼用",
        description: "顯示mic的使用教學網址",

    },


    showRandomImg: {
        regex: /^mic圖呢$/i,
        name: "mic圖呢",
        description: "讓mic秀出隨機梗圖",

    },

    showImgByTitle: {
        regex: /^mic支援 (.+)$/i,
        name: "mic支援 {圖片關鍵字}",
        description: "根據圖片關鍵字秀出梗圖",

    },
    showAllImgTitle: {
        regex: /^mic支援那些圖$/i,
        name: "mic支援那些圖",
        description: "讓mic秀出有標題的梗圖列表",

    },
    showRainfullRate: {
        regex: /^mic明天(.+)區?會下雨嗎$/i,
        name: "mic明天{某某區}會下雨嗎",
        description: "查詢明天高雄特定行政區的降雨機率,'區'字可不打",

    },
    showRadarImg: {
        regex: /^mic雷達回波圖$/i,
        name: "mic雷達回波圖",
        description: "顯示高雄的雷達回波圖",

    },

    search: {
        youtube: {
            regex: /^mic搜yt (.+)$/i,
            name: "mic搜yt {關鍵字}",
            description: "讓mic搜尋youtube",
        },

        googleMap: {
            regex: /^mic導航 (.+)到(.+)$/i,
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
    },

    img: {
        theCatApi: {
            showRandomImg: {
                regex: /^mic貓呢$/,
                name: "mic貓呢",
                description: "抽隨機喵咪圖",

            }
        },
        dogCeoApi: {
            showRandomImg: {
                regex: /^mic狗呢$/,
                name: "mic狗呢",
                description: "抽隨機狗狗圖",

            }
        },
        shibeOnlineApi: {
            showRandomImg: {
                regex: /^mic柴柴呢$/,
                name: "mic柴柴呢",
                description: "抽隨機柴柴圖",

            }
        },

    },

    ptt: {
        beauty: {
            showRandomFemaleImg: {
                regex: /^mic(妹子|正妹)呢$/i,
                name: "mic妹子/正妹呢",
                description: "從ptt表特版隨機抽正妹圖",
            },
            showRandomMaleImg: {
                regex: /^mic帥哥呢$/i,
                name: "mic帥哥呢",
                description: "從ptt表特版隨機抽帥哥圖",
            }
        }
    },
    botLibre: {
        bot: {
            chatGpt: {
                chat: {
                    regex: /^@mic(.+)$/i,
                    name: "@mic {對話內容}",
                    description: "跟mic聊天",

                }

            }
        }
    }
};


module.exports = command;