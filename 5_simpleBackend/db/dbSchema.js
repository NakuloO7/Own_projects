// this is the the file where we will write schemas using mongoose for mongodb database

const mongoose = require('mongoose');

//to connect to the mongoDB database copy the connect url of the particular cluster(database)
//and the use mongoose.connect

mongoose.connect('mongodb+srv://admin:100xDevs@cluster0.jx20z.mongodb.net/practiceDB');

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    address : String
});

const User = mongoose.model('User', userSchema)

module.exports = User;