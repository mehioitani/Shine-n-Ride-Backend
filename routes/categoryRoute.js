import express from "express";
import {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} from "../controllers/categoryController.js";

import upload from "../middlewares/cloudinary.js";
import Protect from '../middlewares/authMiddleware.js'

const router = express.Router();

router
  .route("/categories")
  .get(getAllCategories)
  .post(Protect,upload.single("category_image"), createCategory)
  .delete(Protect,deleteAllCategories);

router
  .route("/categories/:id")
  .put(Protect,upload.single("category_image"), updateCategory)
  .delete(Protect,deleteCategory)
  .get(getCategoryById);

export default router;
