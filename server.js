const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); //legacy browser support

app.get('/', (req, res) => {
    res.send('Sup bitch?');
});

app.get("/api/", (req, res) => {
    res.json({greeting: "You got the api node my dude."});
});

app.listen(process.env.PORT, () => {
    console.log(`Timestamp app listening on port ${process.env.PORT}`)
});