import { response } from "express";
import { ApiError } from "../ApiError.js";
import { ApiResponse } from "../ApiResponse.js";
import { Restaurant } from "../models/restaurantOwner.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) throw new ApiError(401, "Restaurant not found");

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          restaurant,
          "Restaurant information fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(404, "Error while getting myRestaurant");
  }
};

export const createRestaurant = async (req, res) => {
  // as per the logic one user will have only one restaurant
  // check if the restaurant is already present
  // if yes then throw an error
  // if not  then create a new restaurant
 
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      throw new ApiError(409, "User has already added a restaurant");
    }
    // Upload Image on Cloudinary
    // const imageLocalPath = req.file?.path;
    // if (!imageLocalPath) {
    //   throw new ApiError(404, "Image path not found");
    // }

    // const restaurantImage = await uploadOnCloudinary(imageLocalPath);

    // Create a new restaurant
    const restaurant = new Restaurant({ ...req.body, user: req.userId });

    // restaurant.imageUrl = restaurantImage?.url;

    await restaurant.save();

    res.json(
      new ApiResponse(201, restaurant, "Restaurant created successfully")
    );
  
};

export const updateRestaurant = async (req, res) => {
  // get all the fields from the req.body
  // check all the fields are not empty
  // if empty throw an error
  // check if user wants to also update the restaurant image
  // if yes then get a url for the restaurant image
  // get the restaurant from user Id
  // set all the fields
  // return the response

  try {
    const {
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      cuisines,
      menuItems,
    } = req.body;

    if (
      !restaurantName ||
      !city ||
      !country ||
      !deliveryPrice ||
      !estimatedDeliveryTime ||
      !cuisines.length === 0 ||
      !menuItems.length === 0
    ) {
      throw new ApiError(404, "All fields are required");
    }

    // const newRestaurantImage = null ;
    // if (req?.file?.path) {
    //   const imageLocalPath = req.file.path;
    //    newRestaurantImage = await uploadOnCloudinary(imageLocalPath);
    // }

   const restaurantUpdated = await Restaurant.findOneAndUpdate(
      { user: req.userId },
      {
        $set: {
          restaurantName: restaurantName,
          city: city,
          country: country,
          deliveryPrice: deliveryPrice,
          estimatedDeliveryTime: estimatedDeliveryTime,
          cuisines: cuisines,
          menuItems: menuItems,
        },
      },
      {
        $new:true
      }
    );

    if(!restaurantUpdated){
        throw new ApiError(401,'Fail to update restaurant')
    }

    res.status(200).json(new ApiResponse(200,restaurantUpdated,'Restaurant updated successfully'))

  } catch (error) {
    throw new ApiError(404, "Error updating restaurant");
  }
};
