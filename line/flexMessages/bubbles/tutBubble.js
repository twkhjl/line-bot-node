const tutBubble = function (options) {
    const bubbleSize = options.bubbleSize;
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "url": "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        "size": bubbleSize,
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [
                {
                    "type": "text",
                    "text": "一些教學範例",
                    "weight": "bold",
                    "align": "center",
                    "size": "xl"
                },

                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "搜尋yt指令範例",
                        "text": "yt 橄欖樹"
                    }
                },

                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "跟mic機器人聊天範例",
                        "text": "@mic你好"
                    }
                },



            ]
        }
    };
}

module.exports = tutBubble;