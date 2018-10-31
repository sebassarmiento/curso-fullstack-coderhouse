const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = '56asiyuhdjkbasdhtiy8ou192e';

router.post('/', function (req, res) {
    let data = req.body; // { username: 'nana', password: '12234'}
    console.log(data);
    User
        .findOne(
            {
                username: data.username,
                password: data.password
            }
        )
        .then(user => {
            if(user){
                let user2 = user.toJSON();
                let toSign = { username: user2.username, email: user2.email};
                console.log(toSign);
                let token = jwt.sign(toSign, secret);
                res.status(200).json(token);
            } else {
                res.status(401).json({ message: 'Credenciales invalidas'});
            }
        })
});

module.exports = router;