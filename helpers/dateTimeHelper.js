const now = new Date(new Date().toLocaleString('en', { timeZone: 'Asia/Taipei' }));

const dateTimeHelper = {
    getCurrentTimeString: () => {
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const formatted = `${year}-${addZero(month)}-${addZero(day)} ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
        return formatted;
    },
    getTomorrowDateString: () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const year = tomorrow.getFullYear();
        const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
        const day = tomorrow.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
};

function addZero(num) {
    return num < 10 ? `0${num}` : num;
}





module.exports = dateTimeHelper;