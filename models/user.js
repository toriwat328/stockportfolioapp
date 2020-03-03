//-----------------------------------
//DEPENDENCIES
//-----------------------------------
const mongoose = require('mongoose');


// CREATED STOCK SCHEMA
const stockSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    qtyshares: { type: Number, required: true },
    currvalpershare: { type: Number, required: true },
    isBought: { type: Boolean, default: false },
    date_bought: { type: Date, default: Date.now }
})

// CREATED USER SCHEMA AND ESTABLISHED RELATIONSHIP BETWEEN STOCKS AND USER -> ALL STOCK HAS A USER
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accbalance: { type: Number, default: 5000 },
    stocks: [stockSchema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;
