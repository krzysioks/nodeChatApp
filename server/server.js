require('./config/config');
const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

console.log(`${__dirname}/../public`);
console.log(publicPath);

const app = express();
//used middleware to serve frontend public html
app.use(express.static(publicPath));

//listen to the requests
app.listen(process.env.PORT, () => {
    console.info(`Server is on port ${process.env.PORT}`);
});
