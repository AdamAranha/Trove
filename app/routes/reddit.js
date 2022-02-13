const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('REDDIT')
})

module.exports = router