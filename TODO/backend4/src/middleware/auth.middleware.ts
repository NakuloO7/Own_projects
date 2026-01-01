import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

interface AuthRequest extends Request{
    userId? : string
}


export default function(req : AuthRequest, res : Response, next : NextFunction){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
        message : "Unauthorised User!"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId : string
        }

        req.userId = decoded.userId;
        next();
        
    } catch (error) {
        console.log("Error in middleware", error)
        res.status(401).json({
           error : "Unauthorised User!"
        })
    }
}


// {
//     "email": "foodpartener2@gmail.com",
//     "password" : "123456"
// }
//     foodpartener2@gmail.com