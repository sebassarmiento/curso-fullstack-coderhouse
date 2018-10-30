const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const listsRouter = require('./routes/lists');
const loginRouter = require('./routes/login')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/camada3420', {useNewUrlParser: true})

app.use(bodyParser.json());

app.use('/api/v1/lists', listsRouter);
app.use('/api/v1/login', loginRouter);

module.exports = app;
