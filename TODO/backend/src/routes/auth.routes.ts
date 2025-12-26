import { Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {prisma} from '../db/client'
import dotenv from 'dotenv'
dotenv.config();
const router = Router();

router.post('/signup', async (req , res )=>{
    const {email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data : {
            email,
            password : hashedPassword
        }
    });

    res.status(200).json({
        message : "User created Successfully!",
        userId : user.id
    })

});


router.post('/signin',async (req, res)=>{
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
        where : {
            email
        }
    });
    if(!user){
        return res.status(401).json({
            message : "Invalid Credentials!"
        })
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        res.status(401).json({
            message : "Invalid Credentials!"
        })
    }
    const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET!);
    res.json({
        token
    });
} )


export default router;