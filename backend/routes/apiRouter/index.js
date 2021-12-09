const express = require('express');

const createReportRouter = require('./createReport.router');
// const appendRouter = require('./append.router');
// const portfolioRouter = require('./portfolio.router');
const reportTemplateAndFieldListsRouter = require('./reportTemplateAndFieldLists.router');
// const testRouter = require('./test.router');
const notFoundRouter = require('./notFound.router');

const apiRouter = express.Router();

// /api/
apiRouter
     .use('/createReport', createReportRouter)
     // .use('/append', appendRouter)
     // .use('/portfolio', portfolioRouter)
     .use('/reportTemplateAndFieldLists', reportTemplateAndFieldListsRouter)
     // .use('/test', testRouter)
     .use('/', notFoundRouter)
     

module.exports = apiRouter;


// router.get('/create', blogController.blog_create_get);
// router.get('/', blogController.blog_index);
// router.post('/', blogController.blog_create_post);
// router.get('/:id', blogController.blog_details);
// router.delete('/:id', blogController.blog_delete);

// app.get(
//     '/<some route>',
//    () => {
// pre request middleware
//    }, () => {
// handling the actual request
//    })



