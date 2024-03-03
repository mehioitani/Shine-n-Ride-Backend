import express from "express";
import {
  createService,
  getServiceById,
  getAllServices,
  updateService,
  deleteService,
  deleteAllServices,
} from "../controllers/serviceController.js";
import upload from "../middlewares/cloudinaryMultipleImage.js";
import Protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/services")
  .get(getAllServices)
  .post(Protect, upload, createService)
  .delete(Protect, deleteAllServices);

router
  .route("/services/:id")
  .put(Protect, upload, updateService)
  .delete(Protect, deleteService)
  .get(getServiceById);

export default router;
