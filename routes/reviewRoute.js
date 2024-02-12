import express from "express";
import {
  createReview,
  getReviewById,
  getAllReviews,
  updateReview,
  deleteReview,
  deleteAllReviews,
} from "../controllers/reviewController.js";
import { validateReview } from "../middlewares/controllersMiddlewares/reviewMiddleware.js";

const router = express.Router();

router
  .route("/reviews")
  .get(getAllReviews)
  .post(validateReview, createReview)
  .delete(deleteAllReviews);

router
  .route("/reviews/:id")
  .put(updateReview)
  .delete(deleteReview)
  .get(getReviewById);

export default router;
