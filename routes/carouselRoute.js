import express from "express";
import {
  createCarousel,
  getCarouselById,
  getAllCarousels,
  updateCarousel,
  deleteCarousel,
  deleteAllCarousels,
} from "../controllers/carouselController.js";

import upload from "../middlewares/cloudinarySingleImage.js";
import Protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/carousels")
  .post(upload.single("carousel_image"), createCarousel)
  .get(getAllCarousels)
  .delete(deleteAllCarousels);

router
  .route("/carousels/:id")
  .put( upload.single("carousel_image"), updateCarousel)
  .delete(deleteCarousel)
  .get(getCarouselById);

export default router;
