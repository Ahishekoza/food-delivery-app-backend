import express from 'express';
import { jwtCheck, jwtParse } from '../middlewares/auth.js';
// import { uploadImage } from '../utils/multer.js';
import { createRestaurant, getMyRestaurant, updateRestaurant } from '../controllers/restaurant.controller.js';
const restaurantRouter = express.Router();

restaurantRouter.get('/',jwtParse,jwtParse,getMyRestaurant)
restaurantRouter.post('/',jwtParse,jwtCheck,createRestaurant)
restaurantRouter.put('/',jwtParse,jwtCheck,updateRestaurant)
export {restaurantRouter}