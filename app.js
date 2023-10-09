require('dotenv').config();

const TrashTalkModel = require("./models/TrashTalkModel");


const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const lineConfig = require("./line/config");
// create LINE SDK client
const client = new line.Client(lineConfig);

const LineEventHandler = require("./line/EventHandler");

// create Express app
// about Express itself: https://expressjs.com/
const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(lineConfig), (req, res) => {
    Promise
        .all(req.body.events.map(event => LineEventHandler(client, event)))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});


// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});