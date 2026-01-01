import { Router, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from "../db/client";
const router = Router();


router.post('/signup', async(req : Request, res : Response)=>{
    const {email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data : {
                email,
                password : hashedPassword
            }
        })

        res.status(200).json({
            message : "User created successfully!"
        })
        
    } catch (error) {
        console.log("Error in signup route", error)
        res.status(401).json({
            error : "Error in signup route"
        })
    }
});

router.post('/signin', async(req : Request, res : Response)=>{
    const {email, password} = req.body;
    try {
        const existingUser = await prisma.user.findFirst({
            where : {
                email
            }
        });
        if(!existingUser){
            return res.status(401).json({
                message : "Unauthorised User!"
            })
        };

        const verify = await bcrypt.compare(password, existingUser.password);
        if(!verify){
            return res.status(401).json({
                message : "Unauthorised User!"
            })
        }
        const token = jwt.sign({userId : existingUser.id}, process.env.JWT_SECRET!);
        res.status(200).json({
            token
        })
    } catch (error) {
        console.log("Error in signin route", error)
        res.status(401).json({
            error : "Error in signin route"
        })
    }
})

export default router;
