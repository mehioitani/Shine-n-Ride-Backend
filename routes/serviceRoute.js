import express from "express";
import {
  createService,
  getServiceById,
  getAllServices,
  updateService,
  deleteService,
  deleteAllServices,
} from "../controllers/serviceController.js";
import upload from '../middlewares/multer.js'

const router = express.Router();

router
  .route("/services")
  .get(getAllServices)
  .post(upload.single("service_image"), createService)
  .delete(deleteAllServices);

router
  .route("/services/:id")
  .put(upload.single("service_image"), updateService)
  .delete(deleteService)
  .get(getServiceById);

export default router;
