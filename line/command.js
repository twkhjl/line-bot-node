const command = {
    instruction: {

        carousel: {
            regex: /^mic$/i,
            name: "mic",
            description: "顯示mic的常用指令輪播畫面",
        },
        readme: {
            regex: /^mic怎麼用$/i,
            name: "mic怎麼用",
            description: "顯示mic的使用教學網址",

        },
    },

    google:{
        youtube:{
            multipleResult: {
                regex: /^yt列表 (.+)$/i,
                name: "yt列表 {關鍵字}",
                description: "讓mic搜尋youtube並回傳搜尋結果網頁",
            },

            apiSingleResult: {
                regex: /^yt (.+)$/i,
                name: "yt {關鍵字}",
                description: "搜尋youtube並回傳單一影片",
            },

        }
    },

    search: {
        

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
        freePlantApi: {
            showRandomImg: {
                regex: /^mic植物呢$/,
                name: "mic植物呢",
                description: "抽隨機植物圖",

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
        },
        posts:{
            showSupportedBoardName:{
                regex: /^mic支援ptt那些板$/i,
                name: "mic支援ptt那些板",
                description: "顯示目前所有支援搜尋文章的ptt板名",
            },
            showHotPosts:{
                regex: /^(.+)板?熱門$/i,
                name: "{ptt板名}熱門 ex:政黑熱門",
                description: "顯示ptt特定板面熱門文章(60推以上)",
            },
            showBooPosts:{
                regex: /^(.+)板?噓文$/i,
                name: "{ptt板名}噓文 ex:政黑噓文",
                description: "顯示ptt特定板面噓文較多的文章(X1以上)",
            },
            showLatestPosts:{
                regex: /^(.+)板?最新$/i,
                name: "{ptt板名}最新 ex:政黑最新",
                description: "顯示ptt特定板面最新文章",
            }  
        },
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