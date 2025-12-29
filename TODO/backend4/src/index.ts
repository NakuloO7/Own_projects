import express from 'express'
import dotenv from 'dotenv';
import authRoute from './routes/auth.routes';
import todoRoute from './routes/todo.routes';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/auth/', authRoute);
app.use('/api/todo/', todoRoute);

app.listen(PORT, ()=>{
    console.log(`App is listening on port : ${PORT}`);
})


