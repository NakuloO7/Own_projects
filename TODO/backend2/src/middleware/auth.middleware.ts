import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface AuthRequest extends Request{
    userId?: string
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({
      message: "Unauthorized!",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId : string
    };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in the middleware", error);
    res.status(400).json({
        message : "Error in auth Middleware"
    })
  }
}
