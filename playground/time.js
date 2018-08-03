const moment = require('moment');

const date = moment();
//date.add(1, 'year').subtract(9, 'months');
console.log(date.format('Do MMM YYYY'));
console.log(date.format('k:mm A'));

const someTimeStamp = moment().valueOf();
