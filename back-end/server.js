const express = require('express');
const fetch = require('node-fetch');

var snoowrap = require('snoowrap');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const { join } = require('path');
const { json } = require('express');
const { access } = require('fs');
const STATIC_PATH = process.env.NODE_ENV === 'production' ?
    path.join('client', 'build') : path.join('client', 'public');

const CLIENT_ID = 'eVR6XO9MRO7sTjbt72Fn8w';
const CLIENT_SECRET = 'Myz1KXXYJVRTx1-klXYwu29ztgIeGQ';

let access_token;
let refresh_token;

app.use(express.static(STATIC_PATH))

// for parsing incoming POST data
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/api', (req, res) => {
    getSavedContent();

    async function getSavedContent() {
        const r = new snoowrap({
            userAgent: 'A random string.',
            clientId: 'eVR6XO9MRO7sTjbt72Fn8w',
            clientSecret: 'Myz1KXXYJVRTx1-klXYwu29ztgIeGQ',
            refreshToken: '692881724703--vi94gdNgTQ9HyP5XYIUF3ZKuXphRg'
        });

        let response = await r.getMe().getSavedContent();
        res.send(response);
    }
})

app.get('/api/code', (req, res) => {
    const returnCode = req.headers.code;
    retrieveAccessToken();

    async function retrieveAccessToken() {
        const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
        const form = new URLSearchParams({
            grant_type: "authorization_code",
            code: returnCode,
            redirect_uri: 'http://localhost:3000/'
        });

        const response = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            // mode: 'no-cors',
            headers: {
                Authorization: `Basic ${credentials}`
            },
            body: form
        }).then(r => r.json());
        console.log(response);
        access_token = response.access_token;
        refresh_token = response.refresh_token;
    }
})

app.get('/api/test', (req, res) => {
    testSearch();

    async function testSearch() {
        const testQuery = await fetch('https://oauth.reddit.com/user/DoctorNoThanks/saved', {
            method: 'GET',
            headers: {
                Authorization: `bearer ${access_token}`
            }
        }).then(r => r.json());
        res.send(testQuery)
    }
})


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))