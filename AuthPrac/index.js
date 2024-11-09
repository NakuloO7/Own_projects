const express = require("express");
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { type } = require("os");
const JWT_SECRET = "1234";

app.use(express.json());

mongoose.connect("mongodb+srv://admin:100xDevs@cluster0.jx20z.mongodb.net/AuthPrac");

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        require : true
    },
    notes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Notes"
    }]
});
const User = mongoose.model("User", userSchema);


const notesSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

})

const Notes = mongoose.model("Notes", notesSchema);



//Middleware 
const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(411).json({
            message : "Invalid User"
        })
    }

    const token = authHeader.split(' ')[1];
    
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }catch(err){
        res.status(411).json({
            message : "Not able to sign in"
        })
    }
}


app.post('/signin', async (req, res)=>{
    // console.log(req.body);
    const existingUser = await User.findOne({
        username : req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message : "User already exists"
        })
    }

    //creating the new user
    const user = await User.create({
        username : req.body.username
    })

    const userId = user._id;
    const token = jwt.sign({userId}, JWT_SECRET);

    res.status(200).json({
        message : "User created Sucessfully",
        token : token
    })

})


app.post('/notes', authMiddleware, async(req, res)=>{

    //add the req.userId send by middleware to the created by section
    const newNote = await Notes.create({
        content : req.body.content,
        createdBy : req.userId
    })

    //and also add note id to user note array 
    await User.findByIdAndUpdate(req.userId, {
        "$push" : {notes : newNote._id}
    })


    res.status(200).json({
        message : "Notesr created Sucessfully",
    })
})


app.listen(3000, ()=>{
    console.log("Listening on port 3000");
})