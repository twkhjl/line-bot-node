const command = {
    "readme": /^mic怎麼用$/,

    "learnTrashTalk": /^mic學幹話 (\S+) (.+)$/gm,
    "talkTrash": /^mic (.+)/gm,
    "removeAllTrashTalk": /^mic幹話忘光光$/gm,
    "removeOneTrashTalk": /^mic給我忘記 (.+)$/gm,

    "showRandomImg": /^mic圖呢$/,

    "showTotalDialogStatistic":/^mic我要看群組話量統計$/,

    "search": {
        "youtube": /^mic搜yt (.+)$/,
        "google": /^mic搜google (.+)$/,
        "googleMap": /^mic導航 (.+)到(.+)$/,
    },
};


module.exports = command;