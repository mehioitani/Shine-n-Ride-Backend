import express from "express";
import {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} from "../controllers/categoryController.js";

import upload from "../middlewares/multer.js";

const router = express.Router();

router
  .route("/categories")
  .get(getAllCategories)
  .post(upload.single("category_image"), createCategory)
  .delete(deleteAllCategories);

router
  .route("/categories/:id")
  .put(upload.single("category_image"), updateCategory)
  .delete(deleteCategory)
  .get(getCategoryById);

export default router;
