require('dotenv').config();
const cron = require('node-cron');
const PttCronJob = require("./PttCronJob");
const AllCronJobs = {
    start: () => {

        // if (process.env.SWITCH_ENABLE_CRON_JOB*1 !== 1) return;

        // '*/1 * * * * *' : 每一秒
        // '*/1 * * * *' : 每一分鐘
        // cron.schedule('*/10 * * * * *', () => {
            // PttCronJob.updateDB();
            // console.log('running cron job');
        // });
    }
}


module.exports = AllCronJobs;

