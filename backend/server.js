
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = require('./routes');
const cors = require('cors')
const bodyParser = require('body-parser');

const server = express();


server.use(logger('dev'));
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(cookieParser());
// server.use(express.static(path.join(__dirname, 'public')));
server.use(express.static(path.join(__dirname, '../frontend/out')));
server.use(cors());

server.use('/', router);

server.listen(process.env.port || 3080, function () {
    console.log(`🌎 ==> API server now on port ${process.env.port || 3080} !`);
});

module.exports = server;

// https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-next-js-app-with-nodejs-backend-7ff91841bd3
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes