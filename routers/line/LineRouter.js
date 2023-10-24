const line = require('@line/bot-sdk');
// create LINE SDK config from env variables
const lineConfig = require("../../line/config");
// create LINE SDK client
const client = new line.Client(lineConfig);

const express = require('express');
const router = express.Router();
const LineEventHandler = require("../../line/EventHandler");


// register a webhook handler with middleware
// about the middleware, please refer to doc
router.post('/', line.middleware(lineConfig), (req, res) => {
    // console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    Promise
        .all(req.body.events.map(event => LineEventHandler(req, client, event)))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});


module.exports = router;