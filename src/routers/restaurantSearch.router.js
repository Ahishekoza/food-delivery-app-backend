import express from 'express';
import { jwtCheck, jwtParse } from '../middlewares/auth.js';
import { getRestaurant, searchRestaurants } from '../controllers/restaurantSearch.controller.js';

const restaurantSearch = express.Router()

restaurantSearch.get('/search/:city',jwtCheck,jwtParse,searchRestaurants)
restaurantSearch.get('/:restaurantId',jwtCheck,jwtParse,getRestaurant)

export { restaurantSearch}