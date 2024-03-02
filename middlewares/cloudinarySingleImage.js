import dotenv from "dotenv";

dotenv.config();

import pkg from "cloudinary";
const { v2 } = pkg;
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

//configure
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

//storage
const cloudinary_storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "Shine-n-Ride", //name of folder in cloudinary cloud
    resource_type: "auto",
  },
});

//multer uploader
const upload = multer({ storage: cloudinary_storage });

export default upload;
