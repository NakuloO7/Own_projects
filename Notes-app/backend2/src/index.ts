
import express from 'express';
import userRouter from './routes/userRoute'
import blogRouter from './routes/blogRoute'
import cors from 'cors'
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
    origin :"http://localhost:5173",
    credentials : true
}))   // this is important if you want to hit backend api from frontend

app.use('/api/v1/user/', userRouter);
app.use('/api/v1/blog/', blogRouter);



app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
})