const mongoose = require('mongoose');


const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,);
        console.log("Mongodb connected successfully");
    }catch(e){
        console.log(e);
    }
}

module.exports = connectDB;