import express from "express";
import {
  createCarousel,
  getCarouselById,
  getAllCarousels,
  updateCarousel,
  deleteCarousel,
  deleteAllCarousels
} from "../controllers/carouselController.js";

import upload from "../middlewares/multer.js";

const router = express.Router();

router
  .route("/carousels")
  .get(getAllCarousels)
  .post(upload.single("carousel_image"), createCarousel)
  .delete(deleteAllCarousels);

router
  .route("/carousels/:id")
  .put(upload.single("carousel_image"), updateCarousel)
  .delete(deleteCarousel)
  .get(getCarouselById);

export default router;
