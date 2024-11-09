const express = require('express');
const router = express.Router();
const zod = require('zod');
const {User, Notes}  = require('../db/db')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config')
// require('dotenv').config();



//SignUp endpoint
const signUp = zod.object({
    username : zod.string(),
    emailId : zod.string().email(),
    password : zod.string()
})


router.post('/signup', async (req,res)=>{
    const {success} = signUp.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message : "Incorrect Inputs",
        })
    }

    //check if the user is already present in the database
    // if yes then return 
    //if no then create the new user

    const existingUser = await User.findOne({
        username : req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message : "User already exists"
        })
    }

    //creating a new user inside the database
    const newUser = await User.create({
        username : req.body.username,
        emailId : req.body.emailId,
        password : req.body.password
    })

    const userId = newUser._id;
    //we will use the userId of this newly created user to generate a jwt

    const token = jwt.sign({userId}, JWT_SECRET);

    res.status(200).json({
        message : "User created Successfully",
        token : token
    })
})


//SignIn endpoint
const signIn = zod.object({
    emailId : zod.string().email(),
    password : zod.string(),
})


router.post('/signin', async(req, res) =>{
    const {success} = signIn.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message : "Email already exists / Incorrect inputs"
        })
    }

    //now check if the user is present in the database
    //if yes then create its jwt
    const searchUser = await User.findOne({
        emailId : req.body.emailId,
        password : req.body.password
    })

    if(searchUser){
        const token = jwt.sign({
            userId : searchUser._id
        }, JWT_SECRET)

        return res.json({
            token : token
        })
    }

    return res.status(411).json({
        message : "Error while logging in"
    })
})

module.exports = router;