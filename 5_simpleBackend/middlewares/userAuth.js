//this is the file where we will write middlewares to authenticate user

const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../server/config');

function authMiddleware(req, res, next){
    const user_jwtToken = req.headers.authorization;
    const word = user_jwtToken.split(' ');
    const token = word[1];

    try{
        const decode = jwt.verify(token, JWT_KEY);
        if(decode){
            req.user = decode; //attach decoded value to request object
            next();
        }else{
            res.statue(403).json({
                msg : "You are not a authenticated user"
            })
        }

    }catch(e){
        console.log("there is some error in middleware")
    }
}

module.exports = authMiddleware;