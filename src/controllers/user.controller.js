import { ApiError } from "../ApiError.js";
import { ApiResponse } from "../ApiResponse.js";
import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  // check if all the required fields are available
  // if required fields are not available then throw error
  // check if user is already registered
  // if user is already registered then throw error
  // if user is not already registered  then create new user
  // send a response
  try {
    const { auth0Id, email } = req.body;

    if (!auth0Id && !email) throw new ApiError(400, "All fields are required");

    const existingUser = await User.findOne({ auth0Id: auth0Id });
    if (existingUser) return res.status(200).json();

    const newUser = await User.create({
      auth0Id: auth0Id,
      email: email,
      name: req.body.name || "",
      addressLine1: req.body.addressLine1 || "",
      city: req.body.city || "",
      country: req.body.country || "",
    });

    res
      .status(201)
      .json(new ApiResponse(201, newUser, "User Registrated successfully"));
    } catch (error) {
    throw new ApiError(500, `Error creating user`);
  }
};

export const getCurrentUser = async(req,res) => {
  try {
   
    const currentUser = await User.findOne({_id: req.userId})
    if(!currentUser) throw new ApiError(404, 'User not found'); 


    res.status(200).json(new ApiResponse(200,currentUser,'User found Successfully'))
  } catch (error) {
    throw new ApiError(500, `Error getting current user while fetching current User `);
  }
}

export const updateUser = async (req, res) => {
  // get all the fields from the req.body
  // get the current user
  // update the current user with the values from the req.body
  // save the current user

  try {
    const { name, addressLine1, city, country } = req.body;
    await User.findByIdAndUpdate(
      { _id: req.userId },
      {
        $set: {
          name: name,
          addressLine1: addressLine1,
          city: city,
          country: country,
        },    
      },
      {
        new:true,
      }
    )
    .then((response)=>{
      res.status(200).json(new ApiResponse(200,response , 'User updated successfully'))
    }).catch(()=>{
      throw new ApiError(404, 'Error occurred while updating user')
    });
  } catch (error) {
    throw new ApiError(400, "ERROR: updating user");
  }
};
