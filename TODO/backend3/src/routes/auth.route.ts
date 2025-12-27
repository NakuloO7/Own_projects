import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import {prisma } from '../db/client' 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const router = Router();


router.post('/signup', async(req : Request, res : Response)=>{
    const {email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data : {
                email,
                password : hashedPassword
            }
        });

        res.status(200).json({
            message : "User created successfully!"
        })
        
    } catch (error) {
        console.log("Error form signup", error);
        res.status(400).json({
            message : "Error form signup"
        })
    }
});


router.post('/signin', async(req: Request, res: Response)=>{
    const {email, password} = req.body;

    const existingUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if(!existingUser){
        return res.status(400).json({
            message : "Unauthorized User!!"
        })
    }

    const verifyPassword = await bcrypt.compare(existingUser.password, password);
    if(!verifyPassword){
        return res.status(200).json({
            message : "Unauthorized User!!"
        })
    }

    try {
        const token = jwt.sign({userId : existingUser.id}, process.env.JWT_SECRET!);
        
        res.status(200).json({
            token,
            message : "User signed Id!"
        })
        
    } catch (error) {
        console.log("Error form signin", error);
        res.status(400).json({
            message : "Error form signin"
        })
    }
})

export default router;