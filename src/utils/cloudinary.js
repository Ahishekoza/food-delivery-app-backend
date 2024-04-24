import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;   // if file path is not specified return null

try{

  const response = await cloudinary.uploader.upload(localFilePath,{resource_type:'auto'})
   
     //  response contains many things   but we need repsonse.url
     
     // remove file from the local sever
     fs.unlinkSync(localFilePath)
     
     return response;
   
}
catch(error){
  console.log(error);
  fs.unlinkSync(localFilePath)
  return null 
}
  
};


export {uploadOnCloudinary}