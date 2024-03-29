import express from "express";
import {
  createReview,
  getReviewById,
  getAllReviews,
  updateReview,
  deleteReview,
  deleteAllReviews,
} from "../controllers/reviewController.js";
import Protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/reviews")
  .get(getAllReviews)
  .post(createReview)
  .delete(Protect,deleteAllReviews);

router
  .route("/reviews/:id")
  .put(Protect, updateReview)
  .delete(Protect,deleteReview)
  .get(getReviewById);

export default router;
