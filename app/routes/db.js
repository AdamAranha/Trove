const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

async function findUser(user) {
    return await User.findAll({
        where: { user }
    });
}

async function createUser(user, password) {
    return await User.create({ user, password });
}

router.get('/', (req, res) => {
    res.send('DB')
})

router.get('/findUser', async (req, res) => {
    res.send(await findUser(req.headers.email));
})

router.post('/createUser', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await createUser(req.body.user, hashedPassword);
    res.send(newUser.id ? { result: true } : { result: false });
})

router.post('/login', async (req, res) => {
    // Checks if user submitted email exists in database
    if ((await findUser(req.body.user))[0]) {
        // Compares user submitted password and password in the database corresponding with user submitted email
        res.send(await bcrypt.compare(req.body.password, (await findUser(req.body.user))[0].dataValues.password) ? { result: true } : { result: false })
    } else { res.send({ result: false }) }
})

module.exports = router