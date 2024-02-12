import pkg from "cloudinary";
import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
const { v2: cloudinary } = pkg;
import dotenv from 'dotenv';

dotenv.config();
//configure
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

 
//storage
const cloudinary_storage = new CloudinaryStorage ({
  cloudinary: cloudinary,
  params: {
    folder: 'Shine-n-Ride', //name of folder in cloudinary cloud
  }
});

//multer uploader
 const upload = multer({ storage: cloudinary_storage});

 export default upload