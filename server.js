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

const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const authController = require('./controllers/auth.js')
app.use('/auth', authController)

//-----------------------------------
// PRODUCTION DEPLOYMENT
//-----------------------------------

//-----------------------------------
//LISTENER
//-----------------------------------

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
})
