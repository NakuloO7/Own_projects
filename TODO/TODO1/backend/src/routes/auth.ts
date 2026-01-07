import { Router } from "express";
import { signinSchema, signupSchema } from "../schemas/auth";
import { prisma } from "../prisma";
import bcrypt from 'bcrypt';
import { signJwt } from "../utils/jwt";



const router = Router();

//Signup
router.post('/signup', async(req , res)=>{
    const parsed = signupSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(401).json({
            message : "Invalid Inputs!"
        })
    }
    const {email, password} = parsed.data;

    const existingUser = await prisma.user.findUnique({
        where : {
            email
        }
    })
    if(existingUser){
        return res.status(400).json({
            message : "User already exists!"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data : {
            email,
            password : hashedPassword
        }
    })
    const token = signJwt(user.id);

    res.cookie("token", token, {
        httpOnly : true,
        sameSite :'lax',
        secure : false
    })

    res.status(200).json({
        message : "Signup successfull!"
    })
})

//Signin

router.post('/signin', async(req , res)=>{
    const parsed = signinSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(401).json({
            message : "Invalid Inputs!"
        })
    }

    const {email, password} = parsed.data;
    const user = await prisma.user.findFirst({
        where : {
            email
        }
    })
    if(!user){
        return res.status(400).json({
            message : "Imvalid Credentials!"
        })
    }

    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid){
        return res.status(400).json({
            message : "Imvalid Credentials!"
        })
    }
    const token = signJwt(user.id);
    res.cookie("token", token, {
        httpOnly : true,
        sameSite : 'lax',
        secure : false
    });
    res.status(200).json({
        message : "Signin successfull!"
    })
})

router.post('/logout', async(req , res)=>{
    res.clearCookie("token");
    res.json({
        message : "Logged out!"
    })
})

export default router;