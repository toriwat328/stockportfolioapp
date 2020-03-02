const mongoose = require('mongoose');


const stockSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    qtyshares: { type: Number, required: true },
    currvalpershare: { type: Number, required: true },
    isBought: { type: Boolean, default: false },
    date_bought: { type: Date, default: Date.now }
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accbalance: { type: Number, default: 5000 },
    stocks: [stockSchema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;
