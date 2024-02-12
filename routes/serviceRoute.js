import express from "express";
import {
  createService,
  getServiceById,
  getAllServices,
  updateService,
  deleteService,
  deleteAllServices,
} from "../controllers/serviceController.js";
import upload from "../middlewares/cloudinary.js";
import Protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/services")
  .get(getAllServices)
  .post(Protect, upload.single("service_image"), createService)
  .delete(Protect, deleteAllServices);

router
  .route("/services/:id")
  .put(Protect, upload.single("service_image"), updateService)
  .delete(Protect, deleteService)
  .get(getServiceById);

export default router;
