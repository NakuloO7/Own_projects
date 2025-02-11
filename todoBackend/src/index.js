const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/todo', todoRouter);


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})