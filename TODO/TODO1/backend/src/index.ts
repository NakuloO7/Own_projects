import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth';
import todoRoute from './routes/todo'
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/todo', todoRoute);

app.get('/health', (req, res)=>{
    res.json({
        status : "OK"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})