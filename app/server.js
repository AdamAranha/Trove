const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();
const User = require('./models/User');
const sequelize = require('./util/dbConfig');
const bodyParser = require('body-parser');

// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.PORT
// })

// connection.connect((err) => {
//     if (err) throw err;
//     console.log(`connected as id ${connection.threadId}`);
//     // connection.end();
// });
// connection.query('SELECT * FROM Users', (error, results) => {
//     if (error) throw error;
//     console.log(results);
// })

var access_token;

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/db', require('./routes/db.js'));
app.use('/reddit', require('./routes/reddit'));

app.get('/', (req, res) => {
})

app.get('/server', (req, res) => {
    res.send({ message: process.env.CLIENT_ID });
    console.log('It works?')
})

app.get('/server/trove/auth', (req, res) => {
    const code = req.headers.code;
    console.log(code);
    const credentials = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64");
    const form = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: 'http://localhost:3000/'
    });
    retrieveAccessToken();
    getUser();

    async function retrieveAccessToken() {
        const response = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credentials}`
            },
            body: form
        }).then(r => r.json());
        console.log(response);
        access_token = response.access_token;
    }

    async function getUser() {
        const testQuery = await fetch('https://oauth.reddit.com/api/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `bearer ${access_token}`
            }
        }).then(r => r.json());
        console.log(testQuery.name);
    }

    // (async function () {
    //     const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    //         method: 'POST',
    //         headers: {
    //             Authorization: `Basic ${credentials}`
    //         },
    //         body: form
    //     }).then(r => r.json());
    //     console.log(response);
    //     access_token = response.access_token;
    // }(1))
})

sequelize.sync().then((res) => {
    // console.log('Result from sql is: ', res)
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`)
    });
});
