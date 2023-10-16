const cwaApi = require("./ApiHandler");
const dateTimeHelper = require("../../helpers/dateTimeHelper");

const DataHandler = {
    getRainfullRate: async (districtKeyword) => {
        const apiData = await cwaApi.getKhWeather();
        let output = "";
        const locationOriginalData = apiData.records.locations[0].location;

        const locationData = [];
        locationOriginalData.map(e => {
            const key = e.locationName;
            locationData[key] = e.weatherElement[0]; //降雨機率
        })

        if (!locationData[districtKeyword]) {

            return `拍謝,我只能幫你查高雄特定行政區的降雨機率`;

        }
        const forecastOriginalData = locationData[districtKeyword].time;

        const forecastData = [];
        forecastOriginalData.map((e, i) => {
            const startTime = e.startTime.replace(/:\d{2}$/, '');
            const endTime = e.endTime.replace(/:\d{2}$/, '');
            forecastData[i] = {
                time: `${startTime}~${endTime}`,
                value: e.elementValue[0].value,
            }
        })

        let rainfallRate = 0;
        const tomorrowDateString = dateTimeHelper.getTomorrowDateString();
        forecastData.map((e, i) => {
            if (!e.time.includes(tomorrowDateString)) return;

            if (e.value > rainfallRate) {
                rainfallRate = e.value;
            }

        })


        return `明天${districtKeyword}最高降雨機率為${rainfallRate}%`;
    },

    getRadarImage:async()=>{
        const apiData = await cwaApi.getRadarData();
        return apiData;

    }
}


module.exports = DataHandler;