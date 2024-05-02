import express from 'express';
import { jwtCheck, jwtParse } from '../middlewares/auth.js';
import { searchRestaurants } from '../controllers/restaurantSearch.controller.js';

const restaurantSearch = express.Router()

restaurantSearch.get('/search/:city',jwtCheck,jwtParse,searchRestaurants)

export { restaurantSearch}