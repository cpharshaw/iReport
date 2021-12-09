const express = require('express');
const testController = require('./controllers/testController');
const testRouter = express.Router();

// /api/test/

testRouter
    .get('/:id', testController.test_id)
    .get('/', testController.test)


module.exports = testRouter;