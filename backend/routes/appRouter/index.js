const express = require('express');
// const appServer = express.Router();
const appRouter = require('./app.router');

appRouter.use('/', appRouter);

module.exports = appRouter;



