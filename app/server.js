const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const fetch = require('node-fetch');

const CLIENT_ID = 'eVR6XO9MRO7sTjbt72Fn8w';
const CLIENT_SECRET = 'Myz1KXXYJVRTx1-klXYwu29ztgIeGQ';

var access_token;

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
})

app.get('/server', (req, res) => {
    res.send({ message: 'Success at I dont know how this works' });
    console.log('It works?')
})

app.get('/server/trove/auth', (req, res) => {
    const code = req.headers.code;
    console.log(code);
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
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

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))