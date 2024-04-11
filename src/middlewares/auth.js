import {auth} from 'express-oauth2-jwt-bearer'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
// import { ApiError } from '../../ApiError.js'
dotenv.config()

export const jwtCheck = auth({
    audience: String(process.env.AUTH0_AUDIENCE),
    issuerBaseURL: String(process.env.AUTH0_ISSUER),
    tokenSigningAlg: 'RS256'
  }); 


export const jwtParse =async(req, res , next)=>{
  // get the token
  // check whether the token is present , if not throw an error
  // decode the token
  // get the details and get the user 

  console.log(req.headers.authorization.split(" ")[1]);
  try {
    const token = req.headers.authorization.split(" ")[1]
  const decodeToken =  jwt.decode(token)

  console.log(decodeToken);
  const auth0Id = decodeToken?.sub


  const user = await User.findOne({auth0Id:auth0Id})

  if(!user) throw new Error('Error while getting user from decoded token auth0Id: ' )

  req.auth0Id = auth0Id
  req.userId = user?._id
  next()
  } catch (error) {
    throw new Error('Error while token parsing')
  }


  
}