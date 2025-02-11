///this is the main file where we will create an http server using express
const express = require('express');
//Body parser in Express is a middleware that processes data sent in an HTTP request body
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('../routes/user');  //this is the route we have imported form the routes folder


//now we will define our routes(i.e GET, POST requests in the routes folder and import it here)
app.use(bodyParser.json());  //use to parse json object form the HTTP request body
app.use('/user', userRouter);

const port = 3000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})