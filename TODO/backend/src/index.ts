import express from 'express';
import type { Application, Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import dotenv from 'dotenv'
dotenv.config();

const app : Application = express();
const PORT = process.env.PORT || 3000;

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  //to read if the req.body is url encoded

app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);



app.get('/', (req : Request, res : Response)=>{
    res.json({
        message : "Api is running!"
    })
})

app.listen(PORT, ()=>{
    console.log(`App listening on port : ${PORT}`)
})