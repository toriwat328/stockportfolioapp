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

const usersController = require('./controllers/api/users.js')
app.use('/users', usersController)

const authController = require('./controllers/api/auth.js')
app.use('/auth', authController)

//-----------------------------------
// PRODUCTION DEPLOYMENT
//-----------------------------------

// SERVE STATIC ASSETS IF IN PRODUCTION
if(process.env.NODE_ENV === 'production'){
    // SET STATIC FOLDER
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
//-----------------------------------
//LISTENER
//-----------------------------------

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
})
