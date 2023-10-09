const dateTimeHelper = {
    getCurrentTimeString: () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const formatted = `${year}-${addZero(month)}-${addZero(day)} ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
        return formatted;
    }
};

function addZero(num) {
    return num < 10 ? `0${num}` : num;
}





module.exports = dateTimeHelper;