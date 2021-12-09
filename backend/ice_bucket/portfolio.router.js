const express = require('express');
const portfolioController = require('./controllers/portfolioController');
const portfolioRouter = express.Router();

// /api/portfolio/
portfolioRouter
    // .get('/:id', portfolioController.portfolio_id)
    .post('/', portfolioController.portfolio)

module.exports = portfolioRouter;