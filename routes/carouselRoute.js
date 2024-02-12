import express from "express";
import {
  createCarousel,
  getCarouselById,
  getAllCarousels,
  updateCarousel,
  deleteCarousel,
  deleteAllCarousels
} from "../controllers/carouselController.js";

import upload from '../middlewares/cloudinary.js'
import Protect from '../middlewares/authMiddleware.js'

const router = express.Router();

router
  .route("/carousels")
  .get(getAllCarousels)
  .post(Protect,upload.single("carousel_image"), createCarousel)
  .delete(Protect,deleteAllCarousels);

router
  .route("/carousels/:id")
  .put(Protect,upload.single("carousel_image"), updateCarousel)
  .delete(Protect,deleteCarousel)
  .get(getCarouselById);

export default router;
