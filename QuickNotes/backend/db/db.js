const mongoose = require('mongoose')
const con = require('../config');
const { timeStamp } = require('console');
// const { title, config } = require('process');

mongoose.connect("mongodb+srv://admin:100xDevs@cluster0.jx20z.mongodb.net/QuickNotes");


//User schema
//this will reference to the Notes schema 
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    emailId : {
        type : String, 
        required : true,
        unique : true,
        trim : true,
    }, 
    password : {
        type : String,
        required : true
    }, 
    notes :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref :"Notes"
    }],
},
{
    timestamps : true
})

const User = mongoose.model('User', userSchema);

//Notes Schema
//this will have reference to the User schema to store the notes of the particular user
const notesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true, 
        unique : true
    },
    content : {
        type : String,
        trim : true
    }, 
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {
    timestamps : true
})

const Notes = mongoose.model('Notes', notesSchema);

module.exports = {
    User, 
    Notes
}