require('dotenv').config();
const fetch = require('node-fetch');

const DogCeoAPI = {

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
        const url = process.env.DOG_CEO_API_URL;

        const response = await fetch(url, {
            headers: headers,
        })

        const data = await response.json();

        return new Promise((resolve, reject) => resolve(data));
    }
}


module.exports = DogCeoAPI;