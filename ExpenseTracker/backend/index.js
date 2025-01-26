const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/db');

const userRouter = require('./routes/user')
const expenseRouter = require('./routes/expense')
dotenv.config({});

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
const corsOption = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173' || '*',
    credentials: true
};
app.use(cors(corsOption));


app.use('/api/v1/user', userRouter);
app.use('/api/v1/expense', expenseRouter);



app.listen(port, async()=>{
    await connectDB();
    console.log(`app listenining on port ${port}`);
})