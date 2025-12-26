import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req : Request, res : Response)=>{
    res.json({
        message : "API is running!"
    })
})

app.listen(PORT, ()=>{
    console.log(`App listening on port : ${PORT}`)
});