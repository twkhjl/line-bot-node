const numHelper = {
    isPositiveInteger: (str) => {
        const number = str * 1;
        const isInteger = Number.isInteger(number);
        const isPositive = number > 0;

        return isInteger && isPositive;

    },
    generateRndomNumber: (maxNum) => {
        return Math.floor(Math.random() * (maxNum));
    },
    randomIntegerFromInterval: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}


module.exports = numHelper;