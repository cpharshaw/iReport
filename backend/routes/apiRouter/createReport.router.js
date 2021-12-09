const express = require('express');
const createReportController = require('./controllers/createReportController');
const createReportRouter = express.Router();

// /api/createReport/
createReportRouter
    .post('/', createReportController.createReport)

module.exports = createReportRouter;
