//-----------------------------------
//DEPENDENCIES
//-----------------------------------

const express = require('express');
const router = express.Router();
const User = require('../../models/user.js');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

//-----------------------------------
//ROUTES (POST) -> /users
//-----------------------------------

// REGISTER NEW USER
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // VALIDATION
    if(!name || !email || !password){
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ email })
        .then(user => {
            if(user){
                return res.status(400).json({ msg: 'User already exists'});
            }

            //IF EMAIL IS UNIQUE, CREATE USER
            const newUser = new User({
                name,
                email,
                password
            });


            //CREATE ENCRYPTION FOR PASSWORD
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err){
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {

                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err){
                                    throw err;
                                }
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                })
                            }
                        )

                    })

                })
            })
        })
})






module.exports = router;
