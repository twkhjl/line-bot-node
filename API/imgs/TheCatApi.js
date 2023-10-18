require('dotenv').config();
const fetch = require('node-fetch');

const TheCatAPI = {

    /*
    [
        {
        "id": "582",
        "url": "https://cdn2.thecatapi.com/images/582.jpg",
        "width": 500,
        "height": 375
        }
    ]
     */
    getRandomImg: async function () {
        const headers = {
            'Content-Type': 'application/json',
        }
        const url = process.env.THE_CAT_API_URL;

        const response = await fetch(url, {
            headers: headers,
        })

        const data = await response.json();

        return new Promise((resolve, reject) => resolve(data));
    }
}


module.exports = TheCatAPI;