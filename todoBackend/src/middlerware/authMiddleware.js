//this is the middleware to check either the user is authenticated or not

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const jwt_header = req.headers.authorization;
  

  if (!jwt_header || !jwt_header.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Invalid User",
    });
  }

  const word = jwt_header.split(" ")[1];
  try {
    const decoded = jwt.verify(word, jwtSecret);
    
    if (decoded) {
      req.userId = decoded.id; //the route will have access to this userId
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
  }
};




module.exports = authMiddleware;
