const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    name: String,
    tasks: [
        {
            description: String,
            done: Boolean
        }
    ]
})

module.exports = mongoose.model('List', listSchema)