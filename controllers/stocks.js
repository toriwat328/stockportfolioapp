//-----------------------------------
//DEPENDENCIES
//-----------------------------------

const express = require('express');
const router = express.Router();
const Stock = require('../models/stock.js')

//-----------------------------------
//ROUTES (GET) -> /stocks
//-----------------------------------

//GETTING ALL STOCKS FROM DATABASE
router.get('/', (req, res) => {
    Stock.find()
        .then(stocks => res.json(stocks))
});

//-----------------------------------
//ROUTES (POST) -> /stocks
//-----------------------------------

//CREATE NEW STOCK
router.post('/', (req, res) => {
    const newStock = new Stock({
        symbol: req.body.symbol,
        qtyshares: req.body.qtyshares,
        currvalpershare: req.body.currvalpershare,
        isBought: true
    })

    newStock.save().then(stock => res.json(stock));
});

module.exports = router;
