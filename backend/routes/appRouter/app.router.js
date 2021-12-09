const express = require('express');
const appController = require('./controllers/appController');
const appRouter = express.Router();

appRouter
    .get('/', appController.app);

module.exports = appRouter;