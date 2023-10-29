const getImgBubble2 = function (options) {
    const bubbleSize = options.bubbleSize;
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "url": "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        "size": bubbleSize,
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [

                {
                    "type": "text",
                    "text": "抽圖2",
                    "weight": "bold",
                    "align": "center",
                    "size": "xl",
                },

                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "抽狗圖",
                        "text": "mic狗呢"
                    }
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "抽柴柴圖",
                        "text": "mic柴柴呢"
                    }
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "抽植物圖",
                        "text": "mic植物呢"
                    }
                },

            ]
        }
    }
}

module.exports = getImgBubble2;