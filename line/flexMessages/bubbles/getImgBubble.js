const getImgBubble = function (options) {
    const bubbleSize = options.bubbleSize;
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "url": "https://images.pexels.com/photos/290470/pexels-photo-290470.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        "size": bubbleSize,
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [

                {
                    "type": "text",
                    "text": "抽圖",
                    "weight": "bold",
                    "align": "center",
                    "size": "xl",
                },

                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "抽正妹圖",
                        "text": "mic正妹呢"
                    }
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "抽帥哥圖",
                        "text": "mic帥哥呢"
                    }
                },

                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "抽貓圖",
                        "text": "mic貓呢"
                    }
                },

            ]
        }
    }
}

module.exports = getImgBubble;