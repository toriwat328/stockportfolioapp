//-----------------------------------
//DEPENDENCIES
//-----------------------------------

const express = require('express');
const router = express.Router();
const User = require('../../models/user.js');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//-----------------------------------
//ROUTES (POST) -> /auth
//-----------------------------------

// AUTHENTICATE THE USER

router.post('/', (req, res) => {
    const{ email, password } = req.body;

    //VALIDATION
    if(!email || !password){
        return res.status(400).json({ msg: 'Please enter all fields' })
    }

    User.findOne({ email })
        .then(user => {
            if(!user){
                return res.status(400).json( { msg: 'User does not exists' })
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch){
                        return res.status(400).json({ msg: 'Invaild credentails'});
                    }

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    accbalance: user.accbalance
                                }
                            })
                        }
                    )
                })
        })
})

//-----------------------------------
//ROUTES (GET) -> /auth/users
//-----------------------------------

// GET USER DATA

router.get('/users', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})


//-----------------------------------
//ROUTES (GET) -> /auth/stocks
//-----------------------------------

//GETTING ALL STOCKS FROM DATABASE
router.get('/stocks', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
        .then(json => {
            return json.stocks
        })
});

//-----------------------------------
//ROUTES (POST) -> /auth/stocks
//-----------------------------------

//CREATE NEW STOCK
router.post('/stocks', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            const newStock = {
                symbol: req.body.symbol,
                qtyshares: req.body.qtyshares,
                currvalpershare: req.body.currvalpershare,
                isBought: true
            }

            let currval = req.body.currvalpershare

            if(currval <= user.accbalance){
                user.accbalance -= currval;
                user.stocks.push(newStock);
                user.save();
                return user.stocks;
                window.location.reload()
            } else {
                alert('You dont have enough in your account balance');
                return;
            }

        })
        .then(stock => res.json(stock))
        .catch(err => console.log(err))
});

module.exports = router;
