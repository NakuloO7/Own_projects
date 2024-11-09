//this is the main router 
const express = require('express')
const notesRoutes = require('./noteRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();
console.log("inside index.js")

// all the requests coming from /api/v1/user and /api/v1/notes will go to this routes
router.use('/notes', notesRoutes);
router.use('/user', userRoutes);

module.exports = router;