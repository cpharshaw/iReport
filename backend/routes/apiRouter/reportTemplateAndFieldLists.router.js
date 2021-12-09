const express = require('express');
const reportTemplateAndFieldListsController = require('./controllers/reportTemplateAndFieldListsController');
const reportTemplateAndFieldListsRouter = express.Router();

// /api/reportList/
reportTemplateAndFieldListsRouter
    // .get('/:id', reportListController.reportList_id)
    .get('/', reportTemplateAndFieldListsController.reportTemplateAndFieldLists)

module.exports = reportTemplateAndFieldListsRouter;