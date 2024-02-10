import express from "express";
import {
  createReview,
  getReviewById,
  getAllReviews,
  updateReview,
  deleteReview,
  deleteAllReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

router
  .route("/reviews")
  .get(getAllReviews)
  .post(createReview)
  .delete(deleteAllReviews);

router
  .route("/reviews/:id")
  .put(updateReview)
  .delete(deleteReview)
  .get(getReviewById);

export default router;
