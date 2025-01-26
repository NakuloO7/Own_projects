const { User } = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async(req, res)=>{
    try{
        const {fullname, email, password} = req.body;

        if(!fullname || !email || !password){
            return res.status(400).json({
                message : "All fileds are required",
                success : false
            })
        }

        const user =await User.findOne({email})
        if(user){
            return res.status(400).json({
                message : "User already exists",
                success : false
            })
        }

        const hasehedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            password : hasehedPassword
        });

        return res.status(201).json({
            message :"Account created successfully",
            success : true
        })
    }catch(e){
        console.log(e)
    }
}


const login = async (req, res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message : "All fileds are required",
                success : false
            })
        }

        const user = await User.findOne({email})
        
        if(!user){
            return res.status(400).json({
                message : "Incorrect email or password",
                success : false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        

        if(!isPasswordMatch){
            return res.status(400).json({
                message : "Incorrect email or password",
                success : false
            })
        };
        
        const tokenData = {
            userId : user._id
        }
        

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
        // console.log(token);
        return res.status(200).cookie("token", token, {maxAge : 1*24*60*60*1000, httpOnly:true, sameSite : "strict"}).json({
            message : `Welcome ${user.fullname}`,
            user : {
                id : user._id,
                fullname : user.fullname,
                email : user.email,
            },
            success : true
        });
    }catch(e){
        console.log(e);
    }
}

const logout = async(req, res)=>{
    try{
        return res.status(200).cookie("token", "", {maxAge : 0, httpOnly : true}).json({
            message : "User logged out successfully.",
            success : true
        })
    }catch(e){
        console.log(e);
    }
}

module.exports= {
    register,
    login,
    logout
}



/*
{
    "email" : "neha@gmail.com",
    "password" : "nah33"
}
*/