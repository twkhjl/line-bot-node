const gameBubble = function (options) {
    const bubbleSize = options.bubbleSize;
    return {
        "type": "bubble",
        "hero": {
            "type": "image",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "url": "https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        "size": bubbleSize,
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "md",
            "contents": [
                {
                    "type": "text",
                    "text": "其他",
                    "weight": "bold",
                    "align": "center",
                    "size": "xl"
                },
                {
                    "type": "button",
                    "style": "secondary",
                    "action": {
                        "type": "message",
                        "label": "雷達回波圖",
                        "text": "雷達回波圖"
                    }
                },
                

            ]
        }
    }
}

module.exports = gameBubble;