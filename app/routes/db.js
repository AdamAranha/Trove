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
    const { user, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword.length)
    console.log(`Type of hash is ${typeof hashedPassword}`);

    const newUser = await createUser(user, hashedPassword);
    res.send(newUser.id ? { message: 'User created' } : { message: 'User was not created' });
})

router.post('/login', async (req, res) => {
    const { password } = (await findUser(req.body.user))[0].dataValues;
    console.log(await bcrypt.compare(req.body.password, password));
    res.send(await bcrypt.compare(req.body.password, password) ? { message: 'Login Successful' } : { message: 'Login Unsuccessful' })
})

module.exports = router