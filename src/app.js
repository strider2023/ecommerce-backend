const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const { startServer } = require('./bootstrap')

const app = express();
app.use(bodyParser.json());
// var corsOption = {
//     origin: "*",
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     exposedHeaders: ['x-auth-token']
// };
// app.use(cors(corsOption));
// app.use(logger('common'))

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        startServer(app);
    })
    .catch(error => {
        throw error
    });
