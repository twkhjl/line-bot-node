require('dotenv').config();
const fetch = require('node-fetch');

const ShibeOnlineApi = {

    /*
    {
    "message": "https://images.dog.ceo/breeds/bluetick/n02088632_2060.jpg",
    "status": "success"
    }
     */
    getRandomImg: async function () {
        const headers = {
            'Content-Type': 'application/json',
        }
        const url = "https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true";
        // const url = process.env.SHIBE_ONLINE_API_URL;

        const response = await fetch(url, {
            headers: headers,
        })

        const data = await response.json();

        return new Promise((resolve, reject) => resolve(data));
    }
}


module.exports = ShibeOnlineApi;