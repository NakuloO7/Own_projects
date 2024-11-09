const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Invalid user",
    });
  }

  const token = authHeader.split(" ")[1]; //this will be the token

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;   //now this value can be accesed by the routes which uses this middleware
    next();

    //this token was created in sign in route
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjcwZjExYWRlYjgzMmViNWUxZDRmYjFkIiwiaWF0IjoxNzI5MDUwNDcxfQ.Cy2pSt3IXLvnNAkzq6rmPZfXGS7xJ99AKpcssNBRf6A
    /*
         {
             "user": "670f11adeb832eb5e1d4fb1d",
             "iat": 1729050471
         }
         */

    // Here, req.userId is assigned the user value from the decoded token payload.
    // This way, subsequent middleware and routes can access req.userId to identify the user associated with this request.
  } catch (err){
    res.status(403).json({
        message : "Error validating the current user"
    })
  }
};


module.exports = {
    authMiddleware
}