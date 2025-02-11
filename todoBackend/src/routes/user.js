const {Router} = require('express');
const router = Router(); 
const {z} = require('zod');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;



const signupSchema = z.object({
    username : z.string().email(),
    password : z.string()
});

router.post('/signup', async (req, res) => {
    try {
        const parsedData = signupSchema.safeParse(req.body);
        if(!parsedData.success){
            return res.status(400).json({message: "Invalid data"});
        }
        const {username, password} = parsedData.data;
        
        const existingUser = await prisma.user.findUnique({
            where: {username}
        });
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        //create a ner user

        const response = await prisma.user.create({
            data: {
                username,
                password
            }
        });

        const token = jwt.sign({id : response.id}, jwtSecret);

        res.status(201).json({message: "User created successfully", token});
        

        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

const loginSchema = z.object({
    username : z.string().email(),
    password : z.string()
});
router.post('/login', async (req, res) => {
    try {
        const parsedData = loginSchema.safeParse(req.body);
        if(!parsedData.success){
            return res.status(400).json({message: "Invalid data"});
        }
        const {username, password} = parsedData.data;
        
        const user = await prisma.user.findUnique({
            where: {username}
        });
        if(!user){  //if user not found then return
            return res.status(400).json({message: "User not found"});
        }
        //if user found then check the password
        if(user.password !== password){
            return res.status(400).json({message: "Invalid password"});
        }

        //if password is correct then generate a token
        const token = jwt.sign({id : user.id}, jwtSecret);
        res.status(200).json({message: "Login successful", token});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});
module.exports = router;