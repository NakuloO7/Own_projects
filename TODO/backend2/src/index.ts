import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route';
import todoRoute from './routes/todo.route';

dotenv.config();


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());  //very important

app.use('/api/auth', authRoute);
app.use('/api/todo', todoRoute);



app.get('/', (req : Request, res : Response)=>{
    res.json({
        message : "API is running!"
    })
})

app.listen(PORT, ()=>{
    console.log(`App listening on port : ${PORT}`)
});