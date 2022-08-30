import express from 'express'
import cors from 'cors'
const PORT = process.env.PORT || 3001

const CLIENT_ID = 'eVR6XO9MRO7sTjbt72Fn8w';
const CLIENT_SECRET = 'Myz1KXXYJVRTx1-klXYwu29ztgIeGQ'

const app = express()
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.get('/',(req,res) => {
    res.send({message: "WELCOME TO THE SERVER"})
})

app.get('/trove/auth', (req,res)=> {
    const code = req.headers.code
    console.log(code)

    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const form = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: 'http://localhost:3000/'
    });

    async function sendRequest() {
        const response = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credentials}`
            },
            body: form
        }).then(r => r.json());
        console.log(response);
    }

    sendRequest()

    res.send({message: "Looks Good"})
})

app.listen(PORT, ()=> {
    console.log(`Listening on http://localhost:${PORT}`)
})