import express from 'express';
import { getCurrentUser, registerUser, updateUser } from '../controllers/user.controller.js';
import { jwtCheck, jwtParse } from '../middlewares/auth.js';
const userRouter = express.Router();
// POST
userRouter.post('/registerUser',jwtCheck ,registerUser)
// PUT
userRouter.put('/updateUser',jwtCheck ,jwtParse,updateUser)
// GET
userRouter.get('/getCurrentUser',jwtCheck,jwtParse,getCurrentUser)
export {userRouter}