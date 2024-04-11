import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { DB_NAME } from '../constants.js';

dotenv.config()

const connectDB = async() =>{
  try {
    const connectedDB =  await mongoose.connect(`${String(process.env.MONGODB_URL)}/${DB_NAME}`)
    if(connectedDB) console.log(connectedDB.connection.host);
  } catch (error) {
    return new Error(`Error while connecting to DB ${error.message}}`);
  }
}


export default connectDB