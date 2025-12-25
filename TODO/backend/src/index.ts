import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req : Request, res : Response)=>{
    res.json({
        message : "Jhala na backend bhenchod!"
    })
})

app.listen(PORT, ()=>{
    console.log(`App listening on port : ${PORT}`)
})