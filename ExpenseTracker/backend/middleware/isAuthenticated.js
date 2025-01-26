
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) =>{
    try{
        const token = req.cookies.token;
        // console.log("Reached till the middleware and the token is", token)
        if(!token){
            return res.status(401).json({
                message : "User not authenticated",
                success : false
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        if(!decode){
            return res.status(401).json({
                message : "Invalid Token",
                success : false
            })
        }
        req.id = decode.userId;
        next();

    }catch(e){
        console.log(e);
    }
}

module.exports = isAuthenticated;