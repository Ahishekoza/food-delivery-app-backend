import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv'
import  connectDB  from './db/index.js';
import { userRouter } from './routers/user.router.js';

dotenv.config()

app.use(express.json())
app.use(cors())

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening on port '+process.env.PORT);
    })
})
.catch((error)=>{
    console.log('MongoDB connected server not started', error);
})

app.use('/health',(req,res)=>{
    res.send('Server is Healthy!');
})

// --Routes
app.use('/api/v1/users', userRouter)
