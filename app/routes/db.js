const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');

async function findUser(user) {
    return await User.findAll({
        where: { user }
    });
}

function createUser(user, password) {
    return User.create({ user, password });
}

function createToken(user) {
    const token = sign({ user }, 'supersecretsecret');
    return token;
}

function validateToken(req, res, next) {
    const accessToken = req.cookies['Authorization'];
    console.log(req.cookies)
    if (!accessToken) return res.status(400).json({ error: "User not authenticated" })

    try {
        const validToken = verify(accessToken, 'supersecretsecret');
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        req.authenticated = false;
        return res.status(400).json({ err })
    }
}

router.get('/test', validateToken, async (req, res) => {
    console.log('Hit');
    console.log(req.authenticated);
    res.json({ message: 'ok' })
})
router.get('/', (req, res) => {
    res.send('DB')
})

router.get('/findUser', async (req, res) => {
    res.send(await findUser(req.headers.email));
})

router.post('/createUser', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await createUser(req.body.user, hashedPassword);
    if (newUser.id) {
        const accessToken = createToken(req.body.user);
        res.cookie('Authorization', accessToken, {
            // Cookie lasts for 6 hours
            maxAge: 21600000
        });
    }
    res.json(newUser.id ? { result: true } : { result: false });
})

router.post('/login', async (req, res) => {
    const existingUser = await findUser(req.body.user);
    // Checks if user submitted email exists in database
    if (existingUser[0] && await bcrypt.compare(req.body.password, existingUser[0].dataValues.password)) {
        // Compares user submitted password and password in the database corresponding with user submitted email
        const accessToken = createToken(req.body.user);
        res.cookie('Authorization', accessToken, {
            maxAge: 21600000,
            httpOnly: false
        });
        res.json({ result: true });
    } else res.json({ result: false });
})


module.exports = router