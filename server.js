//-----------------------------------
//DEPENDENCIES
//-----------------------------------
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const path = require('path');


//-----------------------------------
//PORT
//-----------------------------------
const PORT = process.env.PORT;

//-----------------------------------
//DATABASE
//-----------------------------------
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

//-----------------------------------
//MIDDLEWARE
//-----------------------------------
app.use(express.json())

//-----------------------------------
//CONTROLLER MAPPING
//-----------------------------------
const portfolioController = require('./controllers/portfolio.js')
app.use('/portfolio', portfolioController)

const transactionsController = require('./controllers/transactions.js')
app.use('/transactions', portfolioController)

const stockController = require('./controllers/stock.js')
app.use('/stock', stockController)


//-----------------------------------
// PRODUCTION DEPLOYMENT
//-----------------------------------

//-----------------------------------
//LISTENER
//-----------------------------------

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
})
