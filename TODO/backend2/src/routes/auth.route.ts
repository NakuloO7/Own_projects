import { Router , Request, Response} from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {prisma} from '../db/client'
import dotenv from 'dotenv';
dotenv.config();
const router = Router();


router.post('/signup', async(req : Request, res : Response)=>{
    const {email, password } = req.body;
    

    const hashedPassword = await bcrypt.hash(password, 10);
    //create the new user
    const user = await prisma.user.create({
        data : {
            email, 
            password : hashedPassword
        }
    }); 

    res.status(200).json({
        message : "User created successfully!"
    })
});

router.post('/signin', async(req : Request, res : Response)=>{
    const {email, password} = req.body;
    const existingUser = await prisma.user.findFirst({
        where : {
            email
        }
    });

    if(!existingUser){
        return res.status(400).json({
            message : "Unauthorized User!"
        })
    }

    //if the user is present
    //verify the password and create the jwt
    const hashedPassword = await bcrypt.compare(password, existingUser.password);
    if(!hashedPassword){
        return res.status(400).json({
            message : "Unauthorized User!"
        })
    };

    const token = jwt.sign({userId : existingUser.id}, process.env.JWT_SECRET!);
    
    res.status(200).json({
        message : "User signin successfull!",
        token
    })
})

export default router;