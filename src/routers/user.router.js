import express from 'express';
import { getCurrentUser, registerUser, updateUser } from '../controllers/user.controller.js';
import { jwtCheck, jwtParse } from '../middlewares/auth.js';
const userRouter = express.Router();
// POST
userRouter.post('/',jwtCheck ,registerUser)
// PUT
userRouter.put('/',jwtCheck ,jwtParse,updateUser)
// GET
userRouter.get('/',jwtCheck,jwtParse,getCurrentUser)
export {userRouter}