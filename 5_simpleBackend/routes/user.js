//in this file we will write req such as get, post 


const { Router } = require('express');
const jwt = require('jsonwebtoken')
const router = Router();


const User = require('../db/dbSchema');
const authMiddleware = require('../middlewares/userAuth')
const {JWT_KEY} = require('../server/config')


//use the zod for the input validation
const zod = require('zod');
//we will define a zod schema to validate the username and passord
//so that the user will not provide any false data

const zodSchema = zod.object({
    username : zod.string().email(),    //this is bulit in zod validation that will verify the email
    password : zod.string().min(6)  //this is only validate if the password is string and have atleast 6 character
})



router.post('/signUp', async(req, res)=>{

    const username = req.body.username;
    const password = req.body.password;
    const address = req.body.address;

    //as we have taken the username and password form the body of http request
    //validate them using the zod
    const validateData = zodSchema.safeParse({
        username,
        password,
    })
    //if this validation is sucess then we will store this data in database
    try{
        if(!validateData.success){
            res.status(400).json({
                msg : "Invalid Data"
            });  
        }
        else{

            await User.create({
                username, 
                password,
                address
            })

            res.json({
                msg : "User created Sucessfully"
            })
        }
    }catch(e){
        console.log("there is some error in signUp request");
        console.log(e);
    }


});


//if he/she has an account then only can get a data form the database
router.post('/signIn', async (req, res)=>{
    const username = req.body.username;
    const passord = req.body.passord;
    try{

        const user = await User.findOne({
            username,
            passord
        })
        //if this user is present in the database then genereate a jwt token for that user 
        //and use it for authorization to retrive the address of the user from the database
        if(user){
            const token = jwt.sign(username, JWT_KEY);
            res.json({
                token
            })
        }else{
            res.status(411).json({
                msg : "User doesnot exists"
            })
        }

    }catch(e){
        console.log("there is some error in signin request")
    }
});

router.get('/address', authMiddleware, async(req, res)=>{
    //use this request to retrive the address from the database
    
        const getAddress = await User.findOne(req.user.username, 'address');
        const add = getAddress.address;
        res.json({
            add
        })
    
});




module.exports = router;