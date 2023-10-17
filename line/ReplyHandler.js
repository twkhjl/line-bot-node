const ReplyHandler = {

    replyWithText: (client, event, text) => {

        if (!client) return false;
        if (!event) return false;
        if (!text) return false;

        const echo = {
            type: 'text',
            text: text,
            quoteToken: event.message.quoteToken
        };
        return client.replyMessage(event.replyToken, echo);
    },
    replyWithFlex: (client, event, flexMessage) => {

        if (!client) return false;
        if (!event) return false;
        if (!flexMessage) return false;

        const echo = {
            type: 'flex',
            altText: 'This is a Flex Message',
            contents: flexMessage,
        };
        return client.replyMessage(event.replyToken, echo);
    },

    replyWithImg: (client, event, originalContentUrl, previewImageUrl = null) => {

        if (!client) return false;
        if (!event) return false;
        if (!originalContentUrl) return false;

        const echo = {
            type: "image",
            originalContentUrl: originalContentUrl,
            previewImageUrl: previewImageUrl || originalContentUrl,
            animated: true
        }
        return client.replyMessage(event.replyToken, echo);
    },
    
    // https://developers.line.biz/en/docs/messaging-api/sticker-list/#sticker-definitions
    replyWithSticker: (client, event, packageId, stickerId) => {

        if (!client) return false;
        if (!event) return false;
        if (!packageId) return false;
        if (!stickerId) return false;

        const echo = {
            type: "sticker",
            packageId: packageId,
            stickerId: stickerId,
            quoteToken: event.message.quoteToken

        }
        return client.replyMessage(event.replyToken, echo);
    },

}



module.exports = ReplyHandler;