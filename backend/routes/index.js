const express = require('express');
const apiRouter = require('./apiRouter');
const appRouter = require('./appRouter');

const router = express.Router();

router
    .use('/api', apiRouter)
    .use('/', appRouter);


module.exports = router;



