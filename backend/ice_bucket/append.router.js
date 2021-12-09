const express = require('express');
const appendController = require('./controllers/appendController');
const appendRouter = express.Router();

// /api/append/
appendRouter
    // .get('/:id', appendController.append_id)
    .post('/', appendController.append)

module.exports = appendRouter;
