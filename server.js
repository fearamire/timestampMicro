const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment-timezone');

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); //legacy browser support

// Functions
const returnTimeJSON = (time) => {
    const date = (!isNaN(time) ? new Date(Number(time)) : new Date(time)); // if you don't typecast unix timestamps you get invalid dates. Oh the joys of JS

    if (isNaN(date.getTime())) {
        return {error: 'Invalid Date'};
    } else {
        const utcTime = moment(date).tz('America/Chicago').format('ddd, DD MMM YYYY HH:mm:ss z');
        return {unix:date.getTime(), utc:utcTime};
    };
};

// Routes

app.get('/', (req, res) => {
    res.json({greeting:"Wassup my dude? try adding '/api' to the end of that request if you want the time."});
});

//time specified? Here's then. (or an error)
app.get("/api/:time", (req, res) => {
    const inputTime = req.params.time;

    time = (isNaN(inputTime)) ? decodeURIComponent(inputTime) : inputTime;

    res.json(returnTimeJSON(time));
});

//time unspecified? Here's now.
app.get("/api/", (req, res) => {
    const unixTime = Date.now();
    const utcTime = moment().tz('America/Chicago').format('ddd, DD MMM YYYY HH:mm:ss z');

    res.json({unix: unixTime, utc: utcTime});
});

app.listen(process.env.PORT, () => {
    console.log(`Timestamp app listening on port ${process.env.PORT}`);
    // console.log(moment().tz('America/Chicago').format('ddd, DD MMM YYYY HH:mm:ss z'));
});