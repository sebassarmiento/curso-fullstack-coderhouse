const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/', (req ,res) => {
    let data = req.body // { Username: 'lalala', password: '12345' }
    User.findOne({username: data.username})
    .then(user => {
        if(user && user.password === data.password){
            delete user.password
            let token = jwt.sign(user, 'dsakdwen2382jfh92nfun9djddaslmdkas')
            res.status(200).json(token)
        } else {
            res.status(401).json({message: "Datos incorrectos"})
        }
    })
    .catch(err => {
        res.status(401).json({
            message: "Invalid data",
            error: err
        })
    })
})

module.exports = router