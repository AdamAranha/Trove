const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send({ message: 'Success at /' });
})

app.get('/server', (req, res) => {
    res.send({ message: 'Success at /server' })
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))