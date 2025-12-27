import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

import authRoutes from './routes/auth.route';
import todoRoutes from './routes/todo.route';

const PORT= process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);


app.listen(PORT, ()=>{
    console.log(`App runnning on port : ${PORT}`);
})