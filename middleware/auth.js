//-----------------------------------
//DEPENDENCIES
//-----------------------------------
const config = require('config');
const jwt = require('jsonwebtoken');

//-----------------------------------
//MIDDLEWARE
//-----------------------------------
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    // CHECK FOR TOKEN
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }


    try {
        // VERIFY TOKEN
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // ADD USER FROM PAYLOAD
        req.user = decoded;

        next();
    } catch(e){
        res.status(400).json({ msg: 'Token is not valid'})
    }

}

module.exports = auth;
